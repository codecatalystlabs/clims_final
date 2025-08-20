import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface Hotspot {
  id: number;
  district: string | null;
}

interface ChartProps {
  data: Hotspot[];
}

const ChartTen: React.FC<ChartProps> = ({ data }) => {
  // Helper function to count hotspots by district
  const countHotspotsByDistrict = (data: Hotspot[]) => {
    const counts = data.reduce((acc, hotspot) => {
      // Use a placeholder for null district values
      const district = hotspot.district || 'kampala';
      acc[district] = (acc[district] || 0) + 1;
      return acc;
    }, {});

    // Convert to series data format
    return Object.entries(counts).map(([district, count]) => ({
      x: district,
      y: count,
    }));
  };

  const series = [
    {
      name: 'Number of Hotspots',
      data: countHotspotsByDistrict(data),
    },
  ];

  const options: ApexOptions = {
    chart: {
      height: 400,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        horizontal: true, // horizontal bar for better visualization of district names
        barHeight: '60%',
      },
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: data.map((hotspot) => hotspot.district || 'Unknown'),
    },
    yaxis: {
      title: {
        text: 'Number of Hotspots',
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} hotspots`,
      },
    },
    fill: {
      opacity: 1,
    },
  };

  return (
    <div className="w-full rounded bg-white p-5 shadow-md">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={400}
      />
    </div>
  );
};

export default ChartTen;
