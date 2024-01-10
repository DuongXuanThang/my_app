# Copyright (c) 2023, VGM and contributors
# For license information, please see license.txt
import sys
import os
__dir__ = os.path.dirname(os.path.abspath(__file__))
sys.path.append(__dir__)
sys.path.insert(0, os.path.abspath(os.path.join(__dir__, '../')))
from deepvision import DeepVision
from deepvision.service import ProductCountService
import frappe
from frappe.model.document import Document

class ReportScenario_SKU(Document):
    def before_save(self):
        RECOGNITION_API_KEY: str = '00000000-0000-0000-0000-000000000002'
        deep_vision: DeepVision = DeepVision()
        recognition: ProductCountService = deep_vision.init_product_count_service(RECOGNITION_API_KEY)
        base_url = frappe.utils.get_request_site_address()
        collection_name = 'VGM_Audits_Product'
        image_path = base_url + self.photos_display
        product_id = self.product_code
        get_product_name =  frappe.get_value("Product_SKU", {"name": product_id}, "product_name")
        response = recognition.count(collection_name, image_path)
        if response.get('status') == 'completed':
            count_value = response.get('result', {}).get('count', {}).get(get_product_name)
            self.set('product_count', count_value)
        else:
            frappe.msgprint("Không phân tích được ảnh") 
            self.set('product_count', self.product_count)
            
            
        

        
        

	
   
