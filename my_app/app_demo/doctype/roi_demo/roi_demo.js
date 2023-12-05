// Copyright (c) 2023, VGM and contributors
// For license information, please see license.txt

frappe.ui.form.on('ROI_Demo', {
	onload: function(frm) {
		frappe.realtime.on("refresh_roi", () => {
			frm.reload_doc();
		});
	},
	refresh: function(frm) {
		const wrapper = frm.get_field("preview").$wrapper;
		wrapper.html(`
			<div class="img_preview">
				<img class="img-responsive" src="/api/method/app_demo.api.photo?name=${frm.doc.name}"></img>
			</div>
		`);
	}
});
