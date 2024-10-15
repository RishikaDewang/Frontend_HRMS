import React, { useEffect, useRef , useState} from 'react'
import MainCard from 'ui-component/cards/MainCard'
import BasicButtons from 'ui-component/button'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router';
import { fetchDocumentsDetails, fetchDocumentsData, uploadFilesRequest,deletefolderfiles } from 'redux/action/actions'
import CollapsibleTable from 'ui-component/grid';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button ,Box} from '@mui/material';
// import { Document, Page } from 'react-pdf';
import ReactPlayer from 'react-player';
import DeleteConfirmationDialog from 'ui-component/calendar';
export default function Documentdetails() {
    const columns = [
        { id: 'id', label: 'Name' },
        { id: 'name', label: 'Size' },
        { id: 'name', label: '' },

    ];
    const [isModalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch()
    const location = useLocation();
    const documentdetail = useSelector((state) => state.fetchDocumentDetailReducer.documentdetail)
    const documentdata = useSelector((state) => state.fetchDocumentDataReducer.documentdata)
    const id = location.state;
    console.log("id", id)
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
  
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
      dispatch(deletefolderfiles(deleteItemId));
      handleCloseDeleteDialog();
    };
    useEffect(() => {
        dispatch(fetchDocumentsDetails(id))


    }, [id])
    function handleSaveClick(name) {
        dispatch(fetchDocumentsData(name))
        setModalOpen(true);
    }
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
     
        const formData = new FormData();
        formData.append('file', file);
        formData.append('ModuleId', id);
        for (var pair of formData.entries()) {
          console.log(pair[0] + ', ' + pair[1]);
        }

        dispatch(uploadFilesRequest(id, formData));
        
        // You may want to dispatch additional actions or handle the file upload logic
      }
      
    };
    const handleCloseModal = () => {
        setModalOpen(false);
      };
    
    const handleUploadButtonClick = () => {
      // Trigger the file input click when the "Upload" button is clicked
      fileInputRef.current.click();
    };
    const getDocumentType = (url) => {
      const extension = url.split('.').pop().toLowerCase();
      switch (extension) {
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'gif':
          return 'image';
        case 'pdf':
          return 'pdf';
        case 'ppt':
        case 'pptx':
          return 'ppt';
        default:
          return 'unknown';
      }
    };
    
      const documentType = documentdata ? getDocumentType(documentdata.absoluteUrl) : 'unknown';
    return (
        <>
        <MainCard>
        <Box className="flex-document-Container">
            <BasicButtons name='Upload' handleSaveClick={handleUploadButtonClick} />
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            </Box>
            <CollapsibleTable data={documentdetail} columns={columns} documentdetail={true} handleSaveClick={handleSaveClick}  openDeleteModal={handleOpenDeleteDialog}/>
            
        </MainCard>
          <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="md" fullWidth>
          <DialogTitle>Document Viewer</DialogTitle>
          <DialogContent>
            {/* Display your document or image here */}
            {documentType === 'image' && (
            <img src={documentdata.absoluteUrl} alt="askdjf" style={{ maxWidth: '100%', height: 'auto' }} />
          )}

          {documentType === 'pdf' && (
            // <iframe src={documentdata.absoluteUrl}  title="CV" width="100%" height="100%">
     
            // </iframe>
            <object data={documentdata.absoluteUrl} width="100%" height="400px" aria-label="PDF Viewer" ></object>
          )}

          {documentType === 'ppt' && (
            <ReactPlayer url={documentdata.absoluteUrl} controls />
          )}

          {documentType === 'unknown' && (
            <p>Unsupported document type</p>
          )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} variant="outlined" color="secondary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      <DeleteConfirmationDialog
                open={isDeleteDialogOpen}
                onClose={handleCloseDeleteDialog}
                onConfirm={handleDelete}
                title="Delete Document"
                content="Are you sure you want to delete this document?"
            />
        </>
    )
}
