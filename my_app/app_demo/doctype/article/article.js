// Copyright (c) 2023, VGM and contributors
// For license information, please see license.txt

frappe.ui.form.on('Article', {
	// refresh: function(frm) {
	// }
	image: function(frm) {
        // Hành động khi trường 'your_image_field' thay đổi
        var uploaded_file = frm.doc.image;

        // Kiểm tra xem có tệp tin đã được tải lên không
        if (uploaded_file) {
			alert('123')
            // Thực hiện hành động cập nhật cho trường khác, ví dụ: cập nhật trường 'another_field'
            frm.set_value('namesession', 3);
			
        }else {
            // Trường ảnh rỗng, thực hiện hành động cập nhật khác, ví dụ: đặt giá trị về 0
            frm.set_value('namesession', 0);
        }
		frm.refresh_fields();
    }
});
