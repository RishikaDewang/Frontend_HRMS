import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
// import CollapsibleTable from 'ui-component/grid'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchMyAttendance, filterattendance, fetchAttendanceSummary } from 'redux/action/actions';
import BasicButtons from 'ui-component/button';
import { useState } from 'react';
import { clockInRequest, clockOutRequest } from 'redux/action/actions';
import Calculation from 'ui-component/section/index';
import './style.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { DatePicker } from 'antd';
import moment from 'moment';
import { useLocation } from 'react-router';
import CollapsibleTable from 'ui-component/tab';
export default function Myattendance() {
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.state?.row.employeeId;
  const employename = location.state?.row.employeeName
  console.log("employeid", id,employename)
  const employeeid = useSelector((state) => state.userReducer.id);
  // const myattendance = useSelector((state) => state.fetchMyAttendanceReducer.myattendance);
  const attsummary = useSelector((state) => state.fetchAttendanceSummaryReducer.calculation);
  const filterattendace = useSelector((state) => state.filterattendace.filterattendance);
  let buttonstate = useSelector((state) => state.filterattendace.isClockIn?.type);
  const firstSessionData = useSelector((state) => state.filterattendace.firstSessionData);
  const attnLastDate = useSelector((state) => state.filterattendace.isClockIn)
  const officeid = useSelector((state) => state.userReducer.officeid);
  console.log("officeid",officeid)
  const storedClockedIn = localStorage.getItem('clockedIn');
  const [clockedIn, setClockedIn] = useState(storedClockedIn === 'true');
  const [page, setPage] = useState(1); // Current page state
  const rowsPerPage = 10; // Number of rows to display per page
  const [selectedDates, setSelectedDates] = useState([]);
  const [isManualDateChange, setIsManualDateChange] = useState(false);
  useEffect(() => {
    // Get current month's start and end dates
    const startDate = moment().startOf('month').format('YYYY-MM-DD');
    const endDate = moment().format('YYYY-MM-DD');
    console.log('enddate', endDate);
    if (!isManualDateChange) {
      dispatch(filterattendance(id||employeeid, startDate, endDate));
      dispatch(fetchAttendanceSummary(id||employeeid, startDate, endDate));
    }
    // Dispatch API call with default dates
    // dispatch(filterattendance(employeeid, startDate, endDate));
  }, [employeeid, isManualDateChange,clockedIn]);

  const handleDateChange = (dates) => {
    setSelectedDates(dates);

    console.log('manully call', dates);
    if (dates && dates[0] && dates[1]) {
      setIsManualDateChange(true);
      console.log('dates && dates[0] && dates[1]', dates, dates[0], dates[1]);
      const startDate = dates[0].format('YYYY-MM-DD');
      const endDate = dates[1].format('YYYY-MM-DD');
      console.log('start dtae and end date ', startDate, endDate);

      dispatch(filterattendance(id||employeeid, startDate, endDate));
      dispatch(fetchAttendanceSummary(id||employeeid, startDate, endDate));
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    const storedClockedIn = localStorage.getItem('clockedIn');
    if (storedClockedIn) {
      setClockedIn(storedClockedIn === 'true');
    }
    dispatch(fetchMyAttendance(employeeid));
  }, [dispatch, employeeid]);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filterattendace ? filterattendace?.slice(startIndex, endIndex) : [];

// Extracting the date from paginatedData assuming it's in "YYYY-MM-DDTHH:MM:SS" format

// Check if paginatedData.date is defined and not empty
// Check if paginatedData is defined and not empty
if (paginatedData && paginatedData.length > 0) {
  // Get the date from the last entry in paginatedData
  const lastEntryDate = new Date(paginatedData[paginatedData.length - 1].date);

  // Check if lastEntryDate is a valid date
  if (!isNaN(lastEntryDate.getTime())) {
      // Getting the current date
      const currentDate = new Date();

      // Extracting the date part only (without time) for comparison from both dates
      const lastEntryDateWithoutTime = new Date(lastEntryDate.getFullYear(), lastEntryDate.getMonth(), lastEntryDate.getDate());
      console.log("Last Entry Date without Time:", lastEntryDateWithoutTime);
      const currentDateWithoutTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
      console.log("Current Date without Time:", currentDateWithoutTime);

      // Comparing the dates without time
      const isSameDate = lastEntryDateWithoutTime.getTime() === currentDateWithoutTime.getTime();

      // Setting the button state based on the comparison result
       buttonstate = isSameDate ? (buttonstate === 1 ? 1 : 0) : 0;

      // Logging the result
      console.log("Button State:", buttonstate);
  } else {
      console.error("Invalid date format in last entry date:", paginatedData[paginatedData.length - 1].date);
  }
} else {
  console.error("paginatedData is undefined or empty.");
}


const handleClockButtonClick = () => {
  const latitude = 22;
  const longitude = 75;
  let startDate, endDate;

  if (selectedDates && selectedDates.length === 2) {
    // If manual dates are selected, use them
    startDate = selectedDates[0].format('YYYY-MM-DD');
    endDate = selectedDates[1].format('YYYY-MM-DD');
  } else {
    // If no manual dates selected, use the current date
    startDate = moment().startOf('month').format('YYYY-MM-DD');
    endDate = moment().format('YYYY-MM-DD');
  }

  const requestBody = {
    latitude: latitude,
    longitude: longitude,
    fkOfficeId: officeid
  };

  if (buttonstate === 1) {
    dispatch(clockOutRequest(employeeid, requestBody, startDate, endDate));
  } else {
    dispatch(clockInRequest(employeeid, requestBody, startDate, endDate));
  }
};


  return (
    <MainCard title={!id?"My Attendance":employename}>
      <div className="emp-conatiner">
        <div className="attn-container"> <Calculation attsummary={attsummary} /></div>
       {!id && <div className="button-conatiner">
          <BasicButtons name={buttonstate === 1 ? "Clock Out" : "Clock In"} handleSaveClick={handleClockButtonClick} />
        </div>}
      </div>
      <div style={{ marginTop: '8px' }}>
        <DatePicker.RangePicker
          style={{ zIndex: 999 }}
          getPopupContainer={(trigger) => trigger.parentNode}
          placement="bottomLeft"
          value={selectedDates}
          onChange={handleDateChange}
        />
      </div>
      <CollapsibleTable data={paginatedData} attnLastDate={attnLastDate} firstSessionData={firstSessionData} />
      {/* <CollapsibleTable data={paginatedData} columns={columns} myattendance={true}  groupByDate={true}/> */}
      <div className="pagination-container">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil((filterattendace?.length || 0) / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="secondary"
          />
        </Stack>
      </div>
      {attsummary && (
        <div className="FlexContainer">
          <div className="GridItem">
            <span className="Label">Work Schedule</span>
            <span className="Value">{attsummary.totalWorkingHours}</span>
          </div>
          <div className="GridItem">
            <span className="Label">Logged Time</span>
            <span className="Value">{attsummary.totalLoggedTime}</span>
          </div>
          <div className="GridItem">
            <span className="Label">Paid Time</span>
            <span className="Value">{attsummary.totalPaidTime}</span>
          </div>
          <div className="GridItem">
            <span className="Label">Deficit</span>
            <span className="Value">{attsummary.totalDeficitTime}</span>
          </div>
          <div className="GridItem">
            <span className="Label">Overtime</span>
            <span className="Value">{attsummary.totalOvertime}</span>
          </div>
        </div>
      )}
    </MainCard>
  );
}
