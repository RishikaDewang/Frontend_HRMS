import * as React from 'react';
  import { useEffect , useState} from 'react';
  import BasicButtons from 'ui-component/button';
  import { fetchPermissionByRole, fetchRole } from 'redux/action/actions';
  import { useNavigate } from 'react-router';
  import CollapsibleTable from 'ui-component/grid';
  import { useDispatch } from 'react-redux';
  import { useSelector } from 'react-redux';
  import RoleModal from './RoleModal';
  import { createRoleWithPermissionsRequest, fetchSections } from 'redux/action/actions';
  import "./style.css"
  const columns = [
    { id: 'id', label: '#' },
    { id: 'name', label: 'Role Name' },
    { id: 'calories', label: 'Members' },
  ];
  export default function Role() {
    const userData = useSelector(state => state.userReducer.token)
    const role = useSelector(state => state.setRole.data)
    const [isModalOpen, setModalOpen] = useState(false);
    
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(fetchRole(userData));
      dispatch(fetchSections())
    }, [ userData]);
    const navigate = useNavigate()
    function handleclick(roleName,roleId) {
      navigate("/settings/permission", { state: { roleName ,roleId} })
      dispatch(fetchPermissionByRole(roleId));
    }
    const openModal = () => {
      setModalOpen(true);
    };
    const closeModal = () => {
      setModalOpen(false);
    };
    // Function to handle saving the role data
    const handleSaveRole =  (roleData) => {
      dispatch(createRoleWithPermissionsRequest(roleData));
      closeModal();
    };
    const handleCancel = () => {
      closeModal();
    };
    return (
      <>
        <div >
          <div className="role-button">
            <BasicButtons openModal={openModal}  name="New Role" />
          </div>
          <div>
          <CollapsibleTable columns={columns} data={role} handleclick={handleclick}  displayCount={true} />
          </div>
        </div>
        <RoleModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          onSave={handleSaveRole}
          onCancel={handleCancel}
        />
      </>
    );
  }