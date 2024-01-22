// @mui

import React, { useCallback, useEffect, useState } from "react";
import {Tabs, Form,notification } from "antd";
import GeneralInformation from "./general-information";
import Customer from "./customer";
import { HeaderPage } from "../../components";
import { AxiosService } from "../../services/server";
import { useNavigate } from "react-router-dom";
import type { NotificationArgsProps } from 'antd';
// ----------------------------------------------------------------------

type NotificationPlacement = NotificationArgsProps['placement'];
export default function RouterCreate() {
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const [api, contextHolder] = notification.useNotification();
  const [customerRouter,setCustomerRouter] = useState<any[]>([])
  const openNotification = (placement: NotificationPlacement,text:string) => {
    api.info({
      message: `Notification ${placement}`,
      description: <p>{text}</p>,
      placement,
    });
  };
  const handleCreateRouter = useCallback(async(value:any) => {
    value = {...value,customers: customerRouter.map((customer)=> {
      let key_push = ["customer_id","customer_name","display_address","phone_number","customer","frequency"]
      for (let key in customer) {
        if(!key_push.includes(key)) {
          delete customer[key]
        }
      }
      return customer
    })}
    try {
      await AxiosService.post("/api/method/mbw_dms.api.router.create_router",value)
      openNotification('topRight',"Success")
      navigate('/')
    } catch (error) {
      openNotification('topRight',"Failure!!!")
      console.log("error create",error);

      
    }
  },[customerRouter])
  
  return (
    <>
      <HeaderPage
        title="Thêm tuyến"
        buttons={[
          {
            label: "Thêm",
            action: form.submit,
            type: "primary",
          },
        ]}
      />
      <div className="bg-white rounded-md">
        <Form
          layout="vertical"
          form={form}
          onFinish={handleCreateRouter}
        >
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                label: <p className="px-4 mb-0"> Thông tin chung</p>,
                key: "1",
                children: <GeneralInformation />,
              },
              {
                label: <p className="px-4 mb-0">Khách hàng</p>,
                key: "2",
                children: <Customer handleCustomer={setCustomerRouter} listCustomer={customerRouter} />,
              },
            ]}
            indicatorSize={(origin) => origin - 18}
          />
        </Form>
      </div>
    </>
  );
}
