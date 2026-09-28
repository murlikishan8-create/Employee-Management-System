#!/bin/bash

set -e


docker run --rm -v //var/run/docker.sock:/var/run/docker.sock aquasec/trivy:latest image --exit-code 1 --severity CRITICAL $1
