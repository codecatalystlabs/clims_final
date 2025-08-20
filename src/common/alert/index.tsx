import React from 'react';
import { Alert, Button, Space } from 'antd';

interface data {
    hotspotname: string;
    desc: string
}

const CustomAlert: React.FC<data> = ({ hotspotname, desc }) => (
    <Space direction="vertical" style={{ width: '100%' }}>

        <Alert
            message={hotspotname}
            description={desc}
            style={{}}
            type="success"
            action={
                <Space direction="vertical">
                    <Button className="bg-[#26e83644] font-extrabold text-white" size="small" >
                        Verify
                    </Button>
                    <Button size="small" danger type="ghost">
                        Decline
                    </Button>
                </Space>
            }
            closable
        />
    </Space>
);

export default CustomAlert;