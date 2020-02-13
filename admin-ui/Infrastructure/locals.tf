locals {    
    resource_group_name = "stud-gruppe5-oppgave5-dwe-rg"
    app_service_plan_name = "${var.web_app_name}"
    web_app_name = "${var.web_app_name}"
    autoscale_settings_name = "${var.web_app_name}"
}