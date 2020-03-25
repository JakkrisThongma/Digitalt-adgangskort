
locals {    
    resource_group_name = "{var.resource_group_name}-${var.environment}-rg"

    ui_app_service_plan_name = "${var.ui_web_app_name}"
    ui_web_app_name = "${var.ui_web_app_name}"
    ui_autoscale_settings_name = "${var.ui_web_app_name}"
    api_app_service_plan_name = "${var.api_web_app_name}"
    api_web_app_name = "${var.api_web_app_name}"
    api_autoscale_settings_name = "${var.api_web_app_name}"
}

