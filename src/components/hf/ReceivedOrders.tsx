import React, { useState } from 'react';
//@ts-ignore
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { makeEdit } from '../../redux/slices/condom';
// import { useQueryClient } from '@tanstack/react-query';

//@ts-ignore
const ReceivedOrders = ({ data }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  console.log(filteredData);
  const dispatch = useDispatch();
  //   const queryClient = useQueryClient();

  const getColumnSearchProps = (dataIndex: string, columnTitle: string) => ({
    //@ts-ignore
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: any) => (
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
            Clear Search
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

  //   const deleteCondomMutation = useMutation({
  //     mutationFn: deleteUser,
  //     onSuccess: (data) => {
  //       queryClient.setQueryData(["user"], data)
  //       queryClient.invalidateQueries(["user"], { exact: true })
  //       displaySuccessMessage('User deleted')

  //     }
  //   })

  //   const handleDelete = async (id:any)=>{
  //     deleteCondomMutation.mutate(id)
  //   }

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a: { id: number }, b: { id: number }) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Ordered For',
      dataIndex: 'ordered_for',
      key: 'ordered_for',
      ...getColumnSearchProps('ordered_for', 'Ordered_For'),
    },

    {
      title: 'Quantity',
      dataIndex: 'quantity_needed',
      key: 'quantity_needed',
      ...getColumnSearchProps('quantity_needed', 'Quantity Needed'),
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
      ...getColumnSearchProps('unit', 'Unit'),
    },
    {
      title: 'Status',
      key: 'id',
      render: (text: string, record: any) => (
        <Space>
          <Button
            style={{
              backgroundColor: '#E7BD1F',
              color: 'white',
              border: 'none',
              borderRadius: '50px 50px ',
            }}
            onClick={() => dispatch(makeEdit(record.id))}
            type="primary"
          >
            pending
          </Button>
          <Button
            style={{
              backgroundColor: '#4169e1',
              color: 'white',
              border: 'none',
              borderRadius: '50px 50px ',
            }}
            onClick={() => dispatch(makeEdit(record.id))}
            type="primary"
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  //for pagination remove the underscore on the word pagination
  const handleTableChange = (
    _pagination: any,
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

export default ReceivedOrders;
