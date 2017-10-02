#!/bin/bash

set -e

# Update secrets
kubectl delete secret greatapp-secters >/dev/null 2>&1 || true
kubectl create secret generic greatapp-secters --from-file=secrets/jdbcdialect --from-file=secrets/jdbcpass --from-file=secrets/jdbcurl --from-file=secrets/jdbcuser || true

# Create app if not exists
kubectl create -f k8s/greatapp-service.yml || true 
kubectl create -f k8s/greatapp-deployment.yml || true
