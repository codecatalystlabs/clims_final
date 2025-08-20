import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { addCondoms, getCondoms, getUnits } from '../../../api/apiRequests';
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import CustomInput from '../../../common/input';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { createUser } from '../../../api/createUserApi';
import {
  displayErrorMessage,
  displaySuccessMessage,
} from '../../../components/toast/Toast';
import { useDispatch, useSelector } from 'react-redux';
import CustomSelect from '../../../common/select';
import CondomItemDataTable from '../../../components/CondomItem';
import { cancelEdit } from '../../../redux/slices/condom';
import RecordTable from './RecordTable';
import axios from 'axios';

const RecordTextOther = () => {
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

      // console.log(condom, '54545554545');
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
        `http://localhost:8000/api/condoms/${id}`,
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
        <div className="bg-red-700 z-99999 flex items-center justify-between p-4 ">
          <div>
            <h3 className="text-lg font-bold">Condoms Received</h3>
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
                Add Record
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
          <RecordTable data={data} />
        </div>

        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          {/* <ChartOne />
                    <ChartTwo />
                    <ChartThree />
                    <MapOne /> */}
        </div>
      </div>

      <Modal
        title={edit ? 'Edit Condom Item' : 'Record Quantity of Condoms'}
        centered
        open={modalOpen || edit}
        onOk={edit ? handleEditCondomItem : createCondom}
        onCancel={() => {
          setModalOpen(false);
          if (edit) {
            // Dispatch the editAction here
            dispatch(cancelEdit());
          }
        }}
        width={1000}
        zIndex={10000000}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setModalOpen(false);
              if (edit) {
                // Dispatch the editAction here
                dispatch(cancelEdit());
              }
            }}
            className=" text-customRed"
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            className="bg-black"
            onClick={edit ? handleEditCondomItem : createCondom}
          >
            OK
          </Button>,
        ]}
      >
        {edit ? (
          <form
            onSubmit={handleEditCondomItem}
            className="grid grid-cols-2 gap-2"
          >
            <CustomInput
              defaultValue={condom?.category}
              onChange={handleInputChange(setCategory)}
              value="category"
              placeholder="Enter Category"
              label="Condom Type"
              type="text"
              name="firstname"
            />
            {/* <CustomInput onChange={handleInputChange(setType)} value='type' placeholder='Enter type' label='Type' type='text' name="lastname" /> */}
            <CustomInput
              defaultValue={condom?.brand}
              onChange={handleInputChange(setBrand)}
              value="brand"
              placeholder="Enter the company brand"
              label="Company Brand"
              type="text"
              name="email"
            />
            <CustomSelect
              defaultValue={condom?.unit}
              options={unitData}
              onChange={handleInputChange(setUnits)}
              value="unit"
              label="Units of Measure"
              name="units"
            />

            <CustomInput
              onChange={handleInputChange(setBrand)}
              value="brand"
              placeholder="Enter number of condoms"
              label="Quantity"
              type="text"
              name="email"
            />
          </form>
        ) : (
          <form className="grid grid-cols-2 gap-2">
            <CustomInput
              onChange={handleInputChange(setCategory)}
              value="category"
              placeholder="Enter Category"
              label="Condom Type"
              type="text"
              name="firstname"
            />
            {/* <CustomInput onChange={handleInputChange(setType)} value='type' placeholder='Enter type' label='Type' type='text' name="lastname" /> */}
            <CustomInput
              defaultValue={condom?.brand}
              onChange={handleInputChange(setBrand)}
              value="brand"
              placeholder="Enter the company brand"
              label="Company Brand"
              type="text"
              name="email"
            />
            <CustomSelect
              options={unitData}
              onChange={handleInputChange(setUnits)}
              value="unit"
              label="Units of Measure"
              name="units"
            />

            <CustomInput
              onChange={handleInputChange(setBrand)}
              value="brand"
              placeholder="Enter number of condoms"
              label="Quantity"
              type="text"
              name="email"
            />
          </form>
        )}
      </Modal>
    </>
  );
};

export default RecordTextOther;
