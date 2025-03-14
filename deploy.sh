export NODE_OPTIONS=--max-old-space-size=8192

yarn nocobase clean
yarn rimraf -rf node_modules

yarn install
yarn nocobase upgrade


yarn build
