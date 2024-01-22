import React, { useEffect, useState } from "react";
import { FormItemCustom } from "../../components/form-item/form-item";
import { Col, DatePicker, Input, Select } from "antd";
import RowCustom from "./styled";
import { optionsTravel_date, statusOption } from "./data";
import { rsData, rsDataFrappe } from "../../types/response";
import { listSale } from "../../types/listSale";
import { AxiosService } from "../../services/server";
import { employee } from "../../types/employeeFilter";


let timeout: ReturnType<typeof setTimeout> | null;
let currentValue: string;

const fetch = (value: string, callback: Function) => {
  console.log(value);
  
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  const fake = () => {
    //call api tại đây 
    callback(value)
  };
  if (value) {
    timeout = setTimeout(fake, 300);
  } else {
    callback("");
  }
};
export default function GeneralInformation() {
  const [keySearch, setKeySearch] = useState("");
  const [listSales, setListSales] = useState<any[]>([]);
  const [listEmployees, setListEmployees] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      let rsSales: rsData<listSale[]> = await AxiosService.get(
        "/api/method/mbw_dms.api.router.get_team_sale"
      );
      
      setListSales(rsSales.result.map((team_sale:listSale) => ({
        label: team_sale,
        value: team_sale
      })))
    })();
  }, []);
  useEffect(() => {
    (async() => {
        let rsEmployee: rsDataFrappe<employee[]> = await AxiosService.get("/api/method/frappe.desk.search.search_link",{
        params: {
          txt: keySearch,
          doctype: "Employee",
          ignore_user_permissions: 0,
          reference_doctype: "Attendance",
          query: "erpnext.controllers.queries.employee_query",
        }
        }
          );
     let {results} = rsEmployee  

      setListEmployees(results.map((employee_filter:employee) => ({
        value: employee_filter.value,
        label: employee_filter.description
      })))
    })()
  },[keySearch])
  console.log("listEmployees",listEmployees);
  
  const handleSearch = (newValue: string) => {
    fetch(newValue,setKeySearch)
  };
  return (
    <div className="p-4 pt-[43px] pb-[58px]">
      <RowCustom>
        <Col span={12}>
          <FormItemCustom label="Mã tuyến" name="channel_code" required>
            <Input />
          </FormItemCustom>
        </Col>
        <Col span={12}>
          <FormItemCustom label="Tên tuyến" name="channel_name" required>
            <Input />
          </FormItemCustom>
        </Col>
      </RowCustom>
      <RowCustom>
        <Col span={12}>
          <FormItemCustom label="Team sale" name="team_sale" required>
            <Select showSearch options={listSales} defaultActiveFirstOption={false}/>
          </FormItemCustom>
        </Col>
        <Col span={12}>
          <FormItemCustom label="Nhân viên" name="employee" required>
            <Select 
            showSearch 
            // filterOption={false}
            notFoundContent={null}
            onSearch={handleSearch}
            options={listEmployees}
            />
          </FormItemCustom>
        </Col>
      </RowCustom>
      <RowCustom>
        <Col span={12}>
          <FormItemCustom label="Ngày đi tuyến" name="travel_date" required>
            <Select options={optionsTravel_date} />
          </FormItemCustom>
        </Col>
        <Col span={12}>
          <FormItemCustom label="Trạng thái" name="status">
            <Select options={statusOption} defaultValue={"Active"} />
          </FormItemCustom>
        </Col>
      </RowCustom>
    </div>
  );
}
