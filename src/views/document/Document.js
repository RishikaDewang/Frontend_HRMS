// Document.js
import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import CollapsibleTable from 'ui-component/grid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDocuments , createDocument,deletefolder } from 'redux/action/actions'; // Assuming you have a createFolder action
import { useEffect } from 'react';
import BasicButtons from 'ui-component/button';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField,Box } from '@mui/material';
import { useNavigate } from 'react-router';
import "./style.css"
import DeleteConfirmationDialog from 'ui-component/calendar';
export default function Document() {
  const columns = [
    { id: 'id', label: 'Name' },
    { id: 'name', label: 'Created By' },
    { id: 'calories', label: 'Created Date' },
    { id: 'type', label: 'Description' },
    { id: 'numberOfFiles', label: 'Number Of Files' },
    { id: 'number', label: '' },
  ];
  const dispatch = useDispatch();
  const navigate =  useNavigate()
  const document = useSelector((state) => state.fetchDocumentsReducer.document);
  console.log('document', document);

  const [isModalOpen, setModalOpen] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [folderDescription, setFolderDescription] = useState('');
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [titleError, setTitleError] = useState('');
  const handleOpenDeleteDialog = (id) => {
    setDeleteItemId(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteItemId(null);
    setDeleteDialogOpen(false);
  };

  const handleDelete = () => {
    // Perform the delete logic here, for example dispatching the deleteDocument action
    dispatch(deletefolder(deleteItemId));
    handleCloseDeleteDialog();
  };
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setFolderName(''); // Reset folderName when closing modal
    setFolderDescription(''); // Reset folderDescription when closing modal
  };

  const handleCreateFolder = () => {

    if (!folderName) {
      setTitleError('Folder Name is required');
      return; // Exit the function if title is not provided
    }
    const folderData = {
      name: folderName,
      description: folderDescription,
    };
    dispatch(createDocument(folderData));
    handleCloseModal();
  };

  useEffect(() => {
    dispatch(fetchDocuments());
  }, []);
  function handleSaveClick  (id) {
    console.log("id" , id)
    navigate("/documents/documentsdetails",{state:id});
  }
  return (
    <>
      <MainCard title="Documents">
      <Box className="flex-document-Container">
        <BasicButtons name="New Folder" handleSaveClick={handleOpenModal} />
        </Box>
        <CollapsibleTable data={document} columns={columns} document={true} handleSaveClick={handleSaveClick} openDeleteModal={handleOpenDeleteDialog}/>
      </MainCard>

      {/* New Folder Modal */}
      <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle variant="h4">Create New Folder</DialogTitle>
        <DialogContent>
          <TextField
            label="Folder Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            error={Boolean(titleError)}
            helperText={titleError}
          />
          <TextField
            label="Folder Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={folderDescription}
            onChange={(e) => setFolderDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateFolder} variant="contained" color="primary">
            Create Folder
          </Button>
          <Button onClick={handleCloseModal} variant="outlined" color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <DeleteConfirmationDialog
                open={isDeleteDialogOpen}
                onClose={handleCloseDeleteDialog}
                onConfirm={handleDelete}
                title="Delete Folder"
                content="Are you sure you want to delete this Folder?"
            />
    </>
  );
}
