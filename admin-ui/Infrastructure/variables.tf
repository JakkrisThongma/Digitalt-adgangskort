
variable "resource_group_name" {
  default = "gruppedemo"
  description = "The resource group where the resources should be created."
}

variable "location" {
  default     = "westeurope"
  description = "The azure datacenter location where the resources should be created."
}
variable "web_app_name" {
  default = "demo"
  description = "The name for the app. Without environment naming."
}

variable "ui_web_app_name" {
  default = "ui"
  description = "The name for the ui app. Without environment naming."
}
variable "api_web_app_name" {
  default = "api"
  description = "The name for the api app. Without environment naming."
}

variable "sku_tier" {
  description = "Which tier the app service plan will have."
  default = "Premium"
}

variable "sku_size" {
  description = "Which size the app service plan tier will have."
  default = "P1v2"
}

variable "default_autoscale_instances" {
  description = "Default numbers of instances which should stay in the auto scaling."
  default = 1 
}

variable "min_tls_version" {
  description = "Minimum version of TLS the web app should support."
  default = "1.2"
}

variable "restrict_ip" {
  default = "0.0.0.0"
  description = "The ipv4 address you want to allow accessing the web app"
}

variable "restrict_subnet_mask" {
  default = "0.0.0.0"
  description = "The subnet mask for the ipv4 address you want to allow accessing the web app, defaults to 0.0.0.0 (every ip allowed)"
}

variable "ftps_state" {
  description = "Which form for ftp the web app file system should support. If not strictly nesasery to use it, leave it disabled, and onlyftps if needed."
  default = "Disabled"
}
variable "app_settings" {
  default     = {}
  type        = "map"
  description = "Application settings to insert on creating the function app. Following updates will be ignored, and has to be set manually. Updates done on application deploy or in portal will not affect terraform state file."
}
variable "tags" {
  description = "A map of tags to add to all resources"
  type        = "map"

  default = {}
}
variable "environment" {
  default = "dev"
  description = "The environment where the infrastructure is deployed."
}
variable "release" {
  default     = ""
  description = "The release the deploy is based on."
}
variable "allow_azure_ip_access" {
  default     = "true"
  description = "If azure ip ranges should be allowed through the sql server firewall."
}

variable "server_name" {
  description = "Name of the server. "
}

variable "database_name" {
  description = "Name on the initial database on the server. "
}

variable "database_collation" {
  default = "SQL_LATIN1_GENERAL_CP1_CI_AS"
  description = "Which collation the initial database should have."
}

variable "database_edition" {
  default = "Standard"
  description = "Which database scaling edition the database should have."
}

variable "database_requested_service_objective_name" {
  default = "S1"
  description = "Which service scaling objective the database should have."
}

variable "admin_login_name" {
  default     = "kitten83"
  description = "Login name for the sql server administrator. If not set the default login name will be 'kitten83'."
}

variable "ad_admin_login_name" {
  default     = "kitten82"
  description = "Name of the login for sql admin loging in from Azure AD. "
}

variable "tenant_id" {
  description = "Id to the Azure AD tenant used for SSO. "
}

variable "object_id" {
  description = "Id to the user whom should be admin."
}

variable "lock_database_resource" {
  default     = "false"
  description = "Param defining whether to set CanNotDelete lock on the database resource upon DB creation. Possible input values is 'true' and 'false'."
}