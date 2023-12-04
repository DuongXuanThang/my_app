import frappe

# @frappe.whitelist(methods="GET")

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
   
     
    