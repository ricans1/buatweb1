#!/bin/bash

if ! command -v yarn &> /dev/null; then
    echo "Installing yarn..."
    corepack enable
    corepack prepare yarn@stable --activate --yes
else
    echo "Yarn is already installed."
fi

# Jalankan yarn
echo "Running yarn..."
yarn
echo "Script completed successfully."

