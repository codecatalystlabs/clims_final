import React, { useState, useEffect } from 'react';
//@ts-ignore
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';

const CondomUsed = ({ data }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [filteredData, setFilteredData] = useState(data || []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const getColumnSearchProps = (dataIndex: string, columnTitle: string) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${columnTitle}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Clear Search
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value: string, record: { [x: string]: { toString: () => string } }) =>
      record[dataIndex]?.toString()?.toLowerCase()?.includes(value.toLowerCase()),
    render: (text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined) =>
      searchedColumn === dataIndex ? (
        <span style={{ fontWeight: 'bold' }}>{text}</span>
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys: React.SetStateAction<string>[], confirm: () => void, dataIndex: React.SetStateAction<string>) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const modifiedData = data.map((item: any) => ({
    ...item,
    totalAvailable: parseInt(item.stock_found) + parseInt(item.quantity_brought)
  }));

  // Calculate condom usage data
  const calculateCondomUsage = (data: any) => {
    const usageData: any[] = [];

    const hotspots = data.reduce((acc: any, item: any) => {
      const { hotspot_id } = item;
      if (!acc[hotspot_id?.name]) acc[hotspot_id?.name] = [];
      acc[hotspot_id?.name].push(item);
      return acc;
    }, {});

    Object.entries(hotspots).forEach(([hotspotName, hotspotData]: any) => {
      if (hotspotData.length > 1) { // Only calculate usage if more than one delivery
        hotspotData.sort((a: any, b: any) => new Date(a.created_at) - new Date(b.created_at));

        for (let i = 1; i < hotspotData.length; i++) {
          const previous = hotspotData[i - 1];
          const current = hotspotData[i];

          const condomsUsed = previous.totalAvailable - current.stock_found;
          const deliveryRange = `${moment(previous.created_at).format('DD/MM/YYYY')} - ${moment(current.created_at).format('DD/MM/YYYY')}`;

          usageData.push({
            hotspotName,
            district: hotspotData[0]?.hotspot_id?.district, // Get district from the first item in hotspotData
            deliveryRange,
            condomsUsed,
          });
        }
      }
    });

    return usageData;
  };

  const condomUsageData = calculateCondomUsage(modifiedData);


  const usageColumns = [
    {
      title: 'Hotspot Name',
      dataIndex: 'hotspotName',
      key: 'hotspotName',
    },
    {
      title: 'District',
      dataIndex: 'district',
      key: 'district',
    },
    {
      title: 'Delivery Range',
      dataIndex: 'deliveryRange',
      key: 'deliveryRange',
    },
    {
      title: 'Condoms Used',
      dataIndex: 'condomsUsed',
      key: 'condomsUsed',
    }
  ];

  const handleTableChange = (_pagination: any, filters: { [x: string]: any }, sorter: { field: any; order?: any }) => {
    // Apply sorting
    if (sorter && sorter.field) {
      const { field, order } = sorter;
      const sortedData = [...filteredData].sort((a, b) => {
        const result = a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
        return order === 'descend' ? -result : result;
      });
      setFilteredData(sortedData);
    }

    // Apply filtering
    if (filters && Object.keys(filters).length > 0) {
      let filteredDataCopy = [...data];
      Object.keys(filters).forEach((key) => {
        const selectedFilters = filters[key];
        if (selectedFilters.length > 0) {
          filteredDataCopy = filteredDataCopy.filter((item) =>
            selectedFilters.includes(item[key])
          );
        }
      });
      setFilteredData(filteredDataCopy);
    }
  };
  return (
    <>
      {condomUsageData.length > 0 && (
        <Table
          columns={usageColumns}
          dataSource={condomUsageData}
          pagination={{ defaultPageSize: 10 }}
        />
      )}
    </>
  );
};

export default CondomUsed;
