#!/bin/bash
# Refer https://viblo.asia/p/lam-the-nao-de-tu-dong-deploy-mot-ung-dung-vuereactangular-len-server-Az45bW2LKxY
GREEN='\033[0;32m'
NC='\033[0m'
echo "${GREEN}============ Starting deployment ============${NC}"
SSH_USERNAME="levu2207" # Replace your deploy account here
SSH_HOST="vndev.hanbiro.com" # Replace your server IP here
SSH_PORT=22

DEPLOY_FILE="build-`date +'%Y-%m-%d-%H%M%S'`.zip"
DEPLOY_SOURCE_LOCAL="./tmp/${DEPLOY_FILE}"
DEPLOY_SOURCE="/home/levu2207"
DEPLOY_PATH="/home/HanbiroMailcore/docs/groupware-v3/"

# -- Login to server via ssh --
npm run build
mkdir -p tmp
cd ./build && zip -r .${DEPLOY_SOURCE_LOCAL} . && cd .. # Build source
echo "${GREEN}============ Uploading ============${NC}"
scp -P ${SSH_PORT} ${DEPLOY_SOURCE_LOCAL} ${SSH_USERNAME}@${SSH_HOST}:${DEPLOY_SOURCE} # Upload source
echo "${GREEN}============ Done Upload ============${NC}"
ssh ${SSH_USERNAME}@${SSH_HOST} -o port=${SSH_PORT} "
  echo 'Accessed server remote ${SSH_HOST} & process deployment';
  unzip -o ${DEPLOY_SOURCE}/${DEPLOY_FILE} -d ${DEPLOY_PATH}
";
END=`date +%s`
RUNTIME=$((end - start))
rm -rf ./tmp # Reset source
rm -rf ./build # Reset build
echo "\n${GREEN}✔ 🎉  Deployed successfully.${NC}\n"

