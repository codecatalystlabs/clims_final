import { AiFillDashboard } from 'react-icons/ai';
import { FaMapLocation } from 'react-icons/fa6';
import { GrDocumentStore } from 'react-icons/gr';
import { PiHandshakeBold } from 'react-icons/pi';
import { GrUserManager } from 'react-icons/gr';
import { MdDeliveryDining } from 'react-icons/md';
import { AiOutlineStock } from 'react-icons/ai';
import { RiHotspotFill } from 'react-icons/ri';
import { BsFillFolderSymlinkFill } from 'react-icons/bs';
import { GiTemporaryShield } from 'react-icons/gi';

export const items = [
  {
    label: 'National Level',
    value: 1,
  },
  {
    label: 'District Level',
    value: 2,
  },
  {
    label: 'Facility Level',
    value: 3,
  },
  {
    label: 'Community Level',
    value: 4,
  },
];

export const orderData = [
  // {
  //   id: 1,
  //   text: 'Order data',
  //   link: '/condom/distributions',
  // },
  // {
  //   id: 2,
  //   text: 'Distribution data',
  //   link: '/condom/distributions',
  // },
  {
    id: 1,
    text: 'Hotspots info',
    link: '/moh/hotspot',
  },
];

export const orgs = [
  {
    id: 1,
    name: 'nms',
  },
  {
    id: 2,
    name: 'jms',
  },
];

export const cardData = [
  {
    id: 1,
    amount: 0,
    text: 'Total Hotspots',
    // percentage: 0.43
  },
  {
    id: 2,
    amount: 0,
    text: 'Active Hotspots',
    // percentage: 0.43
  },
  {
    id: 3,
    amount: 0,
    text: 'In active',
    // percentage: 0.43
  },
  {
    id: 4,
    amount: 0,
    text: 'Other',
    // percentage: 0.43
  },
];

const modules = [
  {
    role: 'moh',
    pathName: '/moh',
    pathNameInclude: 'moh',
    title: 'MOH',
    list: [
      {
        name: 'dashboard',
        route: '/moh',
        icon: <AiFillDashboard size={25} />,
      },
      {
        name: 'Condom Distributions',
        route: '/allStock',
        icon: <AiOutlineStock size={25} />

      },
      {
        name: 'Hotspots',
        route: '/moh/hotspot',
        icon: <RiHotspotFill size={25} />,
      },
      {
        name: 'Hotspot Map',
        route: '/hotspots/map',
        icon: <FaMapLocation size={25} />,
      }

    ],
  },
  {
    role: 'admin',
    pathName: '/adminModule/admin/usermanagment',
    pathNameInclude: 'adminModule/admin/usermanagment',
    title: 'ADMINISTRATOR',
    list: [
      // {
      //   name: 'dashboard',
    
        {
          name: 'Condoms Items',
          route: '/item/condoms',
          icon: <GiTemporaryShield size={25} />,
        },
      {
        name: 'User Managment',
        route: '/adminModule/admin/usermanagment',
        icon: <GrUserManager size={25} />,
      },
    ],
  },
  {
    role: 'dfcp',
    pathName: '/dfcp',
    pathNameInclude: 'dfcp',
    title: 'DFCP ',
    list: [
      {
        name: 'dashboard',
        route: '/focaldashboard',
        icon: <AiFillDashboard size={25} />,
      },
      {
        name: 'Orders',
        route: '/dfcp/orders',
        icon: <MdDeliveryDining size={25} />,
      },
      {
        name: 'Condom Stock',
        route: '/dfcp/condom/stock',
        icon: <AiOutlineStock size={25} />,
      },
      {
        name: 'Hotspots Management',
        route: '/district/hotspots',
        icon: <RiHotspotFill size={25} />,
      },
      {
        name: 'Hotspots View',
        route: '/hotspots/map',
        icon: <FaMapLocation size={25} />,
      },
      {
        name: 'Files Management',
        route: '/document/management',
        icon: <BsFillFolderSymlinkFill size={25} />,
      },
    ],
  },
  {
    role: 'jms',
    pathName: '/ui',
    pathNameInclude: 'ui',
    title: 'JMS',
    list: [
      {
        name: 'Dashboard',
        route: '/jms',
        icon: <AiFillDashboard size={25} />,
      },
      // {
      //   name: 'Condom stock',
      //   route: '/jms/stock',
      // },
      {
        name: 'Orders',
        route: '/jms/orders',
        icon: <MdDeliveryDining size={25} />,
      },
      {
        name: 'Condom Stock',
        route: '/jms/condoms/stock',
        icon: <AiOutlineStock size={25} />,
      },
      {
        name: 'Hotspots',
        route: '/moh/hotspot',
        icon: <RiHotspotFill size={25} />,
      },
      {
        name: 'Hotspot Map',
        route: '/hotspots/map',
        icon: <FaMapLocation size={25} />,
      },
      {
        name: 'Files Management',
        route: '/document/management',
        icon: <BsFillFolderSymlinkFill size={25} />,
      }
    ],
  },
  {
    role: 'store incharge',
    pathName: '/ui',
    pathNameInclude: 'ui',
    title: 'Store Incharge',
    list: [
      {
        name: 'Dashboard',
        route: '/storeincharge',
        icon: <AiFillDashboard size={25} />,
      },
      {
        name: 'Upload Evidence',
        route: '/dfcp/condom/evidence',
      },
      {
        name: 'Order Mgt',
        route: '/dfcp/condom/orders',
      },
    ],
  },
  {
    role: 'nms',
    pathName: '/auth',
    pathNameInclude: 'auth',
    title: 'NMS',
    list: [
      {
        name: 'Dashboard',
        route: '/nms/dashboard',
        icon: <AiFillDashboard size={25} />,
      },
      {
        name: 'Orders',
        route: '/nms/orders',
      },
      {
        name: 'Condoms',
        route: '/nms/condoms',
      },
    ],
  },
  {
    role: 10,
    pathName: '/ui',
    pathNameInclude: 'ui',
    title: 'OTHER USER',
    list: [
      {
        name: 'Dashboard',
        route: '/other/condom',
        icon: <AiFillDashboard />,
      },
      {
        name: 'Condom Management',
        route: '/other/condom',
      },
      {
        name: 'Condom Management',
        route: '/',
      },
    ],
  },
  {
    role: 'other supplier',
    pathName: '/ui',
    pathNameInclude: 'ui',
    title: 'OTHER SUPPLIER ',
    list: [
      {
        name: 'Dashboard',
        route: '/others/dashboard',
        icon: <AiFillDashboard />,
      },
      {
        name: 'Status Check',
        route: '/others/status',
      },
      {
        name: 'Add Record',
        route: '/others/record',
      },
    ],
  },
  // {
  //   role: 'hotspot manager',
  //   pathName: '/forms',
  //   pathNameInclude: 'forms',
  //   title: 'HOTSPOT MANAGER',
  //   list: [
  //     {
  //       name: 'Dashboard',
  //       route: '/focaldashboardh',
  //       icon: <AiFillDashboard />,
  //     },
  //     {
  //       name: 'My Orders',
  //       route: '/dfcp/condom/ordersh',
  //     },
  //     {
  //       name: 'Condom',
  //       route: '/dfcp/condom/evidenceh',
  //     },
  //   ],
  // },
];

export { modules };
