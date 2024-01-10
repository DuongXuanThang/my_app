import json
import requests
import frappe

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
        doc = frappe.get_doc('Article', record_name)
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
def update_list(record_name=None,**data):
     try:
        # Kiểm tra xem bản ghi tồn tại hay không
        doc = frappe.get_doc('Article', record_name)
        if doc:
            doc.author="xuta"
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
        doc = frappe.new_doc('Article')
        if doc:
            doc.author="LOVe this girl"
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
                    #Thêm các trường khác tương ứng
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
@frappe.whitelist(methods="GET",allow_guest=True)
def get_vue_data():
    # Logic to fetch data for Vue.js
    data = {"message": "Hello from Frappe!"}
    return data
@frappe.whitelist()
def execute_function(*args,**kwargs):
    """
    This fonction will be executed when the Execute Action Button will be clicked
    """
    print('Hello World')
    # The data is transmitted via keyword argument
    print(kwargs)
