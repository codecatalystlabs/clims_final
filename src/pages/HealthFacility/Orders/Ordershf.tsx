import CustomCard from '../../../components/CustomCard';
import CustomPicker from '../../../common/datepicker';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createOrder,
  getHotspots,
  getMyOrders,
  getReceivedOrder,
  getUnits,
} from '../../../api/apiRequests';
import { Button, Modal, Spin } from 'antd';
import CustomInput from '../../../common/input';
import { displaySuccessMessage } from '../../../components/toast/Toast';
import OrdersTablehf from '../../../components/hf/OrdersTablehf';

const orgs = [
  {
    id: 1,
    name: 'nms',
  },
  {
    id: 2,
    name: 'jms',
  },
];

const Ordershf = () => {
  const ID = localStorage.getItem('id');
  const storedUserData: any = localStorage.getItem('userData');

  // Parse the JSON string to convert it back to an object
  const userInfo = JSON.parse(storedUserData);
  const [dataArray, setData] = useState<any>([]);
  const [orders, setOrders] = useState<any>([]);
  const [ordersReceived, setOrdersReceived] = useState<any>([]);
  const [loc, setLoc] = useState<any>('');
  const [modalOpen, setModalOpen] = useState(false);
  const [ordered_for, setOrderedFor] = useState<any>(ID);
  const [ordered_from, setOrderedFrom] = useState<any>(null);
  const [quantity_needed, setQuantityNeeded] = useState<any>(null);
  const [unit, setUnit] = useState<string>('');
  const [ordered_by, setOrderedBy] = useState<any>(ID);
  const [userID, setUserID] = useState<any>(null);
  const [showTable, setShowTable] = useState(true);
  const [unitData, setUnitData] = useState([]);
  const [show, setShow] = useState(true);
  const queryClient = useQueryClient();

  const ordersQuery = useQuery({
    queryKey: ['orders'],
    queryFn: () => getMyOrders(ID),
  });

  const ordersReceivedQuery = useQuery({
    queryKey: ['receivedOrders'],
    queryFn: () => getReceivedOrder(userInfo.user.organization_unit_id),
  });

  const hotspotQuery = useQuery({
    queryKey: ['hotspot'],
    queryFn: () => getHotspots(),
  });
  const unitsQuery = useQuery({
    queryKey: ['unit'],
    queryFn: () => getUnits(),
  });

  useEffect(() => {
    if (hotspotQuery.isSuccess) {
      setData(hotspotQuery.data);
    }
  }, [hotspotQuery.isSuccess, hotspotQuery.data]);

  useEffect(() => {
    const location = localStorage.getItem('location');
    setLoc(location);
  }, []);

  useEffect(() => {
    if (ordersQuery.isSuccess) {
      setOrders(ordersQuery.data);
    } else if (ordersReceivedQuery.isSuccess) {
      setOrdersReceived(ordersQuery.data);
    }
  }, [ordersQuery.isSuccess, ordersQuery.data]);

  useEffect(() => {
    if (ordersReceivedQuery.isSuccess) {
      setOrdersReceived(ordersReceivedQuery.data);
    }
  }, [ordersReceivedQuery.isSuccess, ordersReceivedQuery.data]);

  useEffect(() => {
    if (unitsQuery.isSuccess) {
      setUnitData(unitsQuery.data);
    }
  }, [unitsQuery.isSuccess, unitsQuery.data]);

  let filteredData = dataArray?.filter((el: any) => {
    return el.district === 'kampala';
  });

  // console.log(filteredData);

  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      queryClient.setQueryData(['orders'], data);
      queryClient.invalidateQueries(['orders'], { exact: true });

      if (data.code == '201' || data.code == '200') {
        displaySuccessMessage('order created ');
        setModalOpen(false);
      }
    },
  });

  // console.log('ordersid--->', userInfo.organization_unit_id);

  //action functions

  const handleCreateOrder = () => {
    createOrderMutation.mutate({
      ordered_from,
      ordered_by,
      unit,
      quantity_needed,
      ordered_for,
    });
  };

  const handleInputChange =
    (setState: (arg0: any) => void) => (event: { target: { value: any } }) => {
      setState(event.target.value);
      console.log(event.target.value);
    };

  const pendingOrders = Array.isArray(orders)
    ? orders.filter((order: any) => order.order_status === 'pending')
    : [];
  const approvedOrders = Array.isArray(orders)
    ? orders.filter((order: any) => order.order_status === 'approved')
    : [];

  const rejectedOrders = Array.isArray(orders)
    ? orders.filter((order: any) => order.order_status === 'rejected')
    : [];

  const cardData = [
    {
      id: 1,
      amount: orders.length | 0,
      title: 'Total Orders',
    },
    {
      id: 2,
      amount: pendingOrders.length | 0,
      title: 'Pending Orders',
    },
    {
      id: 3,
      amount: `${approvedOrders.length | 0}`,
      title: 'Orders Approved ',
    },
    {
      id: 3,
      amount: `${rejectedOrders.length | 0}`,
      title: 'Orders Rejected',
    },

    {
      id: 4,
      amount: `${
        pendingOrders.length === 0 || orders.length === 0
          ? 0
          : (pendingOrders?.length / orders?.length).toFixed(1)
      }%`,
      title: 'Order Refill Rate',
    },
  ];

  // console.log('orderSs Receiceved', ordersReceived);
  // console.log('My Orders', orders);

  // console.log('JMS Received orders:-->', userInfo.user.organization_unit_id);

  //end of action functions
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {cardData.map(({ title, amount, id }) => (
          <CustomCard key={id} title={title} amount={amount} percentage={0} />
        ))}
      </div>

      <div className="mt-[2rem] flex space-x-4 text-left font-bold">
        <h1
          onClick={() => {
            setShowTable(true);
          }}
          className={`${showTable ? 'text-black/90' : ''} hover:cursor-pointer`}
        >
          My Orders{' '}
        </h1>
        {/* <h1
          onClick={() => {
            setShowTable(false);
          }}
          className={`${showTable ? '' : 'text-black/90'} hover:cursor-pointer`}
        >
          Orders Received{' '}
        </h1> */}
      </div>

      <div className="bg-red-400  w-full">
        <div className="flex items-center justify-end space-x-5 p-[2rem] ">
          <div className="">
            {/* <p>Select Range of display </p> */}
            <CustomPicker />
          </div>
          <Button
            onClick={() => setModalOpen(true)}
            style={{
              backgroundColor: '#006D5B',
              color: 'white',
              border: 'none',
            }}
            type="primary"
            // icon={<DownloadOutlined rev={undefined} size={50} />}
          >
            make Order
          </Button>
        </div>

        {showTable ? (
          <>
            {ordersQuery.isLoading ? (
              <Spin tip="Loading Table data" size="large">
                <div className="content" />
              </Spin>
            ) : (
              <OrdersTablehf showTable={showTable} data={orders} />
            )}
          </>
        ) : (
          <>
            {ordersReceivedQuery.isLoading ? (
              <Spin tip="Loading Table data" size="large">
                <div className="content" />
              </Spin>
            ) : (
              <OrdersTablehf showTable={showTable} data={ordersReceived} />
            )}
          </>
        )}
      </div>

      <Modal
        title="Create An Order"
        centered
        open={modalOpen}
        onOk={handleCreateOrder}
        onCancel={() => {
          setModalOpen(false);
        }}
        width={700}
        zIndex={10000000}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setModalOpen(false);
            }}
            className=" text-customRed"
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            className="bg-black"
            onClick={handleCreateOrder}
          >
            OK
          </Button>,
        ]}
      >
        <div className="mb-6">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Select Warehouse
          </label>
          <div className="relative">
            <select
              name={ordered_from}
              value={ordered_from}
              onChange={handleInputChange(setOrderedFrom)}
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            >
              <option>select warehouse</option>
              {orgs?.map((option: any) => (
                <option key={option.id} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="hidden">
          <CustomInput
            label={'User ID'}
            placeholder={'ordered by '}
            type={'text'}
            name={'ordered_by'}
            value={'xErihzThO6h'}
            defaultValue={'xErihzThO6h'}
            onChange={handleInputChange(setOrderedBy)}
            // cursor={''}
            act={true}
          />
        </div>
        <CustomInput
          label={'Quantity Needed'}
          placeholder={'quantity needed'}
          type={'text'}
          name={'quantity_needed'}
          value={'quantity_needed'}
          defaultValue={''}
          onChange={handleInputChange(setQuantityNeeded)}
          activity={false}
        />
      </Modal>
    </div>
  );
};

export default Ordershf;
