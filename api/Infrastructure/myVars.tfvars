web_app_name = "digitalAdgangskortWebAPI"
resource_group_name = "stud-gruppe5-oppgave5-dwe-rg"
environment = "dev"
ad_admin_login_name = "${module.web_app.identity_principal_id}"
