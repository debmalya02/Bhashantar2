// // //status notation
// // //0-->client End for delete //1-->Ml 
// // //(KyroticsSide) 2-->Ready-for-work//3-->Assigned to User//4-->completed
// // //(ClientSide)4-->Ready-for-work//5-->Assigned to User//6-->completed //7-->Downloaded

import { db, storage } from './firebase';
import { PDFDocument } from 'pdf-lib';
import {
  collection, addDoc, getDocs, getDoc, doc, updateDoc, serverTimestamp, query, where, deleteDoc
} from 'firebase/firestore';
import {
  ref, uploadBytes, getDownloadURL, deleteObject
} from 'firebase/storage';

import JSZip from 'jszip';
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";


// --- File Operations ---

export const uploadFile = async (projectId, file) => {
  try {
    // Upload the PDF file to Firebase Storage
    const pdfStorageRef = ref(storage, `projects/${projectId}/${file.name}`);
    const pdfSnapshot = await uploadBytes(pdfStorageRef, file);
    const pdfDownloadURL = await getDownloadURL(pdfSnapshot.ref);

    // Convert PDF file to ArrayBuffer to read the number of pages
    const arrayBuffer = await file.arrayBuffer();
    // console.log('ArrayBuffer length:', arrayBuffer.byteLength); // Log the ArrayBuffer length

    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pageCount = pdfDoc.getPageCount();
    console.log('Page count:', pageCount); // Log the page count

    const htmlFileName = file.name.replace('.pdf', '.html');
    const htmlBlob = new Blob([''], { type: 'text/html' });

    // Upload the HTML file to Firebase Storage
    const htmlStorageRef = ref(storage, `projects/${projectId}/${htmlFileName}`);
    const htmlSnapshot = await uploadBytes(htmlStorageRef, htmlBlob);
    const htmlDownloadURL = await getDownloadURL(htmlSnapshot.ref);

    // Add file metadata to Firestore
    const fileRef = await addDoc(collection(db, 'projects', projectId, 'files'), {
      name: file.name,
      pdfUrl: pdfDownloadURL,
      htmlUrl: htmlDownloadURL,
      uploadedDate: new Date().toISOString(),
      status: 0,
      projectId: projectId,
      pageCount: pageCount, // Store the number of pages
    });

    return {
      id: fileRef.id,
      name: file.name,
      pdfUrl: pdfDownloadURL,
      htmlUrl: htmlDownloadURL,
      uploadedDate: new Date().toISOString(),
      status: 0,
      pageCount: pageCount, // Include the number of pages in the return object
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Error uploading file');
  }
};


// Delete a file from a specific project
export const deleteFile = async (projectId, fileId, fileName) => {
  try {
    const pdfStorageRef = ref(storage, `projects/${projectId}/${fileName}`);
    await deleteObject(pdfStorageRef);

    const htmlFileName = fileName.replace('.pdf', '.html');
    const htmlStorageRef = ref(storage, `projects/${projectId}/${htmlFileName}`);
    await deleteObject(htmlStorageRef);

    const fileRef = doc(db, 'projects', projectId, 'files', fileId);
    await deleteDoc(fileRef);

    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw new Error('Error deleting file');
  }
};



export const exportFiles = async (projectId, fileId, fileName, format) => {
  try {
    // Get the PDF and HTML URLs
    const pdfUrl = await getDownloadURL(ref(storage, `projects/${projectId}/${fileName}`));
    const htmlFileName = fileName.replace('.pdf', '.html');
    const htmlUrl = await getDownloadURL(ref(storage, `projects/${projectId}/${htmlFileName}`));

    const newFileName = fileName.replace('.pdf', `.${format}`);
    console.log("New File", newFileName);

    // Fetch the files
    const pdfBlob = await fetch(pdfUrl).then(res => res.blob());
    const htmlBlob = await fetch(htmlUrl).then(res => res.text());

    // Log the HTML content for debugging
    console.log("HTML Content:", htmlBlob);

    let convertedBlob;
    if (format === 'doc') {
      try {
        // Convert HTML to DOCX using Docxtemplater
        const zip = new PizZip();
        const doc = new Docxtemplater(zip);
        const htmlContent = `
          <html>
            <head>
              <meta charset="utf-8">
            </head>
            <body>
              ${htmlBlob}
            </body>
          </html>
        `;
        console.log("HTML Content to DOCX:", htmlContent);
        doc.loadZip(zip);
        doc.setData({ html: htmlContent });
        doc.render();
        const out = doc.getZip().generate({ type: "blob" });
        convertedBlob = new Blob([out], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      } catch (docError) {
        console.error('Error converting HTML to DOCX:', docError);
        throw new Error('Error converting HTML to DOCX');
      }
    } else if (format === 'pdf') {
      convertedBlob = new Blob([htmlBlob], { type: 'application/pdf' });
    }

    // Create a zip file
    const zip = new JSZip();
    zip.file(`${fileName}`, pdfBlob);
    zip.file(`${newFileName}`, convertedBlob);

    const zipBlob = await zip.generateAsync({ type: 'blob' });

    // Create a download link
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

  } catch (error) {
    console.error('Error exporting files:', error);
    throw new Error('Error exporting files');
  }
};

// Fetch files for a specific project
export const fetchProjectFiles = async (projectId) => {
  try {
    const filesCollection = collection(db, 'projects', projectId, 'files');
    const filesSnapshot = await getDocs(filesCollection);

    const files = filesSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        pdfUrl: data.pdfUrl,
        htmlUrl: data.htmlUrl,
        pageCount: data.pageCount,
        projectId: projectId,
        status: data.status,

        uploadedDate: data.uploadedDate ? data.uploadedDate : null,
        kyro_assignedDate: data.kyro_assignedDate ? data.kyro_assignedDate : null,
        kyro_completedDate: data.kyro_completedDate ? data.kyro_completedDate : null,

        // client_uploadedDate: data.client_uploadedDate ? data.client_uploadedDate : null,
        client_assignedDate: data.client_assignedDate ? data.client_assignedDate : null,
        client_completedDate: data.client_completedDate ? data.client_completedDate : null,

        client_downloadedDate: data.client_downloadedDate ? data.client_downloadedDate : null,

        kyro_assignedTo: data.kyro_assignedTo || null,
        client_assignedTo: data.client_assignedTo || null

      };
    });

    return files;
  } catch (error) {
    console.error('Error fetching project files:', error);
    throw new Error('Error fetching project files');
  }
};

// Fetch document URLs for a specific file
export const fetchDocumentUrl = async (projectId, fileId) => {
  try {
    const fileDocRef = doc(db, 'projects', projectId, 'files', fileId);
    const fileDoc = await getDoc(fileDocRef);

    if (fileDoc.exists()) {
      const data = fileDoc.data();
      return {
        pdfUrl: data.pdfUrl,
        htmlUrl: data.htmlUrl,
      };
    } else {
      throw new Error('File does not exist');
    }
  } catch (error) {
    console.error('Error fetching document URLs:', error);
    throw new Error('Error fetching document URLs');
  }
};

// Update the status of a specific file
// export const updateFileStatus = async (projectId, fileId, status, userId) => {
//   try {
//     const fileRef = doc(db, 'projects', projectId, 'files', fileId);
//     await updateDoc(fileRef, { status, cl_assignedTo: userId });
//   } catch (error) {
//     console.error('Error updating file status:', error);
//     throw new Error('Error updating file status:', error);
//   }
// };


// export const updateKyroFileStatus = async (projectId, fileId, status, userId) => {
//   try {
//     const fileRef = doc(db, 'projects', projectId, 'files', fileId);
//     await updateDoc(fileRef, { status, ky_assignedTo: userId });
//   } catch (error) {
//     console.error('Error updating file status:', error);
//     throw new Error('Error updating file status:', error);
//   }
// };


export const updateFileStatus = async (projectId, fileId, updates) => {
  try {
    const fileRef = doc(db, 'projects', projectId, 'files', fileId);
    await updateDoc(fileRef, updates);
  } catch (error) {
    console.error('Error updating file status:', error);
    throw new Error('Error updating file status:', error);
  }
};

export const updateFileStatusNumber = async (projectId, fileId, status) => {
  try {
    const fileRef = doc(db, 'projects', projectId, 'files', fileId);
    await updateDoc(fileRef, { status });
  } catch (error) {
    console.error('Error updating file status:', error);
    throw new Error('Error updating file status:', error);
  }
};

// Fetch files by status for a specific project
export const fetchFilesByStatus = async (status, projectId) => {
  try {
    const q = query(collection(db, 'projects', projectId, 'files'), where('status', '==', status));
    const querySnapshot = await getDocs(q);
    const files = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return files;
  } catch (error) {
    console.error(`Error fetching files by status ${status} for project ${projectId}:`, error);
    throw new Error(`Error fetching files by status ${status} for project ${projectId}`);
  }
};

// Update the content of a specific document
export const updateDocumentContent = async (projectId, fileId, blob) => {
  try {
    const fileDocRef = doc(db, 'projects', projectId, 'files', fileId);
    const fileDoc = await getDoc(fileDocRef);
    const fileData = fileDoc.data();
    const htmlFileName = fileData.name.replace('.pdf', '.html');

    const htmlStorageRef = ref(storage, `projects/${projectId}/${htmlFileName}`);
    await uploadBytes(htmlStorageRef, blob);
    const htmlDownloadURL = await getDownloadURL(htmlStorageRef);

    await updateDoc(doc(db, 'projects', projectId, 'files', fileId), {
      htmlUrl: htmlDownloadURL
    });
  } catch (error) {
    console.error('Error updating document content:', error);
    throw new Error('Error updating document content');
  }
};

// --- Project Operations ---

// Fetch all projects
export const fetchAllProjects = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'projects'));
    const projects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw new Error('Error fetching projects');
  }
};

// Fetch all projects for a specific company
export const fetchCompanyProjects = async (companyId) => {
  try {
    const projectsQuery = query(collection(db, 'projects'), where('companyId', '==', companyId));
    const projectsSnapshot = await getDocs(projectsQuery);
    const projects = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw new Error('Error fetching projects');
  }
};

// Fetch all projects
export const fetchProjects = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'projects'));
    const projects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error); // Detailed logging
    throw new Error('Error fetching projects');
  }
};

// Fetch projects for multiple companies
export const fetchProjectsForCompanies = async (companyIds) => {
  try {
    const allProjects = await Promise.all(
      companyIds.map(async (companyId) => {
        const companyProjects = await fetchCompanyProjects(companyId);
        return companyProjects;
      })
    );
    return allProjects.flat();
  } catch (error) {
    console.error('Error fetching projects for companies:', error);
    throw new Error('Error fetching projects for companies');
  }
};

// Fetch the name of a specific project
export const fetchProjectName = async (projectId) => {
  try {
    const projectDocRef = doc(db, 'projects', projectId);
    const projectDoc = await getDoc(projectDocRef);
    if (projectDoc.exists()) {
      return projectDoc.data().name;
    } else {
      throw new Error('Project does not exist');
    }
  } catch (error) {
    console.error('Error fetching project name:', error);
    throw new Error('Error fetching project name');
  }
};

// --- Company Operations ---

// Fetch all companies
export const fetchAllCompanies = async () => {
  try {
    const companiesSnapshot = await getDocs(collection(db, 'companies'));
    const companies = companiesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return companies;
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw new Error('Error fetching companies');
  }
};

// --- User Operations ---


// Fetch the user's name by their ID
export const fetchUserNameById = async (userId) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      return userDoc.data().name;
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error fetching user name:', error);
    throw error;
  }
};

// Fetch all users
export const fetchUsers = async () => {
  try {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const users = usersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Error fetching users');
  }
}