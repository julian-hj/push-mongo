set -ex

DATA_DIR=`echo $VCAP_SERVICES | jq -r '.[][].volume_mounts[0].container_dir // empty' 2>/dev/null | head -n 1`

if [ -z "$DATA_DIR" ]; then
  DATA_DIR=$HOME/data
fi

mkdir -p $DATA_DIR/mongo/data/db
mkdir -p $DATA_DIR/mongo/log

if [ -z "$PORT" ]; then
  PORT=8080
fi

export MONGO_PORT=$PORT
APPLICATION_ID=`echo $VCAP_APPLICATION | jq -r '.application_id'`
export MONGO_SIDECAR_POD_LABELS="guid=$APPLICATION_ID"
export KUBE_NAMESPACE=cf-workloads

./bin/socat TCP4-LISTEN:$PORT,fork TCP4:localhost:27017 &
npm start &
./bin/mongod --dbpath $DATA_DIR/mongo/data/db --logpath $DATA_DIR/mongo/log/mongodb.log --replSet eiriniy
