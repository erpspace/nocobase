export NODE_OPTIONS=--max-old-space-size=8192

git stash

yarn install
yarn nocobase clean

yarn rimraf -rf node_modules

yarn install

yarn rimraf -rf packages/*/*/{lib,esm,es,dist,node_modules}
yarn rimraf -rf packages/*/@*/*/{lib,esm,es,dist,node_modules}

yarn nocobase upgrade


yarn build