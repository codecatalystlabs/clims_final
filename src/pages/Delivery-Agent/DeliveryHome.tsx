import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { addCondoms, getCondoms, getUnits } from '../../api/apiRequests';
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import CustomInput from '../../common/input';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { createUser } from '../../../api/createUserApi';
import {
  displayErrorMessage,
  displaySuccessMessage,
} from '../../components/toast/Toast';
import { useDispatch, useSelector } from 'react-redux';
import CustomSelect from '../../common/select';
import CondomItemDataTable from '../../components/CondomItem';
import { cancelEdit } from '../../redux/slices/condom';
import axios from 'axios';
import { TbTruckDelivery } from 'react-icons/tb';
import { MdOutlineLocalGroceryStore } from 'react-icons/md';

const DeliveryHome = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState();
  const [brand, setBrand] = useState();
  const [type, setType] = useState();
  const [unit, setUnits] = useState();
  const [data, setData] = useState();
  const [condom, setCondom] = useState(null);
  const [size, setSize] = useState<SizeType>('large'); // default is 'middle'
  const [modalOpen, setModalOpen] = useState(false);
  const [unitData, setUnitData] = useState([]);
  const [total, setTotal] = useState();

  const { edit, id } = useSelector((state: any) => state.condom);

  const condomsQuery = useQuery({
    queryKey: ['condom'],
    queryFn: () => getCondoms(),
  });

  const unitsQuery = useQuery({
    queryKey: ['unit'],
    queryFn: () => getUnits(),
  });

  useEffect(() => {
    if (unitsQuery.isSuccess) {
      setUnitData(unitsQuery.data);
    }
  }, [unitsQuery.isSuccess, unitsQuery.data]);

  useEffect(() => {
    if (condomsQuery.isSuccess) {
      setData(condomsQuery.data);
    }
  }, [condomsQuery.isSuccess, condomsQuery.data]);

  useEffect(() => {
    if (edit) {
      //@ts-ignore
      const condom = data?.filter((data) => data.id == id);
      setCondom(condom.length > 0 ? condom[0] : null);

      console.log(condom, '54545554545');
    }
  }, [edit, id]);

  const handleInputChange =
    (setState: (arg0: any) => void) => (event: { target: { value: any } }) => {
      setState(event.target.value);
    };

  const queryClient = useQueryClient();
  const createPostMutation = useMutation({
    mutationFn: addCondoms,
    onSuccess: (data: any) => {
      queryClient.setQueryData(['condom'], data);
      queryClient.invalidateQueries(['condom'], { exact: true });
      console.log(data);
      if (data.code == '401') {
        displayErrorMessage(`${data.message}`);
      }
      if (data.code == '201') {
        setModalOpen(false);
        displaySuccessMessage('Condom created');
      }
    },
  });

  const createCondom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPostMutation.mutate({
      category: category,
      brand: brand,
      unit_of_measure_id: unit,
      type: type,
    });
  };

  const genderData = [{ name: 'male' }, { name: 'female' }];

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

  const handleEditCondomItem = async () => {
    try {
      const res = await axios.put(
        `https://clims.health.go.ug/api/condoms/${id}`,
        {
          category: category,
          brand: brand,
          unit_of_measure_id: unit,
          type: type,
        }
      );

      if (res.data.code == '201') {
        displaySuccessMessage(res.data.message);
        setModalOpen(false);
      }
    } catch (error: any) {
      throw error;
    }
  };

  return (
    <>
      <div>
        <div className=" flex w-full justify-end space-x-8 p-6">
          <div className="flex flex-col items-center">
            <h2 className="text-center ">Received</h2>
            <div className="flex h-[35px] w-[35px] items-center justify-center rounded-md border-2 border-black">
              <MdOutlineLocalGroceryStore
                size={15}
                style={{ color: 'black' }}
              />
            </div>
            <p className="mt-2 text-[18px] font-extrabold">100</p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-center ">Delivered</h2>
            <div className="flex h-[35px] w-[35px] items-center justify-center rounded-md border-2 border-black">
              <TbTruckDelivery size={15} style={{ color: 'black' }} />
            </div>
            <p className="mt-2 text-[18px] font-extrabold">35</p>
          </div>
        </div>
        <div className="bg-red-700 z-99999 flex items-center justify-between p-4 ">
          <div>
            <h3 className="text-lg font-bold">Condoms Delivered</h3>
          </div>
          <div
            style={{ background: '' }}
            className="flex items-center justify-center space-x-4"
          >
            <div>
              <Button
                style={{ backgroundColor: '#006D5B', color: 'white' }}
                onClick={() => setModalOpen(true)}
                type="primary"
                icon={<PlusOutlined rev={undefined} />}
                size={size}
              >
                Add Delivery
              </Button>
            </div>

            <div>
              <Button
                type="primary"
                style={{ backgroundColor: '#006D5B', color: 'white' }}
                icon={<DownloadOutlined />}
                size={size}
                onClick={downloadExcel}
              >
                Export Excel
              </Button>
            </div>
          </div>
        </div>

        <div className="col-span-12 mt-10 xl:col-span-8">
          <CondomItemDataTable data={data} />
        </div>

        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          {/* <ChartOne />
                    <ChartTwo />
                    <ChartThree />
                    <MapOne /> */}
        </div>
      </div>
    </>
  );
};

export default DeliveryHome;
