import { Button, Col, Input, Modal, Pagination, Row } from "antd";
import React, { useEffect, useState } from "react";
import { FormItemCustom, TableCustom, TagCustom } from "@/components";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { LuFilter, LuFilterX } from "react-icons/lu";
import type { ColumnsType } from "antd/es/table";
import { CustomerType } from "../type";
import {
  FilterForm,
  baseCustomers,
  commonColumnCustomer,
  commonTable,
} from "../data";
import FilterCustomer from "./filter";
import { useForm } from "antd/es/form/Form";
import { AxiosService } from "../../../services/server";

const columnSelectCustomer: ColumnsType<CustomerType> = [
  ...commonTable,

  {
    title: "Loại khách hàng",
    dataIndex: "customer_id",
    key: "customer_type",
  },
  {
    title: "Nhóm khách hàng",
    dataIndex: "customer_name",
    key: "customer_group",
  },
  ...commonColumnCustomer,
];

const handleFilter = (filters: any): Array<any> => {
  let arrayFilter: any[] = [];
  for (let key_search in filters) {
    if (filters[key_search]) {
      arrayFilter = [
        ...arrayFilter,
        { key: [FilterForm[key_search]], value: filters[key_search],key2: key_search},
      ];
    }
  }
  return arrayFilter;
};

type Props = {
  selected : any[],
  handleAdd: any,
  closeModal:() => void
}

export function ChooseCustomer({selected,handleAdd,closeModal}:Props) {
  const [form] = useForm();
  const [customerChoose, setCustomerChoose] = useState<CustomerType[]>([]);
  const [customerList, setCustomerList] =
    useState<CustomerType[]>(baseCustomers);
  const [filter, setFilter] = useState<{}>({});
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const PAGE_SIZE=20
  const [page_number,setPageNumber] = useState<number>(1)
  const [total_Customer,setTotalNumber] = useState<number>(40)
  const rowSelection = {
    selectedRowKeys: customerChoose && customerChoose.map(value => value.name) ,
    onChange: (selectedRowKeys: React.Key[], selectedRows: CustomerType[]) => {
      setCustomerChoose(selectedRows);
    },
  };

  const handleSubmitFilter = () => {
    form.submit()
    setOpenFilter(false)
  }

  const handleClearFilter = (fil?:any) => {
    if(fil) {
        let newFilter = {...filter}
        delete newFilter[fil.key2]
        form.setFieldsValue(newFilter)
        setFilter(prev => {
            delete prev[fil.key2]
            return {...prev}
        })
        
    }else {
        form.resetFields()
        setFilter({})
    }
  }
  useEffect(()=> {
    (async() => {
      const rsCustomer = await AxiosService.get('/api/method/mbw_dms.api.router.get_customer',{
        params: {
          ...filter,
          page_size: PAGE_SIZE,
          page_number
        }
      })
      setCustomerList(rsCustomer?.result?.data)
      setTotalNumber(rsCustomer.result?.total)
      console.log("rsCustomer",rsCustomer);
      
    })()
  },[filter,page_number])

  const handleAddCustomer =() => {
    if(customerChoose.length >0) {
      handleAdd(customerChoose)
    }
    closeModal()
  }

  useEffect(() => {
    setCustomerChoose(selected)
  },[selected])
  return (
    <>
      <Row className="justify-between">
        <Col className="inline-flex ">
          <FormItemCustom>
            <Input
              placeholder="Tìm kiếm khách hàng"
              prefix={<SearchOutlined />}
            />
          </FormItemCustom>
          <div className="flex justify-center items-center ml-4">
            <Button
              className="flex items-center text-nowrap !text-[13px] !leading-[21px] !font-normal  border-r-[0.1px] rounded-r-none h-[36px]"
              icon={<LuFilter style={{ fontSize: "20px" }} />}
              onClick={setOpenFilter.bind(null, true)}
            >
              Filter
            </Button>
            <Button
              className="border-l-[0.1px] rounded-l-none h-[36px]"
              onClick={() => handleClearFilter()}
            >
              <LuFilterX style={{ fontSize: "20px" }} />
            </Button>
          </div>
        </Col>
        <Col className="inline-flex items-center">
          <span className="mr-4">
            Đã chọn {customerChoose.length || 0} khách hàng
          </span>
          <Button type="primary" onClick={handleAddCustomer}>Thêm</Button>
        </Col>
      </Row>
      <div className="py-5 px-4">
        <span>{customerList.length} kết quả hiển thị</span>
        {handleFilter(filter).length > 0 && (
          <Row className="items-center">
            {handleFilter(filter).map((fil: any) => (
              <TagCustom closeIcon={<CloseOutlined />} onClose={() => {
                handleClearFilter(fil)
              }}>
                {fil.key}: {fil.value}
              </TagCustom>
            ))}
            <span className="cursor-pointer" onClick={() => handleClearFilter()}>Clear all</span>
          </Row>
        )}
      </div>
      <TableCustom
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columnSelectCustomer}
        dataSource={customerList.map((value: CustomerType) => ({
          key: value.name,
          ...value,
        }))}
        pagination={false}
      />
      <Row className="justify-end mt-2">
        <Pagination defaultCurrent={page_number} pageSize={PAGE_SIZE}  total={total_Customer} onChange={(page,pageSize) => {
          setPageNumber(page);          
        }}/>
      </Row>
      <Modal
        width={451}
        title="Bộ lọc"
        open={openFilter}
        okText="Áp dụng"
        cancelText="Đặt lại"
        onCancel={setOpenFilter.bind(null, false)}
        onOk={handleSubmitFilter}
      >
        <FilterCustomer filter={filter} setFilter={setFilter} form={form} />
      </Modal>
    </>
  );
}
