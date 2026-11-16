#!/usr/bin/env bash

# Install required tools on macOS using Homebrew.
# This script assumes Homebrew is installed. If not, install it from https://brew.sh

# Update Homebrew
brew update

# Install Python, Java, Node.js, and build tools (gcc)
brew install python openjdk node
# For C/C++ compiler, Xcode command line tools are needed
xcode-select --install || true

# Ensure pip is up to date
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install --upgrade pip

# Install Python requirements
python3 -m pip install -r requirements.txt

# Install Node.js dependencies
npm install

echo "All dependencies installed successfully."
