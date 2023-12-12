import React, { useMemo } from "react";

import DataTable from "react-data-table-component";
import FilterComponent from "./FilterComponent";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";



const Table = props => {
  const columns = [
    {
      name: "Title",
      selector: "title",
      sortable: true,
      grow: 2
    },
    {
      name: "Batch Id",
      selector: "batch_id",
      sortable: true,
      grow: 2
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
      grow: 2
    },

  ];

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

  const navigate = useNavigate();

const refreshPage = () => {
  navigate(0);
}
  return (
    <>
    <Button onClick={refreshPage}>Check Status</Button>
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
