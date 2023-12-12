import React, { useMemo } from "react";

import DataTable from "react-data-table-component";
import FilterComponent from "./FilterComponent";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Table = props => {

  const columns = [
    {
      name: "First Name",
      selector: "first_name",
      sortable: true,
      grow: 2
    },
    {
      name: "Last Name",
      selector: "last_name",
      sortable: true,
      grow: 2
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
      grow: 2
    },
    {
      name: "Buttons",
      button: true,
      cell: row =>
          <>
            <button
              onClick={() => handleOpen(row)}
              style={{ marginRight: "5px" }}
            >

              View Details
            </button>
            {/* <button onClick={() => props.click(row.id)}>Delete</button> */}
          </>
        
    }
  ];

  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState(false);
  const handleOpen = (row) => {
     setUser(row);
    setOpen(true);
  }
  const handleClose = () => setOpen(false);
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );
  // const filteredItems = data.filter(
  //   item => item.name && item.name.includes(filterText)
  // );
  const filteredItems = props.data.filter(
    item =>
      JSON.stringify(item)
        .toLowerCase()
        .indexOf(filterText.toLowerCase()) !== -1
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={e => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <>
         <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <b>First Name:</b> {user.first_name}<br/>
            <b>Last Name:</b>  {user.last_name}<br/>
            <b>Email:</b>  {user.email}<br/>
            <b>Phone Number: </b>{user.mobile_number}<br/>
            <b>Position: </b> {user.position}<br/>
            <b>Organization:</b> {user.organization}<br/>
            <b>Country:</b> {user.country}<br/>
            <b>Tags:</b> {user.tags?.map((e,i)=> {return <>{e.title}, </>})}<br/><br/>
            <b>Attended Events:</b> {user.events?.map((e,i)=> {return <>{e.title}, </>})}
            
          </Typography>
        </Box>
      </Modal>
    <DataTable
      title=""
      columns={columns}
      data={filteredItems}
      defaultSortField="title"
      striped
      pagination
      subHeader
      subHeaderComponent={subHeaderComponent}
    />
    </>
  );
};

export default Table;
