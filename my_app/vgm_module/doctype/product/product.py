# Copyright (c) 2023, VGM and contributors
# For license information, please see license.txt

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
class Product(Document):
    def before_save(self):
        RECOGNITION_API_KEY: str = '00000000-0000-0000-0000-000000000002'

        deep_vision: DeepVision = DeepVision()
        product_recognition: ProductRecognitionService = deep_vision.init_product_recognition_service(RECOGNITION_API_KEY)

        # Lấy danh sách sản phẩm
        products: Products = product_recognition.get_products()

        # Sử dụng self để truy cập trường product_name
        product_name = self.product_name

        # Lấy đường dẫn của các hình ảnh từ table
        base_url = "http://mbw.ts:8000"
        image_paths = [base_url + photo.uri_image for photo in self.photos]
        print("Image Paths:", image_paths)

        # Tiếp tục xử lý và lưu dữ liệu theo logic của bạn

        # Thêm sản phẩm với các thông tin đã lấy được
        collection_name = 'VGM_Product'
        product_id = str(uuid.uuid4())
        image_ids = [str(uuid.uuid4())]
        print(products.add(collection_name, product_id, product_name, image_ids, image_paths))

        
      