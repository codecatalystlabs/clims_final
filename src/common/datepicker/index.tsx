import React from 'react';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';

interface CustomPickerProps {
  onDateChange: (dates: [moment.Moment, moment.Moment]) => void;
}

const CustomPicker: React.FC<CustomPickerProps> = ({ onDateChange }) => (
  <Space direction="vertical" size={12}>
    <RangePicker
      defaultValue={[dayjs(), dayjs()]}
      format={dateFormat}
      onChange={(dates) =>
        onDateChange(dates as [moment.Moment, moment.Moment])
      }
    />
  </Space>
);

export default CustomPicker;
