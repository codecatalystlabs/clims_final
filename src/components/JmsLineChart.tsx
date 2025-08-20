import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Distribution {
  id: number;
  transaction_type: string;
  transaction_quantity: string;
  balance_on_hand: string;
  sending_organization_unit: string;
  receiving_organization_unit: string[];
  transacted_by: string;
  transaction_date: string;
  condom_inventory_id: string;
  sending_organization_unit_level: string | null;
  receiving_organization_unit_level: string;
  created_at: string;
  updated_at: string;
  evidences: any[];
}

interface DataItem {
  id: number;
  condom_id: any[];
  organization_unit_stocking: string;
  quantity_in_stock: string;
  batch_number: string;
  unit_of_measure_id: string | null;
  condom_unit_cost: string | null;
  created_by: string;
  date_of_creation: string;
  created_at: string;
  updated_at: string;
  stock_registrations: any[];
  distributions: Distribution[];
}

interface JmsLineChartProps {
  data: DataItem[];
  title: string;
}

const JmsLineChart: React.FC<JmsLineChartProps> = ({ data, title }) => {
  const [state, setState] = useState({
    series: [],
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const allMonths = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const initialData = allMonths.map((month) => ({ x: month, y: 0 }));

    const filteredData = selectedDate
      ? data
          .flatMap((item) => item.distributions)
          .filter((distribution) => {
            const distDate = new Date(distribution.transaction_date);
            return distDate.getFullYear() === selectedDate.getFullYear();
          })
      : data.flatMap((item) => item.distributions);

    const totalDistributions = filteredData.reduce(
      (acc: any, item: Distribution) => {
        const distDate = new Date(item.transaction_date);
        const monthIndex = distDate.getMonth();
        acc.data[monthIndex].y += parseInt(item.transaction_quantity, 10);
        return acc;
      },
      { data: [...initialData], name: 'Total Distributions' }
    );

    setState({ series: [totalDistributions] });
  }, [data, selectedDate]);

  const options: ApexOptions = {
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      height: 335,
      type: 'area',
      dropShadow: {
        enabled: true,
        color: '#623CEA14',
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },
      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: 'straight',
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: '#fff',
      strokeColors: ['#3056D3', '#80CAEE'],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: 'category',
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: '0px',
        },
      },
      min: 0,
      max: state.series[0]?.data
        ? Math.max(...state.series[0].data.map((d) => d.y), 100)
        : 100,
    },
  };

  return (
    <div className="w-1/2 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            {title}
          </h5>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            dateFormat="yyyy"
            showYearPicker
            placeholderText="Select Year"
            className="rounded-md border p-1 text-xs"
          />
        </div>
      </div>

      <div>
        <div id="JmsLineChart" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default JmsLineChart;
