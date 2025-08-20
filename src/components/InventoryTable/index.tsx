import React, { useState } from 'react';
//@ts-ignore
import { Table, Input, Button, Space, Modal } from 'antd';
import CustomInput from '../../common/input';
import { useDispatch } from 'react-redux';
import { makeEdit } from '../../redux/slices/condom';
import './style.css'


//@ts-ignore
const InventoryTable = ({ data }) => {
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

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a: { id: number }, b: { id: number }) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Quantity in stock',
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
      title: 'Category',
      dataIndex: 'condom_id',
      key: 'condom_id',
      ...getColumnSearchProps('condom_id', 'Category'),
      render: (condom: any) => condom[0]?.category,
    },

    {
      title: 'Condom Brand',
      dataIndex: 'condom_id',
      key: 'condom_id',
      ...getColumnSearchProps('condom_id', 'Condom Brand'),
      render: (condom: any) => condom[0]?.brand,
    },
    {
      title: 'Created At',
      dataIndex: 'date_of_creation',
      key: 'date_of_creation',
      ...getColumnSearchProps('date_of_creation', 'Created At'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text:any, record:any) => {
        const quantityInStock = record.quantity_in_stock || 0;
        return quantityInStock > 0 ? (
          <Space key={`actions-${record.id}`} size="middle">
            <Button
              style={{
                backgroundColor: '#006D5B',
                color: 'white',
                border: 'none',
              }}
              onClick={() => dispatch(makeEdit(record.id))}
              type="primary"
            >
              Distribute Stock
            </Button>
          </Space>
        ) : null;
      },
    },
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

      <Modal
        title="Create Condom Inventory"
        centered
        open={modalOpen}
        //@ts-ignore
        // onOk={createInventory}
        onCancel={() => setModalOpen(false)}
        width={1000}
        zIndex={10}
        footer={[
          <Button
            key="back"
            onClick={() => setModalOpen(false)}
            className=" text-customRed"
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            className="bg-black"
            // onClick={createInventory}
          >
            OK
          </Button>,
        ]}
      >
        <form className="grid grid-cols-2 gap-2">
          <CustomInput
            onChange={handleInputChange(setQuantity)}
            value="quantity"
            placeholder="Enter quantity"
            label="Quantity"
            type="number"
            name="quantity"
            defaultValue={undefined}
            act={false}
          />
          {/* ... (other form inputs) */}
        </form>
      </Modal>
    </>
  );
};

export default InventoryTable;
