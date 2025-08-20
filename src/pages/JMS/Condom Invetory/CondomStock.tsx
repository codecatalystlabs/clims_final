//@ts-nocheck

import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import {
  addCondomInventory,
  addCondoms,
  distributionToStock,
  getCondomInventory,
  getCondoms,
  getDistrictsForRegion,
  getRegions,
  getStockAtHotspots,
  getStockAtOrganization,
  getUnits,
  updateCondomInventory,
} from '../../../api/apiRequests';
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Select, Spin } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import CustomInput from '../../../common/input';
import { Tabs } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  displayErrorMessage,
  displaySuccessMessage,
} from '../../../components/toast/Toast';
import CustomSelect from '../../../common/select';
import InventoryTable from '../../../components/InventoryTable';
import { useDispatch, useSelector } from 'react-redux';
import { cancelEdit } from '../../../redux/slices/condom';
import CondomDistribution from '../../../components/CondomDistribution';
import CondomDistributionSummary from '../CondomDistributionSummary';
import HotspotStock from '../../../components/HotspotStock';
import CondomUsed from '../../../components/CondomUsed';

const { TabPane } = Tabs;

const CondomStockJMS = () => {
  const [quantity, setQuantity] = useState(null);
  const [batch, setBatch] = useState('');
  const [unitCost, setUnitCost] = useState('');
  const [unit, setUnits] = useState('');
  const [date, setDate] = useState('');
  const [orgId, setOrgId] = useState('');
  const [type, setType] = useState('');
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [region, setRegion] = useState();
  const [district, setDistrict] = useState([]);
  const [evidenceFiles, setEvidenceFiles] = useState([]);

  const [condom, setCondom] = useState('');
  const { edit, id } = useSelector((state: any) => state.condom);
  const [data, setData] = useState();
  const [size, setSize] = useState<SizeType>('large');
  const [modalOpen, setModalOpen] = useState(false);
  const [unitData, setUnitData] = useState([]);
  const [condomData, setCondomData] = useState([]);
  const [newInventoryData, setNewInventoryData] = useState([]);
  const dispatch = useDispatch();
  const [total, setTotal] = useState();
  const [files, setFiles] = useState([]);
  const [hotspotStock, setHotspotStock] = useState([]);


  const storedUserData: any = localStorage.getItem('userData');

  const inventoryQuery = useQuery({
    queryKey: ['inventory'],
    queryFn: () => getCondomInventory(),
  });

  const newCondomInventoryQuery = useQuery({
    queryKey: ['newInventory'],
    queryFn: () => getStockAtOrganization('jms'),
  });

  const unitsQuery = useQuery({
    queryKey: ['unit'],
    queryFn: () => getUnits(),
  });

  const hotspotStockQuery = useQuery({
    queryKey: ['hotspotStock'],
    queryFn: () => getStockAtHotspots(),
  });

  const regionsQuery = useQuery({
    queryKey: ['region'],
    queryFn: () => getRegions(),
  });

  const districtQuery = useQuery({
    queryKey: ['district', region],
    queryFn: () => getDistrictsForRegion(region),
  });

  const condomsQuery = useQuery({
    queryKey: ['condom'],
    queryFn: () => getCondoms(),
  });

  useEffect(() => {
    if (newCondomInventoryQuery.isSuccess) {
      setNewInventoryData(newCondomInventoryQuery.data);
    }
  }, [newCondomInventoryQuery.isSuccess, newCondomInventoryQuery.data]);

  useEffect(() => {
    if (unitsQuery.isSuccess) {
      setUnitData(unitsQuery.data);
    }
  }, [unitsQuery.isSuccess, unitsQuery.data]);

  useEffect(() => {
    if (regionsQuery.isSuccess) {
      setRegions(regionsQuery.data);
    }
  }, [regionsQuery.isSuccess, regionsQuery.data]);

  useEffect(() => {
    if (districtQuery.isSuccess) {
      setDistricts(districtQuery.data);
    }
  }, [districtQuery.isSuccess, districtQuery.data]);

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
  useEffect(() => {
    if (hotspotStockQuery.isSuccess) {
      setHotspotStock(hotspotStockQuery.data);
    }
  }, [hotspotStockQuery.isSuccess, hotspotStockQuery.data]);


  const handleInputChange =
    (setState: (arg0: any) => void) => (event: { target: { value: any } }) => {
      setState(event.target.value);
    };

  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: addCondomInventory,
    onSuccess: (data: any) => {
      queryClient.setQueryData(['newInventory'], data);
      queryClient.invalidateQueries(['newInventory'], { exact: true });
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
    mutationFn: distributionToStock,
    onSuccess: (data: any) => {
      queryClient.setQueryData(['newInventory'], data);
      queryClient.invalidateQueries(['newInventory'], { exact: true });
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
      date_of_delivery: date,
      batch_number: batch,
      organization_unit_stocking: 'jms',
      transacted_by: info.user.id,
      receiving_organization_unit: 'jms',
      receiving_organization_unit_level: 'jms',
    });
  };

  const editInventory = (id: string) => {
    //@ts-ignore
    // const data = {
    //   quantity: quantity,
    //   receiving_organization_unit: district,
    //   sending_organization_unit: 'jms',
    //   receiving_organization_unit_level: district,
    //   transacted_by: info.user.id,
    //   date_of_delivery: date,
    //   evidence_files: evidenceFiles,
    // };

    const formData = new FormData();


    formData.append('condom_id', condom);
    evidenceFiles.forEach((file) => {
      formData.append('evidence_files[]', file);
    });
    formData.append('quantity', quantity);
    formData.append('date_of_delivery', date);
    formData.append('receiving_organization_unit',district);
    formData.append('receiving_organization_unit_level',district);
    formData.append('transacted_by', info.user.id);
    formData.append('sending_organization_unit', "jms");
    formData.append('stockIdProp', id);


    createEditMutation.mutate(formData);
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

  const inventoryArray = Array.isArray(newInventoryData)
    ? newInventoryData
    : [];

  const distributionData = inventoryArray
    ?.filter((item) => item?.distributions && item?.distributions.length > 0)
    .flatMap((item) => item?.distributions);



    const transformedCondomOptions = condomData.map((item) => ({
      value: item.id, 
      label: `Category: ${item.category}, Brand: ${item.brand}, Type: ${item.type}`
    }));

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

        <Tabs defaultActiveKey="0">
        <TabPane tab="Condom Distribution Summary" key="0">
            {condomsQuery?.isLoading ? (
              <Spin tip="Loading Table data" size="large">
                <div className="content" />
              </Spin>
            ) : (
              <CondomDistributionSummary data={newInventoryData} />
            )}
          </TabPane>
          <TabPane tab="Condoms At Hand" key="1">
            {condomsQuery?.isLoading ? (
              <Spin tip="Loading Table data" size="large">
                <div className="content" />
              </Spin>
            ) : (
              <InventoryTable data={newInventoryData} />
            )}
          </TabPane>
          <TabPane tab="Condoms Distributed" key="2">
            {condomsQuery?.isLoading ? (
              <Spin tip="Loading Table data" size="large">
                <div className="content" />
              </Spin>
            ) : (
              <CondomDistribution data={distributionData} />
            )}
          </TabPane>
          <TabPane tab="Condom Stock History At Hotspots" key="3">
            {condomsQuery?.isLoading ? (
              <Spin tip="Loading Table data" size="large">
                <div className="content" />
              </Spin>
            ) : (
              <HotspotStock data={hotspotStock} />
            )}
          </TabPane>
          <TabPane tab="Condom Usage At Hotspots" key="4">
            {condomsQuery?.isLoading ? (
              <Spin tip="Loading Table data" size="large">
                <div className="content" />
              </Spin>
            ) : (
              <CondomUsed data={hotspotStock} />
            )}
          </TabPane>
        </Tabs>
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
            create stock
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
            options={transformedCondomOptions}
            onChange={handleInputChange(setCondom)}
            value={condom}
            label="Condom"
            name="condom"
            type="text"
          />

          <CustomInput
            onChange={handleInputChange(setDate)}
            value={date}
            placeholder="Enter Delivery date"
            label="Delivery date"
            type="date"
            name="date"
          />
        </form>
      </Modal>

      <Modal
        title="Manage  Stock Distribution"
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
            className="text-[#ff0040]"
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            className="bg-black"
            onClick={(e) => editInventory(id)}
          >
            distribute
          </Button>,
        ]}
      >
        <form className="grid md:grid-cols-2 gap-2">
          <CustomInput
            onChange={handleInputChange(setQuantity)}
            value="quantity"
            placeholder="Enter quantity"
            label="Quantity"
            type="number"
            name="quantity"
          />
          <CustomSelect
            options={regions}
            onChange={handleInputChange(setRegion)}
            value={region}
            label="Region"
            name="regions"
          />
          <CustomInput
            onChange={handleInputChange(setDate)}
            value={date}
            label="Date of Distribution"
            type="date"
            name="date"
          />
          <CustomSelect
            options={districts}
            onChange={handleInputChange(setDistrict)}
            value={district}
            label="Receiving District"
            name="district"
          />

          <CustomInput
            onChange={(e) => setEvidenceFiles([...e.target.files])}
            value={evidenceFiles}
            label="Evidence "
            type="file"
            name="evidenceFiles"
            multiple
          />
        </form>
      </Modal>
    </>
  );
};

export default CondomStockJMS;
