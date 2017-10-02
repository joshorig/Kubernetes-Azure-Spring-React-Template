#!/bin/bash

set -e

# Build docker image image
docker build -t greatappcr.azurecr.io/greatapp:0.1.0 -f Dockerfile.k8s .

# Push docker image to registry
docker push greatappcr.azurecr.io/greatapp:0.1.0