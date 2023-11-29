import frappe

@frappe.whitelist(methods="GET")
def get_list(**data):
    return {'msg': "ok"}