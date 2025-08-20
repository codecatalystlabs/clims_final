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

const QuantityNeeded: React.FC<ChartProps> = ({ data }) => {
  const [series, setSeries] = useState<{ name: string, data: number[] }[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const quantityNeededByOrderer: { [key: string]: { [key: string]: number } } = {};
    const months: Set<string> = new Set();

    data?.forEach((item) => {
      const monthYear = moment(item.created_at).format('MMMM YYYY');
      const orderer = item.ordered_by.split('-')[1];

      months.add(monthYear);

      if (!quantityNeededByOrderer[orderer]) {
        quantityNeededByOrderer[orderer] = {};
      }

      if (quantityNeededByOrderer[orderer][monthYear]) {
        quantityNeededByOrderer[orderer][monthYear] += parseInt(item.quantity_needed);
      } else {
        quantityNeededByOrderer[orderer][monthYear] = parseInt(item.quantity_needed);
      }
    });

    const monthList = Array.from(months).sort((a, b) => moment(a, 'MMMM YYYY').diff(moment(b, 'MMMM YYYY')));
    const seriesData = monthList.map(month => ({
      name: month,
      data: Object.keys(quantityNeededByOrderer).map(orderer => quantityNeededByOrderer[orderer][month] || 0)
    }));

    setSeries(seriesData);
    setCategories(Object.keys(quantityNeededByOrderer));
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
    }
  };

  return (
    <div className="col-span-12 w-full rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div>
        <h3 className="text-xl font-semibold text-black dark:text-white">
          Quantity Ordered By Districts
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

export default QuantityNeeded;
