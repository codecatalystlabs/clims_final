import { Button } from 'antd';
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';

const HotspotButtons = ({ onAddClick, onExportClick }: any) => (
  <div className="flex items-center justify-center space-x-4">
    <Button
      style={{ backgroundColor: '#006D5B', color: 'white', border: 'none' }}
      onClick={onAddClick}
      type="primary"
      icon={<PlusOutlined />}
    >
      Add Hotspot
    </Button>
    <Button
      style={{ backgroundColor: '#006D5B', color: 'white', border: 'none' }}
      onClick={onExportClick}
      type="primary"
      icon={<DownloadOutlined />}
    >
      Export Excel
    </Button>
  </div>
);

export default HotspotButtons;
