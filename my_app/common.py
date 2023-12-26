import json
import frappe
from bs4 import BeautifulSoup
from frappe import _
from frappe.utils import cstr
import urllib.parse
import http.cookies
from datetime import datetime, timedelta
import base64
from frappe.core.doctype.file.utils import delete_file
from frappe.utils.file_manager import (
    save_file
)
from frappe.desk.query_report import (
    normalize_result, get_report_result, get_reference_report)
from frappe.core.utils import ljust_list
from frappe.client import validate_link

BASE_URL = frappe.utils.get_request_site_address()

# return definition 1004 1225
def gen_response(status, message, result=[]):
    frappe.response["http_status_code"] = status
    if status == 500:
        frappe.response["message"] = BeautifulSoup(
            str(message), features="lxml").get_text()
    else:
        frappe.response["message"] = message
    frappe.response["result"] = result

# export employee key
def generate_key(user):
    user_details = frappe.get_doc("User", user)
    api_secret = api_key = ""
    if not user_details.api_key and not user_details.api_secret:
        api_secret = frappe.generate_hash(length=15)
        # if api key is not set generate api key
        api_key = frappe.generate_hash(length=15)
        user_details.api_key = api_key
        user_details.api_secret = api_secret
        user_details.save(ignore_permissions=True)
    else:
        api_secret = user_details.get_password("api_secret")
        api_key = user_details.get("api_key")
    return {"api_secret": api_secret, "api_key": api_key}


def get_employee_by_user(user, fields=["name"]):
    if isinstance(fields, str):
        fields = [fields]
    emp_data = frappe.db.get_value(
        "User",
        {"email": user},
        fields,
        as_dict=1,
    )
    return emp_data


def get_language():
    lang_ = frappe.local.request.headers.get("Language")
    lang = "vi" if not lang_ else lang_

    return lang

def exception_handel(e):
    frappe.log_error(title="DMS Mobile App Error",
                     message=frappe.get_traceback())
    return gen_response(406, cstr(e))
    
    if hasattr(e, "http_status_code"):
        return gen_response(e.http_status_code, cstr(e))
    else:
        return gen_response(406, cstr(e))

def get_user_id():
    headers = frappe.local.request.headers.get("Authorization")
    usrPass = headers.split(" ")[1]
    str_b64Val = base64.b64decode(usrPass).decode('utf-8')
    list_key = str_b64Val.split(':')
    api_key = list_key[0]
    user_id = frappe.db.get_value('User', {"api_key": api_key})
    return user_id

def get_employee_id():
    try:
        user_id = get_user_id()
        return get_employee_by_user(user_id).get("name")
    
    except:
        return ""
    

    
     
def get_info_employee(name, fields=['*']):
    info = frappe.db.get_value("User", name, fields, as_dict=1)
    # shift_type_now = get_shift_type_now(info.get('employee'))
    # info['shift'] = shift_type_now
    return info
def get_info_KB(userid, fields=["*"]):
    if isinstance(fields, str):
        fields = [fields]

    kb_list_info = frappe.get_all(
        "KichBanDemo",
        filters={"user": userid},
        fields=fields,
        as_list=False,
    )

    return kb_list_info

def post_image(name_image, faceimage, doc_type, doc_name):
    # save file and insert Doctype File
    file_name = name_image + "_" + str(datetime.now()) + "_.png"
    imgdata = base64.b64decode(faceimage)

    doc_file = save_file(file_name, imgdata, doc_type, doc_name,
                         folder=None, decode=False, is_private=0, df=None)

    # delete image copy
    path_file = "/files/" + file_name
    delete_file(path_file)
    file_url = BASE_URL + doc_file.get('file_url')
    return file_url

def validate_image(user_image):
    if user_image and "http" not in user_image:
        user_image = BASE_URL + user_image
    return user_image
