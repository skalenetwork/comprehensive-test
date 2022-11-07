#!/bin/bash
export BTRFS_FILE_PATH=${BTRFS_FILE_PATH:-./btrfs.file}
export BTRFS_DIR_PATH=${BTRFS_DIR_PATH:-./node/data_dir}
export BTRFS_DIR_PATH_FINAL=$BTRFS_DIR_PATH/data
if [ $USER ]; then
	echo "Have USER environment variable set initially outside"
else
	echo "Will compute USER environment variable via whoami"
    export USER=$(whoami)
fi
echo USER ..................... $USER
echo BTRFS_FILE_PATH .......... $BTRFS_FILE_PATH
echo BTRFS_DIR_PATH_FINAL ..... $BTRFS_DIR_PATH
echo ">>> Unmounting previous BTRFS entry point $BTRFS_DIR_PATH, if any..."
sudo umount $BTRFS_DIR_PATH || true
echo ">>> Removing file $BTRFS_FILE_PATH, if any..."
sudo rm -f $BTRFS_FILE_PATH || true
echo ">>> Removing folder $BTRFS_DIR_PATH, if any..."
sudo rm -rf $BTRFS_DIR_PATH || true

echo ">>> Creating $BTRFS_DIR_PATH, if not yet..."
mkdir -p $BTRFS_DIR_PATH || true
echo ">>> dd..."
dd if=/dev/zero of=$BTRFS_FILE_PATH bs=1M count=300
echo ">>> Making BTRFS file $BTRFS_FILE_PATH..."
mkfs.btrfs $BTRFS_FILE_PATH
echo ">>> Mounting it..."
sudo mount -o user_subvol_rm_allowed $BTRFS_FILE_PATH $BTRFS_DIR_PATH
echo ">>> chown it..."
sudo chown 1000:1001 $BTRFS_DIR_PATH
echo ">>> chown it to $USER recursively..."
sudo chown -R $USER $BTRFS_DIR_PATH
echo ">>> Creating $BTRFS_DIR_PATH_FINAL, if not yet..."
mkdir -p $BTRFS_DIR_PATH_FINAL

echo ">>> Done, BTRFS creation finished."
