import { useEffect, useState } from 'react';
import CustomCard from '../../../components/CustomCard';

import { useQuery } from '@tanstack/react-query';
import {
  getHotspots,
  getStock,
  getUsers,
  getDistributions,
  getMyOrders,
  getStockAtOrganization,
  getOrders,
  getStockAtHotspots,
} from '../../../api/apiRequests';
import NationalLevel from './NationalLevel';
import CommunityLevel from './CommunityLevel';
import DistrictLevel from './DistrictLevel';
import FacilityLevel from './FacilityLevel';
import ChartTwo from '../../../components/ChartTwo';
import CustomPicker from '../../../common/datepicker';
import { DatePicker, Select } from 'antd';
import CustomClickableCard from '../../../components/CustomClickableCard';
import { items, orderData } from '../../../constants';
import { AverageConsumption } from '../../../utils/monthlyConsumption';
import moment from 'moment';
import HotspotStatusPieChart from '../../../components/HotspotPieChart';
import ChartThree from '../../../components/ChartThree';
import ChartComponent from '../../../components/ChartSix';
import { sumTransactionQuantities } from '../../../utils/sumDistributions';
import { filterData } from '../../../utils/filter';

const { Option } = Select;
const { RangePicker } = DatePicker;


const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [activeUsers, setActiveUsers] = useState<any>(0);
  const [title, setTitle] = useState<string>('National Level');
  const [stock, setStock] = useState([]);
  const [hotspots, setHotspots] = useState<any>([]);
  const [showComp, setShowComp] = useState(1);
  const [visible, setVisible] = useState(false);
  const [distributions, setDistributions] = useState([]);
  const ID = localStorage.getItem('id');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filteredHotSpots, setFilteredHotSpots] = useState([]);
  const [hotSpots, setHotSpots] = useState([]);
  const [newInventoryData, setNewInventoryData] = useState([]);
  const [totalCondoms, setTotalCondoms] = useState(0);
  const [totalDistributions, setTotalDistributions] = useState(0);
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);
  const [stockAtHand, setStockAtHand] = useState([]);
  const [hotspotStocked, setHotspotStocked] = useState(0);

  const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11
const currentYear = currentDate.getFullYear();


  const usersQuery = useQuery({
    queryKey: ['user'],
    queryFn: () => getUsers(),
  });

  const stockQuery = useQuery({
    queryKey: ['stock'],
    queryFn: () => getStock(),
  });


  const stockAtQuery = useQuery({
    queryKey: ['stockAt'],
    queryFn: () => getStockAtOrganization('jms'),
  });

  const hotspotQuery = useQuery({
    queryKey: ['hotspot'],
    queryFn: () => getHotspots(),
  });

  const distributionsQuery = useQuery({
    queryKey: ['distributions'],
    queryFn: () => getDistributions(),
  });

  const hotspotStockQuery = useQuery({
    queryKey: ['hotspotStock'],
    queryFn: () => getStockAtHotspots(),
  });

  const isCurrentMonth = (dateStr) => {
    const dateParts = dateStr.split('-');
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10);
    const year = parseInt(dateParts[2], 10);
    return month === currentMonth && year === currentYear;
};


  const handleDateChange = (dates: any) => {
    if (dates) {
      setDateRange([dates[0].format('YYYY-MM'), dates[1].format('YYYY-MM')]);
    } else {
      setDateRange(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const orders = await getOrders();
      setData(orders);

      const usersData = await getUsers();
      setUsers(usersData);
      const active = usersData.filter((user: any) => user.status === 'active');
      setActiveUsers(active.length);

      const hotspotsData = await getHotspots();
      setHotSpots(hotspotsData);

    };

    fetchData();
  }, []);

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
    if (stockQuery.isSuccess) {
      setStock(stockQuery.data);
    }
  }, [stockQuery.isSuccess, stockQuery.data]);

  

  useEffect(() => {
    if (usersQuery.isSuccess) {
      setUsers(usersQuery.data);
      const active = usersQuery.data.filter(
        (user: any) => user.status === 'active'
      );
      setActiveUsers(active);
    }
  }, [usersQuery.isSuccess, usersQuery.data]);

  useEffect(() => {
    if (hotspotQuery.isSuccess) {
      setHotspots(hotspotQuery.data);
    }
  }, [hotspotQuery.isSuccess, hotspotQuery.data]);

  useEffect(() => {
    if (stockAtQuery.isSuccess) {
      setStockAtHand(stockAtQuery.data);
    }
  }, [stockAtQuery.isSuccess, stockAtQuery.data]);

  useEffect(() => {
    if (distributionsQuery.isSuccess) {
      setDistributions(distributionsQuery.data);
    }
  }, [distributionsQuery.isSuccess, distributionsQuery.data]);

  useEffect(() => {
    if (hotspotStockQuery.isSuccess) {
      const filteredData = hotspotStockQuery.data?.filter(item => {
        const createdAt = new Date(item.created_at);
        const createdMonth = createdAt.getMonth() + 1;
        const createdYear = createdAt.getFullYear();
        return createdMonth === currentMonth && createdYear === currentYear;
    });
      setHotspotStocked(filteredData.length);
    }
  }, [hotspotStockQuery.isSuccess, hotspotStockQuery.data]);


  // console.log(distributions,"))))))))))")

  const avgConsumptiton = AverageConsumption(distributions);
  // console.log(avgConsumptiton, '*************');

  const activeHotspots = hotspots.filter(
    (hotspot: any) => hotspot.status === 'active'
  );

  const inActiveHotspots = hotspots.filter(
    (hotspot: any) => hotspot.status !== 'active'
  );

  let totalDistribution = distributions.reduce((total, item: any) => {
    return total + parseInt(item.transaction_quantity, 10);
  }, 0);

  let totalStock = stock.reduce((total, item: any) => {
    return total + parseInt(item.quantity_in_stock, 10);
  }, 0);

  // console.log(totalDistribution, '*******');


  const totalQuantityInStock = stockAtHand?.reduce((total, item) => {
    return total + parseInt(item.quantity_in_stock, 10);
  }, 0);

  const cardData = [
    {
      id: 1,
      amount: hotspots.length | 0,
      text: 'Total Hotspots',
    },
    {
      id: 2,
      amount: activeHotspots.length | 0,
      text: 'Active Hotspots',
    },
    {
      id: 3,
      amount: inActiveHotspots.length | 0,
      text: 'In active Hotspots',
    },
    {
      id: 4,
      amount: totalQuantityInStock | 0,
      text: 'Warehouse Stock On  Hand',
    },
    {
      id: 5,
      amount: hotspotStocked | 0,
      text: 'Hotspots That received condoms this month',
    },
  ];

  // const onClick: MenuProps['onClick'] = ({ key }) => {
  //   // message.success(`selected   ${key}`);
  //   setShowComp(key);
  // };

  // console.log(cardData,"AM THE STOCK")

  const renderComponent = () => {
    switch (showComp) {
      case 1:
        return (
          <NationalLevel
            total={totalStock}
            totalDistribution={totalDistribution}
            avg={avgConsumptiton}
          />
        );
      case 2:
        return <DistrictLevel />;
      case 3:
        return <FacilityLevel />;
      case 4:
        return <CommunityLevel />;
      default:
        console.log('Unknown showComp value:', showComp);
        return null;
    }
  };


  
  // console.log("Total quantity in stock:", totalQuantityInStock);

  // console.log(stockAtHand,"<<<>>>>>>>")

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {cardData.map(({ amount, text, id }) => (
          <CustomCard key={id} amount={amount} title={text} percentage={0} />
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
     <ChartThree title="Orders Status Summary" data={filteredData} />
      <ChartComponent
          data={filteredData}
          title="Total Condoms Ordered By Districts Over Time"
        /> 
      </div>
      <div className="mt-4 flex w-full md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5  ">
        <HotspotStatusPieChart
          title="Hotspots Status Summary"
          data={hotspots}
        />
      </div>
    </>
  );
};

export default Dashboard;
