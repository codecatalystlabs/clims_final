//@ts-nocheck

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import { Tabs } from 'antd';

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import {
  addCondomInventory,
  addCondoms,
  getCondomInventory,
  getCondoms,
  getUnits,
  updateCondomInventory,
  getStock,
  additionToStock,
  distributionToStock,
  getStockAtOrganization,
  getHotspots,
  getStockAtHotspots,
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
import axios from 'axios';
import Edit from './Edit';
import useLocalStorage from '../../../hooks/useLocalStorage';
import UploadFile from '../../../components/Upload';
import CondomDistribution from '../../../components/CondomDistribution';
import CondomDistributionSummary from '../CondomDistributionSummary';
import { exportToPDF } from '../../../utils/pdfDownload';
import { trimLastWord } from '../../../utils/trim';
import HotspotStock from '../../../components/HotspotStock';
import CondomUsageChart from '../../../components/CondomUsage';
import CondomUsed from '../../../components/CondomUsed';

const baseURL = 'https://clims.health.go.ug/api';
const { TabPane } = Tabs;

const CondomStock = () => {
  const [info, setInfo] = useLocalStorage('userData', {});
  const [quantity, setQuantity] = useState(null);
  const [batch, setBatch] = useState('');
  const [transacted_by, setTransactedBy] = useState(info?.user?.id);
  const [unitCost, setUnitCost] = useState('');
  const [unit, setUnits] = useState('');
  const [unit_of_measure_id, setUnitOfMeasureId] = useState('');
  const [date, setDate] = useState('');
  const [orgId, setOrgId] = useState('');
  const [type, setType] = useState(true);
  const [sender, setSenderId] = useState();
  const [recievingHotspot, setRecievingHotspot] = useState();
  const [condom_id, setCondomID] = useState('1');
  const [condom, setCondom] = useState('');
  const { edit, id } = useSelector((state: any) => state.condom);
  const [data, setData] = useState();
  const [evidenceFiles, setEvidenceFiles] = useState([]);

  const [size, setSize] = useState<SizeType>('large');
  const [modalOpen, setModalOpen] = useState(false);
  const [unitData, setUnitData] = useState([]);
  const [condomData, setCondomData] = useState([]);
  const dispatch = useDispatch();
  const [total, setTotal] = useState();
  const [newInventoryData, setNewInventoryData] = useState([]);
  const [hotSpots, setHotSpots] = useState([]);
  const [filteredHotspots, setFilteredHotSpots] = useState<any>([]);
  const [hotspotStock, setHotspotStock] = useState([]);

  const [files, setFiles] = useState([]);

  const senders = [
    {
      name: 'nms',
      value: 'nms',
    },
    {
      name: 'jms',
      value: 'jms',
    },
  ];
  const handleFileChange = (event) => {
    setFiles(Array.from(event?.target.files));
  };

  const hotspotQuery = useQuery({
    queryKey: ['hotspot'],
    queryFn: () => getHotspots(),
  });

  useEffect(() => {
    if (hotspotQuery.isSuccess) {
      setHotSpots(hotspotQuery.data);
    }
  }, [hotspotQuery.isSuccess, hotspotQuery.data]);

  const inventoryQuery = useQuery({
    queryKey: ['inventories'],
    queryFn: () => getStock(),
  });

  const unitsQuery = useQuery({
    queryKey: ['unit'],
    queryFn: () => getUnits(),
  });

  const condomsQuery = useQuery({
    queryKey: ['condom'],
    queryFn: () => getCondoms(),
  });

  const newCondomInventoryQuery = useQuery({
    queryKey: ['inventory'],
    queryFn: () => getStockAtOrganization(info?.user.organization_unit_id),
  });

  const hotspotStockQuery = useQuery({
    queryKey: ['hotspotStock'],
    queryFn: () => getStockAtHotspots(),
  });

  useEffect(() => {
    if (hotspotStockQuery.isSuccess) {
      setHotspotStock(hotspotStockQuery.data);
    }
  }, [hotspotStockQuery.isSuccess, hotspotStockQuery.data]);


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
    if (newCondomInventoryQuery.isSuccess) {
      setNewInventoryData(newCondomInventoryQuery.data);
    }
  }, [newCondomInventoryQuery.isSuccess, newCondomInventoryQuery.data]);

  useEffect(() => {
    if (inventoryQuery.isSuccess) {
      setData(inventoryQuery.data);
    }
  }, [inventoryQuery.isSuccess, inventoryQuery.data]);

  const handleInputChange =
    (setState: (arg0: any) => void) => (event: { target: { value: any } }) => {
      setState(event.target.value);
    };

  useEffect(() => {
    const userLocation = info?.user?.district;

    const filteredData = (hotSpots ?? []).filter((item: { district: string }) =>
      item.district?.toLowerCase().includes(trimLastWord(userLocation).toLowerCase())
    );

    setFilteredHotSpots(filteredData);
  }, [hotSpots]);

  const queryClient = useQueryClient();

  // console.log('jjj', filteredHotspots);

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

  //@ts-ignore

  const createEditMutation = useMutation({
    //@ts-ignore
    mutationFn: distributionToStock,
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
  const distributeStock = (id: string) => {
    const formData = new FormData();

    formData.append('condom_id', condom);
    evidenceFiles.forEach((file) => {
      formData.append('evidence_files[]', file);
    });
    formData.append('quantity', quantity);
    formData.append('date_of_delivery', date);
    formData.append(
      'organization_unit_stocking',
      info.user.organization_unit_id
    );
    formData.append('transacted_by', info.user.id);
    formData.append('sending_organization_unit', info.user.organization_unit_id);
    formData.append('receiving_organization_unit', recievingHotspot);
    formData.append('stockIdProp', id);

    createEditMutation.mutate(formData);
  };

  const createInventory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('condom_id', condom);
    evidenceFiles.forEach((file) => {
      formData.append('evidence_files[]', file);
    });
    formData.append('quantity', quantity);
    formData.append('date_of_delivery', date);
    formData.append(
      'organization_unit_stocking',
      info.user.organization_unit_id
    );
    formData.append('transacted_by', info.user.id);
    formData.append('sending_organization_unit', sender);
    formData.append('batch_number', batch);


    createPostMutation.mutate(formData);
  };

  const downloadExcel = () => {
    const workbook = XLSX.utils.book_new();

    //@ts-ignore
    const worksheet = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const excelFile = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const blob = new Blob([excelFile], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    saveAs(blob, 'data.xlsx');
  };

  const typeData = [{ name: 'addition' }, { name: 'distribution' }];

  // console.log(data, '===');

  const filteredData = Array.isArray(data)
    ? data.filter((stock) =>
        stock?.organization_unit_stocking.some(
          (unit) => unit.uid == info?.user.organization_unit_id
        )
      )
    : [];
    console.log(hotspotStock,"++++++>>>>>>>>")
    const filteredHotspotStock = Array.isArray(hotspotStock)
    ? hotspotStock.filter((stock) =>trimLastWord(stock?.hotspot_id.district).toLowerCase() === trimLastWord(info?.user.district).toLowerCase()
      )
    : [];
    console.log(filteredHotspotStock,"<<<<<<<<<<<<<<<++++++>>>>>>>>")



  const editStockMutation = useMutation({
    mutationFn: (id, data) =>
      type ? additionToStock(id, data) : distributionToStock(id, data),
    onSuccess: () => {
      setQuantity(null);
      setUnitOfMeasureId('');
      setTransactedBy('');
      dispatch(cancelEdit());
      queryClient.invalidateQueries(['inventory']);
      displaySuccessMessage('Successfully Edited');

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
    onError: (error) => {
      console.error('Error editing stock:', error);

      queryClient.setQueryData(
        ['errorMessage'],
        'Failed to edit stock. Please try again.'
      );

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
  });



  const newInventory = Array.isArray(newInventoryData) ? newInventoryData : [];
  const distributionData = newInventory
    .filter((item) => item.distributions && item.distributions.length > 0)
    .flatMap((item) => item.distributions);
  console.log(recievingHotspot, 'DSESRSGSSSS');

  const transformedCondomOptions = condomData.map((item) => ({
    value: item.id, 
    label: `Category: ${item.category}, Brand: ${item.brand}, Type: ${item.type}`
  }));



  return (
    <>
      <div>
        <div className="bg-red-700 z-99999 flex items-center justify-between p-4 ">
          <div>
            <h3 className="text-lg font-bold">My Stock On Hand</h3>
          </div>
        </div>

        <div className="col-span-12 mt-10 xl:col-span-8">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Condom Distribution Summary" key="1">
              {condomsQuery.isLoading ? (
                <Spin tip="Loading Table data" size="large">
                  <div className="content" />
                </Spin>
              ) : (
                <CondomDistributionSummary data={newInventoryData} />
              )}
            </TabPane>
            <TabPane tab="Condoms At Hand" key="2">
              {condomsQuery.isLoading ? (
                <Spin tip="Loading Table data" size="large">
                  <div className="content" />
                </Spin>
              ) : (
                <div>
                  <div
                    style={{ background: '' }}
                    className="mb-5 flex items-center justify-end space-x-4"
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

                    {/* <div>
                      <Button
                        type="primary"
                        style={{ backgroundColor: '#006D5B', color: 'white' }}
                        icon={<DownloadOutlined />}
                        size={size}
                        onClick={() => downloadExcel(newInventoryData)}
                      >
                        Export Excel
                      </Button>
                    </div> */}
                  </div>
                  <InventoryTable data={newInventoryData} />
                </div>
              )}
            </TabPane>
            <TabPane tab="Condoms Distributed" key="3">
              {condomsQuery.isLoading ? (
                <Spin tip="Loading Table data" size="large">
                  <div className="content" />
                </Spin>
              ) : (
                <div>
                  <div
                    style={{ background: '' }}
                    className="mb-5 flex items-center justify-end space-x-4"
                  >
                    <div>
                      <Button
                        type="primary"
                        style={{ backgroundColor: '#006D5B', color: 'white' }}
                        icon={<DownloadOutlined />}
                        size={size}
                        onClick={() => downloadExcel(distributionData)}
                      >
                        Export Excel
                      </Button>
                    </div>
                  </div>
                  <CondomDistribution data={distributionData} />
                </div>
              )}
            </TabPane>
            <TabPane tab="Condom Stock History At Hotspots" key="4">
              {condomsQuery.isLoading ? (
                <Spin tip="Loading Table data" size="large">
                  <div className="content" />
                </Spin>
              ) : (
                <div>
                  <div
                    style={{ background: '' }}
                    className="mb-5 flex items-center justify-end space-x-4"
                  >
                    <div>
                      <Button
                        type="primary"
                        style={{ backgroundColor: '#006D5B', color: 'white' }}
                        icon={<DownloadOutlined />}
                        size={size}
                        onClick={() => downloadExcel(distributionData)}
                      >
                        Export Excel
                      </Button>
                    </div>
                  </div>
                  <HotspotStock data={filteredHotspotStock} />
                </div>
              )}
            </TabPane>
            <TabPane tab="Condom Usage At Hotspots" key="5">
              {condomsQuery.isLoading ? (
                <Spin tip="Loading Table data" size="large">
                  <div className="content" />
                </Spin>
              ) : (
                <div>
                  <div
                    style={{ background: '' }}
                    className="mb-5 flex items-center justify-end space-x-4"
                  >
                    <div>
                      <Button
                        type="primary"
                        style={{ backgroundColor: '#006D5B', color: 'white' }}
                        icon={<DownloadOutlined />}
                        size={size}
                        onClick={() => downloadExcel(distributionData)}
                      >
                        Export Excel
                      </Button>
                    </div>
                  </div>
                  <CondomUsed data={filteredHotspotStock} />
                </div>
              )}
            </TabPane>
          </Tabs>
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
            Add stock
          </Button>,
        ]}
      >
        <form>
          <div className="grid grid-cols-2 gap-2">
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
            <CustomSelect
              options={senders}
              onChange={handleInputChange(setSenderId)}
              value={sender}
              label="Warehouse"
              name="sender"
            />
          </div>
          <div className="w-full">
            <CustomInput
              onChange={(e) => setEvidenceFiles([...e.target.files])}
              value={evidenceFiles}
              label="Evidence "
              type="file"
              name="evidenceFiles"
              multiple
            />
          </div>
        </form>
      </Modal>

      <Modal
        title=" Distribute Stock"
        centered
        open={edit}
        //@ts-ignore
        onOk={(e) => distributeStock(id)}
        //@ts-ignore
        onCancel={() => dispatch(cancelEdit())}
        width={600}
        zIndex={100000}
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
            onClick={(e) => distributeStock(id)}
          >
            OK
          </Button>,
        ]}
      >
        <Edit
          quantity={quantity}
          unit_of_measure_id={unit_of_measure_id}
          handleInputChange={handleInputChange}
          setQuantity={setQuantity}
          setUnitOfMeasureId={setUnitOfMeasureId}
          setType={setType}
        />

        <CustomSelect
          options={filteredHotspots}
          onChange={handleInputChange(setRecievingHotspot)}
          value={recievingHotspot}
          label="Recieving Hotspot"
          name="recievingHotspot"
        />

        <CustomInput
          onChange={handleInputChange(setDate)}
          value={date}
          label="Date of Distribution"
          type="date"
          name="date"
        />

        <div className="w-full">
          <CustomInput
            onChange={(e) => setEvidenceFiles([...e.target.files])}
            value={evidenceFiles}
            label="Evidence "
            type="file"
            name="evidenceFiles"
            multiple
          />
        </div>
      </Modal>
    </>
  );
};

export default CondomStock;
