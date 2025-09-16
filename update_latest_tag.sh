#!/bin/bash

# Usage: ./update_to_new_tag.sh <OLD_TAG>  (or set OLD_TAG env var)

./fetch_latest_tag.sh

OLD_TAG=${1:-$OLD_TAG}
if [ -z "$OLD_TAG" ]; then
  echo "Error: Provide OLD_TAG as argument or env var."
  exit 1
fi

git checkout erpspace
git rebase --onto $NEW_TAG $OLD_TAG erpspace

echo "Rebase complete. Test, then push. Update OLD_TAG to $NEW_TAG."