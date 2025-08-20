import React, { useState } from 'react';
//@ts-ignore
import { Table, Input, Button, Space, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';


//@ts-ignore
const HotspotStock = ({ data }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [filteredData, setFilteredData] = useState(data || []);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState();
  // ... (other state variables)

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
      record[dataIndex]?.toString()?.toLowerCase()?.includes(value.toLowerCase()),
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


  const modifiedData = data.map((item:any )=> ({
    ...item,
    totalAvailable: parseInt(item.stock_found) + parseInt(item.quantity_brought)
  }));



  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a: { id: number }, b: { id: number }) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Balance On  Hand',
        dataIndex: 'stock_found',
        key: 'stock_found',
        ...getColumnSearchProps('stock_found', 'Balance On  Hand'),
      },
    {
      title: 'Quantity Delivered',
      dataIndex: 'quantity_brought',
      key: 'quantity_brought',
      ...getColumnSearchProps('quantity_brought', 'Quantity Delivered'),
    },
    {
      title: 'Total Available',
      dataIndex: 'totalAvailable',
      key: 'totalAvailable',
      render: (text:any, record:any) => record.totalAvailable, 
    },
    {
      title: 'Condom Type',
      dataIndex: 'condom_id',
      key: 'condom_id',
      ...getColumnSearchProps('condom_id', 'Condom Type'),
      render: (condom: any) => condom?.type,
    },
    {
      title: 'Condom Brand',
      dataIndex: 'condom_id',
      key: 'condom_id',
      ...getColumnSearchProps('condom_id', 'Condom Brand'),
      render: (condom: any) => condom?.brand,
    },
    {
        title: 'Delivery Agent Name',
        dataIndex: 'person_delivering',
        key: 'person_delivering',
        ...getColumnSearchProps('person_delivering', 'Delivery Agent Name'),
      },
      {
        title: 'Delivery Agent Contact',
        dataIndex: 'contact_of_person_delivering',
        key: 'contact_of_person_delivering',
        ...getColumnSearchProps('contact_of_person_delivering', 'Delivery Agent Contact'),
      },
    {
        title: 'Hotspot Name',
        dataIndex: 'hotspot_id',
        key: 'hotspot_id',
        ...getColumnSearchProps('hotspot_id', 'Hotspot Name'),
        render: (data: any) => data?.name,
      },
      {
        title: 'Hotspot District',
        dataIndex: 'hotspot_id',
        key: 'hotspot_id',
        ...getColumnSearchProps('hotspot_id', 'Hotspot Name District'),
        render: (data: any) => data?.district,
      },
    {
      title: 'Delivery Date',
      dataIndex: 'created_at',
      key: 'created_at',
      ...getColumnSearchProps('created_at', 'Delivery Date'),
      render: (text:string) => moment(text).format('DD/MM/YYYY')

    }
  ];

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

  const handleInputChange =
    (setState: (arg0: any) => void) => (event: { target: { value: any } }) => {
      setState(event.target.value);
      console.log(event.target.value);
    };

  return (
    <>
      <Table
        //@ts-ignore
        columns={columns}
        dataSource={
          Array.isArray(modifiedData)
            ? modifiedData.map((item) => ({ ...item, key: item.id }))
            : []
        }
        pagination={{ defaultPageSize: 10 }}
        //@ts-ignore
        onChange={handleTableChange}
      />
    </>
  );
};

export default HotspotStock;
