import React, { useState } from 'react';
//@ts-ignore
import { Table, Input, Button, Space, Modal } from 'antd';
import { useDispatch } from 'react-redux';


//@ts-ignore
const OverAllStockTable = ({ data }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [filteredData, setFilteredData] = useState(data || []);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState();
  // ... (other state variables)

  const getColumnSearchProps = (dataIndex: string, columnTitle: string) => ({
    // ... (previous implementation)
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



  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a: { id: number }, b: { id: number }) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Opening Balance',
        dataIndex: 'original_stock',
        key: 'original_stock',
        ...getColumnSearchProps('original_stock', 'Opening Balance'),
      },
    {
      title: 'Balance On  Hand',
      dataIndex: 'quantity_in_stock',
      key: 'quantity_in_stock',
      ...getColumnSearchProps('quantity_in_stock', 'Quantity'),
    },
    {
      title: 'Batch Number',
      dataIndex: 'batch_number',
      key: 'batch_number',
      ...getColumnSearchProps('batch_number', 'Batch Number'),
    },
    {
      title: 'Condom Type',
      dataIndex: 'condom_id',
      key: 'condom_id',
      ...getColumnSearchProps('condom_id', 'Category'),
      render: (condom: any) => condom[0]?.type,
    },
    {
      title: 'Condom Brand',
      dataIndex: 'condom_id',
      key: 'condom_id',
      ...getColumnSearchProps('condom_id', 'Condom Brand'),
      render: (condom: any) => condom[0]?.brand,
    },
    {
        title: 'District',
        dataIndex: 'organization_unit_stocking',
        key: 'organization_unit_stocking',
        ...getColumnSearchProps('organization_unit_stocking', 'District'),
        render: (data: any) => data?.district,
      },
      {
        title: 'Region',
        dataIndex: 'organization_unit_stocking',
        key: 'organization_unit_stocking',
        ...getColumnSearchProps('organization_unit_stocking', 'District'),
        render: (data: any) => data?.region,
      },
    {
      title: 'Date Stocked',
      dataIndex: 'date_of_creation',
      key: 'date_of_creation',
      ...getColumnSearchProps('date_of_creation', 'Created At'),
    }
  ];

  const handleTableChange = (
    pagination: any,
    filters: { [x: string]: any },
    sorter: { field: any; order?: any }
  ) => {
    // ... (previous implementation)
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
          Array.isArray(data)
            ? data.map((item) => ({ ...item, key: item.id }))
            : []
        }
        pagination={{ defaultPageSize: 10 }}
        //@ts-ignore
        onChange={handleTableChange}
      />
    </>
  );
};

export default OverAllStockTable;
