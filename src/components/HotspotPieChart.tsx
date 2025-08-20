import React from 'react';
import ReactApexChart from 'react-apexcharts';

const HotspotStatusPieChart: React.FC<{ title: string; data: any[] }> = ({ title, data }) => {
    // Calculate the counts of active and not active statuses
    const activeCount = data.filter(item => item.status === 'active').length;
    const notActiveCount = data.length - activeCount;
  
    // Define the chart options
    const options = {
      labels: ['Active', 'Not Active'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  
    // Define the series data
    const series = [activeCount, notActiveCount];
  
    return (
      <div className="col-span-12 w-full rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div className="row-span-1 mb-3 justify-between gap-4 sm:flex">
          <div>
            <h5 className="text-xl font-semibold text-black dark:text-white">
              {title}
            </h5>
          </div>
        </div>
  
        <div className="row-span-5 mb-2  flex items-center justify-center">
          {
            data?.length===0?(
              <div className="flex items-center justify-center h-64">
              <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">No Data to Analyze</p>
            </div>         
               ):(
                        <div className="mb-2">
          <div id="chartFour" className="-ml-5">
              <ReactApexChart
              options={options}
              series={series}
              type="donut"
              height={500}
              width={500}
            />
            </div>
        </div>
            )
          }

        </div>
        

        
      </div>
    );
  };

export default HotspotStatusPieChart;
