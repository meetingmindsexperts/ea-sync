import React, { useMemo } from "react";

import DataTable from "react-data-table-component";
import FilterComponent from "./FilterComponent";

const Table = props => {
  const columns = [
    {
      name: "Title",
      selector: "title",
    },
    // {
    //   name: "Email",
    //   selector: "email",
    //   sortable: true,
    //   grow: 2
    // },
    // {
    //   name: "URL",
    //   selector: "url",
    //   sortable: true,
    //   grow: 2
    // },
    {
      name: "Tags",
      selector: "tags",
      cell: row => row.tags.map((tag, i) => <div key={i}>{tag.title},&nbsp;</div>),
    },
    
    {
      name: "Buttons",
      cell: row =>
          <>
            <button
              onClick={() => props.click(row.id)}
              style={{ marginRight: "5px"}}
            >
              Edit
            </button>
            <button onClick={() => props.registration(row.id)}>View Registrations</button>
          </>
        
    }
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

  return (
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
  );
};

export default Table;
