import { DatePicker, Select } from 'antd';
import moment, { Moment } from 'moment';
import React, { useEffect, useState } from 'react';
import DistrictCondomGraph from '../../../components/DistrictCondomGraph';
import { getDistrictsForRegion } from '../../../api/apiRequests';
import { useQuery } from '@tanstack/react-query';

const { RangePicker } = DatePicker;

export default function CondomStockSummary({ data, regions }: any) {
  const [dates, setDates] = useState<[Moment, Moment] | null>(null);
  const [filteredData, setFilteredData] = useState(data);
  const [regionId, setRegionId] = useState<string | null>(null);
  const [districtId, setDistrictId] = useState<string | null>(null);
  const [district, setDistrict] = useState<any[]>([]);
  const [region, setRegion] = useState("");
  const [dist, setDist] = useState("");

  const districtQuery = useQuery({
    queryKey: ['district', regionId],
    queryFn: () => getDistrictsForRegion(regionId),
    enabled: !!regionId, // only fetch when regionId is not null
  });

  useEffect(() => {
    if (districtQuery.isSuccess) {
      setDistrict(districtQuery.data);
    }
  }, [districtQuery.isSuccess, districtQuery.data]);

  useEffect(() => {
    let filtered = data;

    if (dates) {
      const [start, end] = dates;
      filtered = filtered.filter((item: any) => {
        const updatedAt = moment(item.updated_at);
        const year = updatedAt.year();
        const month = updatedAt.month() + 1; // Months are zero-indexed in moment.js
        const startYear = start.year();
        const endYear = end.year();
        const startMonth = start.month() + 1; // Months are zero-indexed in moment.js
        const endMonth = end.month() + 1; // Months are zero-indexed in moment.js
  
        return (
          (year > startYear || (year === startYear && month >= startMonth)) &&
          (year < endYear || (year === endYear && month <= endMonth))
        );
      });
    }

    if (regionId) {
      filtered = filtered.filter((item: any) => item.organization_unit_stocking.region_uid === regionId);
      setRegion(filtered[0]?.organization_unit_stocking.region || "");
    }

    if (districtId) {
      filtered = filtered.filter((item: any) => item.organization_unit_stocking.district_uid === districtId);
      setDist(filtered[0]?.organization_unit_stocking.district || "");
    }

    setFilteredData(filtered);
  }, [dates, regionId, districtId, data]);

  const handleDateChange = (dates: [Moment, Moment] | null) => {
    setDates(dates);
  };

  const handleRegionChange = (value: string) => {
    setRegionId(value);
    setDistrictId(null); // Reset district when region changes
  };

  const handleDistrictChange = (value: string) => {
    setDistrictId(value);
  };

  const transformedRegions = regions?.map((region: any) => ({
    label: region.region,
    value: region.region_uid,
  }));

  const transformedDistricts = district?.map((district: any) => ({
    label: district.district,
    value: district.district_uid,
  }));

  console.log(filteredData,"AM THE DATA FILTERED ........")

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-end space-x-5 p-[2rem]">
        <Select
          showSearch
          onChange={handleRegionChange}
          style={{ width: 200, marginBottom: '20px' }}
          placeholder="Select Region"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          options={transformedRegions}
        />
        <Select
          showSearch
          onChange={handleDistrictChange}
          style={{ width: 200, marginBottom: '20px' }}
          placeholder="Select District"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          options={transformedDistricts}
          disabled={!regionId} // Disable until a region is selected
        />
        <RangePicker
          style={{ marginBottom: '20px' }}
          onChange={handleDateChange}
          picker="month"
          format="YYYY-MM"
          disabledDate={(current) => current && current.endOf('month') > moment().endOf('month')}
        />
      </div>

      <DistrictCondomGraph
        data={filteredData}
        title={
          !regionId && !districtId
            ? 'Overall Condom Distribution Over Time'
            : regionId && !districtId
            ? `${region} Region Condom Distribution Over Time`
            : `${dist} Condom Distribution Over Time`
        }
      />
    </div>
  );
}
