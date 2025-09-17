#!/bin/bash

git fetch upstream --tags

LATEST_TAG=$(git tag -l 'v*' | grep -vE '(alpha|beta|rc)' | sort -V | tail -n 1)

echo "Latest stable tag: $LATEST_TAG"

export NEW_TAG=$LATEST_TAG