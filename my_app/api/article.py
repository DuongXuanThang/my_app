import frappe

# @frappe.whitelist(methods="GET")
# def get_list(**data):
#     doc = frappe.get_doc('Article', 'The Girl is a gift')
#     print('Article', doc)
#     return doc
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

