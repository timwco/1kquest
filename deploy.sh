#!/bin/bash

echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"

# Deploy to GH Pages
git subtree push --prefix app origin gh-pages

echo -e "\033[0;32mDone. Thank You, Please Come Again\033[0m"