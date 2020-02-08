locals {    
    resource_group_name = "${var.resource_group_name}-${var.environment}-rg"
    app_service_plan_name = "${var.web_app_name}"
    web_app_name = "${var.web_app_name}"
    autoscale_settings_name = "${var.web_app_name}"
}