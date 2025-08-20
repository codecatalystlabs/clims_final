import CustomPicker from '../../../common/datepicker';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createOrder,
  getDistrictsForRegion,
  getHotspots,
  getOrders,
  getRegions,
  getSubCounties,
} from '../../../api/apiRequests';
import { Button, Modal, Select, Spin, Tabs, DatePicker } from 'antd';
import CustomInput from '../../../common/input';
import { displaySuccessMessage } from '../../../components/toast/Toast';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import DistributionTable from '../../../components/MOH/DistributionTable';
import { DownloadOutlined } from '@ant-design/icons';

import { items, orgs } from '../../../constants';
import axios from 'axios';
import HotspotDataTable from '../../../components/HotspotTable';
import HotspotStatusPieChart from '../../../components/HotspotPieChart';
import HotspotStatusBarChart from '../../../components/HotSpotBar';
import moment from 'moment';
const { Option } = Select;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const HotspotMgt = () => {
  const ID = localStorage.getItem('id');
  const [size, setSize] = useState<SizeType>('middle'); // default is 'middle'

  const [dataArray, setData] = useState<any>([]);
  const [orders, setOrders] = useState<any>([]);
  const [loc, setLoc] = useState<any | undefined>('');
  const [modalOpen, setModalOpen] = useState(false);
  const [ordered_for, setOrderedFor] = useState<any>(null);
  const [ordered_from, setOrderedFrom] = useState<any>(null);
  const [quantity_needed, setQuantityNeeded] = useState<any>(null);
  const [unit, setUnit] = useState<string>('');
  const [ordered_by, setOrderedBy] = useState<any>(ID);
  const [userID, setUserID] = useState<any>(null);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState<string>('National Level');
  const [showComp, setShowComp] = useState(1);
  const [regions, setRegions] = useState<any>([]);
  const [uid, setUid] = useState('');
  const [districts, setDistricts] = useState<any>([]);
  const [subCounties, setSubCounties] = useState<any>([]);
  const [districtId, setDistrictId] = useState('');
  const [selectedRange, setSelectedRange] = useState<
    [moment.Moment, moment.Moment] | null
  >(null);
  const [filteredInfo, setFilteredInfo] = useState();

  // console.log(uid, 'INCREMENTING');

  const queryClient = useQueryClient();

  const ordersQuery = useQuery({
    queryKey: ['orders'],
    queryFn: () => getOrders(),
  });

  const subCountiesQuery = useQuery({
    queryKey: ['subCounties'],
    queryFn: () => getSubCounties(districtId),
  });

  const regionsQuery = useQuery({
    queryKey: ['regions'],
    queryFn: () => getRegions(),
  });

  queryClient.invalidateQueries({ queryKey: ['regions'] });

  //districts query
  const districtsQuery = useQuery({
    queryKey: ['districts'],
    queryFn: () => getDistrictsForRegion(uid),
  });
  queryClient.invalidateQueries({ queryKey: ['districts'] });

  const hotspotQuery = useQuery({
    queryKey: ['hotspot'],
    queryFn: () => getHotspots(),
  });

  useEffect(() => {
    if (districtsQuery.isSuccess) {
      setDistricts(districtsQuery.data);
    }
  }, [districtsQuery.isSuccess, districtsQuery.data]);

  useEffect(() => {
    if (subCountiesQuery.isSuccess) {
      setSubCounties(subCountiesQuery.data);
    }
  }, [subCountiesQuery.isSuccess, subCountiesQuery.data]);

  useEffect(() => {
    if (regionsQuery.isSuccess) {
      setRegions(regionsQuery.data);
    }
  }, [regionsQuery.isSuccess, regionsQuery.data]);

  // console.log(regions, '>>>>>>>>>>>>>>>>>');

  useEffect(() => {
    if (hotspotQuery.isSuccess) {
      setData(hotspotQuery.data);
    }
  }, [hotspotQuery.isSuccess, hotspotQuery.data]);

  useEffect(() => {
    const location = localStorage.getItem('location');
    setLoc(location);
  }, []);

  useEffect(() => {
    if (ordersQuery.isSuccess) {
      setOrders(ordersQuery.data);
    }
  }, [ordersQuery.isSuccess, ordersQuery.data]);

  //am filtering basing on district
  let filteredData = dataArray?.filter((el: any) => {
    return el.district === 'kampala';
  });

  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      queryClient.setQueryData(['order'], data);
      queryClient.invalidateQueries(['order'], { exact: true });

      if (data.code == '201' || data.code == '200') {
        displaySuccessMessage('order created ');
        setModalOpen(false);
      }
    },
  });

  //action functions

  const handleCreateOrder = () => {
    createOrderMutation.mutate({
      ordered_from,
      ordered_by,
      unit,
      quantity_needed,
      ordered_for,
    });
  };

  const handleInputChange =
    (setState: (arg0: any) => void) => (event: { target: { value: any } }) => {
      setState(event.target.value);
      console.log(event.target.value);
    };

  // const getDistricts = async (uid: any) => {
  //   try {
  //     const response = await axios.get(
  //       `https://clims.health.go.ug/api/districts/${uid}`
  //     );
  //     console.log(response, '$$$$$$$$');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getDistricts(uid);
  // }, []);

  console.log('>>>>>>>>>', dataArray);
  const activeHotspots = dataArray.filter(
    (data: any) => data.status == 'active'
  );
  const inactiveHotspots = dataArray.filter(
    (data: any) => data.status != 'active'
  );

  const handleDateChange = (dates: [moment.Moment, moment.Moment] | null) => {
    setSelectedRange(dates);
  };

  // const filteredHotspotsByDate = dataArray.filter((hotspot: any) => {
  //   if (!selectedRange) return true; // If no date range selected, return all data

  //   const [startDate, endDate] = selectedRange;

  //   // Parse only the date part (ignoring time) from 'entry_date'
  //   const hotspotDate = moment(hotspot.entry_date.split(' ')[0], 'YYYY-MM-DD'); // Take only the 'YYYY-MM-DD' part

  //   // If the date is not valid, ignore this record
  //   if (!hotspotDate.isValid()) {
  //     console.warn(`Invalid date found: ${hotspot.entry_date}`);
  //     return false;
  //   }

  //   // Log for debugging (optional)
  //   console.log('Hotspot Date:', hotspotDate.format('YYYY-MM-DD'));
  //   console.log('Start Date:', startDate.format('YYYY-MM-DD'));
  //   console.log('End Date:', endDate.format('YYYY-MM-DD'));

  //   // Check if the hotspot date is between the selected start and end dates
  //   return hotspotDate.isBetween(startDate, endDate, 'days', '[]'); // Inclusive date range
  // });
  useEffect(() => {
    if (selectedRange) {
      const [start, end] = selectedRange;
      const filtered = dataArray.filter((item: any) => {
        const entryDate = moment(item.entry_date.split(' ')[0], 'YYYY-MM-DD'); // Get only the date part (ignoring time)
        const year = entryDate.year();
        const month = entryDate.month() + 1; // Months are zero-indexed in moment.js
        const day = entryDate.date(); // Get the day of the month

        const startYear = start.year();
        const endYear = end.year();
        const startMonth = start.month() + 1; // Months are zero-indexed in moment.js
        const endMonth = end.month() + 1; // Months are zero-indexed in moment.js
        const startDay = start.date(); // Get the day of the month for start
        const endDay = end.date(); // Get the day of the month for end

        // Filter based on year, month, and day
        return (
          (year > startYear ||
            (year === startYear && month > startMonth) ||
            (year === startYear && month === startMonth && day >= startDay)) &&
          (year < endYear ||
            (year === endYear && month < endMonth) ||
            (year === endYear && month === endMonth && day <= endDay))
        );
      });
      setFilteredInfo(filtered);
    } else {
      setFilteredInfo(dataArray);
    }
  }, [selectedRange, dataArray]);

  return (
    <>
      <div>
        <div className="bg-red-700 z-99999 flex items-center justify-between p-4 ">
          <div>
            <h3 className="text-lg font-bold">All Hotspots</h3>
          </div>
        </div>

        <div className="col-span-12 mt-10 xl:col-span-8">
          <Tabs defaultActiveKey="0">
            <TabPane tab="Hotspots Summary" key="0">
              {hotspotQuery.isLoading ? (
                <Spin tip="Loading Table data" size="large">
                  <div className="content" />
                </Spin>
              ) : (
                <>
                  <div className="mt-4 flex w-full  ">
                    <HotspotStatusPieChart
                      title="National Hotspots Status Summary"
                      data={dataArray}
                    />
                  </div>
                  <div className="mt-6">
                    <HotspotStatusBarChart
                      title="District Hotspots Status Summary"
                      data={dataArray}
                    />
                  </div>
                </>
              )}
            </TabPane>
            <TabPane tab="All Hotspots" key="1">
              <div className="mb-4">
                <p className="mb-2 text-sm">Filter by Entry Date</p>{' '}
                {/* Title for the filter */}
                <RangePicker
                  style={{ marginBottom: '20px' }}
                  onChange={handleDateChange} // On date change
                  format="YYYY-MM-DD" // Format for days
                  disabledDate={(current) =>
                    current && current > moment().endOf('day')
                  } // Disable future dates
                />
              </div>
              {hotspotQuery.isLoading ? (
                <Spin tip="Loading Table data" size="large">
                  <div className="content" />
                </Spin>
              ) : (
                <HotspotDataTable data={filteredInfo} />
              )}
            </TabPane>
            <TabPane tab="Active Hotspots" key="2">
              {hotspotQuery.isLoading ? (
                <Spin tip="Loading Table data" size="large">
                  <div className="content" />
                </Spin>
              ) : (
                <HotspotDataTable data={activeHotspots} />
              )}
            </TabPane>
            <TabPane tab="InActive Hotspots" key="3">
              {hotspotQuery.isLoading ? (
                <Spin tip="Loading Table data" size="large">
                  <div className="content" />
                </Spin>
              ) : (
                <HotspotDataTable data={inactiveHotspots} />
              )}
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default HotspotMgt;
