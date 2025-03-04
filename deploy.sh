yarn nocobase clean
yarn rimraf -rf node_modules

yarn install
yarn nocobase upgrade

yarn build
