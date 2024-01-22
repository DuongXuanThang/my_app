import { Row } from "antd";
import styled from "styled-components";


import React from 'react'

type Props = {
    children: React.ReactNode,
    className?: string
}
export default function  RowCustom({children,className}:Props) {
  return (
    <Row gutter={38} className={"mt-3 first:mt-0 "+ className}>{children}</Row>
  )
}

