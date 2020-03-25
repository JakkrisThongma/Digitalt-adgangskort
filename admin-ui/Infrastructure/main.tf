data "azurerm_client_config" "current" {}

terraform {
  backend "azurerm" {}
}


module "ui_web_app" {
  source  = "innovationnorway/web-app/azurerm"
  version = "0.1.6"

  resource_group_name = "${var.resource_group_name}"
  location            = "${var.location}"
  web_app_name        = "${var.ui_web_app_name}"
  environment         = "${var.environment}"
  release             = "${var.release}"

  sku_size                    = "${var.sku_size}"
  sku_tier                    = "${var.sku_tier}"
  default_autoscale_instances = "${var.default_autoscale_instances}"

  tags = "${var.tags}"
}

module "api_web_app" {
  source  = "innovationnorway/web-app/azurerm"
  version = "0.1.6"

  resource_group_name = "${var.resource_group_name}"
  location            = "${var.location}"
  web_app2_name        = "${var.api_web_app_name}"
  environment         = "${var.environment}"
  release             = "${var.release}"

  sku_size                    = "${var.sku_size}"
  sku_tier                    = "${var.sku_tier}"
  default_autoscale_instances = "${var.default_autoscale_instances}"

  tags = "${var.tags}"
}

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


module "web_app2" {
  source  = "innovationnorway/web-app/azurerm"
  version = "0.1.6"

  resource_group_name = "${var.resource_group_name}"
  location            = "${var.location}"
  web_app_name        = "${var.web_app2_name}"
  environment         = "${var.environment}"
  release             = "${var.release}"

  sku_size                    = "${var.sku_size}"
  sku_tier                    = "${var.sku_tier}"
  default_autoscale_instances = "${var.default_autoscale_instances}"

  tags = "${var.tags}"
}
