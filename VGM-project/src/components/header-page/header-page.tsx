import { Button, Row } from "antd";
import React from "react";
import { IoIosMenu } from "react-icons/io";
import { LiaDownloadSolid } from "react-icons/lia";
import { LuUploadCloud } from "react-icons/lu";
import { VscAdd } from "react-icons/vsc";

type button = {
  label: string;
  size?: string;
  icon?: React.ReactNode;
  action?: any;
  type?: string;
  className?: string;
};

type Props = {
  title: string;
  buttons?: button[];
};

export function HeaderPage({ title, buttons }: Props) {
  return (
    <>
      <Row className="flex flex-wrap justify-between items-center px-0 py-5">
        <div className="flex justify-center items-center">
            <IoIosMenu style={{ fontSize: "24px" }} />
          <span className="text-2xl font-semibold leading-[21px] ml-2">{title}</span>
        </div>
        <div className="flex mb-2">
          {buttons &&
            buttons.map((button) => (
              <Button
                className={button.className}
                size={button.size || "middle"}
                icon={button.icon}
                onClick={button.action}
                type={button.type}
              >
                {button.label}
              </Button>
            ))}
        </div>
      </Row>
    </>
  );
}
