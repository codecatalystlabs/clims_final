import React from 'react';
import ReactApexChart from 'react-apexcharts';



const HotspotStatusBarChart: React.FC<{ title: string; data: any[] }> = ({ title, data }) => {
    // Aggregate the counts of active and not active statuses per district
    const districtData = data.reduce((acc, item) => {
        const { district, status } = item;
        if (!acc[district]) {
            acc[district] = { active: 0, notActive: 0 };
        }
        if (status === 'active') {
            acc[district].active++;
        } else {
            acc[district].notActive++;
        }
        return acc;
    }, {});

    const categories = Object.keys(districtData);
    const activeSeries = categories.map(district => districtData[district].active);
    const notActiveSeries = categories.map(district => districtData[district].notActive);

    // Define the chart options
    const options = {
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: categories
        },
        yaxis: {
            title: {
                text: 'Count'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val;
                }
            }
        },
        legend: {
            position: 'bottom'
        }
    };

    // Define the series data
    const series = [
        {
            name: 'Active',
            data: activeSeries
        },
        {
            name: 'Not Active',
            data: notActiveSeries
        }
    ];

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
              series={series}
              type="bar"
              height={500}
            />
          </div>
        </div>
      )}
        </div>
    );
};

export default HotspotStatusBarChart;
