//@ts-nocheck

import React, { useState } from 'react';
//@ts-ignore
import { Table, Input, Button, Space, Dropdown, MenuProps } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { makeEdit } from '../../redux/slices/condom';
import { Select } from 'antd';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { displaySuccessMessage } from '../toast/Toast';
import { updateReceivedOrder } from '../../api/apiRequests';


const { Option } = Select;

//@ts-ignore
const OrdersTable = ({ data }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [order_status, setOrderStatus] = useState()
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

  const formatDate = (dateString: any) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };


  const queryClient = useQueryClient()


  const createEditMutation = useMutation({
    //@ts-ignore
    mutationFn: updateReceivedOrder,
    onSuccess: (data: any) => {
      queryClient.setQueryData(["receivedOrders"], data)
      queryClient.invalidateQueries(["receivedOrders"], { exact: true })
      if (data.code == "200") {
        displaySuccessMessage("Order Status Updated");
      }
    }
  })
  const handleChange = (value: string, id: string) => {
    console.log(value, id)

    const data = {
      order_status: value,
      handled_by: 30
    };
    createEditMutation.mutate({ data, id })

  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: "approved",
    },
    {
      key: '2',
      label: "rejected",
    }
  ];

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a: { id: number }, b: { id: number }) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Order Date',
      dataIndex: 'order_date',
      key: 'order_date',
      ...getColumnSearchProps('order_date', 'Order_date'),
      render: (text: any) => <span>{formatDate(text)}</span>,
    },
    {
      title: 'Ordered By',
      dataIndex: 'ordered_by',
      key: 'ordered_by',
      ...getColumnSearchProps('ordered_by', 'ordered_by'),
      render: (text: any) => <span>{text.split('-')[1]}</span>,

    },
    {
      title: 'Quantity',
      dataIndex: 'quantity_needed',
      key: 'quantity_needed',
      ...getColumnSearchProps('quantity_needed', 'Quantity Needed'),
    },
    // {
    //   title: 'Unit of Measure',
    //   dataIndex: 'unit',
    //   key: 'unit',
    //   ...getColumnSearchProps('unit', 'Unit'),
    //   render: (unit:any) =>  unit[0]?.name || 'N/A'
    // },
    {
      title: 'Status',
      key: 'id',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button
            style={{
              backgroundColor: `${record.order_status == 'approved' ? '#005C4B' : record.order_status == 'rejected' ? '#FF827B' : '#E7BD1F'}`,
              color: 'white',
              border: 'none',
              borderRadius: '50px 50px ',
            }}
            type="primary"
          >
            {record.order_status}
          </Button>
        </Space>
      ),
    },
    {
      title: 'Manage Order',
      key: 'id',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Select
            defaultValue={record.order_status}
            style={{ width: 150 }}
            onChange={(value) => handleChange(value, record.id)}
          >
            <Option value="">Select Status</Option>
            <Option value="approved">Approve</Option>
            <Option value="rejected">Reject</Option>
          </Select>
        </Space>
      ),
    }
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

export default OrdersTable;
