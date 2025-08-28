#!/bin/zsh

# Set your Alpaca CDN base URL here
ALPACA_CDN_BASE_URL="https://your-alpaca-cdn-domain.com/"

# Get the image filename from the first argument
filename="$1"

# Construct the Alpaca CDN URL
url="${ALPACA_CDN_BASE_URL}${filename}"

# Print the Alpaca CDN URL
echo "${url}"
