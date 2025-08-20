import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';

// Define interfaces for the structure of your data
interface Evidence {
  id: number;
  transaction_id: string;
  name_of_evidence: string | null;
  evidence_location: string;
  created_at: string;
  updated_at: string;
}

interface Distribution {
  id: number;
  transaction_type: string;
  transaction_quantity: string;
  balance_on_hand: string;
  sending_organization_unit: string;
  receiving_organization_unit: string;
  transacted_by: string;
  transaction_date: string;
  condom_inventory_id: string;
  sending_organization_unit_level: string | null;
  receiving_organization_unit_level: string | null;
  created_at: string;
  updated_at: string;
  evidences: Evidence[];
}

interface Condom {
  id: number;
  category: string;
  brand: string;
  type: string;
  unit_of_measure_id: string;
  created_at: string;
  updated_at: string;
  number_of_condoms_per_unit: string | null;
}

interface InventoryItem {
  id: number;
  condom_id: Condom[];
  organization_unit_stocking: {
    authority: string;
    district: string;
    district_uid: string;
    hflevel: string;
    id: number;
    name: string;
    nhfrid: number;
    ownership: string;
    region: string;
    region_uid: string;
    shortname: string;
    status: string;
    subcounty: string;
    subcounty_uid: string;
    uid: string;
  };
  original_stock: string;
  quantity_in_stock: string;
  batch_number: string | null;
  unit_of_measure_id: string | null;
  condom_unit_cost: string | null;
  created_by: string;
  date_of_creation: string;
  created_at: string;
  updated_at: string;
  additions: any[];
  distributions: Distribution[];
}

interface ChartFourProps {
  data: InventoryItem[];
}

interface ChartFourState {
  series: { name: string; data: number[] }[];
  categories: string[];
}

const DistrictCondomGraph: React.FC<ChartFourProps> = ({ data, title }) => {
  const [state, setState] = useState<ChartFourState>({
    series: [
      { name: 'Opening Balance', data: [] },
      { name: 'Balance on Hand', data: [] },
      { name: 'Condoms Distributed', data: [] }
    ],
    categories: [],
  });

  useEffect(() => {
    const originalStock: { [key: string]: number } = {};
    const balanceOnHand: { [key: string]: number } = {};
    const categories: Set<string> = new Set();

    // Create a range of months to ensure all months are displayed
    const startDate = moment().subtract(1, 'year');
    const endDate = moment();
    for (let m = moment(startDate); m.isBefore(endDate); m.add(1, 'month')) {
      const month = m.format('MMMM YYYY');
      originalStock[month] = 0;
      balanceOnHand[month] = 0;
      categories.add(month);
    }

    if (Array.isArray(data)) {
      data.forEach((item) => {
        const month = moment(item.created_at).format('MMMM YYYY');
        categories.add(month);

        if (!originalStock[month]) {
          originalStock[month] = 0;
        }
        if (!balanceOnHand[month]) {
          balanceOnHand[month] = 0;
        }

        originalStock[month] += parseInt(item.original_stock, 10);
        balanceOnHand[month] += parseInt(item.quantity_in_stock, 10);
      });
    }

    const sortedCategories = Array.from(categories).sort((a, b) => moment(a, 'MMMM YYYY').diff(moment(b, 'MMMM YYYY')));
    const originalStockData = sortedCategories.map(month => originalStock[month]);
    const balanceOnHandData = sortedCategories.map(month => balanceOnHand[month]);
    const condomsDistributedData = sortedCategories.map(month => originalStock[month] - balanceOnHand[month]);

    setState({
      series: [
        { name: 'Opening Balance', data: originalStockData },
        { name: 'Balance on Hand', data: balanceOnHandData },
        { name: 'Condoms Distributed', data: condomsDistributedData }
      ],
      categories: sortedCategories,
    });
  }, [data]);

  const options: ApexOptions = {
    colors: ['#3C50E0', '#FF4560', '#00E396'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'bar',
      height: 350,
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        dataLabels: {
          position: 'top',
        },
      },
    },
    xaxis: {
      categories: state.categories,
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
      title: {
        text: 'Month',
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#263238',
        },
      },
    },
    yaxis: {
      min: 0, // Ensure the y-axis starts from 0
      title: {
        text: 'Condom Amount',
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#263238',
        },
      },
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'inter',
      markers: {
        radius: 99,
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    tooltip: {
      x: {
        show: true,
      },
    },
  };

  return (
    <div className="col-span-12 w-full rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div>
        <h3 className="text-xl font-semibold text-black dark:text-white">
          {title}
        </h3>
      </div>

      {data?.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">No Data to Analyze</p>
        </div>
      ) : (
        <div className="mb-2">
          <div id="chartFour" className="-ml-5">
            <ReactApexChart
              options={options}
              series={state.series}
              type="line"
              height={350}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DistrictCondomGraph;
