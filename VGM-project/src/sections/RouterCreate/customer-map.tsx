import React from 'react'
import { CustomerType } from './type'
import { Col, Row } from 'antd'
import { TableCustom } from '../../components'
import { baseCustomers, commonTable } from './data'
import {  Mapcustom } from '../../components/map/map'

type Props = {
    data?: CustomerType[] | false
}
export default function CustomerMap({data}:Props) {
  return (
    <Row className='h-[500px]'>
      <Col span={8}>
      <TableCustom 
        columns={[{
          title: "Stt",
          dataIndex: "stt",
          key: "stt",
          render: (_,record,index) => index +1
      },...commonTable]
    }
        dataSource={baseCustomers}
        pagination={false}
    />
      </Col>
      <Col span={16}>
        <Mapcustom/>
      </Col>
    </Row>
  )
}
