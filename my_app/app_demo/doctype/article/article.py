# Copyright (c) 2023, VGM and contributors
# For license information, please see license.txt

# import frappe
import frappe
from frappe.website.website_generator import WebsiteGenerator
import requests
class Article(WebsiteGenerator):
   def before_save(self):
        print('123132123123');
        """
        Phương thức này sẽ được gọi trước khi một tài liệu (document) được lưu (create hoặc update).
        """
        # Thực hiện cuộc gọi API và xử lý dữ liệu nhận được
        api_url = "https://jsonplaceholder.typicode.com/todos/1"
        response = requests.get(api_url)

        if response.status_code == 200:
            # Giả sử API trả về dữ liệu dưới dạng JSON và có trường 'desired_field'
            api_data = response.json()
            # desired_field_value = api_data.get('id')
            # self.namesession = desired_field_value
            # Gán giá trị vào trường cần thiết của doctype   
        else:
            frappe.throw(f"Failed to fetch data from API. Status code: {response.status_code}")
            
        
	
