//@ts-nocheck

import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import {
  addCondomInventory,
  addCondoms,
  getCondomInventory,
  getCondoms,
  getUnits,
  updateCondomInventory,
} from '../../../api/apiRequests';
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Select, Spin } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import CustomInput from '../../../common/input';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  displayErrorMessage,
  displaySuccessMessage,
} from '../../../components/toast/Toast';
import CustomSelect from '../../../common/select';
import InventoryTable from '../../../components/InventoryTable';
import { useDispatch, useSelector } from 'react-redux';
import { cancelEdit } from '../../../redux/slices/condom';
const CondomInventory = () => {
  const [quantity, setQuantity] = useState(null);
  const [batch, setBatch] = useState('');
  const [unitCost, setUnitCost] = useState('');
  const [unit, setUnits] = useState('');
  const [date, setDate] = useState('');
  const [orgId, setOrgId] = useState('');
  const [type, setType] = useState('');

  const [condom, setCondom] = useState('');
  const { edit, id } = useSelector((state: any) => state.condom);
  const [data, setData] = useState();
  const [size, setSize] = useState<SizeType>('large'); // default is 'middle'
  const [modalOpen, setModalOpen] = useState(false);
  const [unitData, setUnitData] = useState([]);
  const [condomData, setCondomData] = useState([]);
  const dispatch = useDispatch();
  const [total, setTotal] = useState();

  const inventoryQuery = useQuery({
    queryKey: ['inventory'],
    queryFn: () => getCondomInventory(),
  });

  const unitsQuery = useQuery({
    queryKey: ['unit'],
    queryFn: () => getUnits(),
  });

  const condomsQuery = useQuery({
    queryKey: ['condom'],
    queryFn: () => getCondoms(),
  });

  useEffect(() => {
    if (unitsQuery.isSuccess) {
      setUnitData(unitsQuery.data);
    }
  }, [unitsQuery.isSuccess, unitsQuery.data]);

  useEffect(() => {
    if (condomsQuery.isSuccess) {
      setCondomData(condomsQuery.data);
    }
  }, [condomsQuery.isSuccess, condomsQuery.data]);

  useEffect(() => {
    if (inventoryQuery.isSuccess) {
      setData(inventoryQuery.data);
    }
  }, [inventoryQuery.isSuccess, inventoryQuery.data]);

  console.log(data, '====');

  const handleInputChange =
    (setState: (arg0: any) => void) => (event: { target: { value: any } }) => {
      setState(event.target.value);
    };

  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: addCondomInventory,
    onSuccess: (data: any) => {
      queryClient.setQueryData(['inventory'], data);
      queryClient.invalidateQueries(['inventory'], { exact: true });
      setBatch('');
      setQuantity(null);
      setUnitCost('');
      setDate('');
      setOrgId('');
      setUnits('');
      setCondom('');
      if (data.code == '401') {
        displayErrorMessage(`${data.message}`);
      }
      if (data.code == '201') {
        setModalOpen(false);
        displaySuccessMessage('Condom  stock created');
      }
    },
  });

  const createEditMutation = useMutation({
    //@ts-ignore
    mutationFn: updateCondomInventory,
    onSuccess: (data: any) => {
      queryClient.setQueryData(['inventory'], data);
      queryClient.invalidateQueries(['inventory'], { exact: true });
      console.log(data);
      if (data.code == '401') {
        displayErrorMessage(`${data.message}`);
      }
      if (data.code == '201') {
        dispatch(cancelEdit());
        displaySuccessMessage('Condom  stock updated');
      }
    },
  });

  //@ts-ignore
  const info = JSON.parse(window.localStorage.getItem('userData'));

  const createInventory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPostMutation.mutate({
      condom_id: condom,
      quantity: quantity,
      unit_of_measure_id: unit,
      unit_cost: unitCost,
      date_of_delivery: date,
      organization_unit_id: orgId,
      batch_number: batch,
      user_id: info.user.id,
    });
  };

  const editInventory = (id: string) => {
    console.log(id);
    //@ts-ignore
    const data = {
      quantity: quantity,
      organization_unit_id: orgId,
      unit_of_measure_id: unit,
      submitted_type: type,
    };

    createEditMutation.mutate({ data, id });
  };

  const downloadExcel = () => {
    const workbook = XLSX.utils.book_new();

    // Create a new worksheet
    //@ts-ignore
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Convert the workbook to an Excel file
    const excelFile = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Convert the Excel file to a Blob
    const blob = new Blob([excelFile], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    // Save the Blob as a file
    saveAs(blob, 'data.xlsx');
  };

  const typeData = [{ name: 'addition' }, { name: 'distribution' }];

  return (
    <>
      <div>
        <div className="bg-red-700 z-99999 flex items-center justify-between p-4 ">
          <div>
            <h3 className="text-lg font-bold">Condom Inventory</h3>
          </div>
          <div
            style={{ background: '' }}
            className="flex items-center justify-center space-x-4"
          >
            <div>
              <Button
                onClick={() => setModalOpen(true)}
                type="primary"
                icon={<PlusOutlined rev={undefined} />}
                size={size}
                style={{ backgroundColor: '#006D5B', color: 'white' }}
              >
                Add Stock
              </Button>
            </div>

            <div>
              <Button
                type="primary"
                style={{ backgroundColor: '#006D5B', color: 'white' }}
                icon={<DownloadOutlined />}
                size={size}
                onClick={() => downloadExcel(data)}
              >
                Export Excel
              </Button>
            </div>
          </div>
        </div>

        <div className="col-span-12 mt-10 xl:col-span-8">
          {condomsQuery.isLoading ? (
            <Spin tip="Loading Table data" size="large">
              <div className="content" />
            </Spin>
          ) : (
            <InventoryTable data={data} />
          )}
        </div>

        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          {/* <ChartOne />
                    <ChartTwo />
                    <ChartThree />
                    <MapOne /> */}
        </div>
      </div>

      <Modal
        title="Create Condom Inventory"
        centered
        open={modalOpen}
        //@ts-ignore
        onOk={createInventory}
        onCancel={() => setModalOpen(false)}
        width={1000}
        zIndex={10000000}
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
            onClick={createInventory}
          >
            OK
          </Button>,
        ]}
      >
        <form className="grid grid-cols-2 gap-2">
          <CustomInput
            onChange={handleInputChange(setQuantity)}
            value={quantity}
            placeholder="Enter quantity"
            label="Quantity"
            type="number"
            name="quantity"
          />
          <CustomInput
            onChange={handleInputChange(setBatch)}
            value={batch}
            placeholder="Enter batch number"
            label="Batch Number"
            type="text"
            name="batch"
          />
          <CustomSelect
            options={unitData}
            onChange={handleInputChange(setUnits)}
            value={unit}
            label="Units of Measure"
            name="units"
          />
          <CustomSelect
            options={condomData}
            onChange={handleInputChange(setCondom)}
            value={condom}
            label="Condom"
            name="condom"
          />
          <CustomInput
            onChange={handleInputChange(setUnitCost)}
            value={unitCost}
            placeholder="Enter unit cost"
            label="Unit Cost"
            type="number"
            name="unit_cost"
          />
          <CustomInput
            onChange={handleInputChange(setDate)}
            value={date}
            placeholder="Enter Delivery date"
            label="Delivery date"
            type="date"
            name="date"
          />
          <CustomInput
            onChange={handleInputChange(setOrgId)}
            value={orgId}
            placeholder="Enter organisation id"
            label="Organisation Id"
            type="number"
            name="orgId"
          />
        </form>
      </Modal>

      <Modal
        title="Manage Inventory Stock"
        centered
        open={edit}
        //@ts-ignore
        onOk={(e) => editInventory(id)}
        //@ts-ignore
        onCancel={() => dispatch(cancelEdit())}
        width={1000}
        zIndex={10000000}
        footer={[
          <Button
            key="back"
            onClick={() => dispatch(cancelEdit())}
            className=" text-customRed"
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            className="bg-black"
            onClick={(e) => editInventory(id)}
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
          />
          <CustomSelect
            options={unitData}
            onChange={handleInputChange(setUnits)}
            value={unit}
            label="Units of Measure"
            name="units"
          />
          <CustomInput
            onChange={handleInputChange(setOrgId)}
            value="orgId"
            placeholder="Enter organisation id"
            label="Organisation Id"
            type="number"
            name="orgId"
          />
          <CustomSelect
            options={typeData}
            onChange={handleInputChange(setType)}
            value={type}
            label="Submission type"
            name="type"
            type="text"
          />
        </form>
      </Modal>
    </>
  );
};

export default CondomInventory;
