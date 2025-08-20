// import CustomPicker from '../../common/datepicker';
// import { useEffect, useState } from 'react';
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import {
//   createOrder,
//   getDistrictsForRegion,
//   getHotspots,
//   getOrders,
//   getRegions,
// } from '../../api/apiRequests';
// import { Button, Modal, Select } from 'antd';
// import CustomInput from '../../common/input';
// import { displaySuccessMessage } from '../../components/toast/Toast';
// import type { SizeType } from 'antd/es/config-provider/SizeContext';
// import DistributionTable from '../../components/MOH/DistributionTable';
// import { DownloadOutlined } from '@ant-design/icons';

// import { items, orgs } from '../../constants';
// const { Option } = Select;

// const MyOrders = () => {
//   const ID = localStorage.getItem('id');
//   const [size, setSize] = useState<SizeType>('middle'); // default is 'middle'

//   const [dataArray, setData] = useState<any>([]);
//   const [orders, setOrders] = useState<any>([]);
//   const [loc, setLoc] = useState<any | undefined>('');
//   const [modalOpen, setModalOpen] = useState(false);
//   const [ordered_for, setOrderedFor] = useState<any>(null);
//   const [ordered_from, setOrderedFrom] = useState<any>(null);
//   const [quantity_needed, setQuantityNeeded] = useState<any>(null);
//   const [unit, setUnit] = useState<string>('');
//   const [ordered_by, setOrderedBy] = useState<any>(ID);
//   const [userID, setUserID] = useState<any>(null);
//   const [visible, setVisible] = useState(false);
//   const [title, setTitle] = useState<string>('National Level');
//   const [showComp, setShowComp] = useState(1);
//   const [regions, setRegions] = useState<any>([]);
//   const [uid, setUid] = useState('');
//   const [districts, setDistricts] = useState<any>([]);

//   const queryClient = useQueryClient();

//   const ordersQuery = useQuery({
//     queryKey: ['orders'],
//     queryFn: () => getOrders(),
//   });

//   const regionsQuery = useQuery({
//     queryKey: ['regions'],
//     queryFn: () => getRegions(),
//   });

//   const districtsQuery = useQuery({
//     queryKey: ['districts'],
//     queryFn: () => getDistrictsForRegion(uid),
//   });

//   const hotspotQuery = useQuery({
//     queryKey: ['hotspot'],
//     queryFn: () => getHotspots(),
//   });

//   useEffect(() => {
//     if (districtsQuery.isSuccess) {
//       setDistricts(districtsQuery.data);
//     }
//   }, [districtsQuery.isSuccess, districtsQuery.data]);

//   useEffect(() => {
//     if (regionsQuery.isSuccess) {
//       setRegions(regionsQuery.data);
//     }
//   }, [regionsQuery.isSuccess, regionsQuery.data]);

//   // console.log(regions, '>>>>>>>>>>>>>>>>>');

//   useEffect(() => {
//     if (hotspotQuery.isSuccess) {
//       setData(hotspotQuery.data);
//     }
//   }, []);

//   useEffect(() => {
//     const location = localStorage.getItem('location');
//     setLoc(location);
//   }, []);

//   useEffect(() => {
//     if (ordersQuery.isSuccess) {
//       setOrders(ordersQuery.data);
//     }
//   }, [ordersQuery.isSuccess, ordersQuery.data]);

//   //am filtering basing on district
//   let filteredData = dataArray?.filter((el: any) => {
//     return el.district === 'kampala';
//   });

//   const createOrderMutation = useMutation({
//     mutationFn: createOrder,
//     onSuccess: (data) => {
//       queryClient.setQueryData(['order'], data);
//       queryClient.invalidateQueries(['order'], { exact: true });

//       if (data.code == '201' || data.code == '200') {
//         displaySuccessMessage('order created ');
//         setModalOpen(false);
//       }
//     },
//   });

//   //action functions

//   const handleCreateOrder = () => {
//     createOrderMutation.mutate({
//       ordered_from,
//       ordered_by,
//       unit,
//       quantity_needed,
//       ordered_for,
//     });
//   };

//   const handleInputChange =
//     (setState: (arg0: any) => void) => (event: { target: { value: any } }) => {
//       setState(event.target.value);
//       console.log(event.target.value);
//     };

//   return (
//     <>
//       <div className="float-right flex flex-col">
//         {' '}
//         <div className="float-right flex">
//           <Button
//             style={{
//               backgroundColor: '#006D5B',
//               color: 'white',
//               border: 'none',
//             }}
//             type="primary"
//             icon={<DownloadOutlined rev={undefined} />}
//             size={size}
//           >
//             Export PDF
//           </Button>
//         </div>
//         <div>
//           <div className="my-4 flex items-center justify-between space-x-2">
//             <div>
//               <p>Range </p>
//               <CustomPicker />
//             </div>
//             <div>
//               <p>Choose region </p>
//               <Select
//                 showSearch
//                 onClick={() => setVisible(!visible)}
//                 style={{
//                   width: 150,
//                 }}
//                 placeholder="Search to Select"
//                 optionFilterProp="children"
//                 filterOption={(input, option) =>
//                   (option?.label ?? '').includes(input)
//                 }
//                 filterSort={(optionA, optionB) =>
//                   (optionA?.label ?? '')
//                     .toLowerCase()
//                     .localeCompare((optionB?.label ?? '').toLowerCase())
//                 }
//                 onSelect={(value, option: any) => {
//                   setUid(option.key);
//                   setTitle(option.children);
//                   setShowComp(value);
//                   setVisible(false);
//                 }}
//               >
//                 {regions.map((data: any) => (
//                   <Option
//                     key={data.region_uid}
//                     // onClick={() => handleOptionClick(data.region_uid)}
//                     value={data.name}
//                   >
//                     {data.region}
//                   </Option>
//                 ))}
//               </Select>
//             </div>

//             <div>
//               <p>Choose district </p>
//               <Select
//                 showSearch
//                 onClick={() => setVisible(!visible)}
//                 style={{
//                   width: 150,
//                 }}
//                 placeholder="Search to Select"
//                 optionFilterProp="children"
//                 filterOption={(input, option) =>
//                   (option?.label ?? '').includes(input)
//                 }
//                 filterSort={(optionA, optionB) =>
//                   (optionA?.label ?? '')
//                     .toLowerCase()
//                     .localeCompare((optionB?.label ?? '').toLowerCase())
//                 }
//                 onSelect={(value, option: any) => {
//                   setTitle(option.children);
//                   setShowComp(value);
//                   setVisible(false);
//                 }}
//               >
//                 {districts.map((data: any) => (
//                   <Option key={data.district_uid} value={data.district}>
//                     {data.district}
//                   </Option>
//                 ))}
//               </Select>
//             </div>
//             <div>
//               <p>Choose subcounty </p>
//               <Select
//                 showSearch
//                 onClick={() => setVisible(!visible)}
//                 style={{
//                   width: 150,
//                 }}
//                 placeholder="Search to Select"
//                 optionFilterProp="children"
//                 filterOption={(input, option) =>
//                   (option?.label ?? '').includes(input)
//                 }
//                 filterSort={(optionA, optionB) =>
//                   (optionA?.label ?? '')
//                     .toLowerCase()
//                     .localeCompare((optionB?.label ?? '').toLowerCase())
//                 }
//                 onSelect={(value, option: any) => {
//                   setTitle(option.children);
//                   setShowComp(value);
//                   setVisible(false);
//                 }}
//               >
//                 {orgs.map((data) => (
//                   <Option key={data.id} value={data.name}>
//                     {data.name}
//                   </Option>
//                 ))}
//               </Select>
//             </div>

//             <div>
//               <p>Choose sector </p>
//               <Select
//                 showSearch
//                 onClick={() => setVisible(!visible)}
//                 style={{
//                   width: 150,
//                 }}
//                 placeholder="Search to Select"
//                 optionFilterProp="children"
//                 filterOption={(input, option) =>
//                   (option?.label ?? '').includes(input)
//                 }
//                 filterSort={(optionA, optionB) =>
//                   (optionA?.label ?? '')
//                     .toLowerCase()
//                     .localeCompare((optionB?.label ?? '').toLowerCase())
//                 }
//                 onSelect={(value, option: any) => {
//                   setTitle(option.children);
//                   setShowComp(value);
//                   setVisible(false);
//                 }}
//               >
//                 {orgs.map((data) => (
//                   <Option key={data.id} value={data.name}>
//                     {data.name}
//                   </Option>
//                 ))}
//               </Select>
//             </div>

//             <div>
//               <p>Select Level </p>
//               <Select
//                 showSearch
//                 onClick={() => setVisible(!visible)}
//                 style={{
//                   width: 150,
//                 }}
//                 placeholder="Search to Select"
//                 optionFilterProp="children"
//                 filterOption={(input, option) =>
//                   (option?.label ?? '').includes(input)
//                 }
//                 filterSort={(optionA, optionB) =>
//                   (optionA?.label ?? '')
//                     .toLowerCase()
//                     .localeCompare((optionB?.label ?? '').toLowerCase())
//                 }
//                 onSelect={(value, option: any) => {
//                   setTitle(option.children);
//                   setShowComp(value);
//                   setVisible(false);
//                 }}
//               >
//                 {items.map((data) => (
//                   <Option key={data.value} value={data.value}>
//                     {data.label}
//                   </Option>
//                 ))}
//               </Select>
//             </div>
//           </div>
//           <DistributionTable />

//           <Modal
//             title="Create An Order"
//             centered
//             open={modalOpen}
//             onOk={handleCreateOrder}
//             onCancel={() => {
//               setModalOpen(false);
//             }}
//             width={700}
//             zIndex={10000000}
//           >
//             <div className="mb-6">
//               <label className="mb-2.5 block font-medium text-black dark:text-white">
//                 Hotspot Requesting
//               </label>
//               <div className="relative">
//                 <select
//                   name={ordered_for}
//                   value={ordered_for}
//                   onChange={handleInputChange(setOrderedFor)}
//                   className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
//                 >
//                   <option>select hotspot</option>
//                   {filteredData?.map((option: any) => (
//                     <option key={option.id} value={option.hid}>
//                       {option.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div className="mb-6">
//               <label className="mb-2.5 block font-medium text-black dark:text-white">
//                 Requesting From
//               </label>
//               <div className="relative">
//                 <select
//                   name={ordered_from}
//                   value={ordered_from}
//                   onChange={handleInputChange(setOrderedFrom)}
//                   className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
//                 >
//                   <option>select organization</option>
//                   {orgs?.map((option: any) => (
//                     <option key={option.id} value={option.name}>
//                       {option.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* <CustomInput
//           label={'Ordered From'}
//           placeholder={'where are you ordering from'}
//           type={'text'}
//           name={'ordered_from '}
//           value={'ordered_from '}
//           defaultValue={''}
//         /> */}

//             <CustomInput
//               label={'Quantity Needed'}
//               placeholder={'quantity needed'}
//               type={'text'}
//               name={'quantity_needed'}
//               value={'quantity_needed'}
//               defaultValue={''}
//               onChange={handleInputChange(setQuantityNeeded)}
//               cursor={''}
//               activity={false}
//             />

//             <CustomInput
//               label={'Unit'}
//               placeholder={'Unit '}
//               type={'text'}
//               name={'unit'}
//               value={'unit'}
//               defaultValue={''}
//               onChange={handleInputChange(setUnit)}
//               activity={false}
//             />
//             <CustomInput
//               label={'User ID'}
//               placeholder={'ordered by '}
//               type={'text'}
//               name={'ordered_by'}
//               value={ID}
//               defaultValue={ID}
//               onChange={handleInputChange(setOrderedBy)}
//               cursor={''}
//               act={true}
//             />
//           </Modal>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MyOrders;

import CustomCard from '../../components/CustomCard';
import DfcpDataTable from '../../components/dcfp/DfcpTable';
import CustomPicker from '../../common/datepicker';

const MyOrders = () => {
  const cardData = [
    {
      id: 1,
      title: 'Orders Recieved',
      amount: 0,
    },
    {
      id: 2,
      title: 'Orders Worked On',
      amount: 0,
    },
    {
      id: 3,
      title: 'Success rate',
      amount: '0%',
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {cardData.map(({ title, amount, id }) => (
          <CustomCard key={id} title={title} amount={amount} percentage={0} />
        ))}
      </div>
      <div className="flex items-center justify-between p-[2rem]">
        <div className="mt-[2rem] p-[1rem] text-left font-bold">
          <h1>Orders Table</h1>
        </div>
        <div>
          <p>Select Range of display </p>
          <CustomPicker />
        </div>
      </div>
      <DfcpDataTable data={undefined} />
    </div>
  );
};

export default MyOrders;
