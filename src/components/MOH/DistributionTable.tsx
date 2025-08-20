import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import DateFilter from '@inovua/reactdatagrid-community/DateFilter';

// const defaultFilterValue = [
//   { name: 'firstName', operator: 'contains', type: 'string', value: '' },
//   { name: 'createdOn', operator: 'inrange', type: 'date', value: '' },
//   { name: 'age', operator: 'inrange', type: 'number', value: { start: 30, end: 40 } },
// ];

const columns = [
  { name: 'id', header: 'Id', minWidth: 50, defaultFlex: 1 },
  { name: 'name', header: 'Hotspot Name', minWidth: 50, defaultFlex: 1 },
  { name: 'type', header: 'Hotspot Type', minWidth: 50, defaultFlex: 1 },
  { name: 'district', header: 'District', minWidth: 50, defaultFlex: 1 },
  {
    name: 'contact_person_name',
    header: 'Contact Person',
    minWidth: 50,
    defaultFlex: 1,
  },
  {
    name: 'contact_person_telephone',
    header: ' Tel',
    minWidth: 50,
    defaultFlex: 1,
  },
  { name: 'mapped_on', header: 'Date', minWidth: 50, defaultFlex: 1 },
  { name: 'entry_date', header: 'Entry Date', minWidth: 50, defaultFlex: 1 },
  { name: 'status', header: 'Status', minWidth: 50, defaultFlex: 1 },
  {
    name: 'has_condom_dispenser',
    header: 'Condom Dispenser',
    minWidth: 50,
    defaultFlex: 1,
  },
  { name: 'comment', header: 'Comment', minWidth: 50, defaultFlex: 1 },
  //  dateFormat: 'YYYY-MM-DD',
  //   filterEditor: DateFilter,
  //   filterEditorProps: (props, { index }) => {
  //     // for range and notinrange operators, the index is 1 for the after field
  //     return { placeholder: index == 1? 'Created date is before...': 'Created date is after...' }
  //   },
  //   render: ({ value, cellProps: { dateFormat } }) =>
  //     moment(value).format(dateFormat),
  // }

  // {
  //     name: 'actions', header: 'Actions', maxWidth: 1000, defaultFlex: 3, render: () => {
  //         <div style={{ backgroundColor: "red", display: "flex" }}>
  //             bk
  //         </div>
  //     }
  // },
];

const gridStyle = { minHeight: 750 };

export default ({ dataSource }: any) => (
  <ReactDataGrid
    idProperty="id"
    columns={columns}
    dataSource={Array.isArray(dataSource) ? dataSource : []}
    style={gridStyle}
    sortable={true}
    pagination={true}
    editable={true}
    checkboxColumn
    enableColumnAutosize={true}
    expandedRows={true}
    collapsedGroups={true}
    rowReorderColumn={true}
    // renderRowDetailsExpandIcon={}

    // filterValue={}
  />
);
