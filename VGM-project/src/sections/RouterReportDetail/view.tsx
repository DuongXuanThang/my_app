
import React, { useState, useEffect,useRef } from 'react';
import { Button, Table , Tooltip ,Input ,Space ,Modal} from 'antd';
import type { GetRef, TableColumnsType, TableColumnType } from 'antd';
import  {AxiosService} from '../../services/server';
import type { FilterDropdownProps } from 'antd/es/table/interface';
// import Highlighter from 'react-highlight-words';
import {
  EnvironmentOutlined,
  SearchOutlined,
  PlusOutlined,
  DeleteOutlined,
  FileExcelOutlined,
  EditOutlined
} from '@ant-design/icons';
interface DataType {
  key: React.Key;
  name: string;
  retail: string;
  check_in_date: string;
  check_latitude: string;
  check_longitude: string;
}
type InputRef = GetRef<typeof Input>;
type DataIndex = keyof DataType;

export default function ReportDetail() {
  const [isEditing, setIsEditing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        text
      ) : (
        text
      ),
  });

  const [data, setData] = useState<DataType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await AxiosService.get('/api/resource/DashboardRetail?fields=["*"]');
        // Kiểm tra xem kết quả từ API có chứa dữ liệu không
        if (response && response.data) {
          // Thêm key cho mỗi phần tử trong mảng, sử dụng trường 'name'
          const dataWithKey: DataType[] = response.data.map((item: DataType) => {
            const location =  item.check_latitude + "" + item.check_longitude
           
        
            return {
              ...item,
              key: item.name,
              location: location,
            };
          });
          setData(dataWithKey);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  const deleteItem = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const columns: TableColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Mã điểm bán',
      dataIndex: 'retail',
      render: (retail) => (
        <Tooltip placement="topLeft" title={retail}>
          {retail}
        </Tooltip>
      ),
    },
    {
      title: 'Vị trí',
      dataIndex: 'location',
      render: (location) => (
        <Tooltip title={`${location}`}>
          <EnvironmentOutlined style={{ color: 'green' , cursor: 'pointer' }} />
        </Tooltip>
      ),
      onCell: () => ({
        onClick: (event) => {
          // Xử lý sự kiện khi người dùng click vào cột 'Vị trí'
          // event.target chứa thông tin về đối tượng HTML đã được click
          console.log('123');
          // Thêm logic xử lý click ở đây
        },
      }),
    },
    {
      title: 'Ngày checkin',
      dataIndex: 'check_in_date',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'creation',
    },
    {
      title: '',
      dataIndex: '',
      render: () => (
        <Button onClick={() => showModal(true)} icon={<EditOutlined />}>
        </Button>
      ),
    },
  
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (editing = false) => {
    setIsEditing(editing);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
   <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <div>
    {hasSelected && (
      <Button type="primary" danger ghost onClick={deleteItem} loading={loading} icon={<DeleteOutlined />}>
        Xóa
      </Button>
    )}
    <span style={{ marginLeft: 8 }}>
      {hasSelected ? `Đã chọn ${selectedRowKeys.length} báo cáo` : ''}
    </span>
  </div>
  <div style={{ display: 'flex' }}>
    <div style={{ paddingRight: '10px' }}>
    <Button type="primary" icon={<FileExcelOutlined />}>
      Tải xuống
    </Button>
    </div>
    <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal(false)}>
      Thêm mới
    </Button>
  </div>
</div>

    <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    <Modal title={isEditing ? "Sửa" : "Thêm mới"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    <p>Some contents...</p>
  <p>Some contents...</p>
  <p>Some contents...</p>
      </Modal>
  </div>
  );

}
