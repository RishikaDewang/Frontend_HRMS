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
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import MainCard from 'ui-component/cards/MainCard';
import { useLocation } from 'react-router';
import BasicButtons from 'ui-component/button';
import { fetchPermissionByRole } from 'redux/action/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { editPermissionsRequest , updateFeatures,fetchFeature, fetchModule} from 'redux/action/actions';
import isEqual from 'lodash/isEqual';
import './style.css'
function createData(id, name, calories, fat, carbs, protein) {
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

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
  const stabilizedThis = array && array.map((el, index) => [el, index]);
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
    numeric: false,
    disablePadding: true,
    label: 'Sections',
  },
  {
    id: 'fat',
    numeric: true,
    disablePadding: false,
    label: 'View',
  },
  {
    id: 'carbs',
    numeric: true,
    disablePadding: false,
    label: 'Edit',
  },
];
const uiData = [
  {
    title: 'Manage Employee',
    content: 'Create a new employee profile, rehire a resigned one and send/resend invite.',
  },
  {
    title: 'Time Off',
    content: 'View, cancel requests of all employees including resigned ones.',
  },
  {
    title: 'Attendance',
    content: 'View, edit, approve, reject, revert, download attendance of all employees.',
  },
  {
    title: 'News',
    content: 'View, create, edit, publish, delete news.',
  },
  {
    title: 'Document',
    content: 'Upload, delete company document.',
  },
];
function EnhancedTableHead(props) {
  const { order, orderBy } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false}>
            {headCell.label}
            {orderBy === headCell.id ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
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

export default function Permissions() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sectionPermissions, setSectionPermissions] = useState({});
  const [dynamicRows, setDynamicRows] = React.useState([]);
  const [permissions, setPermissions] = useState(uiData.map(() => ({ PermissionId: null })));
  const location = useLocation();
  const { roleName } = location.state;
  const roleId = location.state.roleId;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.setRoleByPermission.permissionbyrole);



  useEffect(() => {

    dispatch(fetchFeature(roleId));
    dispatch(fetchModule())
  },[dispatch,roleId]);
  const featuer = useSelector((state) => state.featuresfetchReducer.featurefectch);
  console.log("feature", featuer)
  const module = useSelector((state) => state.setModule.module);
  console.log("module",module)
  const navigate = useNavigate();
  const sectionNames = data.sections && data.sections.map((section) => section.sectionName);
  const isSuperAdmin = roleName === 'Superadmin';
  useEffect(() => {
    dispatch(fetchPermissionByRole(roleId));
    
  }, [roleId,featuer]);
  useEffect(() => {
    if (sectionNames) {
      const newDynamicRows = sectionNames.map((sectionName, index) => createData(index + 1, sectionName, 1));
      setDynamicRows(newDynamicRows);
    }
    console.log("dynamic row", dynamicRows)
  }, [data]);
  // Dynamically generate rows based on sectionNames
  // const dynamicRows = sectionNames &&  sectionNames.map((sectionName, index) => createData(index + 1, sectionName, 1));

  // Initialize the checkbox state as an object with section names as keys
  const initialCheckboxState = React.useMemo(() => {
    if (data && data.sections) {
      const checkboxState = {};

      dynamicRows.forEach((row) => {
        const name = row.name;
        checkboxState[name] = {};

        const sectionPermissions = data.sections.filter(
          (section) => section.sectionName === name
        );

        const viewPermission = sectionPermissions.find(
          (permission) => permission.permissionName === 'view'
        );

        const viewAndEditPermission = sectionPermissions.find(
          (permission) => permission.permissionName === 'view and edit'
        );

        if (viewAndEditPermission) {
          checkboxState[name].view = true;
          checkboxState[name].edit = true;
        } else if (viewPermission) {
          checkboxState[name].edit = true;
        }
      }, [data]);

      return checkboxState;
    }

    return {};
  }, [data]);

  const [checkboxState, setCheckboxState] = React.useState(initialCheckboxState);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = dynamicRows.map((n) => n.name);
      setSelected(newSelected);

      const secondCheckboxState = {};
      dynamicRows.forEach((row) => {
        secondCheckboxState[row.name] = { view: true, edit: true };
      });

      setCheckboxState(secondCheckboxState);
      return;
    }
    setSelected([]);
    setCheckboxState({});
  };

  const handleClick = (sectionId, sectionName, permissionId) => {
    const selectedIndex = selected.indexOf(sectionName);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, sectionName);
      setCheckboxState((prevState) => ({
        ...prevState,
        [sectionName]: { ...prevState[sectionName], view: true, edit: true }, // Set both view and edit to true
      }));
    } else {
      newSelected = selected.filter((item) => item !== sectionName);
      setCheckboxState((prevState) => ({
        ...prevState,
        [sectionName]: { ...prevState[sectionName], view: false, edit: false }, // Set both view and edit to false
      }));
    }

    setSelected(newSelected);

    // Automatically update the second checkbox based on the state of the first checkbox
    const isChecked = checkboxState[sectionName]?.view || false;
    handleSecondCheckboxClick(permissionId, sectionName, sectionId, isChecked);
  };

  const handleSecondCheckboxClick = (permissionId, sectionName, sectionId, isChecked) => {
    if (isSuperAdmin) {
      return;
    }
    setCheckboxState((prevState) => ({
      ...prevState,
      [sectionName]: {
        ...prevState[sectionName],
        edit: isChecked,
      },
    }));

    // Automatically update the third checkbox based on the state of the second checkbox
    handleThirdCheckboxClick(permissionId, sectionName, sectionId, isChecked);
  };

  const handleThirdCheckboxClick = (permissionId, sectionName, sectionId, isChecked) => {
    if (isSuperAdmin) {
      return;
    }
    setCheckboxState((prevState) => ({
      ...prevState,
      [sectionName]: {
        ...prevState[sectionName],
        view: isChecked,
      },
    }));
    setSectionPermissions((prevSectionPermissions) => ({
      ...prevSectionPermissions,
      [sectionId]: permissionId,
    }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dynamicRows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(dynamicRows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, dynamicRows]
  );

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleSaveClick = () => {
    const roleData = {
      Role: {
        RoleId: roleId,
      },
      SectionPermissions: selected.map((id) => ({
        SectionId: id,
        PermissionId: sectionPermissions[id],
      })),
    };
    dispatch(editPermissionsRequest(roleData));
    navigate("/settings/role");
  };

  const handleCancelClick = () => {
    navigate("/settings/role");
  };

  useEffect(() => {
    setCheckboxState((prevCheckboxState) => {
      if (!isEqual(prevCheckboxState, initialCheckboxState)) {
        return initialCheckboxState;
      }
      return prevCheckboxState;
    });
  }, [initialCheckboxState]);
  

  const handleCheckboxChange = (index) => {
    if (isSuperAdmin) {
      return;
    }
    setPermissions((prevPermissions) => {
      const updatedPermissions = [...prevPermissions];
      updatedPermissions[index] = {
        PermissionId: updatedPermissions[index]?.PermissionId === 1 ? null : 1,
      };
      return updatedPermissions;
    });
  };
  useEffect(() => {
    // Initialize the permissions state with the fetched data
    if (featuer && featuer.length > 0) {
      const initialPermissions = featuer.reduce((acc, module) => {
        acc[module.moduleId - 1] = { PermissionId: module.permissionId };
        return acc;
      }, []);
      setPermissions(initialPermissions);
    }
  }, [featuer]);
  const handleSubmit = () => {
    // Now, you can use roleId and permissions to make your API call.
    const requestBody = module.map((item, index) => {
      return{
      RoleId: roleId,
      ModuleId: index + 1, // Assuming module ids start from 1
      PermissionFlag: permissions[index]?.PermissionId || 0,
    }});

  
 dispatch(updateFeatures(requestBody));
 navigate("/settings/role");
  };
  return (
    <>
      <MainCard title={roleName} sx={{ marginBottom: '16px' }}>
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={dynamicRows.length}
                />
                <TableBody>
                  {visibleRows.map((row, index) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            onClick={() => handleClick(row.id, row.id, 2)}
                            checked={isItemSelected || checkboxState[row.name]?.view || sectionPermissions[row.id] === 2}
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
                          {row.name}
                        </TableCell>
                        <TableCell align="left">
                          <Checkbox
                            color="primary"
                            checked={checkboxState[row.name]?.edit || sectionPermissions[row.id] === 1 || sectionPermissions[row.id] === 2}
                            onChange={() => handleSecondCheckboxClick(1, row.name, row.id)}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell align="left">
                          <Checkbox
                            color="primary"
                            onClick={() => handleClick(row.id, row.id, 2)}
                            checked={isItemSelected || checkboxState[row.name]?.view || sectionPermissions[row.id] === 2}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: dense ? 33 : 53 * emptyRows,
                      }}
                    >
                      <TableCell colSpan={3} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dynamicRows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
        <BasicButtons name="Save" cancel="Cancel" handleSaveClick={handleSaveClick} handleCancelClick={handleCancelClick} />
      </MainCard>
      <MainCard title='Features'>
      {module.map((item, index) => (
        <div key={index} className="dTuutX">
          <p style={{ color: 'rgb(14, 34, 61)' }}>{item.moduleName}</p>
          <div style={{ display: 'flex', marginTop: '8px', marginBottom: '8px', flexDirection: 'row' }}>
          <input
              type="checkbox"
              style={{ marginRight: '8px' }}
              checked={permissions[index]?.PermissionId === 1}
              onChange={() => handleCheckboxChange(index)}
            />
            <span>{item.description}</span>
          </div>
        </div>
      ))}
 <BasicButtons name='Save' cancel="Cancel" handleSaveClick={handleSubmit} handleCancelClick={handleCancelClick} />
      </MainCard>
    </>
  );
}