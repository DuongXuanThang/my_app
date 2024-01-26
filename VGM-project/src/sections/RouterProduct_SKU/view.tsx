
import React, { useState, useEffect,useRef } from 'react';
import { Button, Table , Tooltip ,Input ,Space ,Modal,Form, Upload,message,UploadFile} from 'antd';
import type { GetRef, TableColumnsType, TableColumnType,UploadProps } from 'antd';
import {TableCustom } from "../../components";
import  {AxiosService} from '../../services/server';
import { useForm } from 'antd/lib/form/Form';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import SVG from 'svg.js';
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
  const barcodeRef = useRef(null);
  const [barcode, setBarcode] = useState('');
  const [form] = useForm();
  const [fileListUpload, setFileListUpload] = useState<[]>([]);
  const [fileList, setFileList] = useState<[]>([]);
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
  useEffect(() => {
    
}, [barcode]);
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

  const handleOk = async () => {
    const productCode = form.getFieldValue('productCode');
    const barCode = form.getFieldValue('barcode');
    const productName = form.getFieldValue('productName');
    const description = form.getFieldValue('description');
    const fileList = form.getFieldValue('fileList');
    console.log('File List:', fileList);
    let objparam = {
      product_code : productCode,
      product_name : productName,
      product_description : description,
      "docstatus": 0,
      "doctype": "Product_SKU",
      photos : []
    }
    const photoObjects = fileListUpload.map(file => ({
      docstatus: 0,
      doctype: 'ProductImage_SKU',
      name: 'new-product_image-buhawsuxpf',
      owner: file.owner,
      parent: 'new-product-xjwkkysins',
      parentfield: 'photos',
      parenttype: 'Product_SKU',
      uri_image: file.file_url
    }));
    objparam.photos.push(...photoObjects);
    console.log(objparam);
    let formData = new FormData();
    const fields = {
      doc:JSON.stringify(objparam),
      action:"Save"
  };

  for (const [key, value] of Object.entries(fields)) {
      formData.append(key, value);
  }
    const response = await AxiosService.post('api/method/frappe.desk.form.save.savedocs',formData);
    console.log(response);
    setFileListUpload([])
    form.setFieldsValue({ 'fileList': fileListUpload });
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
      const formData = new FormData();
      const fields = {
          file,
          is_private: '0',
          folder: 'Home',
          doctype: 'ProductImage_SKU',
          docname: 'new-image',
          fieldname: 'uri_images'
      };
  
      for (const [key, value] of Object.entries(fields)) {
          formData.append(key, value);
      }
      const response = await AxiosService.post('/api/method/upload_file',formData);
      console.log(response);
      if(response.message){
        //setFileListUpload(prevFileList => [...prevFileList, response.message]);
        fileListUpload.push(response.message)
        message.success('Tải ảnh thành công');
       
      }else{
        message.error('Tải ảnh thất bại');
      }
      return false;
    },
    
  };
  const handleChange = (info : any) => {
    // Xử lý thông tin và cập nhật giá trị fileList
    form.setFieldsValue({ 'fileList': fileListUpload });
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

    <TableCustom rowSelection={rowSelection} columns={columns} dataSource={data}   scroll={{ x: '100%', y: 670}} size="small"/>
    <Modal destroyOnClose={true} title={isEditing ? "Sửa sản phẩm" : "Thêm mới sản phẩm"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={700}>
    <Form {...formItemLayout} form={form} preserve={false} variant="filled" style={{ maxWidth: 600 }}>
    <Form.Item label="Mã sản phẩm" name="productCode" rules={[{ required: true, message: 'Chưa nhập code!' }]}>
      <Input />
    </Form.Item>
    <Form.Item label="Bar code" name="inputbarcode" rules={[{ required: true, message: 'Chưa nhập code!' }]}>
      <Input onChange={(e) => setBarcode(e.target.value)}/>
    </Form.Item>
    <Form.Item name="barcode" >
     <div ref={barcodeRef}></div>
    </Form.Item>
    <Form.Item label="Tên sản phẩm" name="productName" rules={[{ required: true, message: 'Chưa nhập tên sản phẩm!' }]}>
      <Input />
    </Form.Item>
    <Form.Item  label="Mô tả"
      name="description" >
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
