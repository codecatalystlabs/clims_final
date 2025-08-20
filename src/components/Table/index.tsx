import React, { useState } from 'react';
//@ts-ignore
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { makeEdit } from '../../redux/slices/condom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '../../api/apiRequests';
import { displaySuccessMessage } from '../toast/Toast';

//@ts-ignore
const DataTable = ({ data }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  console.log(filteredData);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const getColumnSearchProps = (dataIndex: string, columnTitle: string) => ({
    //@ts-ignore
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${columnTitle}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (
      value: string,
      record: { [x: string]: { toString: () => string } }
    ) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible: any) => {
      if (visible) {
        //@ts-ignore
        setTimeout(() => document.getElementById('searchInput').select(), 100);
      }
    },
    render: (
      text:
        | string
        | number
        | boolean
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | Iterable<React.ReactNode>
        | React.ReactPortal
        | null
        | undefined
    ) =>
      searchedColumn === dataIndex ? (
        <span style={{ fontWeight: 'bold' }}>{text}</span>
      ) : (
        text
      ),
  });

  const handleSearch = (
    selectedKeys: React.SetStateAction<string>[],
    confirm: () => void,
    dataIndex: React.SetStateAction<string>
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const deleteCondomMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data);
      queryClient.invalidateQueries(['user'], { exact: true });
      displaySuccessMessage('User deleted');
    },
  });

  const handleDelete = async (id: any) => {
    deleteCondomMutation.mutate(id);
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a: { id: number }, b: { id: number }) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'First Name',
      dataIndex: 'firstname',
      key: 'firstname',
      ...getColumnSearchProps('firstname', 'First Name'),
    },
    {
      title: 'UserName',
      dataIndex: 'username',
      key: 'username',
      ...getColumnSearchProps('username', 'UserName'),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      ...getColumnSearchProps('role', 'Role'),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      ...getColumnSearchProps('location', 'Location'),
    },
    {
      title: 'Last Name',
      dataIndex: 'lastname',
      key: 'lastname',
      ...getColumnSearchProps('lastname', 'Last Name'),
    },
    {
      title: 'Contact',
      dataIndex: 'phone_number',
      key: 'phone_number',
      ...getColumnSearchProps('phone_number', 'Contact'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('Email', 'email'),
    },
    {
      title: 'Actions',
      key: 'id',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button
            style={{
              backgroundColor: '#006D5B',
              color: 'white',
              border: 'none',
            }}
            onClick={() => dispatch(makeEdit(record.id))}
            type="primary"
          >
            Edit
          </Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleTableChange = (
    pagination: any,
    filters: { [x: string]: any },
    sorter: { field: any; order?: any }
  ) => {
    // Apply sorting
    if (sorter && sorter.field) {
      const { field, order } = sorter;
      const sortedData = [...filteredData].sort((a, b) => {
        const result = a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
        return order === 'descend' ? -result : result;
      });
      setFilteredData(sortedData);
    }

    // Apply filtering
    if (filters && Object.keys(filters).length > 0) {
      let filteredDataCopy = [...data];
      Object.keys(filters).forEach((key) => {
        const selectedFilters = filters[key];
        if (selectedFilters.length > 0) {
          filteredDataCopy = filteredDataCopy.filter((item) =>
            selectedFilters.includes(item[key])
          );
        }
      });
      setFilteredData(filteredDataCopy);
    }
  };
  return (
    <Table
      //@ts-ignore
      columns={columns}
      dataSource={Array.isArray(data) ? data : []} // Check if rawData is an array
      pagination={{ defaultPageSize: 10 }}
      //@ts-ignore

      onChange={handleTableChange}
    />
  );
};

export default DataTable;
