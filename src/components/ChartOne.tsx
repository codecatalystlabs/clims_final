import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import DatePicker from 'react-datepicker'; // Import the DatePicker component
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles for the DatePicker

interface ChartOneProps {
  data: any[];
  title: string;
}

const ChartOne: React.FC<ChartOneProps> = ({ data, title }: ChartOneProps) => {
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
      ? data.filter((item) => {
          const orderDate = new Date(item.order_date);
          return orderDate.getFullYear() === selectedDate.getFullYear();
        })
      : data;

    const totalOrderCounts = filteredData.reduce(
      (acc: any, item: any) => {
        const orderDate = new Date(item.order_date);
        const monthIndex = orderDate.getMonth();
        acc.data[monthIndex].y += 1;
        return acc;
      },
      { data: [...initialData], name: 'Total Orders' }
    );

    setState({ series: [totalOrderCounts] });
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
        'Sep',
        'Oct',
        'Nov',
        'Dec',
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
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
      max: 100,
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
          {/* Use the DatePicker component */}
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
        <div id="chartOne" className="-ml-5">
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

export default ChartOne;

// import { ApexOptions } from 'apexcharts';
// import React, { useState,useEffect } from 'react';
// import ReactApexChart from 'react-apexcharts';

// interface ChartOneState {
//   series: {
//     name: string;
//     data: number[];
//   }[];
// }

// const ChartOne: React.FC = ({ data,title}:any) => {
//   console.log(data,"aagaahjahahhajhjajajajaj")
//   const [state, setState] = useState<ChartOneState>({
//     series: [],
//   });

//   useEffect(() => {
//     // Define an array of all months
//     const allMonths = [
//       'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//     ];

//     // Initialize data for each month with counts set to zero
//     const initialData = allMonths.map(month => ({ x: month, y: 0 }));

//     const totalOrderCounts = data.reduce((acc:any, item:any) => {
//       const orderDate = new Date(item.order_date);
//       const monthIndex = orderDate.getMonth();

//       // Increment the count for the corresponding month
//       acc.data[monthIndex].y += 1;

//       return acc;
//     }, { data: [...initialData], name: 'Total Orders' });

//     setState({ series: [totalOrderCounts] });
//   }, [data]);

//    const options: ApexOptions = {
//       legend: {
//         show: false,
//         position: 'top',
//         horizontalAlign: 'left',
//       },
//       colors: ['#3C50E0', '#80CAEE'],
//       chart: {
//         fontFamily: 'Satoshi, sans-serif',
//         height: 335,
//         type: 'area',
//         dropShadow: {
//           enabled: true,
//           color: '#623CEA14',
//           top: 10,
//           blur: 4,
//           left: 0,
//           opacity: 0.1,
//         },

//         toolbar: {
//           show: false,
//         },
//       },
//       responsive: [
//         {
//           breakpoint: 1024,
//           options: {
//             chart: {
//               height: 300,
//             },
//           },
//         },
//         {
//           breakpoint: 1366,
//           options: {
//             chart: {
//               height: 350,
//             },
//           },
//         },
//       ],
//       stroke: {
//         width: [2, 2],
//         curve: 'straight',
//       },

//       grid: {
//         xaxis: {
//           lines: {
//             show: true,
//           },
//         },
//         yaxis: {
//           lines: {
//             show: true,
//           },
//         },
//       },
//       dataLabels: {
//         enabled: false,
//       },
//       markers: {
//         size: 4,
//         colors: '#fff',
//         strokeColors: ['#3056D3', '#80CAEE'],
//         strokeWidth: 3,
//         strokeOpacity: 0.9,
//         strokeDashArray: 0,
//         fillOpacity: 1,
//         discrete: [],
//         hover: {
//           size: undefined,
//           sizeOffset: 5,
//         },
//       },
//       xaxis: {
//         type: 'category',
//         categories: [
//           'Sep',
//           'Oct',
//           'Nov',
//           'Dec',
//           'Jan',
//           'Feb',
//           'Mar',
//           'Apr',
//           'May',
//           'Jun',
//           'Jul',
//           'Aug',
//         ],
//         axisBorder: {
//           show: false,
//         },
//         axisTicks: {
//           show: false,
//         },
//       },
//       yaxis: {
//         title: {
//           style: {
//             fontSize: '0px',
//           },
//         },
//         min: 0,
//         max: 100,
//       },
//     };

//   return (
//     <div className=" rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5  w-1/2">
//       <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
//       <div>
//           <h5 className="text-xl font-semibold text-black dark:text-white">
//             {title}
//           </h5>
//         </div>
//         {/* <div className="flex w-full max-w-45 justify-end">
//           <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
//             <button className="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
//               Day
//             </button>
//             <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
//               Week
//             </button>
//             <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
//               Month
//             </button>
//           </div>
//         </div> */}
//       </div>

//       <div>
//         <div id="chartOne" className="-ml-5">
//         <ReactApexChart
//             options={options}
//             series={state.series}
//             type="area"
//             height={350}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChartOne;
