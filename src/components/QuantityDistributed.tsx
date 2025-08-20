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
  receiving_organization_unit: { name: string }[];
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
  organization_unit_stocking: string;
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

interface ChartProps {
  data: InventoryItem[];
}

const CondomQuantityDistributed: React.FC<ChartProps> = ({ data }) => {
  const [series, setSeries] = useState<{ name: string, data: number[] }[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const receivingOrgCounts: { [key: string]: number } = {};
    
    if (Array.isArray(data)) {
    data?.forEach((item) => {
      if (item.distributions) {
        item.distributions.forEach((distribution) => {
          distribution.receiving_organization_unit.forEach((org) => {
            if (receivingOrgCounts[org.name]) {
              receivingOrgCounts[org.name] += parseInt(distribution.transaction_quantity);
            } else {
              receivingOrgCounts[org.name] = parseInt(distribution.transaction_quantity);
            }
          });
        });
      }
    });
  }

    setSeries([{ name: 'Total Condoms Distributed', data: Object.values(receivingOrgCounts) }]);
    setCategories(Object.keys(receivingOrgCounts));
  }, [data]);

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
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
  };

  return (
    <div className="col-span-12 w-full rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div>
        <h3 className="text-xl font-semibold text-black dark:text-white">
          Total Condoms Distributed To Each Hotspot
        </h3>
      </div>

      {
        data?.length==0?(
          <div className="flex items-center justify-center h-64">
          <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">No Data to Analyze</p>
        </div>         
        ):(
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

export default CondomQuantityDistributed;
