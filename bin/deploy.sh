#! /bin/bash
set -e

export INGRESS_INTERNAL_ANNOTATIONS=$HOF_CONFIG/ingress-internal-annotations.yaml
export INGRESS_EXTERNAL_ANNOTATIONS=$HOF_CONFIG/ingress-external-annotations.yaml
export CONFIGMAP_VALUES=$HOF_CONFIG/configmap-values.yaml
export NGINX_SETTINGS=$HOF_CONFIG/nginx-settings.yaml
export FILEVAULT_NGINX_SETTINGS=$HOF_CONFIG/filevault-nginx-settings.yaml
export FILEVAULT_INGRESS_EXTERNAL_ANNOTATIONS=$HOF_CONFIG/filevault-ingress-external-annotations.yaml

kd='kd --insecure-skip-tls-verify --timeout 10m --check-interval 10s'

REDIS_PERSISTENCE_ENABLED=${REDIS_PERSISTENCE_ENABLED:-false}
REDIS_PERSISTENCE_ACCESS_MODES=${REDIS_PERSISTENCE_ACCESS_MODES:-ReadWriteOnce}
REDIS_PERSISTENCE_STORAGE_CLASS=${REDIS_PERSISTENCE_STORAGE_CLASS:-}
REDIS_PERSISTENCE_EXISTING_CLAIM=${REDIS_PERSISTENCE_EXISTING_CLAIM:-}
REDIS_PERSISTENCE_ENABLED=$(echo "$REDIS_PERSISTENCE_ENABLED" | tr '[:upper:]' '[:lower:]')

deploy_redis() {
  if [[ "$REDIS_PERSISTENCE_ENABLED" == "true" && -z "$REDIS_PERSISTENCE_EXISTING_CLAIM" ]]; then
    $kd -f kube/redis/redis-pvc.yml
  fi

  $kd -f kube/redis/redis-config.yml \
    -f kube/redis/redis-service.yml \
    -f kube/redis/redis-network-policy.yml \
    -f kube/redis/redis-deployment.yml
}

delete_redis() {
  if [[ "$REDIS_PERSISTENCE_ENABLED" == "true" && -z "$REDIS_PERSISTENCE_EXISTING_CLAIM" ]]; then
    $kd --delete -f kube/redis/redis-pvc.yml
  fi

  $kd --delete -f kube/redis/redis-config.yml \
    -f kube/redis/redis-service.yml \
    -f kube/redis/redis-network-policy.yml \
    -f kube/redis/redis-deployment.yml
}

if [[ $1 == 'tear_down' ]]; then
  export KUBE_NAMESPACE=$BRANCH_ENV
  export DRONE_SOURCE_BRANCH=$(cat /root/.dockersock/branch_name.txt)
  REDIS_PERSISTENCE_ENABLED=${REDIS_PERSISTENCE_ENABLED:-false}
  REDIS_PERSISTENCE_ENABLED=$(echo "$REDIS_PERSISTENCE_ENABLED" | tr '[:upper:]' '[:lower:]')
  export REDIS_PERSISTENCE_ENABLED

  $kd --delete -f kube/configmaps/configmap.yml
  delete_redis
  $kd --delete -f kube/app -f kube/file-vault -f kube/html-pdf
  echo "Torn Down Branch - $APP_NAME-$DRONE_SOURCE_BRANCH.internal.branch.sas-notprod.homeoffice.gov.uk"
  exit 0
fi

export KUBE_NAMESPACE=$1
export DRONE_SOURCE_BRANCH=$(echo $DRONE_SOURCE_BRANCH | tr '[:upper:]' '[:lower:]' | tr '/' '-')

if [[ ${KUBE_NAMESPACE} == ${PROD_ENV} ]]; then
  REDIS_PERSISTENCE_ENABLED=true
  REDIS_PERSISTENCE_SIZE=10Gi
elif [[ ${KUBE_NAMESPACE} == ${STG_ENV} || ${KUBE_NAMESPACE} == ${BRANCH_ENV} ]]; then
  REDIS_PERSISTENCE_ENABLED=false
else
  REDIS_PERSISTENCE_ENABLED=false
fi

export REDIS_PERSISTENCE_ENABLED
export REDIS_PERSISTENCE_SIZE
export REDIS_PERSISTENCE_ACCESS_MODES
export REDIS_PERSISTENCE_STORAGE_CLASS
export REDIS_PERSISTENCE_EXISTING_CLAIM

if [[ ${KUBE_NAMESPACE} == ${BRANCH_ENV} ]]; then
  $kd -f kube/file-vault/file-vault-ingress.yml
  $kd -f kube/configmaps -f kube/certs
  deploy_redis
  $kd -f kube/file-vault -f kube/html-pdf -f kube/app 
elif [[ ${KUBE_NAMESPACE} == ${UAT_ENV} ]]; then
  $kd -f kube/file-vault/file-vault-ingress.yml
  $kd -f kube/configmaps/configmap.yml
  deploy_redis
  $kd -f kube/file-vault -f kube/html-pdf -f kube/app 
elif [[ ${KUBE_NAMESPACE} == ${STG_ENV} ]]; then
  $kd -f kube/file-vault/file-vault-ingress.yml -f kube/html-pdf
  $kd -f kube/configmaps/configmap.yml -f kube/app/service.yml
  $kd -f kube/app/networkpolicy-internal.yml -f kube/app/ingress-internal.yml
  $kd -f kube/app/networkpolicy-external.yml -f kube/app/ingress-external.yml
  deploy_redis
  $kd -f kube/file-vault -f kube/app/deployment.yml
elif [[ ${KUBE_NAMESPACE} == ${PROD_ENV} ]]; then
  $kd -f kube/configmaps/configmap.yml -f kube/app/service.yml
  $kd -f kube/file-vault/file-vault-ingress.yml -f kube/html-pdf
  $kd -f kube/app/networkpolicy-external.yml -f kube/app/ingress-external.yml
  deploy_redis
  $kd -f kube/file-vault -f kube/app/deployment.yml
fi

sleep $READY_FOR_TEST_DELAY

if [[ ${KUBE_NAMESPACE} == ${BRANCH_ENV} ]]; then
  BRANCH_HOST="$APP_NAME-$DRONE_SOURCE_BRANCH.internal.branch.sas-notprod.homeoffice.gov.uk"
  echo "Branch - ${BRANCH_HOST}"
  if [[ -d /root/.dockersock ]]; then
    printf "%s" "${BRANCH_HOST}" > /root/.dockersock/branch_url.txt
    chmod 600 /root/.dockersock/branch_url.txt
    echo "Saved branch URL to /root/.dockersock/branch_url.txt"
  fi
fi
