#!/bin/zsh

# Set your ImgCDN base URL here
IMGCDN_BASE_URL="https://example.imgix.net/"

# Get the image filename from the first argument
filename="$1"

# Get optional width, height, and fit parameters
width="$2"
height="$3"
fit="$4"

# Construct the ImgCDN URL
url="${IMGCDN_BASE_URL}${filename}"

# Add query parameters if they exist
if [[ -n "$width" || -n "$height" || -n "$fit" ]]; then
  url="${url}?"
  if [[ -n "$width" ]]; then
    url="${url}w=${width}&"
  fi
  if [[ -n "$height" ]]; then
    url="${url}h=${height}&"
  fi
  if [[ -n "$fit" ]]; then
    url="${url}fit=${fit}&"
  fi
  # Remove the trailing ampersand if it exists
  url="${url%&}"
fi

# Print the ImgCDN URL
echo "${url}"
