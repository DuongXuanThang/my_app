import json
import requests
import frappe
from frappe.model.document import Document
import sys
import os

__dir__ = os.path.dirname(os.path.abspath(__file__))
sys.path.append(__dir__)
sys.path.insert(0, os.path.abspath(os.path.join(__dir__, "../")))
import uuid
from deepvision import DeepVision
from deepvision.service import ProductRecognitionService
from deepvision.collections import Products
from my_app.utils import get_image_path, image_resize


@frappe.whitelist(methods=["GET", "POST"])
def roi(name: str):
    import cv2

    location, img = frappe.db.get_value("ROI_Demo", name, ["location", "image"])
    _file = frappe.get_doc("File", img)
    top, right, bottom, left = json.loads(location)
    image = cv2.rectangle(
        cv2.imread(get_image_path(_file.file_url)),
        (left, top),
        (right, bottom),
        (0, 0, 255),
        6,
    )
    resized_img = image_resize(image, width=800, height=600)
    _, img = cv2.imencode(".jpg", resized_img)

    frappe.response.filename = f"temp_{_file.file_name}"
    frappe.response.type = "download"
    frappe.response.display_content_as = "inline"
    frappe.response.filecontent = img.tobytes()


@frappe.whitelist(methods=["GET"])
def photo(name: str, roi: bool = False):
    import cv2

    photo = frappe.get_doc("Photo_Demo", name)
    _file = frappe.get_doc("File", photo.photo)
    image = cv2.imread(get_image_path(_file.file_url))

    if roi:
        # draw roi for all encodings, possibly with labels
        for _roi in photo.people:
            location, person = frappe.db.get_value(
                "ROI_Demo", _roi.face, ["location", "person"]
            )
            top, right, bottom, left = json.loads(location)
            image = cv2.rectangle(image, (left, top), (right, bottom), (0, 0, 255), 6)

    resized_img = image_resize(image, height=400)
    _, img = cv2.imencode(".jpg", resized_img)

    frappe.response.filename = f"temp_{_file.file_name}"
    frappe.response.type = "download"
    frappe.response.display_content_as = "inline"
    frappe.response.filecontent = img.tobytes()


@frappe.whitelist()
def filter_photo(*args, **kwargs):
    return frappe.get_list(
        "File",
        filters={
            "is_folder": False,
            "name": ("not in", frappe.get_all("Photo_Demo", pluck="photo")),
        },
        fields=["name", "file_name"],
        as_list=True,
    )


@frappe.whitelist(methods="GET")
def delete_article(record_name=None, **data):
    try:
        # Kiểm tra xem bản ghi tồn tại hay không
        doc = frappe.get_doc("Article", record_name)
        if doc:
            # Xóa bản ghi
            doc.delete()
            frappe.db.commit()
            return "success"
        else:
            return "fail"
    except Exception as e:
        return "fail"


@frappe.whitelist(methods="GET")
def update_list(record_name=None, **data):
    try:
        # Kiểm tra xem bản ghi tồn tại hay không
        doc = frappe.get_doc("Article", record_name)
        if doc:
            doc.author = "xuta"
            doc.save()
            frappe.db.commit()
            return "success"
        else:
            return "fail"
    except Exception as e:
        return "fail"


@frappe.whitelist(methods="GET")
def add_list(**data):
    try:
        # Kiểm tra xem bản ghi tồn tại hay không
        doc = frappe.new_doc("Article")
        if doc:
            doc.author = "LOVe this girl"
            doc.insert()
            frappe.db.commit()
            return "success"
        else:
            return "fail"
    except Exception as e:
        return "fail"


@frappe.whitelist(methods="GET")
def get_employees():
    url = "https://dummy.restapiexample.com/api/v1/employees"
    try:
        # Gửi yêu cầu GET đến API
        response = requests.get(url)

        # Kiểm tra xem yêu cầu có thành công hay không (status code 200)
        if response.status_code == 200:
            # Lấy dữ liệu từ phản hồi
            data = response.json()
            # Kiểm tra xem có dữ liệu hay không
            if data.get("data"):
                # Lặp qua danh sách nhân viên và thêm vào bảng Article
                for employee in data["data"]:
                    # Tạo một bản ghi mới trong bảng Article
                    article = frappe.new_doc("Article")
                    # Đặt các giá trị từ dữ liệu API vào các trường tương ứng
                    article.article_name = employee.get("employee_name")
                    # Thêm các trường khác tương ứng
                    article.insert()
                    # Lưu bản ghi vào cơ sở dữ liệu
                    frappe.db.commit()

                print("Data added to Article table successfully.")
            else:
                print("No employee data found.")
        else:
            print(f"Failed to retrieve data. Status code: {response.status_code}")

    except Exception as e:
        print(f"An error occurred: {str(e)}")


@frappe.whitelist(methods="GET", allow_guest=True)
def get_vue_data():
    # Logic to fetch data for Vue.js
    data = {"message": "Hello from Frappe!"}
    return data


@frappe.whitelist()
def execute_function(*args, **kwargs):
    """
    This fonction will be executed when the Execute Action Button will be clicked
    """
    print("Hello World")
    # The data is transmitted via keyword argument
    print(kwargs)


@frappe.whitelist(methods="POST", allow_guest=True)
def add_report(**kwargs):
    RECOGNITION_API_KEY: str = "00000000-0000-0000-0000-000000000002"
    deep_vision: DeepVision = DeepVision()
    recognition: ProductCountService = deep_vision.init_product_count_service(
        RECOGNITION_API_KEY
    )
    base_url = frappe.utils.get_request_site_address()
    collection_name = "VGM_Audits_Product"
    dataobj = json.loads(kwargs.get('doc'))
    try:
        # Tạo bản ghi của thằng cha
        parent_doc = frappe.get_doc({
            "doctype": "DashboardRetail",
            "retail": dataobj.get('retail'),
            "check_longitude": dataobj.get('check_longitude'),
            "check_latitude" : dataobj.get('check_latitude'),
            "docstatus": 0,
            # Các trường khác...
        })

        # Lặp qua mảng report_product và thêm từng đối tượng con vào mảng
        for report_product_data in dataobj.get('report_product', []):
            report_product_sku = frappe.get_doc({
                "doctype": "ReportProduct_SKU",
                "parentfield": "report_product",
                "parenttype": "DashboardRetail",
                "scenario_name": report_product_data.get('scenario_name'),
                "product_name": report_product_data.get('product_name'),
                "product_count": report_product_data.get('product_count'),
                # Các trường khác...
            })

            # Lặp qua mảng photos và thêm từng đối tượng con vào mảng
            for photo_data in report_product_data.get('photos', []):
                # count_product = 0
                booth_photo_product = frappe.get_doc({
                    "doctype": "BoothPhotoProduct",
                    "parentfield": "photos",
                    "parenttype": "ReportProduct_SKU",
                    "uri_image": photo_data.get('uri_image'), 
                    # Các trường khác...
                })
                # image_path = base_url + photo_data.get('uri_image')
                # product_name = report_product_data.get('product_name')
                # response = recognition.count(collection_name, image_path)
                # if response.get('status') == 'completed':
                #     count_value = response.get('result', {}).get('count', {}).get(product_name)
                #     if count_value is None:
                #         count_product += 0
                #     else:
                #         count_product = count_product + count_value
                # else:
                #     count_product = count_product + 0 
                # Thêm thằng con (BoothPhotoProduct) vào thằng con (ReportProduct_SKU)
                
                report_product_sku.append("photos", booth_photo_product)
            # Cập nhật giá trị product_count dựa vào count_product    
            # report_product_sku.product_count = count_product
            # Thêm thằng con (ReportProduct_SKU) vào thằng cha (DashboardRetail)
            parent_doc.append("report_product", report_product_sku)

        # Lưu bản ghi của thằng cha
        parent_doc.insert()
        # Lấy ID của đối tượng DashboardRetail mới được tạo
        dashboard_retail_id = parent_doc.name
        # Lấy đối tượng DashboardRetail sau khi đã được thêm vào database
        dashboard_retail_doc = frappe.get_doc("DashboardRetail", dashboard_retail_id)
        # Trả về ID của đối tượng DashboardRetail mới được tạo
        return {"success": True, "dashboard_retail": dashboard_retail_doc.as_dict()}
        # return {"success": True, "dashboard_retail_id": parent_doc.name}
    except frappe.exceptions.ValidationError as e:
        return {"success": False, "message": _("Validation Error: {0}".format(str(e)))}
    except Exception as e:
        return {"success": False, "message": _("An error occurred: {0}".format(str(e)))}
    
