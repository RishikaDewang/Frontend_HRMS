import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import BasicButtons from 'ui-component/button';
function createData(id, name) {
  return {
    id,
    name,

  };
}

const rows = [
  createData(1, 'Personal Infomation'),
  createData(2, 'Address'),
  createData(3, 'Emergency Contact'),
  createData(4, 'Bank Information'),

];
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
const headCells = [
  {
    id: 'name',
    label: 'Sections',
  },
  {
    id: 'fat',
    label: 'View',
  },
  {
    id: 'carbs',
    label: 'Edit',
  },
];
function EnhancedTableHead(props) {
  const { order, orderBy } =
    props;
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
          >  
            <TableSortLabel
              active={orderBy === headCell.id}
              align='center'
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
export default function Permissions({ onSave, roleName, description, }) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense,] = React.useState(false);
  const [sectionPermissions, setSectionPermissions] = useState({});
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const sections = useSelector((state)=>state.setSections.sections)
console.log("sections in premission ", sections)
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleCheckboxClick = (sectionId, permissionId) => {
    // Update the permission for the clicked section
    setSectionPermissions((prevSectionPermissions) => ({
      ...prevSectionPermissions,
      [sectionId]: permissionId,
    }));

  };
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const isSelected = (id) => selected.indexOf(id) !== -1;
  const isAllSectionsChecked = rows.every((row) => sectionPermissions[row.id] !== undefined);

  // Handle the "Save" button click
  const handleSaveClick = () => {
    // Prepare the roleData based on your selected checkboxes
    if (isAllSectionsChecked) {
    const roleData = {
      Role: {
        RoleName: roleName,
        Description: description,
      },
      SectionPermissions: rows.map((row) => ({
        SectionId: row.id,
        PermissionId: sectionPermissions[row.id] || 3  // Set your desired PermissionId here
      })),
    };
    // Dispatch the action with the roleData as the payload
    onSave(roleData)
  }
  };
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const visibleRows = React.useMemo(
    () =>
      stableSort(sections, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );
  return (
    <>

      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 700 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.sectionId);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.sectionId)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.sectionId}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={sectionPermissions[row.sectionId] === 2}
                          onClick={() => handleCheckboxClick(row.sectionId, 2)}
                          inputProps={{
                            'aria-labelledby': labelId,

                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="left"
                      >
                        {row.sectionName}
                      </TableCell>
                      <TableCell align="left">
                        <Checkbox
                          color="primary"
                          checked={sectionPermissions[row.sectionId] === 1 || sectionPermissions[row.sectionId] === 2}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                          onClick={() => handleCheckboxClick(row.sectionId, 1)}
                        /></TableCell>
                      <TableCell align="left">
                        <Checkbox
                          color="primary"
                          checked={sectionPermissions[row.sectionId] === 2}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                          onClick={() => handleCheckboxClick(row.sectionId, 2)}
                        /></TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            // rowsPerPageOptions={[3, 6, 12]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      <BasicButtons name="save" handleSaveClick={handleSaveClick}></BasicButtons>
    </>
  );
}