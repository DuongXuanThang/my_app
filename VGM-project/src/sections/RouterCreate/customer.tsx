import React, { useEffect, useState } from "react";
import RowCustom from "./styled";
import { Button, Col, Input, Modal, Radio, Row, Select } from "antd";
import { FormItemCustom } from "../../components/form-item";
import { addCustomerOption, baseCustomers } from "./data";
import { List, ThunderIcon } from "../../icons";
import { SearchOutlined } from "@ant-design/icons";
import { Map } from "../../icons/map";
import CustomerList from "./customer-list";
import CustomerMap from "./customer-map";
import { CustomerType } from "./type";
import { ChooseCustomer, ImportCustomer } from "./modal";

type Props = {
  listCustomer: any[],
  handleCustomer: any
}

export default function Customer({listCustomer,handleCustomer}:Props) {
  const [viewMode,setViewMode] = useState('list')
  const [openChoose,setOpenChoose] = useState<boolean>(false)
  const [openImport,setOpenImport] = useState<boolean>(false)
  const handeClose = (type:'Choose'| 'Import' | null) => {
    switch(type) {
      case "Choose":
        setOpenChoose(false)
        break
      case "Import":
        setOpenImport(false)
        break
      default: 
        setOpenChoose(false)
        setOpenImport(false)
    }
  }
  const handeOpen = (type:'Choose'| 'Import' | any) => {
    switch(type) {
      case "Choose":
        setOpenChoose(true)
        break
      case "Import":
        setOpenImport(true)
        break
      default: 
    }
  }

  return (
    <>
      <Row gutter={16} className={"justify-between p-4 pb-5 pt-10 mt-0"}>
        <Col>
          <Row gutter={8}>
            <Col span={9} className="text-[#1677ff]">
              <FormItemCustom>
                <Select defaultValue={"add"} options={addCustomerOption} onSelect={handeOpen} />
              </FormItemCustom>
            </Col>
            <Col span={7}>
              <Button
                className="w-full flex items-center text-[#1677ff] bg-[#1877f214] h-[36px]"
                icon={<ThunderIcon />}
              >
                Tối ưu tuyến
              </Button>
            </Col>
            <Col span={8}>
              <FormItemCustom>
                <Input
                  placeholder="Tìm kiếm khách hàng"
                  prefix={<SearchOutlined />}
                />
              </FormItemCustom>
            </Col>
          </Row>
        </Col>
        <Col>
          {" "}
          <Radio.Group defaultValue={viewMode} onChange={(e:any)=> setViewMode(e.target.value)} size="middle" >
            <Radio.Button value="list"><List size={28}/></Radio.Button>
            <Radio.Button value="map"><Map size={28}/></Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      <div>
        {viewMode == 'list' ? <CustomerList data={listCustomer} handleData={handleCustomer}/> : <CustomerMap data={listCustomer}/>}
      </div>
      <Modal width={1240} open={openChoose} onCancel={handeClose.bind(null,'Choose')} title={<strong className="text-xl">Chọn khách hàng</strong>} footer={false}> 
        <ChooseCustomer selected={listCustomer} handleAdd={handleCustomer} closeModal={setOpenChoose.bind(null,false)}/>
      </Modal>
      <Modal width={777}   open={openImport} onCancel={handeClose.bind(null,'Import')} okText='Tiếp tục' cancelText='Hủy' title={<strong className="text-xl">Nhập dữ liệu khách hàng</strong>}>
        <ImportCustomer />
      </Modal>
    </>
  );
}
