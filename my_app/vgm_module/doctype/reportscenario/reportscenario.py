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

class ReportScenario(Document):
    def before_save(self):
        RECOGNITION_API_KEY: str = '00000000-0000-0000-0000-000000000002'
        deep_vision: DeepVision = DeepVision()
        recognition: ProductCountService = deep_vision.init_product_count_service(RECOGNITION_API_KEY)
        base_url = "http://mbw.ts:8000"
        collection_name = 'VGM_ReportScenario'
        image_path = base_url + self.images
        response = recognition.count(collection_name, image_path)
        if response.get('status') == 'completed':
            count_value = response.get('result', {}).get('count', {}).get(self.product)
            self.set('sum', count_value)
        else:
            frappe.msgprint("Không phân tích được ảnh") 
            self.set('sum', self.sum)
            
            
        

        
        

	
   
