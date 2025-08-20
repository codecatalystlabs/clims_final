import { useState } from 'react';
import CustomCard from '../../components/CustomCard';
import ChartOne from '../../components/ChartOne';
import ChartTwo from '../../components/ChartTwo';
import ChartThree from '../../components/ChartThree';
import NationalLevel from '../MOH/Dashboard/NationalLevel';
import DistrictLevel from '../MOH/Dashboard/DistrictLevel';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;

const FocalPersonH = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [showComp, setShowComp] = useState(1);
  const [visible, setVisible] = useState(false);
    const [size, setSize] = useState('middle');


  const cardData = [
    {
      id: 1,
      title: 'Stock Recieved',
      amount: 0,
    },
    {
      id: 2,
      title: 'Stock Distributed',
      amount: 0,
    },
    {
      id: 3,
      title: 'Stock Available',
      amount: 0,
    },
  ];

  const items = [
    {
      label: 'Male Condoms',
      key: 1,
    },
    {
      label: 'Female Condoms',
      key: 2,
    },
    {
      label: 'Lubricants',
      key: 3,
    },
  ];

  const renderComponent = () => {
    switch (showComp) {
      case 1:
        return <NationalLevel />;
      case 2:
        return <DistrictLevel />;
      default:
        console.warn('Unknown showComp value:', showComp);
        return null;
    }
  };
  return (
    <>
      <div className='flex flex-col'>
        <div className='p-2'>
          {' '}
          <Space direction="vertical" size={12}>
            <RangePicker size="middle" />
          </Space>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          {cardData.map(({ title, amount, id }) => (
            <CustomCard key={id} title={title} amount={amount} percentage={0} />
          ))}
        </div>

        <div className="flex items-center justify-between ">
          <h2 className="my-11 p-[rem]  text-lg font-bold text-black">
            Stock On Hand Status By Category
          </h2>

          <div className="">
            <button
              onClick={() => setVisible(!visible)}
              className={`bg-white text-lg font-bold text-black hover:bg-body hover:text-white ${
                !visible ? 'border-2' : 'border-b-2'
              } ${!visible ? 'rounded-md' : ''} mb-4 w-full  border-body p-2`}
            >
              Select Category
            </button>
            {visible ? (
              <div className="bg-white p-2">
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
          <ChartOne />
          <ChartTwo />
          <ChartThree />
          {/* <MapOne /> */}
        </div>
      </div>
    </>
  );
};

export default FocalPersonH;
