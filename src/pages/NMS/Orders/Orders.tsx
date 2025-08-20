import { useEffect, useMemo, useState } from 'react';
import CustomCard from '../../../components/CustomCard';
import OrderTable from '../../../components/NMS/OrderTable';
import CustomPicker from '../../../common/datepicker';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getReceivedOrders } from '../../../api/apiRequests';


const Orders = () => {
  const [data, setData] = useState([]);
  const queryClient = useQueryClient();

  const ordersQuery = useQuery({
    queryKey: ['receivedOrders'],
    queryFn: () => getReceivedOrders('nms'),
  });

  useEffect(() => {
    if (ordersQuery.isSuccess) {
      setData(Object.values(ordersQuery.data));
    }
  }, [ordersQuery.isSuccess, ordersQuery.data]);

   const approved = data.filter((item: any) => item.order_status == 'approved');
   const pending = data.filter((item: any) => item.order_status == 'pending');
   const rejected = data.filter((item: any) => item.order_status == 'rejected');

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
        {cardData.map(({ title, amount, id }) => (
          <CustomCard key={id} title={title} amount={amount} percentage={0} />
        ))}
      </div>

      <div>
        {' '}
        <div className="flex items-center justify-between p-[2rem]">
          <div className="mt-[2rem] p-[1rem] text-left font-bold">
            <h1>Orders Recieved By NMS</h1>
          </div>
          <div>
            <p>Select Range of display </p>
            <CustomPicker />
          </div>
        </div>
        <OrderTable data={data} />
      </div>
    </div>
  );
};

export default Orders;
