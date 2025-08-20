import { useEffect, useState } from 'react';
import CustomCard from '../../../components/CustomCard';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getOrders,
  getReceivedOrders,
  getStockAtOrganization,
} from '../../../api/apiRequests';
import ChartThree from '../../../components/ChartThree';
import ChartOne from '../../../components/ChartOne';
import JmsPieChart from '../../../components/JmsPieChart';
import useLocalStorage from '../../../hooks/useLocalStorage';
import JmsLineChart from '../../../components/JmsLineChart';

const DashboardJMS = () => {
  const [data, setData] = useState([]);
  const [newInventoryData, setNewInventoryData] = useState([]);
  const [info, _] = useLocalStorage('userData', {});
  const [totalCondoms, setTotalCondoms] = useState(0);

  const queryClient = useQueryClient();

  const ordersQuery = useQuery({
    queryKey: ['receivedOrders'],
    queryFn: () => getOrders(),
  });

  const newCondomInventoryQuery = useQuery({
    queryKey: ['newInventory'],
    queryFn: () => getStockAtOrganization(info?.user.organization_unit_id),
  });

  useEffect(() => {
    if (newCondomInventoryQuery.isSuccess) {
      setNewInventoryData(newCondomInventoryQuery.data);
    }
  }, [newCondomInventoryQuery.isSuccess, newCondomInventoryQuery.data]);

  useEffect(() => {
    if (newInventoryData.length > 0) {
      const total = newInventoryData.reduce((acc, item) => {
        return acc + parseInt(item?.quantity_in_stock, 10);
      }, 0);
      setTotalCondoms(total);
    }
  }, [newInventoryData]);

  useEffect(() => {
    if (ordersQuery.isSuccess) {
      setData(Object.values(ordersQuery.data));
    }
  }, [ordersQuery.isSuccess, ordersQuery.data]);

  const approved = data.filter((item: any) => item.order_status == 'approved');
  const pending = data.filter((item: any) => item.order_status == 'pending');
  const rejected = data.filter((item: any) => item.order_status == 'rejected');
  // const jmsOrders = data.filter((item: any) => item.ordered_from == 'jms');

  const cardData = [
    {
      id: 1,
      title: 'Stock On Hand',
      amount: totalCondoms || 0,
    },
    {
      id: 2,
      title: 'Orders Recieved',
      amount: data?.length,
    },
    {
      id: 3,
      title: 'Approved Orders',
      amount: approved.length,
    },
    {
      id: 4,
      title: 'Rejected Orders',
      amount: rejected.length,
    },
    {
      id: 5,
      title: 'Pending Orders',
      amount: pending.length,
    },
    {
      id: 6,
      title: 'Success rate',
      amount: `${Math.round((approved.length / data.length) * 100)}%`,
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {cardData.map((data) => (
          <CustomCard
            key={data.id}
            amount={data.amount}
            title={data.title}
            percentage={0}
            isLoading={ordersQuery.isLoading}
          />
        ))}
      </div>

      <h2 className="my-11 p-[rem]  text-lg font-bold text-black">
        Order Summary
      </h2>
      <div className="mt-4  flex md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {data.length <= 0 ? (
          <div> No order data,please make orders to see the graphs </div>
        ) : (
          <ChartOne data={data} title="Total Orders Summary" />
        )}

        {data.length <= 0 ? (
          <div> No order data,please make orders to see the graphs </div>
        ) : (
          <ChartThree title="Order Status Summary" data={data} />
        )}
      </div>
      <div className="mt-4 flex md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {newInventoryData.length <= 0 ? (
          <div> No data please </div>
        ) : (
          <JmsPieChart title="Brand Count Summary" data={newInventoryData} />
        )}

        {newInventoryData.length <= 0 ? (
          <div> No data please </div>
        ) : (
          <JmsLineChart
            data={newInventoryData}
            title="Condom Distributions overtime"
          />
        )}
      </div>
    </>
  );
};

export default DashboardJMS;
