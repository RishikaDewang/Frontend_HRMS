import React from 'react'
import MainCard from 'ui-component/cards/MainCard'
import CollapsibleTable from 'ui-component/grid'
import { Input, } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { DatePicker } from 'antd';
import moment from 'moment';
import { fetchEmployeeAttendance, importAttendance } from 'redux/action/actions'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack'
import { useNavigate } from 'react-router';
import "./style.css"
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Employeattendance() {
  const [page, setPage] = useState(1); // Current page state
  const rowsPerPage = 10; // Number of rows to display per page
  const [selectedDates, setSelectedDates] = useState([]);
  const [isManualDateChange, setIsManualDateChange] = useState(false);
  const dispatch = useDispatch()
  const navigate =  useNavigate()
  const employeAttendace = useSelector((state) => state.fetchEmpAttendanceReducer.empattendance)

  
  console.log(employeAttendace)
  useEffect(() => {
    const startDate = moment().startOf('month').format('YYYY-MM-DD');
    const endDate = moment().format('YYYY-MM-DD');
    if (!isManualDateChange) {
    dispatch(fetchEmployeeAttendance(startDate,endDate ))
    }
  }, [dispatch])
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = employeAttendace ? employeAttendace.slice(startIndex, endIndex) : [];

  const columns = [
    { id: 'id', label: 'Employee Name' },
    { id: 'name', label: ' Paid Time/Work Schedule' },
    { id: 'calories', label: 'Overtime' },
   

  ];
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Check if the selected file is of type XLSX
      if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        // Process the file, e.g., upload it or perform other actions
        const formData = new FormData();
        formData.append('file', file);
        dispatch(importAttendance(formData))
        console.log('File uploaded:', file);
      } else {
        // Display an error message for invalid file type
        toast.error("Invalid file type. Please select a valid XLSX file.");
        console.error('Invalid file type. Please select a valid XLSX file.');
      }
    }
  };
  const handleDownloadExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Employee Data');

    // Your logic to add data to the worksheet
    worksheet.addRow(['Employee Name', 'Job Title', 'Line Manager', 'Office']);
    // Add your employee data here

    // Create a Blob from the workbook
    const blob = await workbook.xlsx.writeBuffer();

    // Create a link element and trigger a download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
    link.download = 'employee_data.xlsx';

    // Append the link to the body and trigger a click
    document.body.appendChild(link);
    link.click();

    // Remove the link from the body
    document.body.removeChild(link);
  };
  const handleDateChange = (dates) => {
    setSelectedDates(dates);

    console.log('manully call', dates);
    if (dates && dates[0] && dates[1]) {
      setIsManualDateChange(true);
      console.log('dates && dates[0] && dates[1]', dates, dates[0], dates[1]);
      const startDate = dates[0].format('YYYY-MM-DD');
      const endDate = dates[1].format('YYYY-MM-DD');
      console.log('start dtae and end date ', startDate, endDate);
      dispatch(fetchEmployeeAttendance(startDate,endDate ))
     

    }
  };

  function handleSaveClick(row) {
    console.log("row", row)
    navigate(`/attendance/my-attendance?id=${row.employeeId}`, { state: { row } })
  }
  return (
    <MainCard title='Employee Attendance'>
      <div className='button-empattdance' >
        <Input
          accept=".xlsx"
          id="file-input"
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />  <ToastContainer />
       </div>
          <div style={{ display: 'flex', flexDirection: "row-reverse" }}>
          <div style={{ marginRight: '10px' }}>
            <button

              style={{
                fontSize: '13px',
                // Change the color to your preferred link color
                cursor: 'pointer',
                border: 'none',
                background: 'none',
                textDecoration: 'underline',
                padding: 0,
                margin: 0,
              }}
              onClick={handleDownloadExcel}
            >
              
            </button></div></div>
            <div style={{ marginTop: '8px' }}>
        <DatePicker.RangePicker
          style={{ zIndex: 999 }}
          getPopupContainer={(trigger) => trigger.parentNode}
          placement="bottomLeft"
          value={selectedDates}
          onChange={handleDateChange}
        />
      </div>
      <CollapsibleTable data={paginatedData} columns={columns} Empattendance={true} handleSaveClick={handleSaveClick}/>
      <div className="pagination-container">
        <Stack spacing={2}>
          <Pagination count={Math.ceil((employeAttendace?.length || 0) / rowsPerPage)} page={page} onChange={handleChangePage} color="secondary" />
        </Stack>
      </div>
    </MainCard>
  )
}
