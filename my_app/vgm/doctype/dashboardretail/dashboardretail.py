# Copyright (c) 2023, VGM and contributors
# For license information, please see license.txt
import json
import frappe
from frappe.model.document import Document
import sys
import os
__dir__ = os.path.dirname(os.path.abspath(__file__))
sys.path.append(__dir__)
sys.path.insert(0, os.path.abspath(os.path.join(__dir__, '../')))
import uuid
from deepvision import DeepVision
from deepvision.service import ProductRecognitionService
from deepvision.collections import Products
class DashboardRetail(Document):
    def before_save(self):
        RECOGNITION_API_KEY: str = '00000000-0000-0000-0000-000000000002'
        deep_vision: DeepVision = DeepVision()
        recognition: ProductCountService = deep_vision.init_product_count_service(RECOGNITION_API_KEY)
        base_url = frappe.utils.get_request_site_address()
        collection_name = 'VGM_Audits_Product'
        for i in range(0, len(self.report_product), 1):
            photos = self.report_product[i].photos
            count_product = 0
            for j in range(0, len(photos), 1):
                image_path = base_url + photos[j].uri_image
                product_name = self.report_product[i].product_name
                response = recognition.count(collection_name, image_path)
                if response.get('status') == 'completed':
                    count_value = response.get('result', {}).get('count', {}).get(product_name)
                    if count_value is None:
                        count_product += 0
                    else:
                        count_product = count_product + count_value
                else:
                    frappe.msgprint("KhÃ´ng phÃ¢n tÃ­ch Ä‘Æ°á»£c áº£nh") 
                    count_product = count_product + 0
            self.report_product[i].product_count = count_product