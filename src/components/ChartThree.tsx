//@ts-nocheck
import React from 'react';
import ReactChart from 'react-apexcharts';

const ChartThree: React.FC = ({ title, data }: any) => {
  const orderStatusCounts = data?.reduce((acc: any, item: any) => {
    const orderStatus = item.order_status;

    if (!acc[orderStatus]) {
      acc[orderStatus] = 1;
    } else {
      acc[orderStatus]++;
    }

    return acc;
  }, {});

  const resultArray = Object?.entries(orderStatusCounts)?.map(
    ([orderStatus, count]) => ({
      order_status: orderStatus,
      count: count,
    })
  );

  const value = resultArray.map((item: any) => item.count);
  const series = resultArray.map((item: any) => item.order_status);

  const options = {
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 400,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    labels: series,
  };

  return (
    <div className="grid w-full md:w-1/2 grid-cols-1 grid-rows-6 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="row-span-1 mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            {title}
          </h5>
        </div>
        <div>
          <div className="relative z-20 inline-block">
          </div>
        </div>
      </div>

      <div className="row-span-5 mb-2  flex items-center justify-center">
        {
          data.length===0?(
            <div className="flex items-center justify-center h-64">
            <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">No Data to Analyze</p>
          </div>  
          ):(
            <ReactChart
            options={options}
            series={value}
            type="donut"
            height={350}
            width={350}
          />
          )
        }

      </div>
    </div>
  );
};

export default ChartThree;
