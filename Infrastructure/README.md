# Creates the following ressources in Azure Cloud

# Resources deployed with Terraform:
## IN module web-app: 
#### azurerm_app_service_plan
#### azurerm_app_service
#### azurerm_autoscale_setting


# How to run Terraform by command in terminal:
#### az login
#### az account list --query "[][isDefault,id,name]" --output table
#### az account set --subscription "xxxxx-xxxxx-xxxxx-xxxxx-xxxxx"
#### terraform init
#### terraform workspace new dev
#### terraform apply

# How to clean up ressources from Azure by command:
#### terraform workspace select default
#### terraform destroy -var-file="var.tfvars" -force
#### terraform workspace delete dev