
import React, { useState, useEffect,useRef } from 'react';
import { Button, Table , Tooltip ,Input ,Space ,Modal,Form, Upload,message,UploadFile} from 'antd';
import type { GetRef, TableColumnsType, TableColumnType,UploadProps } from 'antd';
import  {AxiosService} from '../../services/server';
import { useForm } from 'antd/lib/form/Form';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import { useFrappeFileUpload } from 'frappe-react-sdk';
// import Highlighter from 'react-highlight-words';
import {
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

export default function Product_SKU() {
  const [form] = useForm();
  const [fileList, setFileList] = useState([]);
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };
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
        const response = await AxiosService.get('/api/resource/Product_SKU?fields=["*"]');
        // Kiểm tra xem kết quả từ API có chứa dữ liệu không
        if (response && response.data) {
          // Thêm key cho mỗi phần tử trong mảng, sử dụng trường 'name'
          const dataWithKey: DataType[] = response.data.map((item: DataType) => {
            return {
              ...item,
              key: item.name,
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
      title: 'Tên sản phẩm',
      dataIndex: 'product_name',
      render: (retail) => (
        <Tooltip placement="topLeft" title={retail}>
          {retail}
        </Tooltip>
      ),
    },
    {
      title: 'Mã sản phẩm',
      dataIndex: 'barcode',
      render: (barcodeValue) => {
        return <div dangerouslySetInnerHTML={{ __html: barcodeValue }} />;
      },
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
      title: 'Mô tả',
      dataIndex: 'product_description',
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
      width: 80,
    },
  
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (editing = false) => {
    setIsEditing(editing);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const productCode = form.getFieldValue('productCode');
    const barCode = form.getFieldValue('barcode');
    const productName = form.getFieldValue('productName');
    const description = form.getFieldValue('description');
    const fileList = form.getFieldValue('fileList');
    console.log('File List:', fileList);
    
    setFileList([]);
    setIsModalOpen(false);
    
  };
  const handleCancel = () => {
    setFileList([]);
    setIsModalOpen(false);
  };
  const normFile = (e:any) => {
    if (Array.isArray(e)) {
      return e;
    }
    const files = e && e.fileList;
    // files là giá trị của trường "Ảnh sản phẩm" sau khi được xử lý
    return files;
  };
  const props: UploadProps = {
    onRemove: (file) => {
    },
    beforeUpload: async (file) => {
      let form_data = new FormData();
      form_data.append('file', file);
      form_data.append('is_private', '0');
			form_data.append('folder', 'Home');
      form_data.append('doctype', 'Product_SKU');
      form_data.append('docname', 'new-image');
      form_data.append('fieldname', 'uri_images');
      const response = await AxiosService.post('/api/method/upload_file',form_data);
      console.log(response);
      if(response.message){
        message.success('Tải ảnh thành công');
      }else{
        message.error('Tải ảnh thất bại');
      }
      return false;
    },
    
  };
  const handleChange = (info : any) => {
    // Xử lý thông tin và cập nhật giá trị fileList
    const files = info.fileList;
    console.log(files);
    //form.setFieldsValue({ 'fileList': files });
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
      {hasSelected ? `Đã chọn ${selectedRowKeys.length} sản phẩm` : ''}
    </span>
  </div>
  <div style={{ display: 'flex' }}>
    <div style={{ paddingRight: '10px' }}>
    <Button type="primary" icon={<FileExcelOutlined />}>
      Tãi xuống
    </Button>
    </div>
    <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal(false)}>
      Thêm mới
    </Button>
  </div>
</div>

    <Table rowSelection={rowSelection} columns={columns} dataSource={data}   scroll={{ x: '100%', y: 670}} size="small"/>
    <Modal title={isEditing ? "Sửa sản phẩm" : "Thêm mới sản phẩm"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={700}>
    <Form {...formItemLayout} form={form} variant="filled" style={{ maxWidth: 600 }}>
    <Form.Item label="Mã sản phẩm" name="productCode" rules={[{ required: true, message: 'Chưa nhập code!' }]}>
      <Input />
    </Form.Item>
    <Form.Item label="Bar code" name="barcode" rules={[{ required: true, message: 'Chưa nhập code!' }]}>
      <Input />
    </Form.Item>
    <Form.Item label="Tên sản phẩm" name="Input" rules={[{ required: true, message: 'Chưa nhập tên sản phẩm!' }]}>
      <Input />
    </Form.Item>
    <Form.Item  label="Mô tả"
      name="TextArea" >
      <Input.TextArea />
    </Form.Item>
    <Form.Item label="Ảnh sản phẩm" valuePropName="fileList" getValueFromEvent={normFile} rules={[{ required: true, message: 'Chưa có ảnh sản phẩm!' }]}>
          
          <Upload {...props} listType="picture-card" onChange={handleChange}>
            <button style={{ border: 0, background: 'none' }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Thêm ảnh</div>
            </button>
          </Upload>
        </Form.Item>

    </Form>
      </Modal>
  </div>
  );

}
