import CustomCard from '../../../components/CustomCard';

import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../../api/apiRequests';
import { Dropdown, MenuProps, Space, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';


const DashboardOther = () => {
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


  const cardData = [
    {
      id: 1,
      title: 'Orders Recieved',
      amount: 10,
    },
    {
      id: 2,
      title: 'Orders Worked On',
      amount: 8,
    },
    {
      id: 3,
      title: 'Success rate',
      amount: '70%',
    },
  ];

  const customBorderStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    border: '2px solid #000',
    borderRadius: '8px', // Adjust the border radius to make it as round as you want
    padding: '8px',
    transition: 'border-color 0.3s ease-in-out', // Add a smooth transition for the border color change
    outline: 'none', // Remove the default outline on focus
    cursor: 'pointer',
  };

  const focusBorderStyle = {
    borderColor: '#007bff', // Adjust the color for the focused border
  };



  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {cardData.map((data) => (
          <CustomCard
            key={data.id}
            amount={data.amount}
            title={data.title}
            // percentage={data.percentage}
            // currency={''}
          />
        ))}
      </div>
      
     
      <h2 className="my-11 p-[rem]  text-lg font-bold text-black">
      Condom distribution Visualizations
      </h2>
    </>
  );
};

export default DashboardOther;
