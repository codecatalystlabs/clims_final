import { SettingOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Collapse, Select } from 'antd';
import React, { useState } from 'react';
import CondomUploadEvidence from '../DCFP/CondomUploadEvidence';
import MyOrders from '../DCFP/MyOrders';

const { Option } = Select;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

type ExpandIconPosition = 'start' | 'end';

const Procured: React.FC = () => {
    const [expandIconPosition, setExpandIconPosition] = useState<ExpandIconPosition>('end');

    const onPositionChange = (newExpandIconPosition: ExpandIconPosition) => {
        setExpandIconPosition(newExpandIconPosition);
    };

    const onChange = (key: string | string[]) => {
        console.log(key);
    };

    //   const genExtra = () => (
    //     <SettingOutlined
    //       onClick={(event) => {
    //         // If you don't want click extra trigger collapse, you can prevent this:
    //         event.stopPropagation();
    //       }}
    //     />
    //   );

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Condom Inventory NMS ',
            children: <CondomUploadEvidence />,

        },
        {
            key: '2',
            label: 'Condom Inventory JMS',
            children: <MyOrders />,

        },
        {
            key: '3',
            label: 'Condom Inventory PUBLIC SECTOR',
            children: <div>{text}</div>,

        },
    ];

    return (
        <>
            <h2 className="text-lg text-black-2 font-extrabold p-[1rem] capitalize ">Procured Condom Status</h2>
            <Collapse
                defaultActiveKey={['1']}
                onChange={onChange}
                expandIconPosition={expandIconPosition}
                items={items}
            />

        </>
    );
};

export default Procured;