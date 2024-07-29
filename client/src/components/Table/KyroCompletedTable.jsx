// import React from "react";
// import PropTypes from "prop-types";
// import TableCell from "@mui/material/TableCell";
// import TableRow from "@mui/material/TableRow";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableBody from "@mui/material/TableBody";
// import TablePagination from "@mui/material/TablePagination";
// import Button from "@mui/material/Button";
// import Paper from "@mui/material/Paper";
// import MuiTable from "@mui/material/Table";
// import { useNavigate } from 'react-router-dom';

// const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return !isNaN(date.getTime()) ? date.toLocaleDateString() : 'Invalid Date';
// };

// function KyroCompletedTable({
//     columns,
//     rows = [],
//     page,
//     rowsPerPage,
//     handleChangePage,
//     handleChangeRowsPerPage,
//     // handleEditNavigate,
//     handleSend,
//     projectName,
// }) {
//     const navigate = useNavigate();
//     const handleEditClick = (projectId, documentId) => {
//         console.log('Navigating to editor with project ID:', projectId);
//         console.log('Navigating to editor with document ID:', documentId);
//         navigate(`/editor/${projectId}/${documentId}`);
//     };

//     return (
//         <div>
//             <h2
//                 style={{
//                     textAlign: "center",
//                     padding: "16px",
//                     fontWeight: "bold",
//                     fontSize: "24px",
//                 }}
//             >
//                 {projectName}
//             </h2>
//             <Paper sx={{ width: "100%", overflow: "hidden" }}>
//                 <TableContainer sx={{ maxHeight: 700 }}>
//                     <MuiTable stickyHeader aria-label="sticky table">
//                         <TableHead>
//                             <TableRow>
//                                 {columns.map((column) => (
//                                     <TableCell
//                                         key={column.id}
//                                         align={column.align || "left"}
//                                         style={{ minWidth: column.minWidth }}
//                                     >
//                                         {column.label}
//                                     </TableCell>
//                                 ))}
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {rows
//                                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                                 .map((row) => (
//                                     <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
//                                         {columns.map((column) => {
//                                             const value = row[column.id];
//                                             return (
//                                                 <TableCell
//                                                     key={column.id}
//                                                     align={column.align || "left"}
//                                                 >
//                                                     {column.id === "edit" ? (
//                                                         <div className=" flex gap-5">
//                                                             <Button
//                                                                 variant="contained"
//                                                                 color="primary"
//                                                                 onClick={() => handleEditClick(row.projectId, row.id)}
//                                                             >
//                                                                 Edit
//                                                             </Button>
//                                                             <Button
//                                                                 variant="contained"
//                                                                 color="secondary"
//                                                                 onClick={() =>
//                                                                     handleSend &&
//                                                                     handleSend(row.projectId, row.id)
//                                                                 }
//                                                             >
//                                                                 Send
//                                                             </Button>
//                                                         </div>
//                                                     ) : column.id.endsWith('Date') && value ? (
//                                                         formatDate(value)
//                                                     ) : (
//                                                         value
//                                                     )}
//                                                 </TableCell>
//                                             );
//                                         })}
//                                     </TableRow>
//                                 ))}
//                         </TableBody>
//                     </MuiTable>
//                 </TableContainer>
//                 <TablePagination
//                     rowsPerPageOptions={[10, 25, 100]}
//                     component="div"
//                     count={rows.length}
//                     rowsPerPage={rowsPerPage}
//                     page={page}
//                     onPageChange={handleChangePage}
//                     onRowsPerPageChange={handleChangeRowsPerPage}
//                 />
//             </Paper>
//         </div>
//     );
// }

// KyroCompletedTable.propTypes = {
//     columns: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.string.isRequired,
//             label: PropTypes.string.isRequired,
//             minWidth: PropTypes.number.isRequired,
//             align: PropTypes.string,
//         })
//     ).isRequired,
//     rows: PropTypes.array,
//     page: PropTypes.number.isRequired,
//     rowsPerPage: PropTypes.number.isRequired,
//     handleChangePage: PropTypes.func.isRequired,
//     handleChangeRowsPerPage: PropTypes.func.isRequired,
//     handleEditClick: PropTypes.func,
//     handleEditNavigate: PropTypes.func,
//     handleSend: PropTypes.func,
//     projectName: PropTypes.string.isRequired,
// };

// KyroCompletedTable.defaultProps = {
//     rows: [],
//     handleEditClick: null,
//     handleEditNavigate: null,
//     handleSend: null,
// };

// export default KyroCompletedTable;



// // import React, { useState } from "react";
// // import PropTypes from "prop-types";
// // import TableCell from "@mui/material/TableCell";
// // import TableRow from "@mui/material/TableRow";
// // import TableContainer from "@mui/material/TableContainer";
// // import TableHead from "@mui/material/TableHead";
// // import TableBody from "@mui/material/TableBody";
// // import TablePagination from "@mui/material/TablePagination";
// // import Button from "@mui/material/Button";
// // import Checkbox from "@mui/material/Checkbox";
// // import Paper from "@mui/material/Paper";
// // import MuiTable from "@mui/material/Table";
// // import { useNavigate } from 'react-router-dom';

// // const formatDate = (dateString) => {
// //     if (!dateString) return 'N/A';
// //     const date = new Date(dateString);
// //     return !isNaN(date.getTime()) ? date.toLocaleDateString() : 'Invalid Date';
// // };

// // function KyroCompletedTable({
// //     columns,
// //     rows = [],
// //     page,
// //     rowsPerPage,
// //     handleChangePage,
// //     handleChangeRowsPerPage,
// //     handleSend,
// //     projectName,
// //     selectedFiles,
// //     handleSelectAllClick,
// //     handleSelectClick,
// // }) {
// //     const navigate = useNavigate();
// //     const handleEditClick = (projectId, documentId) => {
// //         console.log('Navigating to editor with project ID:', projectId);
// //         console.log('Navigating to editor with document ID:', documentId);
// //         navigate(`/editor/${projectId}/${documentId}`);
// //     };

// //     return (
// //         <div>
// //             <h2
// //                 style={{
// //                     textAlign: "center",
// //                     padding: "16px",
// //                     fontWeight: "bold",
// //                     fontSize: "24px",
// //                 }}
// //             >
// //                 {projectName}
// //             </h2>
// //             <Paper sx={{ width: "100%", overflow: "hidden" }}>
// //                 <TableContainer sx={{ maxHeight: 700 }}>
// //                     <MuiTable stickyHeader aria-label="sticky table">
// //                         <TableHead>
// //                             <TableRow>
// //                                 <TableCell padding="checkbox">
// //                                     <Checkbox
// //                                         indeterminate={selectedFiles.length > 0 && selectedFiles.length < rows.length}
// //                                         checked={rows.length > 0 && selectedFiles.length === rows.length}
// //                                         onChange={handleSelectAllClick}
// //                                     />
// //                                 </TableCell>
// //                                 {columns.map((column) => (
// //                                     <TableCell
// //                                         key={column.id}
// //                                         align={column.align || "left"}
// //                                         style={{ minWidth: column.minWidth }}
// //                                     >
// //                                         {column.label}
// //                                     </TableCell>
// //                                 ))}
// //                             </TableRow>
// //                         </TableHead>
// //                         <TableBody>
// //                             {rows
// //                                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
// //                                 .map((row) => {
// //                                     const isItemSelected = selectedFiles.indexOf(row.id) !== -1;
// //                                     return (
// //                                         <TableRow
// //                                             hover
// //                                             role="checkbox"
// //                                             tabIndex={-1}
// //                                             key={row.id}
// //                                             selected={isItemSelected}
// //                                         >
// //                                             <TableCell padding="checkbox">
// //                                                 <Checkbox
// //                                                     checked={isItemSelected}
// //                                                     onChange={(event) => handleSelectClick(event, row.id)}
// //                                                 />
// //                                             </TableCell>
// //                                             {columns.map((column) => {
// //                                                 const value = row[column.id];
// //                                                 return (
// //                                                     <TableCell
// //                                                         key={column.id}
// //                                                         align={column.align || "left"}
// //                                                     >
// //                                                         {column.id === "edit" ? (
// //                                                             <div className=" flex gap-5">
// //                                                                 <Button
// //                                                                     variant="contained"
// //                                                                     color="primary"
// //                                                                     onClick={() => handleEditClick(row.projectId, row.id)}
// //                                                                 >
// //                                                                     Edit
// //                                                                 </Button>
// //                                                                 <Button
// //                                                                     variant="contained"
// //                                                                     color="secondary"
// //                                                                     onClick={() =>
// //                                                                         handleSend &&
// //                                                                         handleSend(row.projectId, row.id)
// //                                                                     }
// //                                                                 >
// //                                                                     Send
// //                                                                 </Button>
// //                                                             </div>
// //                                                         ) : column.id.endsWith('Date') && value ? (
// //                                                             formatDate(value)
// //                                                         ) : (
// //                                                             value
// //                                                         )}
// //                                                     </TableCell>
// //                                                 );
// //                                             })}
// //                                         </TableRow>
// //                                     );
// //                                 })}
// //                         </TableBody>
// //                     </MuiTable>
// //                 </TableContainer>
// //                 <TablePagination
// //                     rowsPerPageOptions={[10, 25, 100]}
// //                     component="div"
// //                     count={rows.length}
// //                     rowsPerPage={rowsPerPage}
// //                     page={page}
// //                     onPageChange={handleChangePage}
// //                     onRowsPerPageChange={handleChangeRowsPerPage}
// //                 />
// //                 <Button
// //                     variant="contained"
// //                     color="secondary"
// //                     onClick={() => handleSend(selectedFiles)}
// //                     style={{ margin: '16px' }}
// //                 >
// //                     Bulk Send
// //                 </Button>
// //             </Paper>
// //         </div>
// //     );
// // }

// // KyroCompletedTable.propTypes = {
// //     columns: PropTypes.arrayOf(
// //         PropTypes.shape({
// //             id: PropTypes.string.isRequired,
// //             label: PropTypes.string.isRequired,
// //             minWidth: PropTypes.number.isRequired,
// //             align: PropTypes.string,
// //         })
// //     ).isRequired,
// //     rows: PropTypes.array,
// //     page: PropTypes.number.isRequired,
// //     rowsPerPage: PropTypes.number.isRequired,
// //     handleChangePage: PropTypes.func.isRequired,
// //     handleChangeRowsPerPage: PropTypes.func.isRequired,
// //     handleSend: PropTypes.func,
// //     projectName: PropTypes.string.isRequired,
// //     selectedFiles: PropTypes.array.isRequired,
// //     handleSelectAllClick: PropTypes.func.isRequired,
// //     handleSelectClick: PropTypes.func.isRequired,
// // };

// // KyroCompletedTable.defaultProps = {
// //     rows: [],
// //     handleSend: null,
// // };

// // export default KyroCompletedTable;




// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import TableCell from "@mui/material/TableCell";
// import TableRow from "@mui/material/TableRow";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableBody from "@mui/material/TableBody";
// import TablePagination from "@mui/material/TablePagination";
// import Checkbox from "@mui/material/Checkbox";
// import Button from "@mui/material/Button";
// import Paper from "@mui/material/Paper";
// import MuiTable from "@mui/material/Table";
// import { useNavigate } from 'react-router-dom';
// import { TextField, MenuItem } from '@mui/material';
// import { fetchUserNameById } from "../../utils/firestoreUtil";

// const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return !isNaN(date.getTime()) ? date.toLocaleDateString() : 'Invalid Date';
// };

// function KyroCompletedTable({
//     columns,
//     rows = [],
//     page,
//     rowsPerPage,
//     handleChangePage,
//     handleChangeRowsPerPage,
//     selectedRows,
//     setSelectedRows,
//     handleSendSelected,
//     projectName,

// }) {
//     const navigate = useNavigate();
//     const [userNames, setUserNames] = useState({});
//     const [assignedToFilter, setAssignedToFilter] = useState('');
//     const [assignedToNames, setAssignedToNames] = useState([]);

//     useEffect(() => {
//         const fetchUserNames = async () => {
//             const userIds = [...new Set(rows.map(row => row.kyro_assignedTo))];
//             setAssignedToNames(userIds)
//             // console.log("userIds", userIds)
//             setUserNames(userIds);
//         }
//         fetchUserNames();
//     }, [rows])

 

//     const handleEditClick = (projectId, documentId) => {
//         navigate(`/editor/${projectId}/${documentId}`);
//     };

//     const handleCheckboxClick = (event, id) => {
//         if (event.target.checked) {
//             setSelectedRows([...selectedRows, id]);
//         } else {
//             setSelectedRows(selectedRows.filter(rowId => rowId !== id));
//         }
//     };

//     const handleFilterChange = (event) => {
//         setAssignedToFilter(event.target.value);
//     };

//     return (
//         <div>
//             <h2 style={{ textAlign: "center", padding: "16px", fontWeight: "bold", fontSize: "24px" }}>
//                 {projectName}
//             </h2>
//             <div className="flex justify-between items-center mb-4 px-4">
//                 <TextField
//                     select
//                     label="Filter by Assigned To"
//                     value={assignedToFilter}
//                     onChange={handleFilterChange}
//                     variant="outlined"
//                     size="small"
//                     className="w-1/4"
//                 >
//                     <MenuItem value="">
//                         <em>None</em>
//                     </MenuItem>
//                     {assignedToNames.map((name) => (
//                         <MenuItem key={name} value={name}>
//                             {name}
//                         </MenuItem>
//                     ))}
//                 </TextField>
//                 <Button
//                     variant="contained"
//                     color="secondary"
//                     onClick={handleSendSelected}
//                     disabled={selectedRows.length === 0}
//                 >
//                     Send Selected
//                 </Button>
//             </div>
//             <Paper sx={{ width: "100%", overflow: "hidden" }}>
//                 <TableContainer sx={{ maxHeight: 700 }}>
//                     <MuiTable stickyHeader aria-label="sticky table">
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell padding="checkbox">
//                                     <Checkbox
//                                         indeterminate={selectedRows.length > 0 && selectedRows.length < rows.length}
//                                         checked={rows.length > 0 && selectedRows.length === rows.length}
//                                         onChange={(event) => {
//                                             if (event.target.checked) {
//                                                 setSelectedRows(rows.map((row) => row.id));
//                                             } else {
//                                                 setSelectedRows([]);
//                                             }
//                                         }}
//                                     />
//                                 </TableCell>
//                                 {columns.map((column) => (
//                                     <TableCell
//                                         key={column.id}
//                                         align={column.align || "left"}
//                                         style={{ minWidth: column.minWidth }}
//                                     >
//                                         {column.label}
//                                     </TableCell>
//                                 ))}
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {rows
//                                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                                 .map((row) => (
//                                     <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
//                                         <TableCell padding="checkbox">
//                                             <Checkbox
//                                                 checked={selectedRows.includes(row.id)}
//                                                 onChange={(event) => handleCheckboxClick(event, row.id)}
//                                             />
//                                         </TableCell>
//                                         {columns.map((column) => {
//                                             const value = row[column.id];
//                                             return (
//                                                 <TableCell
//                                                     key={column.id}
//                                                     align={column.align || "left"}
//                                                 >
//                                                     {column.id === "kyro_assignedTo" ? (
//                                                         userNames[value] || value
//                                                     ) : column.id === "edit" ? (
//                                                         <div className="flex gap-5">
//                                                             <Button
//                                                                 variant="contained"
//                                                                 color="primary"
//                                                                 onClick={() => handleEditClick(row.projectId, row.id)}
//                                                             >
//                                                                 Edit
//                                                             </Button>
//                                                         </div>
//                                                     ) : column.id.endsWith('Date') && value ? (
//                                                         formatDate(value)
//                                                     ) : (
//                                                         value
//                                                     )}
//                                                 </TableCell>
//                                             );
//                                         })}
//                                     </TableRow>
//                                 ))}
//                         </TableBody>
//                     </MuiTable>
//                 </TableContainer>
//                 <TablePagination
//                     rowsPerPageOptions={[10, 25, 100]}
//                     component="div"
//                     count={rows.length}
//                     rowsPerPage={rowsPerPage}
//                     page={page}
//                     onPageChange={handleChangePage}
//                     onRowsPerPageChange={handleChangeRowsPerPage}
//                 />
//             </Paper>
//         </div>
//     );
// }

// KyroCompletedTable.propTypes = {
//     columns: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.string.isRequired,
//             label: PropTypes.string.isRequired,
//             minWidth: PropTypes.number.isRequired,
//             align: PropTypes.string,
//         })
//     ).isRequired,
//     rows: PropTypes.array,
//     page: PropTypes.number.isRequired,
//     rowsPerPage: PropTypes.number.isRequired,
//     handleChangePage: PropTypes.func.isRequired,
//     handleChangeRowsPerPage: PropTypes.func.isRequired,
//     selectedRows: PropTypes.array.isRequired,
//     setSelectedRows: PropTypes.func.isRequired,
//     handleSendSelected: PropTypes.func.isRequired,
//     projectName: PropTypes.string.isRequired,
  
// };

// KyroCompletedTable.defaultProps = {
//     rows: [],
// };

// export default KyroCompletedTable;



import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import MuiTable from "@mui/material/Table";
import { useNavigate } from 'react-router-dom';
import { TextField, MenuItem } from '@mui/material';
import { fetchUserNameById } from "../../utils/firestoreUtil";

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return !isNaN(date.getTime()) ? date.toLocaleDateString() : 'Invalid Date';
};

function KyroCompletedTable({
    columns,
    rows = [],
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    selectedRows,
    setSelectedRows,
    handleSendSelected,
    projectName,
}) {
    const navigate = useNavigate();
    const [userNames, setUserNames] = useState({});
    const [assignedToFilter, setAssignedToFilter] = useState('');
    const [assignedToNames, setAssignedToNames] = useState([]);

    useEffect(() => {
        const fetchUserNames = async () => {
            const userIds = [...new Set(rows.map(row => row.kyro_assignedTo))];
            const names = await Promise.all(userIds.map(async (userId) => {
                const userName = await fetchUserNameById(userId);
                return { userId, userName: userName || userId };
            }));

            const userNameMap = names.reduce((acc, { userId, userName }) => {
                acc[userId] = userName;
                return acc;
            }, {});
            setUserNames(userNameMap);
            setAssignedToNames(names.filter(({ userName }) => userName).map(({ userName }) => userName));
        };

        fetchUserNames();
    }, [rows]);

    const handleEditClick = (projectId, documentId) => {
        navigate(`/editor/${projectId}/${documentId}`);
    };

    const handleCheckboxClick = (event, id) => {
        if (event.target.checked) {
            setSelectedRows([...selectedRows, id]);
        } else {
            setSelectedRows(selectedRows.filter(rowId => rowId !== id));
        }
    };

    const handleFilterChange = (event) => {
        setAssignedToFilter(event.target.value);
    };

    const filteredRows = assignedToFilter
        ? rows.filter(row => userNames[row.kyro_assignedTo] === assignedToFilter)
        : rows;

    return (
        <div>
            <h2 style={{ textAlign: "center", padding: "16px", fontWeight: "bold", fontSize: "24px" }}>
                {projectName}
            </h2>
            <div className="flex justify-between items-center mb-4 px-4">
                <TextField
                    select
                    label="Filter by Assigned To"
                    value={assignedToFilter}
                    onChange={handleFilterChange}
                    variant="outlined"
                    size="small"
                    className="w-1/4"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {assignedToNames.map((name) => (
                        <MenuItem key={name} value={name}>
                            {name}
                        </MenuItem>
                    ))}
                </TextField>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSendSelected}
                    disabled={selectedRows.length === 0}
                >
                    Send Selected
                </Button>
            </div>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 700 }}>
                    <MuiTable stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        indeterminate={selectedRows.length > 0 && selectedRows.length < filteredRows.length}
                                        checked={filteredRows.length > 0 && selectedRows.length === filteredRows.length}
                                        onChange={(event) => {
                                            if (event.target.checked) {
                                                setSelectedRows(filteredRows.map((row) => row.id));
                                            } else {
                                                setSelectedRows([]);
                                            }
                                        }}
                                    />
                                </TableCell>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align || "left"}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={selectedRows.includes(row.id)}
                                                onChange={(event) => handleCheckboxClick(event, row.id)}
                                            />
                                        </TableCell>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align || "left"}
                                                >
                                                    {column.id === "kyro_assignedTo" ? (
                                                        userNames[value] || value
                                                    ) : column.id === "edit" ? (
                                                        <div className="flex gap-5">
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                onClick={() => handleEditClick(row.projectId, row.id)}
                                                            >
                                                                Edit
                                                            </Button>
                                                        </div>
                                                    ) : column.id.endsWith('Date') && value ? (
                                                        formatDate(value)
                                                    ) : (
                                                        value
                                                    )}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                        </TableBody>
                    </MuiTable>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={filteredRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}

KyroCompletedTable.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            minWidth: PropTypes.number.isRequired,
            align: PropTypes.string,
        })
    ).isRequired,
    rows: PropTypes.array,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    handleChangePage: PropTypes.func.isRequired,
    handleChangeRowsPerPage: PropTypes.func.isRequired,
    selectedRows: PropTypes.array.isRequired,
    setSelectedRows: PropTypes.func.isRequired,
    handleSendSelected: PropTypes.func.isRequired,
    projectName: PropTypes.string.isRequired,
};

KyroCompletedTable.defaultProps = {
    rows: [],
};

export default KyroCompletedTable;
