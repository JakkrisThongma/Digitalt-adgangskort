locals {    
    resource_group_name = "stud-shared-dwe-rg"
    app_service_plan_name = "${var.web_app_name}"
    web_app_name = "${var.web_app_name}"
    autoscale_settings_name = "${var.web_app_name}"
}