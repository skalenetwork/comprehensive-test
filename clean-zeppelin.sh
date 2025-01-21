#!/bin/bash
declare -a ARRDIRS2CLEAN=( "IMA/proxy/.openzeppelin" "skale-manager/.openzeppelin" )
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
