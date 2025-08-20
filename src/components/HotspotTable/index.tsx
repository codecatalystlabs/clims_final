//@ts-nocheck
import React, { useState } from 'react';
import { Table, Input, Button, Space, Popconfirm } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteHotspot, updateHotspot } from '../../api/apiRequests';
import { displaySuccessMessage } from '../toast/Toast';
import { makeEdit } from '../../redux/slices/condom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import moment from 'moment';
//@ts-ignore
const HotspotDataTable = ({ data }) => {
  // console.log(data)
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const storedUserData: any = JSON.parse(localStorage.getItem('userData'));

  const getColumnSearchProps = (dataIndex: string, columnTitle: string) => ({
    //@ts-ignore
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
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
            style={{ width: 90, background: '#006D5B' }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (
      value: string,
      record: { [x: string]: { toString: () => string } }
    ) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible: any) => {
      if (visible) {
        //@ts-ignore
        setTimeout(() => document.getElementById('searchInput').select(), 100);
      }
    },
    render: (
      text:
        | string
        | number
        | boolean
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | Iterable<React.ReactNode>
        | React.ReactPortal
        | null
        | undefined
    ) =>
      searchedColumn === dataIndex ? (
        <span style={{ fontWeight: 'bold' }}>{text}</span>
      ) : (
        text
      ),
  });

  const handleSearch = (
    selectedKeys: React.SetStateAction<string>[],
    confirm: () => void,
    dataIndex: React.SetStateAction<string>
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const deleteHostspotMutation = useMutation({
    mutationFn: deleteHotspot,
    onSuccess: (data) => {
      queryClient.setQueryData(['hotspot'], data);
      queryClient.invalidateQueries(['hotspot'], { exact: true });
      displaySuccessMessage('Hostspot deleted');
    },
  });

  const handleDelete = (id: any) => {
    deleteHostspotMutation.mutate(id);
  };

  const updateHotspotMutation = useMutation(updateHotspot, {
    onSuccess: (data) => {
      queryClient.setQueryData(['hotspot'], data);
      queryClient.invalidateQueries(['hotspot'], { exact: true });
      displaySuccessMessage('Hotspot updated');
    },
  });

  const handleUpdate = (id: any, data: any) => {
    let status;
    if (data == 'active' || data == 'deactivate intiated') {
      status = 'not active';
    } else {
      status = 'active';
    }
    updateHotspotMutation.mutate({ id, data: { status: status } });



  };




  const columns = [
    // {
    //   title: 'Id',
    //   dataIndex: 'id',
    //   key: 'id',
    //   sorter: (a: { id: number }, b: { id: number }) => a.id - b.id,
    //   sortDirections: ['descend', 'ascend'],
    // },
    {
      title: 'Hotspot Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name', 'Hotspot Name'),
    },
    {
      title: 'Contact Person Name',
      dataIndex: 'contact_person_name',
      key: 'contact_person_name',
      ...getColumnSearchProps('contact_person_name', 'Contact Person Name'),
    },
    {
      title: 'Contact Person Telephone',
      dataIndex: 'contact_person_telephone',
      key: 'contact_person_telephone',
      ...getColumnSearchProps(
        'contact_person_telephone',
        'Contact Person Telephone'
      ),
    },
    {
      title: 'Has Dispenser',
      dataIndex: 'has_condom_dispenser',
      key: 'has_condom_dispenser',
      ...getColumnSearchProps('has_condom_dispenser', 'Has Dispenser'),
    },
    {
      title: ' Dispenser Condition',
      dataIndex: 'dispenser_condition',
      key: 'dispenser_condition',
      ...getColumnSearchProps('dispenser_condition', 'Dispenser Condition'),
      render: (text) => (text === null || text === undefined || text === '') ? 'None' : text

    },
    {
      title: 'Longitude',
      dataIndex: 'longtitude',
      key: 'longtitude',
      ...getColumnSearchProps('longtitude', 'Longitude'),
    },

    {
      title: 'Latitude',
      dataIndex: 'latitude',
      key: 'latitude',
      ...getColumnSearchProps('latitude', 'Latitude'),
    },
    {
      title: 'District',
      dataIndex: 'district',
      key: 'district',
      ...getColumnSearchProps('district', 'District'),
    },
    {
      title: 'Village',
      dataIndex: 'village',
      key: 'village',
      ...getColumnSearchProps('village', 'Village'),
    },
    {
      title: 'Division',
      dataIndex: 'division',
      key: 'division',
      ...getColumnSearchProps('division', 'Division'),
    },
    {
      title: 'Hotspot Status',
      dataIndex: 'status',
      key: 'status',
      ...getColumnSearchProps('status', 'Hotspot Status'),
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      ...getColumnSearchProps('created_at', 'Created At'),
      render: (text) => moment(text).format('YYYY-MM-DD'),

    },
    {
      title: 'Mapped By',
      dataIndex: 'mapped_by',
      key: 'mapped_by',
      ...getColumnSearchProps('mapped_by', 'Mapped By'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: any) => (
        <Space size="small">
          {/*  */}
              <Popconfirm
            title={record.status == 'not active'?"Activate Hotspot":"Deactivate Hotspot"}
            description={record.status == 'not active'?"Are you sure to activate this Hotspot?":"Are you sure to deactivate this Hotspot?"}
            onConfirm={() => handleUpdate(record.id, record.status)}
            okText="Yes"
            cancelText="No"
          >
          <Button
            style={{
              backgroundColor:
                record.status == 'not active' ? '#006D5B' : '#FF0000',
              color: 'white',
              border: 'none',
              width: 100,
              fontWeight: 800,
            }}
            type="primary"
          >
            {record.status == 'not active' ? 'Activate' : 'Deactivate'}
          </Button>          
          </Popconfirm>
          <Popconfirm
            title="Delete Hotspot"
            description="Are you sure to delete this Hotspot?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const columnsMoh = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a: { id: number }, b: { id: number }) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Hotspot Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name', 'Hotspot Name'),
    },
    {
      title: 'Longitude',
      dataIndex: 'longtitude',
      key: 'longtitude',
      ...getColumnSearchProps('longtitude', 'Longitude'),
    },
    {
      title: 'Latitude',
      dataIndex: 'latitude',
      key: 'latitude',
      ...getColumnSearchProps('latitude', 'Latitude'),
    },
    {
      title: 'District',
      dataIndex: 'district',
      key: 'district',
      ...getColumnSearchProps('district', 'District'),
      render:(text:string)=> `${text.split(" ")[0]}`
    },
    {
      title: 'Village',
      dataIndex: 'village',
      key: 'village',
      ...getColumnSearchProps('village', 'Village'),
    },
    {
      title: 'Division',
      dataIndex: 'division',
      key: 'division',
      ...getColumnSearchProps('division', 'Division'),
    },
    {
      title: 'Hotspot Status',
      dataIndex: 'status',
      key: 'status',
      ...getColumnSearchProps('status', 'Hotspot Status'),
    },
    {
      title: 'Mapped By',
      dataIndex: 'mapped_by',
      key: 'mapped_by',
      ...getColumnSearchProps('mapped_by', 'Mapped By')
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      ...getColumnSearchProps('created_at', 'Created At'),
      render: (text) => moment(text).format('YYYY-MM-DD'),

    }

  ];

  const handleTableChange = (
    pagination: any,
    filters: { [x: string]: any },
    sorter: { field: any; order?: any }
  ) => {
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


  const exportToExcel = () => {
    // Get the columns dynamically based on the user's role
    const currentColumns = storedUserData.user.role === 'moh' ? columnsMoh : columns;
    const filteredColumns = currentColumns.filter(column => column.title !== 'Actions' && column.key !== 'actions');
  
    // Create an array of column headers (use the column titles)
    const headers = filteredColumns.map(column => column.title);
    
    // Log filteredData to check if it's populated
    console.log('Filtered Data:==>', data);
    
    // Extract the displayed data in the table format based on the column `dataIndex`
    const tableData = data.map(row => {
      const rowData: any = {};
      filteredColumns.forEach(column => {
        // Safeguard for missing data or incorrect dataIndex mapping
        const dataIndex = column.dataIndex as keyof typeof row;
        rowData[column.title] = row[dataIndex] !== undefined ? row[dataIndex] : ''; // Use empty string if no data
      });
      return rowData;
    });
    
    // Check if tableData has any data
    if (tableData.length === 0) {
      console.error('No data to export');
      return; // Exit if no data
    }
    
    console.log('Table Data to export:', tableData);
    
    // Create a worksheet from the table data
    const ws = XLSX.utils.json_to_sheet(tableData);
    
    // Create a workbook and append the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
    // Get the current date in the format YYYY-MM-DD
    const currentDate = moment().format('YYYY-MM-DD');
    
    // Write the workbook and save as an Excel file with the date in the filename
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `hotspot_data_${currentDate}.xlsx`);
  };
  
  
  

  return (
    <>
    <div className='flex justify-end'>
    <Button  type="primary" onClick={exportToExcel} style={{ marginBottom: 16,backgroundColor:'#006D5B' }}>
        Export to Excel
      </Button>
    </div>

      <Table
      //@ts-ignore
      columns={storedUserData.user.role == 'moh'? columnsMoh : columns}
      dataSource={Array.isArray(data) ? data : []} // Check if rawData is an array
      pagination={{ defaultPageSize: 20 }}
      scroll={{x:true}}
      //@ts-ignore

      onChange={handleTableChange}
    />
    </>

  );
};

export default HotspotDataTable;
