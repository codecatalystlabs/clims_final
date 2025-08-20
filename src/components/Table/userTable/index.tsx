import React, { useState } from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import { Button, Input } from 'antd';

const gridStyle = { minHeight: 750 };

export default ({ dataSource }: any) => {
    const [searchText, setSearchText] = useState('');

  const columns = [
    { name: 'id', header: 'Id', minWidth: 50, defaultFlex: 1 },
    { name: 'firstname', header: 'First Name', minWidth: 50, defaultFlex: 1 },
    { name: 'lastname', header: 'Last Name', maxWidth: 1000, defaultFlex: 1 },
    { name: 'district', header: 'District', maxWidth: 1000, defaultFlex: 1 },
    {
      name: 'phone_number',
      header: 'Phone Number',
      maxWidth: 1000,
      defaultFlex: 2,
    },
    { name: 'username', header: 'User Name', maxWidth: 1000, defaultFlex: 1 },
    { name: 'email', header: 'Email', maxWidth: 1000, defaultFlex: 2 },
    { name: 'status', header: 'Status', maxWidth: 1000, defaultFlex: 1 },
    {
      name: 'organization_unit_id',
      header: 'Organization Id',
      maxWidth: 1000,
      defaultFlex: 1,
    },
    { name: 'role', header: 'Role', maxWidth: 1000, defaultFlex: 1 },
    { name: 'created_at', header: 'CreatedAt', maxWidth: 1000, defaultFlex: 2 },
    {
      name: 'actions',
      header: 'Actions',
      maxWidth: 1000,
      defaultFlex: 3,
      render: ({ data }: any) => (
        <div className='flex items-center justify-center space-x-2'>
          <Button type="primary" danger>
            Delete
          </Button>
          <Button type="primary">Edit</Button>
        </div>
      ),
    },
  ];

  // const handleDelete = (id) => {
  //     const newData = data.filter(item => item.id !== id);
  //     setData(newData);
  // };

  const handleSearch = (event:any) => {
    setSearchText(event.target.value);
};

const filteredData = (Array?.isArray(dataSource) ? dataSource : []).filter((item:any) => {
    return Object.values(item).some(val =>
        String(val).toLowerCase().includes(searchText.toLowerCase())
    );
});

  return (
    <div>
    <Input
        placeholder="Search......"
        value={searchText}
        onChange={handleSearch}
        style={{ marginBottom: '20px', width: '300px' }}
    />

    <ReactDataGrid
      idProperty="id"
      columns={columns}
      dataSource={filteredData}
      style={gridStyle}
      sortable={true}
      pagination={true}
      editable={true}
      checkboxColumn
      enableColumnAutosize={true}
      expandedRows={true}
      collapsedGroups={true}
      rowReorderColumn={true}
    />
</div>

  );
};
