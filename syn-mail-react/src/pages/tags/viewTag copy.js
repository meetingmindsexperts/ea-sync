import { Typography,TextField,Button } from "@mui/material";
import React,{useState,useEffect,useMemo} from "react";
import ResponsiveDrawer from "../dashboard";
import DataTable from 'react-data-table-component';
import axios  from "axios";

const clickHandler = () => {
 console.log("success");
}

const ViewTag1 = () => {

    const columns = [
        {
            name: 'Title',
            selector: (row) => row.title,
        },
        {
            name: 'Action',
            selector: (row) => row.action,
            cell: (props) => (
                <a
                href="#"
                onClick={() => {
                    clickHandler(props);
                }}
                >
                Action
                </a>
            ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
        },
    ];
  
    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterText, setFilterText] = useState('');
	const [resetPaginationToggle, setResetPaginationToggle] =useState(false);
  const [filteredItems,setFilteredItems] = useState('');

    const subHeaderComponentMemo = useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

    const FilterComponent = ({ filterText, onFilter, onClear }) => (
      <>
        <TextField
          id="search"
          type="text"
          placeholder="Filter By Name"
          aria-label="Search Input"
          value={filterText}
          onChange={onFilter}
        />
        <Button type="button" onClick={onClear}>
          X
        </Button>
      </>
    );

		return (
			<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
		);
	}, [filterText, resetPaginationToggle]);


    const fetchTags = async (start = 0, end = 100) => {
      const response = await axios.get(process.env.REACT_APP_API_URL+'tags/view', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'bearer '+localStorage.getItem('token')
        }
    });
  
    const filteredItemsList = response.data.filter(
      item => item.title && item.title.toLowerCase().includes(filterText.toLowerCase()),
    );
      setFilteredItems(filteredItemsList);
      setLoading(false);
    };


  
    useEffect(() => {
        fetchTags();
    }, []);

    
    return <>
     <ResponsiveDrawer>
        <h1 style={{ fontWeight:"bold",textTransform:"uppercase" }} >View Tags</h1>

        <DataTable
			title="Contact List"
			columns={columns}
			data={filteredItems}
			pagination
			paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
			subHeader
			subHeaderComponent={subHeaderComponentMemo}
			selectableRows
			persistTableHead
		/>
     </ResponsiveDrawer>
    </>
}

export default ViewTag1;