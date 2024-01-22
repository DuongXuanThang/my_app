import { Switch, Input } from "antd";
import { useState } from "react";
import { HeaderPage } from "../../components";

export default function SettingDMS() {
  const [isSwitchOn, setSwitchOn] = useState(true);
  const [isSwitchOn1, setSwitchOn1] = useState(true);
  const [isSwitchOn2, setSwitchOn2] = useState(true);

  const handleSwitchChange = (checked: boolean) => {
    setSwitchOn(checked);
  };

  const handleSwitchChange1 = (checked: boolean) => {
    setSwitchOn1(checked);
  };

  const handleSwitchChange2 = (checked: boolean) => {
    setSwitchOn2(checked);
  };

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <>
      <HeaderPage title="Cấu hình hệ thống mobile" />
      <div className="bg-white rounded-md px-5 pt-5">
        <h3 className="text-[#212B36] font-semibold text-xl leading-[21px]">
          Cấu hình company
        </h3>
        <div className="pt-10 flex items-center">
          <Switch defaultChecked onChange={onChange} />
          <p className="ml-2 font-medium text-base leading-[21px] text-[#212B36]">
            Viếng thăm ngoại tuyến
          </p>
        </div>
        <div className="pt-5 flex items-center">
          <Switch defaultChecked={isSwitchOn} onChange={handleSwitchChange} />
          <p className="ml-2 font-medium text-base leading-[21px] text-[#212B36]">
            Khai báo ví trị ngoài sai số
          </p>
        </div>
        {isSwitchOn && (
          <>
            <div className="flex items-center py-5 pl-12 ">
              <p className="w-[8%] text-sm leading-[21px] font-normal">
                Sai số cho phép
              </p>{" "}
              <Input
                className="w-28 mx-2 bg-[#F4F6F8] placeholder:text-[#212B36]"
                placeholder="0"
              />
              Mét
            </div>
          </>
        )}

        <div className="pt-5 flex items-center">
          <Switch defaultChecked={isSwitchOn1} onChange={handleSwitchChange1} />
          <p className="ml-2 font-medium text-base leading-[21px] text-[#212B36]">
            Checkout ngoài sai số
          </p>
        </div>
        {isSwitchOn1 && (
          <>
            <div className="flex items-center py-5 pl-12 ">
              <p className="w-[8%] text-sm leading-[21px] font-normal">
                Sai số cho phép
              </p>{" "}
              <Input
                className="w-28 mx-2 bg-[#F4F6F8] placeholder:text-[#212B36]"
                placeholder="0"
              />
              Mét
            </div>
          </>
        )}

        <div className="py-5 flex items-center">
          <Switch defaultChecked={false} onChange={onChange} />
          <p className="ml-2 font-medium text-base leading-[21px] text-[#212B36]">
            Thời gian checkin tối thiểu
          </p>
        </div>
        <div className="flex items-center">
          <Switch defaultChecked={false} onChange={onChange} />
          <p className="ml-2 font-medium text-base leading-[21px] text-[#212B36]">
            Bắt buộc kiểm tồn
          </p>
        </div>

        <div className="pt-5 flex items-center">
          <Switch defaultChecked={isSwitchOn2} onChange={handleSwitchChange2} />
          <p className="ml-2 font-medium text-base leading-[21px] text-[#212B36]">
            Bắt buộc chụp ảnh
          </p>
        </div>
        {isSwitchOn2 && (
          <>
            <div className="flex items-center py-5 pl-12 ">
              <p className="w-[8%] text-sm leading-[21px] font-normal">
                Số lượng album
              </p>{" "}
              <Input
                className="w-28 mx-2 bg-[#F4F6F8] placeholder:text-[#212B36]"
                placeholder="0"
              />
            </div>
            <div className="flex items-center pb-5 pl-12 ">
              <p className="w-[8%] text-sm leading-[21px] font-normal">
                Số lượng ảnh
              </p>{" "}
              <Input
                className="w-28 mx-2 bg-[#F4F6F8] placeholder:text-[#212B36]"
                placeholder="0"
              />
            </div>
          </>
        )}

        <div className="py-5 flex items-center">
          <Switch defaultChecked onChange={onChange} />
          <p className="ml-2 font-medium text-base leading-[21px] text-[#212B36]">
            Bắt buộc ghi chú
          </p>
        </div>
      </div>
    </>
  );
}
