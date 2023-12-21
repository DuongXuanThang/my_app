# Copyright (c) 2023, VGM and contributors
# For license information, please see license.txt

# import frappe
import sys
import os
__dir__ = os.path.dirname(os.path.abspath(__file__))
sys.path.append(__dir__)
sys.path.insert(0, os.path.abspath(os.path.join(__dir__, '../')))
from deepvision import DeepVision
from deepvision.service import ProductCountService
from frappe.model.document import Document

class AttachImage(Document):
	pass
