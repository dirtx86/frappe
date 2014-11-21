// Copyright (c) 2013, Web Notes Technologies Pvt. Ltd. and Contributors
// MIT License. See license.txt

frappe.ui.toggle_star = function($btn, doctype, name) {
	var add = $btn.hasClass("icon-star-empty") ? "Yes" : "No";
	frappe.call({
		method: "frappe.desk.star.toggle_star",
		quiet: true,
		args: {
			doctype: doctype,
			name: name,
			add: add,
		},
		callback: function(r) {
			if(!r.exc) {
				// update in all local-buttons
				var action_buttons = $(".star-action[data-name='"+ name.replace(/"/g, '\"') +"']");

				if(add==="Yes") {
					action_buttons.removeClass("icon-star-empty").addClass("icon-star");
				} else {
					action_buttons.removeClass("icon-star").addClass("icon-star-empty");
				}

				// update in locals (form)
				var doc = locals[doctype][name];
				if(doc) {
					var starred_by = JSON.parse(doc._starred_by || "[]"),
						idx = starred_by.indexOf(user);
					if(add==="Yes") {
						if(idx===-1)
							starred_by.push(user);
					} else {
						if(idx!==-1) {
							starred_by = starred_by.slice(0,idx).concat(starred_by.slice(idx+1))
						}
					}
					doc._starred_by = JSON.stringify(starred_by);
				}
			}
		}
	});
};
