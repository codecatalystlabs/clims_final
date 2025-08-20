import { useEffect, useState } from 'react';

import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Spin,DatePicker } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import CustomInput from '../../../common/input';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

import { createHotspot, getHotspots } from '../../../api/apiRequests';
import {
  displayErrorMessage,
  displaySuccessMessage,
} from '../../../components/toast/Toast';
import HotspotDataTable from '../../../components/HotspotTable';
import { cancelEdit } from '../../../redux/slices/condom';
import axios from 'axios';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { trimLastWord } from '../../../utils/trim';
import * as XLSX from 'xlsx';
import moment from 'moment';
const { RangePicker } = DatePicker;

const HotspotDashboard = () => {
  const dispatch = useDispatch();
  const [hotspot_name, setHotspotName] = useState('');
  const [contact_person_name, setContactPersonName] = useState('');
  const [contact_person_telephone, setContactPersonPhone] = useState('');
  const [latitude, setLatitude] = useState();
  const [longtitude, setLongtitude] = useState();
  const [data, setData] = useState<any>([]);
  const [size, setSize] = useState<SizeType>('large');
  const [organization_unit_id, setOrgUnit] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const { edit, id } = useSelector((state: any) => state.condom);
  const [editHotSpot, setEditHotSpot] = useState(null);
  const [hotspotStatus, setHotspotStatus] = useState('');
  const { user } = useSelector((state: any) => state.auth);
  const [newData, setNewData] = useState<any>([]);
  const [selectedRange, setSelectedRange] = useState<
  [moment.Moment, moment.Moment] | null
>(null);
const [filteredInfo, setFilteredInfo] = useState();

  const [userInfo, setUserInfo] = useLocalStorage('userData', {});

  const hotspotQuery = useQuery({
    queryKey: ['hotspot'],
    queryFn: () => getHotspots(),
  });

  useEffect(() => {
    if (hotspotQuery.isSuccess) {
      setData(hotspotQuery.data);
    }
  }, [hotspotQuery.isSuccess, hotspotQuery.data]);

  const handleInputChange =
    (setState: (arg0: any) => void) => (event: { target: { value: any } }) => {
      setState(event.target.value);
      console.log(event.target.value);
    };

  useEffect(() => {
    if (edit) {
      //@ts-ignore
      let hotspot = data?.filter((data) => data?.id == id);

      setEditHotSpot(hotspot?.length > 0 ? hotspot[0] : null);
    }
  }, [edit, id]);

  const queryClient = useQueryClient();
  const createHotspotMutation = useMutation({
    mutationFn: createHotspot,
    onSuccess: (data: any) => {
      queryClient.setQueryData(['hotspot'], data);
      queryClient.invalidateQueries(['hotspot'], { exact: true });
      if (data.code == '401') {
        displayErrorMessage(`${data.message}`);
      }
      if (data.code == '201') {
        setModalOpen(false);
        displaySuccessMessage('Hotspot  created Successfully');
      }
    },
  });

  const createHotspotFn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createHotspotMutation.mutate({
      hotspot_name,
      contact_person_name,
      contact_person_telephone,
      latitude,
      longtitude,
      organization_unit_id,
      hotspot_status: hotspotStatus,
    });
  };

  const handleEdit = async () => {
    try {
      const res = await axios.put(
        `https://clims.health.go.ug/api/hotSpots/${id}`,
        {
          name: hotspot_name,
          contact_person_name,
          contact_person_telephone,
          latitude,
          longtitude,
          status: hotspotStatus,
        }
      );

      if (res.data.code == '201') {
        displaySuccessMessage(res?.data.message);
        setModalOpen(false);
      }
    } catch (error: any) {
      throw error;
    }
  };

  useEffect(() => {
    const userLocation = userInfo?.user?.district;
    let trimedWord = trimLastWord(userLocation);
    const filteredData = Array.isArray(data)
    ? data.filter((item: { district: string }) =>
        item.district?.toLowerCase().includes(trimedWord.toLowerCase())
      )
    : [];
    // console.log(data,"AM DISTRICT DATA")
    // const filteredData = Array.isArray(data)? data.filter((item:{district:string})=>(
    //   item.district?.toLowerCase()===userLocation.toLowerCase()
    // )):[]
    setNewData(filteredData);
  }, [data]);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(newData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Hotspots');
    XLSX.writeFile(workbook, 'hotspots.xlsx');
  };

  const handleDateChange = (dates: [moment.Moment, moment.Moment] | null) => {
    setSelectedRange(dates);
  };

  useEffect(() => {
    if (selectedRange) {
      const [start, end] = selectedRange;
      const filtered = newData.filter((item: any) => {
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
      setFilteredInfo(newData);
    }
  }, [selectedRange, newData]);

  return (
    <>
      <div>
        <div className="bg-red-700 z-99999 flex items-center justify-between p-4 ">
          <div>
            <h3 className="text-lg font-bold">Hotspot Managment</h3>
          </div>
          <div
            style={{ background: '' }}
            className="flex items-center justify-center space-x-4"
          >
          </div>
        </div>

        <div className="col-span-12 mt-10 xl:col-span-8">
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

          {/* {localStorage.setItem("hotspots", JSON.stringify(data))} */}
        </div>
      </div>


    </>
  );
};

export default HotspotDashboard;
