#!/bin/bash

export UNIX_SYSTEM_NAME=`uname -s`
export NUMBER_OF_CPU_CORES=1
if [ "$UNIX_SYSTEM_NAME" = "Linux" ];
then
	export NUMBER_OF_CPU_CORES=`grep -c ^processor /proc/cpuinfo`
	export READLINK=readlink
	export SO_EXT=so
fi
if [ "$UNIX_SYSTEM_NAME" = "Darwin" ];
then
	#export NUMBER_OF_CPU_CORES=`system_profiler | awk '/Number Of CPUs/{print $4}{next;}'`
	export NUMBER_OF_CPU_CORES=`sysctl -n hw.ncpu`
	# required -> brew install coreutils
	export READLINK=/usr/local/bin/greadlink
	export SO_EXT=dylib
fi

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

export BTRFS_FILE_PATH=${BTRFS_FILE_PATH:-$SCRIPT_DIR/btrfs.file}
export BTRFS_DIR_PATH=$SCRIPT_DIR/node/data_dir #${BTRFS_DIR_PATH:$SCRIPT_DIR/node/data_dir}
export BTRFS_DIR_PATH_FINAL=$BTRFS_DIR_PATH/data

export BTRFS_FILE_PATH=$($READLINK -f $BTRFS_FILE_PATH)
#export BTRFS_DIR_PATH=$($READLINK -f $BTRFS_DIR_PATH)
#export BTRFS_DIR_PATH_FINAL=$($READLINK -f $BTRFS_DIR_PATH_FINAL)

echo SCRIPT_DIR ............... $SCRIPT_DIR
echo USER ..................... $USER
echo BTRFS_FILE_PATH .......... $BTRFS_FILE_PATH
echo BTRFS_DIR_PATH_FINAL ..... $BTRFS_DIR_PATH
echo ">>> Unmounting previous BTRFS entry point $BTRFS_DIR_PATH, if any..."
sudo umount $BTRFS_DIR_PATH || true
echo ">>> Removing file $BTRFS_FILE_PATH, if any..."
sudo rm -f $BTRFS_FILE_PATH || true
echo ">>> Removing folder $BTRFS_DIR_PATH, if any..."
sudo rm -rf $BTRFS_DIR_PATH || true

echo ">>> Done, BTRFS cleanup finished."
