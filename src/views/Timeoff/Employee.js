import React from 'react'
import MainCard from 'ui-component/cards/MainCard'
import CollapsibleTable from 'ui-component/grid';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect ,  useState} from 'react';
import { fetchAllEmployeestimeoff , updateStatus} from 'redux/action/actions';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

export default function Employee() {

    const columns = [
        { id: 'id', label: 'Name' },
        { id: 'name', label: 'From' },
        { id: 'calories', label: 'To' },
        { id: 'type', label: 'Type' },
        { id: 'status', label: 'Status' },
        { id: 'statu', label: '' },
    ];
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const dispatch = useDispatch()
    const employeestimeoff = useSelector((state) => state.fetchAllEmployeetimeoffReducer.data)
    console.log(employeestimeoff)
    useEffect(() => {
        dispatch(fetchAllEmployeestimeoff())

    }, [dispatch])

    const handleApprove = () => {
        // Dispatch the action to approve the time-off request
        dispatch(updateStatus(selectedRequest,2));
        setOpenDialog(false);
    };

    const handleReject = () => {
        // Dispatch the action to reject the time-off request
        dispatch(updateStatus(selectedRequest,3));
        setOpenDialog(false);
    };

    const handleOpenDialog = (request) => {
        console.log(request )
        setSelectedRequest(request);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    return (
        <MainCard title="Employees Requests">
            <CollapsibleTable data={employeestimeoff} columns={columns} employeetimeoff={true} handleSaveClick={handleOpenDialog}/>
            {/* Dialog for Approving/Rejecting Requests */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Approve/Reject Request</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">Do you want to approve or reject this request?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleApprove} variant="contained" color="primary">
                        Approve
                    </Button>
                    <Button onClick={handleReject} variant="contained" color="secondary">
                        Reject
                    </Button>
                    <Button onClick={handleCloseDialog} variant="outlined" color="inherit">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </MainCard>
    )
}
