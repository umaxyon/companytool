#!/bin/bash

# テスト環境用 Docker build & Push
REMOTE_REGISTORY_HOST="223903366495.dkr.ecr.ap-northeast-1.amazonaws.com"
IMAGE_NAME="companytool/development/front"
VERSION="0.0.1"
ENV="development_mock"

cd `dirname $0`
./Docker_BuildAndPush.sh $REMOTE_REGISTORY_HOST $IMAGE_NAME $VERSION $ENV
