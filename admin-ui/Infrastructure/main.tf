data "azurerm_client_config" "current" {}

terraform {
  backend "azurerm" {
    resource_group_name  = "stud-shared-dwe-rg"
    storage_account_name = "studshareddwesa"
    container_name       = "gruppe5"
    key                  = "gruppe5.tfstate"
  }
}
/*
resource "azurerm_resource_group" "gruppe-rsg" {
  name     = "${local.resource_group_name}"
  location = "${var.location}"
}
*/

module "web_app" {
  source  = "innovationnorway/web-app/azurerm"
  version = "0.1.6"

  resource_group_name = "${var.resource_group_name}"
  location            = "${var.location}"
  web_app_name        = "${var.web_app_name}"
  environment         = "${var.environment}"
  release             = "${var.release}"

  sku_size                    = "${var.sku_size}"
  sku_tier                    = "${var.sku_tier}"
  default_autoscale_instances = "${var.default_autoscale_instances}"

  tags = "${var.tags}"
}


