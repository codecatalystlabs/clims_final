import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';

// Define interfaces for the structure of your data
interface Order {
  id: number;
  order_date: string;
  order_status: string;
  ordered_by: string;
  ordered_for: string;
  ordered_from: string;
  quantity_issued: string;
  quantity_needed: string;
  created_at: string;
  updated_at: string;
}

interface ChartProps {
  data: Order[];
}

const OrderStatusSummary: React.FC<ChartProps> = ({ data }) => {
  const [series, setSeries] = useState<{ name: string, data: number[] }[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const quantityNeededByOrdererAndStatus: { [key: string]: { [key: string]: number } } = {};
    const orderers: Set<string> = new Set();
    const statuses: Set<string> = new Set();

    data?.forEach((item) => {
      const orderer = item.ordered_by.split('-')[1];
      const status = item.order_status;

      orderers.add(orderer);
      statuses.add(status);

      if (!quantityNeededByOrdererAndStatus[orderer]) {
        quantityNeededByOrdererAndStatus[orderer] = {};
      }

      if (quantityNeededByOrdererAndStatus[orderer][status]) {
        quantityNeededByOrdererAndStatus[orderer][status] += parseInt(item.quantity_needed);
      } else {
        quantityNeededByOrdererAndStatus[orderer][status] = parseInt(item.quantity_needed);
      }
    });

    const ordererList = Array.from(orderers);
    const statusList = Array.from(statuses);

    const seriesData = statusList.map(status => ({
      name: status,
      data: ordererList.map(orderer => quantityNeededByOrdererAndStatus[orderer][status] || 0)
    }));

    setSeries(seriesData);
    setCategories(ordererList);
  }, [data]);

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: categories,
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'center',
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} condoms`
      }
    },
    colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A'] // You can customize the colors as needed
  };

  return (
    <div className="col-span-12 w-full rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div>
        <h3 className="text-xl font-semibold text-black dark:text-white">
          Order Status Summary
        </h3>
      </div>

      {
        data?.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">No Data to Analyze</p>
          </div>
        ) : (
          <div className="mb-2">
            <div id="barChart" className="-ml-5">
              <ReactApexChart
                options={options}
                series={series}
                type="bar"
                height={350}
              />
            </div>
          </div>
        )
      }
    </div>
  );
};

export default OrderStatusSummary;
