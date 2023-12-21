
import sys
import os
__dir__ = os.path.dirname(os.path.abspath(__file__))
sys.path.append(__dir__)
sys.path.insert(0, os.path.abspath(os.path.join(__dir__, '../')))
from deepvision.core import DeepVision
from deepvision.service import ProductRecognitionService
from deepvision.collections import ProductCollection


RECOGNITION_API_KEY: str = '00000000-0000-0000-0000-000000000002'
print('111111111111')
deep_vision: DeepVision = DeepVision(options={
})

product_recognition: ProductRecognitionService = deep_vision.init_product_recognition_service(
    RECOGNITION_API_KEY)

product_collection: ProductCollection = product_recognition.get_product_collection()

# Image from local path.
collection_name= 'test_collection'
product_id = '123'
product_name = 'test'
image_path = './common/product_example.png'
image_id = '1'


print(product_collection.add(collection_name, image_id, image_path, product_id, product_name))

