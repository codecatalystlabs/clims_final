import CustomCard from '../../../components/CustomCard';

import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../../api/apiRequests';
import { Dropdown, MenuProps, Space, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import NationalLevel from './NationalLevel';
import CommunityLevel from './CommunityLevel';
import DistrictLevel from './DistrictLevel';
import FacilityLevel from './FacilityLevel';
import ChartOne from '../../../components/ChartOne';
import ChartTwo from '../../../components/ChartTwo';
import ChartThree from '../../../components/ChartThree';
import MapOne from '../../../components/MapOne';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [activeUsers, setActiveUsers] = useState(0);
  const [total, setTotal] = useState();
  const [isFocused, setIsFocused] = useState(false);
  const [showComp, setShowComp] = useState(1);
  const [visible, setVisible] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const usersQuery = useQuery({
    queryKey: ['user'],
    queryFn: () => getUsers(),
  });

  useEffect(() => {
    if (usersQuery.isSuccess) {
      setUsers(usersQuery.data);
      const active = usersQuery.data.filter(
        (user: any) => user.status === 'active'
      );
      setActiveUsers(active);
    }
  }, [usersQuery.isSuccess, usersQuery.data]);

  // const onClick: MenuProps['onClick'] = ({ key }) => {
  //   // message.success(`selected   ${key}`);
  //   setShowComp(key);
  // };

  const items = [
    {
      label: 'National Level',
      key: 1,
    },
    {
      label: 'District Level',
      key: 2,
    },
    {
      label: 'Facility Level',
      key: 3,
    },
    {
      label: 'Community Level',
      key: 4,
    },
  ];

  const cardData = [
    {
      id: 1,
      amount: users.length || 0,
      text: 'Total Users',
      // percentage: 0.43
    },
    {
      id: 2,
      amount: activeUsers?.length || 0,
      text: 'Active Users',
      // percentage: 0.43
    },
    {
      id: 3,
      amount: users.length - activeUsers?.length || 0,
      text: 'In active',
      // percentage: 0.43
    },
  ];


  const renderComponent = () => {
    switch (showComp) {
      case 1:
        return <NationalLevel />;
      case 2:
        return <DistrictLevel />;
      case 3:
        return <FacilityLevel />;
      case 4:
        return <CommunityLevel />;
      default:
        // Add some console logging here to debug
        console.warn('Unknown showComp value:', showComp);
        return null; // Return a default component or null
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {cardData.map(({ amount, text, id }) => (
          <CustomCard
            key={id}
            amount={amount}
            title={text} 
            percentage={0}           
           
          />
        ))}
      </div>
      <div className="flex items-center justify-between ">
        <h2 className="my-11 p-[rem]  text-lg font-bold text-black">
          Stock On Hand Status at National Level
        </h2>
        
        <div className="">
          <button
            onClick={() => setVisible(!visible)}
            className={`bg-white text-lg font-bold text-black hover:bg-body hover:text-white ${
              !visible ? 'border-2' : 'border-b-2'
            } ${!visible ? 'rounded-md' : ''} mb-4 w-full  border-body p-2`}
          >
            Select Sector
          </button>
          {visible ? (
            <div className="p-2 bg-white">
              <ul>
                {items.map((data) => (
                  <li
                    className="mb-1 text-black transition hover:cursor-pointer hover:font-bold"
                    onClick={() => {
                      setShowComp(data.key), setVisible(false);
                    }}
                  >
                    {data.label}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
      <div className="">{renderComponent()}</div>
      <h2 className="my-11 p-[rem]  text-lg font-bold text-black">
        Condom Usage Visualizations
      </h2>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* <ChartOne /> */}
        {/* {/* <ChartTwo /> */}
        {/* <ChartThree />  */}
        {/* <MapOne /> */}
      </div>
    </>
  );
};

export default Dashboard;
