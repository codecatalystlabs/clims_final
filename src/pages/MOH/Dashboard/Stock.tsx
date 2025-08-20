import React, { useEffect, useState } from 'react';
import { getRegions, getStockAtDistrict, getStockAtHotspots } from '../../../api/apiRequests';
import { useQuery } from '@tanstack/react-query';
import { Spin, Tabs } from 'antd';
import CondomStockSummary from './CondomStockSummary';
import OverAllStockTable from '../../../components/OverAllStockTable';
import HotspotStock from '../../../components/HotspotStock';
import CondomUsed from '../../../components/CondomUsed';
const {TabPane} = Tabs

export default function Stock() {
  const [stockData, setStockData] = useState([]);
  const [regionData, setRegionData] = useState([]);
  const [hotspotStock, setHotspotStock] = useState([]);



  const stockQuery = useQuery({
    queryKey: ['inventory'],
    queryFn: () => getStockAtDistrict(),
  });
  const regionsQuery = useQuery({
    queryKey: ['regions'],
    queryFn: () => getRegions(),
  });
  const hotspotStockQuery = useQuery({
    queryKey: ['hotspotStock'],
    queryFn: () => getStockAtHotspots(),
  });
  useEffect(() => {
    if (stockQuery.isSuccess) {
      setStockData(stockQuery.data);
    }
  }, [stockQuery.isSuccess, stockQuery.data]);

  useEffect(() => {
    if (regionsQuery.isSuccess) {
      setRegionData(regionsQuery.data);
    }
  }, [regionsQuery.isSuccess, regionsQuery.data]);

  useEffect(() => {
    if (hotspotStockQuery.isSuccess) {
      setHotspotStock(hotspotStockQuery.data);
    }
  }, [hotspotStockQuery.isSuccess, hotspotStockQuery.data]);



  const filteredData = stockData.filter(item => {
    const districtUid = item?.organization_unit_stocking.district_uid;
    return districtUid === "jms" || districtUid === "nms";
  });

  const filteredDistrictData = stockData.filter(item => {
    const districtUid = item?.organization_unit_stocking.district_uid;
    return districtUid !== "jms" && districtUid !== "nms";
  });
  
  
  console.log(hotspotStock,"======================>>>>>>>>>>>>>>");

  return (
    <div>
      <div className="bg-red-700 z-99999 flex items-center justify-between p-4 ">
        <div>
          <h3 className="text-lg font-bold">Condom Distributions Analysis</h3>
        </div>
      </div>
      <div className="col-span-12 mt-10 xl:col-span-8">
      <Tabs defaultActiveKey="1">
      <TabPane tab="Condom Distribution Summary" key="1">
          {stockQuery.isLoading ? (
            <Spin tip="Loading Table data" size="large">
              <div className="content" />
            </Spin>
          ) : (
            <CondomStockSummary data={filteredDistrictData} regions={regionData}/>
          )}
        </TabPane> 
        <TabPane tab="Condom Stock At Districts" key="2">
          {stockQuery.isLoading ? (
            <Spin tip="Loading Table data" size="large">
              <div className="content" />
            </Spin>
          ) : (
            <OverAllStockTable data={filteredDistrictData} />
          )}
        </TabPane> 
        <TabPane tab="Condom Stock At Warehouses" key="3">
          {stockQuery.isLoading ? (
            <Spin tip="Loading Table data" size="large">
              <div className="content" />
            </Spin>
          ) : (
            <OverAllStockTable data={filteredData} />
          )}
        </TabPane> 
        <TabPane tab="Condom Stock History At Hotspots" key="4">
          {stockQuery.isLoading ? (
            <Spin tip="Loading Table data" size="large">
              <div className="content" />
            </Spin>
          ) : (
            <HotspotStock data={hotspotStock} />
          )}
        </TabPane> 
        <TabPane tab="Condom Usage At Hotspots" key="5">
          {stockQuery.isLoading ? (
            <Spin tip="Loading Table data" size="large">
              <div className="content" />
            </Spin>
          ) : (
            <CondomUsed data={hotspotStock} />
          )}
        </TabPane> 
       </Tabs>
      </div>
    </div>
  );
}
