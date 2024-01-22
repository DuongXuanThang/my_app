import type {  ColumnsType } from 'antd/es/table'
import { CustomerType } from './type'
import { Filter } from '../../../../../../archived/apps/helpdesk-2023-12-01/desk/src/types';

type Options = {
    label: string,
    value: any
}

export const statusOption:Options[] = [
    {
    label: "Hoạt động",
    value: 'Active'
    },
    {
        label: "Khóa",
        value: 'Lock'
        },
]

export const addCustomerOption:Options[] = [
    {
        label: "Thêm khách hàng",
        value: 'add'
    },
    {
        label: "Chọn khách hàng",
        value: "Choose"
    },
    {
        label: "Import khách hàng",
        value: "Import"
    }
]


export const  commonTable: ColumnsType<CustomerType>= [
   
    {
        title: "Mã khách hàng",
        dataIndex: "customer_id",
        key: "customerid"
    },
    {
        title: "Tên khách hàng",
        dataIndex: "customer_name",
        key: "customername"
    },

]

export const commonColumnCustomer: ColumnsType<CustomerType>= [
    {
        title: "Địa chỉ",
        dataIndex: "display_address",
        key: "display_address"
    },
    {
        title: "Số điện thoại",
        dataIndex: "phone_number",
        key: "phone_number"
    }
]

export const baseCustomers:CustomerType[] = [
    {
        customer_id: "431456",
        customer_name: "Chu Văn A",
        display_address: "CT1 Chung cư bộ công an",
        phone_number: "0123456789",
        frequency: "1;2;3;4;5",

    },
    {
        customer_id: "4314s56",
        customer_name: "Chu Văn A",
        display_address: "CT1 Chung cư bộ công an",
        phone_number: "0123456789",
        frequency: "",

    },
]

export const optionsFrequency = [
    {
        label: "1",
        value: "1"
    },
    {
        label: "2",
        value: "2"
    },
    {
        label: "3",
        value: "3"
    },
    {
        label: "4",
        value: "4"
    },
    {
        label: "5",
        value: "5"
    },
]


export const FilterForm = {
    customer_type: "Loại khách hàng",
    customer_group: "Nhóm khách hàng",
    city: "Tỉnh/Thành phố",
    district: "Quận/huyện",
    ward: "Phường/xã",
}

export const optionsTravel_date = [
    {
        label: "Thứ 2",
        value: "Thứ 2"
    },
    {
        label: "Thứ 3",
        value: "Thứ 3"
    },
    {
        label: "Thứ 4",
        value: "Thứ 4"
    },
    {
        label: "Thứ 5",
        value: "Thứ 5"
    },
    {
        label: "Thứ 6",
        value: "Thứ 6"
    },
    {
        label: "Thứ 7",
        value: "Thứ 7"
    },
    {
        label: "Chủ nhật",
        value: "Chủ nhật"
    },
]