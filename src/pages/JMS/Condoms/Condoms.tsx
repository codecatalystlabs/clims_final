import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';

import * as XLSX from 'xlsx';
import {
  addCondoms,
  getCondoms,
  getUnits,
  editCondom,
} from '../../../api/apiRequests';
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
import axios from 'axios';

const CondomJMS = () => {
  const dispatch = useDispatch();

  const [editingCondom, setEditingCondom] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [category, setCategory] = useState<string|null>();
  const [brand, setBrand] = useState<string|null>();
  const [type, setType] = useState<string|null>();
  const [unit_of_measure_id, setUnitOfMeasureId] = useState('no unit');
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
        setBrand(null)
        setCategory(null)
        setType(null)
        displayErrorMessage(`${data.message}`);
      }
      if (data.code == '201') {
        setModalOpen(false);
        setBrand(null)
        setCategory(null)
        setType(null)
        displaySuccessMessage('Condom created');
      }
    },
  });

  const createCondom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPostMutation.mutate({
      category,
      brand,
      unit_of_measure_id,
      type,
    });
    setBrand(null)
    setCategory(null)
    setType(null)
  };

  const genderData = [{ name: 'male' }, { name: 'female' }];

  const downloadExcel = () => {
    const workbook = XLSX.utils.book_new();
    //@ts-ignore
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelFile = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelFile], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, 'data.xlsx');
  };

  const handleEditCondomItem = async (id: any) => {
    try {
      const res = await axios.put(
        `https://clims.health.go.ug/api/condoms/${id}`,
        {
          category: category,
          brand: brand,
          unit_of_measure_id: unit_of_measure_id,
          type: type,
        }
      );

      console.log(res.data);

      if (res.data.code == '201') {
        displaySuccessMessage('Edit Successful');
        setModalOpen(false);
        setIsEditing(false);

        dispatch(cancelEdit());
      }
    } catch (error: any) {
      console.error('Error while editing condom item:', error);
    }
  };

  // const editCondomMutation = useMutation({
  //   mutationFn: (id: any, data: any) => (editCondom(id, data)),
  //   onSuccess: () => {
  //     setModalOpen(false);
  //     setIsEditing(false);
  //     setEditingCondom();

  //     displaySuccessMessage('Successfully Edited');
  //   },
  //   onError: (error) => {
  //     console.error('Error editing condom item:', error);

  //     displayErrorMessage('Failed to Edit');
  //   },
  // });

  // const handleEditCondomItem = async (id: any) => {
  //   if (editingCondom) {
  //     const data = {
  //       category: category,
  //       brand: brand,
  //       unit_of_measure_id: unit_of_measure_id,
  //       type: type,
  //     };

  //     editCondomMutation.mutateAsync({id, data});
  //   }
  // };
  const categories = [
    {
      value:"Male",
      label:"Male"
    },
    {
      value:"Female",
      label:"Female"
    }
  ]

  return (
    <>
      <div>
        <div className="bg-red-700 z-99999 flex items-center justify-between p-4 ">
          <div>
            <h3 className="text-lg font-bold">Condom Records</h3>
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
          <CondomItemDataTable
            data={data}
            setIsEditing={setIsEditing}
            setEditingCondom={setEditingCondom}
          />
        </div>

        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        </div>
      </div>

      <Modal
        title={'Add Condom Records  '}
        centered
        open={modalOpen}
        onOk={createCondom}
        onCancel={() => {
          setModalOpen(false);
          setIsEditing(false);
          setEditingCondom(null);
        }}
        width={1000}
        zIndex={10000000}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setModalOpen(false);
              setIsEditing(false);
              setEditingCondom(null);
            }}
            className=" text-customRed"
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            className="bg-black"
            onClick={createCondom}
          >
            OK
          </Button>,
        ]}
      >
        <form className="grid grid-cols-2 gap-2">
          <CustomInput
            defaultValue={editingCondom?.brand}
            onChange={handleInputChange(setBrand)}
            value={brand}
            placeholder="Enter Brand"
            label="Condom Brand"
            type="text"
            name="brand"
            act={false}
          />
          <CustomInput
            defaultValue={editingCondom?.type}
            onChange={handleInputChange(setType)}
            value={type}
            placeholder="Enter Condom Type"
            label="Condom Type"
            type="text"
            name="firstname"
            act={false}
          />
          <CustomSelect
            options={categories}
            onChange={handleInputChange(setCategory)}
            value={category}
            label="Category"
            name="units"
          />
        </form>
      </Modal>

      <Modal
        title="Edit Condom Item"
        centered
        open={edit}
        //@ts-ignore
        onOk={handleEditCondomItem(id)}
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
            onClick={handleEditCondomItem(id)}
          >
            OK
          </Button>,
        ]}
      >
        <form className="grid grid-cols-2 gap-2">
          <CustomInput
            defaultValue={editingCondom?.brand}
            onChange={handleInputChange(setBrand)}
            value={brand}
            placeholder="Enter Brand"
            label="Condom Brand"
            type="text"
            name="brand"
            act={false}
          />
          <CustomInput
            defaultValue={editingCondom?.type}
            onChange={handleInputChange(setType)}
            value={type}
            placeholder="Enter Condom Type"
            label="Condom Type"
            type="text"
            name="firstname"
            act={false}
          />
          <CustomSelect
            options={categories}
            onChange={handleInputChange(setCategory)}
            value={category}
            label="Category"
            name="units"
          />
        </form>
      </Modal>
    </>
  );
};

export default CondomJMS;
