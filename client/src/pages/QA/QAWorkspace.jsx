import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import TabPanel from '../../components/TabPanel';
import { fetchProjectFiles, fetchProjectName, fetchUserNameById, updateFileStatus } from '../../utils/firestoreUtil';
import { auth } from '../../utils/firebase';
import { useNavigate, useParams } from 'react-router-dom';
import Table from '../../components/Table/Table';
import KyroCompletedTable from '../../components/Table/KyroCompletedTable';




const columnsCompleted = [
    { id: 'slNo', label: 'Sl. No.', minWidth: 50 },
    { id: 'name', label: 'File Name', minWidth: 100 },
    { id: 'pageCount', label: 'Page Count', minWidth: 100 },
    { id: 'kyro_completedDate', label: 'Completed Date', minWidth: 100 },
    { id: 'kyro_assignedToName', label: 'Completed By', minWidth: 150 },
    { id: 'edit', label: '', minWidth: 100, align: 'right' },
];
const columnsQA = [
    { id: 'slNo', label: 'Sl. No.', minWidth: 50 },
    { id: 'name', label: 'File Name', minWidth: 100 },
    { id: 'pageCount', label: 'Page Count', minWidth: 100 },
    { id: 'kyro_completedDate', label: 'Completed Date', minWidth: 100 },
    { id: 'kyro_assignedToName', label: 'Completed By', minWidth: 150 },
];

const QAWorkspace = () => {
    const { projectId } = useParams();
    const [files, setFiles] = useState([]);
    const [tabValue, setTabValue] = useState(0);
    const [companyId, setCompanyId] = useState('');
    const [completedFiles, setCompletedFiles] = useState([]);
    const [qaFiles, setQaFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [projectName, setProjectName] = useState('');
    const [role, setRole] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const token = await user.getIdTokenResult();
                // console.log(token)
                user.roleName = token.claims.roleName;
                user.companyId = token.claims.companyId;

                setRole(user.roleName);
                setCompanyId(user.companyId);
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const getFiles = async () => {
            if (!companyId || !projectId) return;
            setIsLoading(true);
            try {
                const projectFiles = await fetchProjectFiles(projectId);
                const projectName = await fetchProjectName(projectId);

                const fetchFileUsers = async (files) => {
                    return await Promise.all(files.map(async (file) => {
                        try {
                            const assignedUser = file.kyro_assignedTo ? await fetchUserNameById(file.kyro_assignedTo) : null;
                            return {
                                ...file,
                                kyro_assignedToName: assignedUser,
                            };
                        } catch (error) {
                            console.error(`Error fetching user name for file ${file.id}:`, error);
                            return {
                                ...file,
                                kyro_assignedToName: file.kyro_assignedTo,
                            };
                        }
                    }));
                };




                const completed = await fetchFileUsers(projectFiles.filter(file => file.status === 4));
                const qa = await fetchFileUsers(projectFiles.filter(file => file.status >= 5));


                setCompletedFiles(completed.map((file, index) => ({ ...file, slNo: index + 1 })));
                setQaFiles(qa.map((file, index) => ({ ...file, slNo: index + 1 })));

                setProjectName(projectName);
            } catch (err) {
                console.error('Error fetching files:', err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        getFiles();
    }, [companyId, projectId]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSendSelected = async () => {
        for (const fileId of selectedRows) {
            await updateFileStatus(projectId, fileId, { status: 5, kyro_completedDate: new Date().toISOString() });
            // setCompletedFiles(files.filter(file => file.id !== fileId));
        }
        setSelectedRows([]);
        const updatedFiles = await fetchProjectFiles(projectId);
        setFiles(updatedFiles);

        navigate(-1);

    };

    if (isLoading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">Error: {error.message}</Typography>;
    }

    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example" centered>
                    <Tab label="Completed" />
                    <Tab label="Quality Assured" />
                </Tabs>
            </Box>
            <TabPanel value={tabValue} index={0}>
                <KyroCompletedTable
                    columns={columnsCompleted}
                    rows={completedFiles}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    projectName={projectName}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    handleSendSelected={handleSendSelected}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
                <Table
                    projectName={projectName}
                    columns={columnsQA}
                    rows={qaFiles}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TabPanel>
        </Box>
    );
};

export default QAWorkspace;