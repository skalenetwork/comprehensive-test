#!/bin/bash

# colors/basic
if [ "${NO_ANSI_COLORS}" = "1" ]; then
	COLOR_RESET="" # No Color
	COLOR_BLACK=""
	COLOR_DARK_GRAY=""
	COLOR_BLUE=""
	COLOR_LIGHT_BLUE=""
	COLOR_GREEN=""
	COLOR_LIGHT_GREEN=""
	COLOR_CYAN=""
	COLOR_LIGHT_CYAN=""
	COLOR_RED=""
	COLOR_LIGHT_RED=""
	COLOR_MAGENTA=""
	COLOR_LIGHT_MAGENTA=""
	COLOR_BROWN=""
	COLOR_YELLOW=""
	COLOR_LIGHT_GRAY=""
	COLOR_WHITE=""
else
	COLOR_RESET='\033[0m' # No Color
	COLOR_BLACK='\033[0;30m'
	COLOR_DARK_GRAY='\033[1;30m'
	COLOR_BLUE='\033[0;34m'
	COLOR_LIGHT_BLUE='\033[1;34m'
	COLOR_GREEN='\033[0;32m'
	COLOR_LIGHT_GREEN='\033[1;32m'
	COLOR_CYAN='\033[0;36m'
	COLOR_LIGHT_CYAN='\033[1;36m'
	COLOR_RED='\033[0;31m'
	COLOR_LIGHT_RED='\033[1;31m'
	COLOR_MAGENTA='\033[0;35m'
	COLOR_LIGHT_MAGENTA='\033[1;35m'
	COLOR_BROWN='\033[0;33m'
	COLOR_YELLOW='\033[1;33m'
	COLOR_LIGHT_GRAY='\033[0;37m'
	COLOR_WHITE='\033[1;37m'
fi
# colors/variables
COLOR_ERROR="${COLOR_RED}"
COLOR_WARN="${COLOR_YELLOW}"
COLOR_ATTENTION="${COLOR_LIGHT_CYAN}"
COLOR_SUCCESS="${COLOR_GREEN}"
COLOR_INFO="${COLOR_BLUE}"
COLOR_NOTICE="${COLOR_MAGENTA}"
COLOR_DEBUG="${COLOR_DARK_GRAY}"
COLOR_DOTS="${COLOR_DARK_GRAY}"
COLOR_SEPARATOR="${COLOR_LIGHT_MAGENTA}"
COLOR_VAR_NAME="${COLOR_BLUE}"
COLOR_VAR_DESC="${COLOR_BROWN}"
COLOR_VAR_VAL="${COLOR_LIGHT_GRAY}"
COLOR_PROJECT_NAME="${COLOR_LIGHT_BLUE}"

# detect system name and number of CPU cores
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

# detect working directories, change if needed
WORKING_DIR_OLD=`pwd`
WORKING_DIR_NEW="$(dirname "$0")"
WORKING_DIR_OLD=`$READLINK -f $WORKING_DIR_OLD`
WORKING_DIR_NEW=`$READLINK -f $WORKING_DIR_NEW`
cd $WORKING_DIR_NEW

echo -e "${COLOR_VAR_NAME}WORKING_DIR_OLD${COLOR_DOTS}........${COLOR_VAR_DESC}Started in directory${COLOR_DOTS}...................${COLOR_VAR_VAL}$WORKING_DIR_OLD${COLOR_RESET}"
echo -e "${COLOR_VAR_NAME}WORKING_DIR_NEW${COLOR_DOTS}........${COLOR_VAR_DESC}Switched to directory${COLOR_DOTS}..................${COLOR_VAR_VAL}$WORKING_DIR_NEW${COLOR_RESET}"
echo -e "${COLOR_VAR_NAME}UNIX_SYSTEM_NAME${COLOR_DOTS}.......${COLOR_VAR_DESC}Running on host${COLOR_DOTS}........................${COLOR_VAR_VAL}$UNIX_SYSTEM_NAME${COLOR_RESET}"
echo -e "${COLOR_VAR_NAME}NUMBER_OF_CPU_CORES${COLOR_DOTS}....${COLOR_VAR_DESC}Running on host having CPU cores${COLOR_DOTS}.......${COLOR_VAR_VAL}$NUMBER_OF_CPU_CORES${COLOR_RESET}"

############################################################################################################################
############################################################################################################################
############################################################################################################################

#/bin/bash "./kill.sh"
echo -e "${COLOR_INFO}Cleaning directories...${COLOR_RESET}"
rm -f    ./performa*.log        &> /dev/null
rm -rf   ./ipcx                 &> /dev/null
mkdir -p ./ipcx                 &> /dev/null
touch ./ipcx/geth.ipc           &> /dev/null
rm -rf   ./node                 &> /dev/null
mkdir -p ./node                 &> /dev/null
mkdir -p ./node/data_dir        &> /dev/null
if [ $SKALED_WITH_BTRFS ]; then
	mkdir -p ./node/data_dir        &> /dev/null
else
	mkdir -p ./node/data_dir/data   &> /dev/null
fi
rm -rf   ./log                  &> /dev/null
mkdir -p ./log                  &> /dev/null
echo -e "${COLOR_INFO}Cleaning web3 personal home...${COLOR_RESET}"
rm -rf ~/.web3/keys/*           &> /dev/null
echo -e "${COLOR_INFO}Touching empty logs...${COLOR_RESET}"
touch ./log/aleth.out           &> /dev/null
touch ./log/aleth.err           &> /dev/null
touch ./log/proxy.out           &> /dev/null
touch ./log/proxy.err           &> /dev/null
echo -e "${COLOR_SUCCESS}Done, cleanup finished${COLOR_RESET}"

############################################################################################################################
############################################################################################################################
############################################################################################################################

if [ $SKALED_WITH_BTRFS ]; then
	./btrfs-clean.sh || true
else
	echo "Non-BTRFS mode, skipped BTRFS cleaunup."
fi

cd $WORKING_DIR_OLD
exit 0
