//@ts-nocheck
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';



const CondomUsageChart = ({data}:any) => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: [],
      },
      title: {
        text: 'Condom Usage Per Month',
        align: 'center'
      }
    },
  });

  useEffect(() => {
    const processedData = processData(data);
    setChartData({
      series: processedData.series,
      options: {
        ...chartData.options,
        xaxis: {
          categories: processedData.categories
        }
      }
    });
  }, []);

  const processData = (data) => {
    // Sort data by created_at
    const sortedData = [...data].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

    // Group by month and calculate usage
    const usageByMonth = {};
    sortedData.forEach(entry => {
      const date = new Date(entry.created_at);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
      const usage = parseInt(entry.quantity_brought) - parseInt(entry.stock_found);
      const name = entry.hotspot_id.name;

      if (!usageByMonth[name]) {
        usageByMonth[name] = {};
      }

      if (!usageByMonth[name][monthYear]) {
        usageByMonth[name][monthYear] = 0;
      }

      usageByMonth[name][monthYear] += usage;
    });

    // Prepare data for ApexCharts
    const categories = Object.keys(usageByMonth).flatMap(name =>
      Object.keys(usageByMonth[name])
    ).filter((value, index, self) => self.indexOf(value) === index);

    const series = Object.keys(usageByMonth).map(name => ({
      name,
      data: categories.map(month => usageByMonth[name][month] || 0)
    }));

    return { series, categories };
  };

  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default CondomUsageChart;
