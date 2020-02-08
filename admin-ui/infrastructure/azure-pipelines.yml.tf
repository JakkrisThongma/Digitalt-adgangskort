# Starter pipeline
# Start with a minimal pipeline that you can customize to build and deploy your code.
# Add steps that build, run tests, deploy, and more:
# https://aka.ms/yaml

# Starter pipeline
# Start with a minimal pipeline that you can customize to build and deploy your code.
# Add steps that build, run tests, deploy, and more:
# https://aka.ms/yaml

# ASP.NET Core (.NET Framework with ReactJS)
# Build and test ASP.NET Core projects targeting the full .NET Framework.

name: $(BuildDefinitionName)_$(Build.SourceBranchName)_$(Date:yyyy-MM-dd).$(BuildID)
trigger:
  branches:
    include: 
    - users/mohamad/set-up-admin-ui-infrastructure
    - develop
    - master
  paths:
    include:
    - admin-ui/*


variables: 
  Terraform.backendServiceArm: 'bacheloroppgave-dev-gruppe5-sc'
  Terraform.backendAzureRmResourceGroupName: 'stud-gruppe1-oppgave5-dwe-rg'
  Terraform.backendAzureRmStorageAccountName: 'studshareddwesa'
  Terraform.backendAzureRmContainerName: 'gruppe5'
  Terraform.Terraform.backendAzureRmKey: 'build.tfstate'
  Terraform.version: '0.12.12'


  ${{ if eq( variables['Build.SourceBranchName'], 'master') }}:
     ConfigBuild: 'Release'

  ${{ if ne( variables['Build.SourceBranchName'], 'master') }}:
     ConfigBuild: 'Debug'    

phases:
  - phase: Infrastructure
    queue:
      name: 'Private VS2019'
    steps:
    - task: CopyFiles@2
      displayName: Copy artifacts
      inputs:
        SourceFolder: Infrastructure
        contents: |
          **
          !.vsts-ci.yml
          !**/.git/**
          !**/.terraform/**
        targetFolder: $(Build.ArtifactStagingDirectory)/Infrastructure    
    
    - task: ms-devlabs.custom-terraform-tasks.custom-terraform-installer-task.TerraformInstaller@0
      displayName: 'Install Terraform version: 0.12.12'
      inputs:
        terraformVersion: '$(Terraform.Version)'
        
    - task: ms-devlabs.custom-terraform-tasks.custom-terraform-release-task.TerraformTaskV1@0
      displayName: 'Terraform : azurerm init'
      inputs:
        workingDirectory: '$(Build.ArtifactStagingDirectory)/Infrastructure'
        commandOptions: '-no-color'
        backendServiceArm: '$(Terraform.backendServiceArm)'
        backendAzureRmResourceGroupName: '$(Terraform.backendAzureRmResourceGroupName)'
        backendAzureRmStorageAccountName: '$(Terraform.backendAzureRmStorageAccountName)'
        backendAzureRmContainerName: '$(Terraform.backendAzureRmContainerName)'
        backendAzureRmKey: '$(Terraform.backendAzureRmKey)'

    - task: ms-devlabs.custom-terraform-tasks.custom-terraform-release-task.TerraformTaskV1@0
      displayName: Validate Terraform configuration
      inputs:
        command: validate
        variables: |
          environment=dev
          release=release
        workingDirectory: '$(Build.ArtifactStagingDirectory)/Infrastructure'
      
    - task: DeleteFiles@1
      inputs:
        sourceFolder: '$(Build.ArtifactStagingDirectory)/Infrastructure'
        Contents: '.terraform'

    - task: PublishBuildArtifacts@1
      displayName: Publish artifacts
      inputs:
        pathToPublish: $(Build.ArtifactStagingDirectory)/Infrastructure
        artifactName: Infrastructure
        artifactType: container

        
  - phase: Build
    displayName: Project Build And Publish
    queue: 
      name: 'Gruppe 5 - Digital tilgangskort'
      workspace:
        clean: outputs
    variables:
      BuildPlatform: 'any cpu'
      BuildConfiguration: '$(ConfigBuild)'
      IsPrerelease: True
    steps: 
    - task: NodeTool@0
      inputs:
        versionSpec: '10.x'
      displayName: 'Install Node.js'


    - task: Npm@1
      inputs:
        command: 'install'
        workingDir: 'admin-ui'

    - task: Npm@1
      inputs:
        command: 'custom'
        workingDir: 'admin-ui'
        customCommand: 'run build'

    - task: CopyFiles@2
      displayName: Copy artifacts
      inputs:
        SourceFolder: admin-ui/dist
        contents: |
          **
          !.vsts-ci.yml
          !**/.git/**
          !**/.terraform/**
        targetFolder: $(Build.ArtifactStagingDirectory)/admin-ui/dist   
    - task: PublishBuildArtifacts@1
      inputs:
        PathtoPublish: '$(Build.ArtifactStagingDirectory)/gruppe-5/admin-ui'
        ArtifactName: 'gruppe-5-digital-tilgangskort'
        publishLocation: 'Container'

    - task: Npm@1
      inputs:
        command: 'custom'
        workingDir: 'admin-ui'
        customCommand: 'run prod:serve'

