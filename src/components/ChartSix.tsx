import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ChartProps {
  data: Array<{
    id: number;
    order_date: string;
    quantity_needed: number;
    quantity_issued: number;
  }>;
}

const ChartComponent: React.FC<ChartProps> = ({ data, title }) => {
  // Helper function to aggregate data by month
  const aggregateDataByMonth = (data: any) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const aggregatedData: { [key: string]: number } = {};

    // Initialize quantities for all months to zero
    monthNames.forEach((month) => {
      aggregatedData[month] = 0;
    });

    // Aggregate data by month
    data.forEach((order: any) => {
      const month = new Date(order.order_date).toLocaleString('default', { month: 'long' });
      aggregatedData[month] += parseInt(order.quantity_needed.toString(), 10);
    });

    // Map aggregated data to series format
    return monthNames.map((month) => ({
      x: month,
      y: aggregatedData[month],
    }));
  };

  const series = [{
    name: 'Quantity Ordered',
    data: aggregateDataByMonth(data),
  }];

  const options: ApexOptions = {
    chart: {
      height: 400,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      type: 'category',
      categories: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
    },
    yaxis: {
      title: {
        text: 'Quantity (condoms)',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} condoms`,
      },
    },
  };

  return (
    <div className="w-full bg-white p-5">
      <div className="row-span-1 mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            {title}
          </h5>
        </div>
      </div>
      {
        data.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">No Data to Analyze</p>
          </div>
        ) : (
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={400}
          />
        )
      }
    </div>
  );
};

export default ChartComponent;
