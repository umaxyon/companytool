#!/bin/bash

# 本番環境用 Docker build & Push
REMOTE_REGISTORY_HOST="$1"
IMAGE_NAME="$2"
VERSION="$3"
ENV="$4"

# scriptsディレクトリに移動
cd `dirname $0`
# projectディレクトリに移動
cd ../../

# echo $PWD

# TAGでECRリポジトリのバージョンを管理する場合は以下を変更
TAG="v$VERSION"
LATEST_TAG="latest"

DOCKER_IMAGE_NAME="$IMAGE_NAME"

echo -e "\n\n********************************"
echo " Environment:" ${ENV}
echo -e "********************************\n\n"

# ソースビルド
yarn

if [ ${ENV} = "development_mock" ]; then
    yarn buildmock
else
    yarn build
fi

# ローカルのdockerレジストリにdockerイメージを作成
docker image build --no-cache=true  -t $DOCKER_IMAGE_NAME:$TAG -f docker/Dockerfile .

# docker imageの中で不要となった<none>イメージをすべて削除する
docker image prune -f

# docker images表示
docker images | grep $DOCKER_IMAGE_NAME

# aws cliで、実行可能なdocker loginコマンドを取得する
DOCKER_LOGIN_COMMAND=`aws ecr get-login --no-include-email --region ap-northeast-1`
echo "default aws ecr login"

echo "Execute: $DOCKER_LOGIN_COMMAND"

# ecrにdocker login
echo `$DOCKER_LOGIN_COMMAND`
echo

SOURCE="${DOCKER_IMAGE_NAME}"
TARGET="${REMOTE_REGISTORY_HOST}/${DOCKER_IMAGE_NAME}"

echo "push tag = $TAG"
docker tag $SOURCE:$TAG $TARGET:$TAG
docker tag $SOURCE:$TAG $TARGET:$LATEST_TAG
docker push $TARGET:$TAG
docker push $TARGET:$LATEST_TAG