import React from 'react'
import { CustomerType } from './type'
import type { ColumnsType } from 'antd/es/table'
import { baseCustomers, commonColumnCustomer, commonTable, optionsFrequency } from './data'
import { TableCustom } from '../../components'
import {DeleteOutlined} from '@ant-design/icons'
import { Select, Table } from 'antd'

type Props = {
    data?: CustomerType[],
    handleData: any
}

export default function CustomerList({data,handleData}:Props) {
    const columnsCustomer:ColumnsType<CustomerType> = [
        {
            title: "Stt",
            dataIndex: "stt",
            key: "stt",
            render: (_,record,index) => index +1
        }, 
        ...commonTable,
        ...commonColumnCustomer
        ,{
            title: "Tần suất",
            dataIndex: "frequency",
            key: "frequency",
            render: (value:string,record:any) => {
                return <Select 
                mode="multiple"
                options={optionsFrequency}
                style={{ width: '100%' }}
                placeholder="Chọn tần suất"
                onChange={(frequency: string[]) => {                    
                    handleData(prev => {
                        return prev.map(customer => {
                            if(customer.customer_id == record.customer_id) {
                                customer['frequency'] = frequency.toString().replaceAll(",",";")
                            }
                            return customer
                        })
                    })
                }}
                defaultValue={value ? value.split(';') : []}
                />
            }
        },{
            title: "Hành động",
            dataIndex: "",
            key: "action",
            render: (_:any,customer:CustomerType) => {
                return <div className='flex justify-center' onClick={() => {
                    handleData((prev:any[]) => {
                        return [...prev.filter((cs) => cs.customer_id != customer.customer_id )]
                    })
                }}><DeleteOutlined /></div>
            }
        },
    
    ] 
  return (
    <div className='p-4'>
    <TableCustom 
        columns={columnsCustomer}
        dataSource={data}
        pagination={false}
    />
    </div>
  )
}
 
