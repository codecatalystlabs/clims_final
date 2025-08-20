import { Spin } from 'antd';
import React from 'react';

interface CustomCardProps {
  title: string;
  amount: any;
  percentage: number;
  isLoading: boolean;
}

const CustomCard: React.FC<CustomCardProps> = ({
  amount,
  title,
  isLoading,
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center   ">
        <h3>{title}</h3>
      </div>

      <div className="mt-4 flex items-end justify-between">
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <Spin spinning={true} size="small" />
          </div>
        ) : (
          <div>
            <h4 className="text-title-md font-bold text-black dark:text-white">
              {amount}
            </h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomCard;
