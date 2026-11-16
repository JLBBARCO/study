#!/usr/bin/env bash

# Install required tools on Linux using apt (or other package manager)
# This script assumes you have sudo privileges.

# Update package list
sudo apt-get update

# Install Python, Java, Node.js, build-essential (C/C++ compiler)
sudo apt-get install -y python3 python3-pip openjdk-21-jdk nodejs npm build-essential

# Ensure pip is up to date
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install --upgrade pip

# Install Python requirements
python3 -m pip install -r requirements.txt

# Install Node.js dependencies
npm install

echo "All dependencies installed successfully."
