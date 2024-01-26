import frappe
from my_app.common import (gen_response,exception_handel,get_info_employee,get_employee_id,get_language, post_image, validate_image,get_info_KB)
from datetime import datetime
import base64
# from my_app.config_translate import i18n
# cập nhật tài khoản
@frappe.whitelist(allow_guest=True,methods="PUT")
def update_profile(**kwargs):
    try:
        employee_id = get_employee_id()
        date_format = '%Y/%m/%d'
        fieldAccess = ["full_name","birth_date"]
        del kwargs['cmd']
        
        for field, value in dict(kwargs).items():
            if field not in fieldAccess:
                # mess = i18n.t('translate.invalid_value', locale=get_language()) + "" + field
                frappe.local.response['message'] = mess
                frappe.local.response['http_status_code'] = 404
                frappe.response["result"] = []
                return None
            elif field == 'birth_date':
                dob = int(kwargs.get('birth_date'))
                date_of_birth = int(kwargs.get('birth_date'))
                date_of_birth = datetime.fromtimestamp(date_of_birth).strftime(date_format)
                kwargs['birth_date'] = date_of_birth
                
            elif field == 'full_name':
                if kwargs.get("full_name"):
                    full_name = kwargs.get("full_name")
                    list_name = full_name.split(" ")
                    if len(list_name) == 1:
                        kwargs['first_name'] = list_name[0]
                    elif len(list_name) == 2:
                        kwargs['first_name'] = list_name[0]
                        kwargs['last_name'] = list_name[1]
                    else:
                        kwargs['first_name'] = list_name[0]
                        kwargs['middle_name'] = ' '.join(list_name[1:-1])
                        kwargs['last_name'] = list_name[-1]
                    
                    del kwargs['full_name']
            elif field == "image":
                face_image = kwargs.get("image")
                name_image = "avarta_"+employee_id
                kwargs['image'] = post_image(name_image, face_image, "User", employee_id)
        if frappe.db.exists("User", employee_id, cache=True):
            doc = frappe.get_doc('User', employee_id)
            for field, value in dict(kwargs).items():
                setattr(doc, field, value)
                if field == "date_of_birth":
                    kwargs['date_of_birth'] = dob
            doc.save()
        
        gen_response(200, 'success',kwargs)

    except Exception as e:
        gen_response(500, 'Error', [])
        return exception_handel(e)


# lấy thông tin nhân viên
@frappe.whitelist(methods="GET")
def get_employee_info():
    try:
        employee_id = get_employee_id()
        if not employee_id:
            gen_response(404 ,'Not found user',[])
            return 
        user_info = get_info_employee(name= employee_id,fields=["*"])
        # user_info['date_of_birth'] = user_info['date_of_birth']
        # if user_info['image']:
        #     user_info['image'] = validate_image(user_info['image'])

        gen_response(200,'Success',user_info)
    except Exception as e:
        exception_handel(e)
        # gen_response(500,i18n.t('translate.error', locale=get_language()), [])
        
@frappe.whitelist(allow_guest=True,methods="GET")
def get_KichBan_info(**kwargs):
    try:
        # Kiểm tra xem bản ghi tồn tại hay không
        doc = frappe.get_doc('Scenario',kwargs.get('name'))
        if doc:
            return doc
        else:
            return "fail"
    except Exception as e:
        return "fail"
    # try:
        
    #     # user_id = get_employee_id()
    #     # if not user_id:
    #     #     gen_response(404 ,'Not found KB',[])
    #     #     return 
    #     # KB_listinfo = get_info_KB(userid= user_id,fields=["name_kb", "description_kb","user"])
    #     # # user_info['date_of_birth'] = user_info['date_of_birth']
    #     # # if user_info['image']:
    #     # #     user_info['image'] = validate_image(user_info['image'])

    #     gen_response(200,'Success')
    # except Exception as e:
    #     exception_handel(e)
    #     # gen_response(500,i18n.t('translate.error', locale=get_language()), [])