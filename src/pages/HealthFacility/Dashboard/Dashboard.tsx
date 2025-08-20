
//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import CustomCard from '../../../components/CustomCard';
import ChartThree from '../../../components/ChartThree';
import ChartComponent from '../../../components/ChartSix';
import {
  getHotspots,
  getMyOrders,
  getStockAtDistrict,
  getStockAtOrganization,
  getUsers,
} from '../../../api/apiRequests';
import { sumTransactionQuantities } from '../../../utils/sumDistributions';
import useLocalStorage from '../../../hooks/useLocalStorage';
import HotspotStatusPieChart from '../../../components/HotspotPieChart';
import moment from 'moment';
import { trimLastWord } from '../../../utils/trim';
import { useQuery } from '@tanstack/react-query';

const { RangePicker } = DatePicker;

const Dashboard = () => {
  const ID = localStorage.getItem('id');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeUsers, setActiveUsers] = useState(0);
  const [filteredHotSpots, setFilteredHotSpots] = useState([]);
  const [hotSpots, setHotSpots] = useState([]);
  const [userInfo, setUserInfo] = useLocalStorage('userData', {});
  const [newInventoryData, setNewInventoryData] = useState([]);
  const [totalCondoms, setTotalCondoms] = useState(0);
  const [totalDistributions, setTotalDistributions] = useState(0);
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);
  const [stockData,setStockData]=useState()
  const [stockDistributed,setStockDistributed] = useState(0)


  const storedUserData: any = JSON.parse(localStorage.getItem('userData'));


  const handleDateChange = (dates: any) => {
    if (dates) {
      setDateRange([dates[0].format('YYYY-MM'), dates[1].format('YYYY-MM')]);
    } else {
      setDateRange(null);
    }
  };



  const stockQuery = useQuery({
    queryKey: ['inventory'],
    queryFn: () => getStockAtDistrict(),
  });

  useEffect(() => {
    if (stockQuery.isSuccess) {
      const filteredStockData = stockQuery?.data?.filter(record =>trimLastWord(record?.organization_unit_stocking?.district)?.toLowerCase()===trimLastWord(userInfo?.user.district)?.toLowerCase());
      const totalQuantityInStock = filteredStockData.reduce((sum, record) => sum + parseInt(record.quantity_in_stock, 10), 0);
      const totalQuantityDistributed = filteredStockData.reduce((sum, record) => sum + (parseInt(record.original_stock, 10)-parseInt(record.quantity_in_stock, 10)), 0);
         console.log(filteredStockData,"FILTERED STOCK DATA=====>>>>>")
      setStockDistributed(totalQuantityDistributed)
      setStockData(totalQuantityInStock);
    }
  }, [stockQuery.isSuccess, stockQuery.data]);

  useEffect(() => {
    const fetchData = async () => {
      const orders = await getMyOrders(ID);
      setData(orders);

      const usersData = await getUsers();
      setUsers(usersData);
      const active = usersData.filter((user: any) => user.status === 'active');
      setActiveUsers(active.length);

      const hotspotsData = await getHotspots();
      setHotSpots(hotspotsData);

      const inventoryData = await getStockAtOrganization(
        userInfo?.user.organization_unit_id
      );
      setNewInventoryData(inventoryData);
      const total = sumTransactionQuantities(inventoryData);
      setTotalCondoms(total);
    };

    fetchData();
  }, [ID, userInfo]);

  useEffect(() => {
    let filtered = data;

    if (dateRange) {
      const [startDate, endDate] = dateRange;
      filtered = data.filter((order: any) => {
        const createdAt = order.created_at.split('T')[0].substring(0, 7);
        return createdAt >= startDate && createdAt <= endDate;
      });
    }

    setFilteredData(filtered);
  }, [data, dateRange]);

  useEffect(() => {
    const userLocation = userInfo?.user?.district;
    let trimedWord = trimLastWord(userLocation);

    const filteredData = hotSpots.filter((item: any) =>
      item.district?.toLowerCase().includes(trimedWord.toLowerCase())
    );
    setFilteredHotSpots(filteredData);
  }, [hotSpots, userInfo]);

  useEffect(() => {
    const total = sumTransactionQuantities(newInventoryData);
    setTotalCondoms(total);
  }, [newInventoryData]);

  useEffect(() => {
    const total = sumTransactionQuantities(filteredData);
    setTotalDistributions(total);
  }, [filteredData]);

  const cardData = [
    {
      id: 1,
      amount: filteredHotSpots.length || 0,
      text: 'Total Hotspots',
    },
    {
      id: 2,
      amount: stockData || 0,
      text: 'Total Stock  On  Hand',
    },
    {
      id: 3,
      amount: stockDistributed || 0,
      text: 'Condoms Distributed This month',
    }
  ];




  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {cardData.map((data) => (
          <CustomCard
            key={data.id}
            amount={data.amount}
            title={data.text}
            percentage={0}
            isLoading={false} // Set to false since we are not using any loading indicators
          />
        ))}
      </div>

      <h2 className="my-11 text-lg font-bold text-black">Overall Summary</h2>

      <div className="flex items-center justify-end space-x-5 p-[2rem] ">
        <RangePicker
          picker="month"
          format="YYYY-MM"
          onChange={handleDateChange}
          style={{ marginBottom: '20px' }}
          disabledDate={(current) => {
            return current && current.endOf('month') > moment().endOf('month');
          }}
        />
      </div>

      <div className="mt-4 flex w-full md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* <ChartThree title="Orders Status Summary" data={filteredData} /> */}
        <ChartComponent
          data={filteredData}
          title="Condoms Ordered Over Time"
        />
      </div>
      <div className="mt-4 flex w-full md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5  ">
        <HotspotStatusPieChart
          title="Hotspots Status Summary"
          data={filteredHotSpots}
        />
      </div>
    </>
  );
};

export default Dashboard;
