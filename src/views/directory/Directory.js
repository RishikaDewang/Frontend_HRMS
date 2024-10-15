    import React from 'react'
    import MainCard from 'ui-component/cards/MainCard'
    import Cardcontainer from 'ui-component/cardcontainer/Cardcontainer'
    import { useSelector, useDispatch } from 'react-redux'
    import { useEffect , useState} from 'react'
    import { fetchEmployee , filterEmployee} from 'redux/action/actions'
    import UseFormControl from 'ui-component/input/input'
    import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
    import './style.css'
    export default function Directory() {
        const employe = useSelector((state) => state.fetchEmployeeReducer.data?.employees)
        const newemploye = useSelector((state) => state.fetchEmployeeReducer.data)
        // console.log("newemploye",n?wemploye)
        const pageno = useSelector((state) => state.fetchEmployeeReducer.data);
        const dispatch = useDispatch()
        const [searchQuery, setSearchQuery] = useState('');
        const [page, setPage] = useState(1); // Current page state
        const rowsPerPage = 10; // Number of rows to display per page
        useEffect(() => {
            if (!searchQuery) {
                console.log('api all')
                dispatch(fetchEmployee(page, rowsPerPage));
            } 
        }, [searchQuery, page,rowsPerPage ]);
        
          const handleSearch = (event) => {
            const query = event.target.value;
            setSearchQuery(query);
            dispatch(filterEmployee(page ,rowsPerPage,query))
        };
        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };
        return (
            <MainCard title="Directory">
                <div className='employee-search'>
                <UseFormControl    type="search" onChange={handleSearch} label="Search Employees"/>
                </div>
                <Cardcontainer employeesData={employe||newemploye} />
                <div className="pagination-container">
          <Stack spacing={2}>
            <Pagination count={pageno?.totalPages} page={page} onChange={handleChangePage} color="secondary" />
          </Stack>
        </div>
            </MainCard>
        )
    }
