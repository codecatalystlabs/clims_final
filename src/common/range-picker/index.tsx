import React from 'react';
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

const CustomRangePicker: React.FC = () => (
    <Space direction="vertical" size={22}>
        <RangePicker />
        
    </Space>
);
