# Tutorial: Creating an Azure Blob Resizer (CLI)

This guide provides a step-by-step tutorial on setting up and deploying an Azure Blob Resizer using the Azure CLI.

## Prerequisites

Before starting, make sure you have the following installed:

1. **Azure CLI**: Follow the installation instructions [here](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=linux%2Cisolated-process%2Cnode-v4%2Cpython-v2%2Chttp-trigger%2Ccontainer-apps&pivots=programming-language-javascript).
2. Note: The above tutorial is not working for Ubuntu 22.04, please use this [tutorial](https://github.com/Azure/azure-functions-core-tools/issues/3037#issuecomment-1158348373)

## Steps

### Step 1: Initialize a New Project

Run the following command to initialize a new project:

```bash
func init MyProjFolder --worker-runtime javascript --model V4
```

### Step 2: Create a Function

Create a function using the "Azure Blob Storage Trigger" template:

```bash
func new --template "Azure Blob Storage Trigger" --name MyBlobTrigger
```

### Step 3: Set Up Dependencies

Copy the necessary code from `src` and install the dependencies listed in `package.json`:

```bash
cd MyProjFolder
npm install
```

### Step 4: Configure Storage Account

1. **Create a storage account** and a container named "resizebucket".
2. Obtain the connection string from the storage account.

### Step 5: Update Local Settings

Add the storage connection string to `local.settings.json` under the `"AzureWebJobsStorage"` key:

```json
{
  "AzureWebJobsStorage": "your-connection-string-here"
}
```

### Step 6: Test the Functionality

Run the function locally to test if everything is set up correctly:

```bash
func start
```

Upload a JPEG file into the `/input` folder and verify that it appears in the `output/{name}` directory.

### Step 7: Deploy the Function App

1. Create a storage accoun for a function:

```
az storage account create -n <storageaccountname> --location germanywestcentral --resource-group <resourcegroupname> --sku Standard_LRS
```

2. Create a function app

```
az functionapp create --consumption-plan-location germanywestcentral --name <yourfunctionname> --os-type Linux --resource-group <yourresourcegroupname> --runtime node --runtime-version 20 --storage-account <storageaccountname>
```

3. Publish your function

```bash
func azure functionapp publish <functionappnamee> --publish-local-settings
```

You can find more examples [here](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local)
