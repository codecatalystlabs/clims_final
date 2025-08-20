


import React, { useState } from 'react';
//@ts-ignore
import { Table, Input, Button, Space, Modal } from 'antd';
import CustomInput from '../../common/input';
import { useDispatch } from 'react-redux';
import { makeEdit } from '../../redux/slices/condom';
import { Tabs, Spin, List, Typography } from 'antd';



//@ts-ignore
const CondomDistribution = ({ data }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [filteredData, setFilteredData] = useState(data || []);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState();
  // ... (other state variables)

  const storedUserData: any = localStorage.getItem('userData');

  // Parse the JSON string to convert it back to an object
  const userInfo = JSON.parse(storedUserData);

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

  // const deleteCondomMutation = useMutation({
  //   mutationFn: deleteCondomInventory,
  //   onSuccess: (data) => {
  //     queryClient.setQueryData(['inventory'], data);
  //     queryClient.invalidateQueries(['inventory'], { exact: true });
  //     displaySuccessMessage('inventory deleted');
  //   },
  // });

  // const handleDeleteInventory = (id: any) => {
  //   deleteCondomMutation.mutate(id);
  // };

  console.log(userInfo,"am infooooo")

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Quantity Distributed',
      dataIndex: 'transaction_quantity',
      key: 'transaction_quantity',
    },
    {
      title: 'Distribution Date',
      dataIndex: 'transaction_date',
      key: 'transaction_date',
    },
    {
      title: 'Balance on Hand',
      dataIndex: 'balance_on_hand',
      key: 'balance_on_hand',
    },
    {
      title: 'Received By',
      dataIndex: 'receiving_organization_unit',
      key: 'receiving_organization_unit',
      render: (receiver:any) =>userInfo?.user?.role==="dfcp"?receiver[0]?.name:receiver[0]?.district
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
        pagination={{ defaultPageSize: 20 }}
        //@ts-ignore
        onChange={handleTableChange}
      />
    </>
  );
};

export default CondomDistribution;
