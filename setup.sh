#!/bin/bash

set -e

# Create a resource group
RESOURCE_GROUP=k8sRG
LOCATION=westus

DNS_PREFIX=greatapp
CLUSTER_NAME=greatapp
AGENT_COUNT=1
AGENT_VM_SIZE=Standard_D2_v2
MASTER_COUNT=1
MASTER_VM_SIZE=Standard_D2_v2

CR_RESOURCE_GROUP=CR_RG
CR_NAME=greatappCR

DB_RG=dbRG
DB_ADMIN_PASSWORD=Password@1


while [[ $# -gt 1 ]]
do
key="$1"

case $key in
    --master-count)
    MASTER_COUNT="$2"
    shift # past argument
    ;;
    --agent-count)
    AGENT_COUNT="$2"
    shift # past argument
    ;;
    --location)
    LOCATION="$2"
    shift # past argument
    ;;
    --db-admin-password)
    DB_ADMIN_PASSWORD="$2"
    ;;
    *)
            # unknown option
    ;;
esac
shift # past argument or value
done

# Check for mysql installed
type mysql >/dev/null 2>&1 || { echo >&2 "I require mysql client locally to init db but it's not installed. Aborting. "; exit 1; }

# Create k8s cluster
echo "Creating rg for k8s"
az group create \
--name=$RESOURCE_GROUP \
--location=$LOCATION

echo "Creating k8s cluster"
az acs create \
--orchestrator-type=kubernetes \
--resource-group=$RESOURCE_GROUP \
--name=$CLUSTER_NAME \
--dns-prefix=$DNS_PREFIX \
--ssh-key-value ~/.ssh/id_rsa.pub \
--master-count=$MASTER_COUNT \
--master-vm-size=$MASTER_VM_SIZE \
--agent-count=$AGENT_COUNT \
--agent-vm-size=$AGENT_VM_SIZE

# Install kubectl if not exists
type kubectl >/dev/null 2>&1 || { echo "installing kubectl"; az acs kubernetes install-cli; }

# Get credentials for kubectl
echo "Sleeing for 2 mins"
sleep 120s
echo "Getting credentials for kubectl"
az acs kubernetes get-credentials \
--resource-group=$RESOURCE_GROUP \
--name=$CLUSTER_NAME

# Create azure container registry
echo "Creating rg for azure container registry"
az group create \
--name=$CR_RESOURCE_GROUP \
--location=$LOCATION

echo "Creating azure container registry"
az acr create \
--name=$CR_NAME \
--resource-group=$CR_RESOURCE_GROUP \
--sku=Basic \
--admin-enabled=true

# Get CR password
echo "Getting acr password"
CR_PASSWORD=$(az acr credential show --name=$CR_NAME --query passwords[0].value | sed "s/\"//g")

echo "Logging to acr"
docker login greatappcr.azurecr.io -u greatappCR -p $CR_PASSWORD

kubectl delete secret regsecret >/dev/null 2>&1 || true

echo "Creating k8s secret for accesing registry"
kubectl create secret docker-registry regsecret \
--docker-server 'greatapprc.azurecr.io' \
--docker-username 'greatapprc' \
--docker-email 'example@example.com' \
--docker-password $CR_PASSWORD

# Create RG for db
echo "Creating rg for db"
az group create \
--name=$DB_RG \
--location=$LOCATION

echo "Creating db"
az mysql server create \
--resource-group=$DB_RG \
--name=greatappdb \
--location=$LOCATION \
--admin-user=greatappadmin \
--admin-password=$DB_ADMIN_PASSWORD \
--performance-tier=Basic \
--compute-units=50 \
--ssl-enforcement=Disabled

echo "Creating firewall rule for db"
az mysql server firewall-rule create \
--resource-group=$DB_RG \
--server=greatappdb \
--name=AllowYourIP \
--start-ip-address=0.0.0.0 \
--end-ip-address=255.255.255.255

echo "Initializing db"
mysql -u greatappadmin@greatappdb -h greatappdb.mysql.database.azure.com -P 3306 -p $DB_ADMIN_PASSWORD < init_db.sql
