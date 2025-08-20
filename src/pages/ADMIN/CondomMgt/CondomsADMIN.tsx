import CustomCard from '../../../components/CustomCard';
import CondomTable from './CondomTable';
import CustomPicker from '../../../common/datepicker';

const CondomsADMIN = () => {
  const cardData = [
    {
      id: 1,
      title: 'Total Condoms',
      amount: 10,
    },
    {
      id: 2,
      title: 'Condoms Distributed',
      amount: 8,
    },
    {
      id: 3,
      title: 'Success rate',
      amount: '70%',
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {cardData.map(({ title, amount, id }) => (
          <CustomCard key={id} title={title} amount={amount} percentage={0} />
        ))}
      </div>
      <div className="flex items-center justify-between p-[2rem]">
        <div className="mt-[2rem] p-[1rem] text-left font-bold">
          <h1>Condom Distribution</h1>
        </div>
        <div>
          <p>Select Range of display </p>
          <CustomPicker />
        </div>
      </div>
      <CondomTable data={undefined} />
    </div>
  );
};

export default CondomsADMIN;

// import { SettingOutlined } from '@ant-design/icons';
// import type { CollapseProps } from 'antd';
// import { Collapse, Select } from 'antd';
// import React, { useState } from 'react';
// import CondomUploadEvidence from '../DCFP/CondomUploadEvidence';
// import MyOrders from '../DCFP/MyOrders';

// const { Option } = Select;

// const text = `
//   A dog is a type of domesticated animal.
//   Known for its loyalty and faithfulness,
//   it can be found as a welcome guest in many households across the world.
// `;

// type ExpandIconPosition = 'start' | 'end';

// const Procured: React.FC = () => {
//     const [expandIconPosition, setExpandIconPosition] = useState<ExpandIconPosition>('end');

//     const onPositionChange = (newExpandIconPosition: ExpandIconPosition) => {
//         setExpandIconPosition(newExpandIconPosition);
//     };

//     const onChange = (key: string | string[]) => {
//         console.log(key);
//     };

//     //   const genExtra = () => (
//     //     <SettingOutlined
//     //       onClick={(event) => {
//     //         // If you don't want click extra trigger collapse, you can prevent this:
//     //         event.stopPropagation();
//     //       }}
//     //     />
//     //   );

//     const items: CollapseProps['items'] = [
//         {
//             key: '1',
//             label: 'Condom Inventory NMS ',
//             children: <CondomUploadEvidence />,

//         },
//         {
//             key: '2',
//             label: 'Condom Inventory JMS',
//             children: <MyOrders />,

//         },
//         {
//             key: '3',
//             label: 'Condom Inventory PUBLIC SECTOR',
//             children: <div>{text}</div>,

//         },
//     ];

//     return (
//         <>
//             <h2 className="text-lg text-black-2 font-extrabold p-[1rem] capitalize ">Procured Condom Status</h2>
//             <Collapse
//                 defaultActiveKey={['1']}
//                 onChange={onChange}
//                 expandIconPosition={expandIconPosition}
//                 items={items}
//             />

//         </>
//     );
// };

// export default Procured;
