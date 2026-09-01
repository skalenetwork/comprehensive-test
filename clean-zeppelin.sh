#!/bin/bash
IMA_CONTRACTS_DIR="${IMA_AGENT_ROOT_DIR:+$IMA_AGENT_ROOT_DIR/IMA}"
IMA_CONTRACTS_DIR="${IMA_CONTRACTS_DIR:-IMA}"
if [[ -d "$IMA_CONTRACTS_DIR/proxy/migrations" ]]; then
    IMA_CONTRACTS_DIR="$IMA_CONTRACTS_DIR/proxy"
fi
declare -a ARRDIRS2CLEAN=( "$IMA_CONTRACTS_DIR/.openzeppelin" "skale-manager/.openzeppelin" )
DIR2RESTORE=$(pwd)
for DIR2CLEAN in "${ARRDIRS2CLEAN[@]}"
do
    echo "Cleaning ${DIR2CLEAN}"
    cd $DIR2CLEAN;
    #ls -1la
    rm -rf *dev*.json *main*.json *roxy*.json unknown*.json .session
    ls -1la
    cd $DIR2RESTORE
    echo "Done"
    #echo " "
done
