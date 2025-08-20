import { useEffect, useState } from 'react';
import CustomCard from '../../../components/CustomCard';
import OrderTable from '../../../components/NMS/OrderTable';
import CustomPicker from '../../../common/datepicker';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getOrders } from '../../../api/apiRequests';
import { Spin, Tabs } from 'antd';
import CondomOrdersSummary from './CodomOrdersSummary';
const { TabPane } = Tabs;

const OrdersJMS = () => {
  const ID = localStorage.getItem('id');
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);

  const queryClient = useQueryClient();

  const ordersQuery = useQuery({
    queryKey: ['receivedOrders'],
    queryFn: () => getOrders(),
  });

  useEffect(() => {
    if (ordersQuery.isSuccess) {
      setData(Object.values(ordersQuery.data));
    }
  }, [ordersQuery.isSuccess, ordersQuery.data]);

  const approved = data.filter((item: any) => item.order_status == 'approved');
  const pending = data.filter((item: any) => item.order_status == 'pending');
  const rejected = data.filter((item: any) => item.order_status == 'rejected');
  const jmsOrders = data.filter((item: any) => item.ordered_from == 'jms');

  // console.log('jms--id', ID);
  const cardData = [
    {
      id: 1,
      title: 'Orders Recieved',
      amount: data?.length,
    },
    {
      id: 2,
      title: 'Approved Orders',
      amount: approved.length,
    },
    {
      id: 2,
      title: 'Rejected Orders',
      amount: rejected.length,
    },
    {
      id: 2,
      title: 'Pending Orders',
      amount: pending.length,
    },
    {
      id: 3,
      title: 'Success rate',
      amount: `${Math.round((approved.length / data.length) * 100)}%`,
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {cardData.map((data, index) => (
          <CustomCard
            key={index}
            title={data.title}
            amount={data.amount}
            percentage={0}
            isLoading={ordersQuery.isLoading}
          />
        ))}
      </div>

      <div>
        {' '}
        <div className=" p-[2rem]">
          <div className="mt-[2rem] p-[1rem] text-left font-bold">
            <h1>Condom Orders Made</h1>
          </div>
          <div className="col-span-12 mt-10 xl:col-span-8">
            <Tabs defaultActiveKey="1">
            <TabPane tab="Condom Orders Summary" key="1">
              {ordersQuery.isLoading ? (
                <Spin tip="Loading Table data" size="large">
                  <div className="content" />
                </Spin>
              ) : (
                <CondomOrdersSummary data={jmsOrders} />
              )}
            </TabPane>
            <TabPane tab="All Condom Orders" key="2">
              {ordersQuery.isLoading ? (
                <Spin tip="Loading Table data" size="large">
                  <div className="content" />
                </Spin>
              ) : (
                <OrderTable data={jmsOrders.reverse()} /> 
              )}
            </TabPane>
            <TabPane tab="Approved Condom Orders" key="3">
              {ordersQuery.isLoading ? (
                <Spin tip="Loading Table data" size="large">
                  <div className="content" />
                </Spin>
              ) : (
                <OrderTable data={approved.reverse()} /> 
              )}
            </TabPane>
            <TabPane tab="Pending Condom Orders" key="4">
              {ordersQuery.isLoading ? (
                <Spin tip="Loading Table data" size="large">
                  <div className="content" />
                </Spin>
              ) : (
                <OrderTable data={pending.reverse()} /> 
              )}
            </TabPane>
            <TabPane tab="Rejected Condom Orders" key="5">
              {ordersQuery.isLoading ? (
                <Spin tip="Loading Table data" size="large">
                  <div className="content" />
                </Spin>
              ) : (
                <OrderTable data={rejected.reverse()} /> 
              )}
            </TabPane>

            </Tabs>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersJMS;
