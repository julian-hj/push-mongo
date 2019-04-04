set -ex

DATA_DIR=`echo $VCAP_SERVICES | jq '.[][].volume_mounts[0].container_dir // empty' 2>/dev/null | head -n 1`

if [ -z "$DATA_DIR" ]; then
  DATA_DIR=$HOME/data
fi

mkdir -p $DATA_DIR/mongodb/data/db
mkdir -p $DATA_DIR/mongodb/log

if [ -z "$PORT" ]; then
  PORT=8080
fi

./bin/mongod --dbpath $DATA_DIR/mongodb/data/db --logpath $DATA_DIR/mongodb/log/mongodb.log --fork

./bin/socat TCP4-LISTEN:$PORT,fork TCP4:localhost:27017
