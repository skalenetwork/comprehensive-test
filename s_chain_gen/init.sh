#!/bin/bash

yarn install

# colors/basic
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

echo -e "${COLOR_INFO}Killing everything what is still moving...${COLOR_RESET}"
/bin/bash "./kill.sh"
echo -e "${COLOR_INFO}Cleaning directories...${COLOR_RESET}"
/bin/bash "./clean.sh"
echo -e "${COLOR_INFO}Initializing infrastructure...${COLOR_RESET}"
yarn install
# arguments of init.js are:
# 1) count of S-chains, can be specified with GEN_CNT_CHAINS environment variable
# 2) count of nodes per S-chain, can be specified with GEN_CNT_NODES environment variable
# 3) count of sync-nodes per S-chain, can be specified with GEN_CNT_SYNC_NODES environment variable
node ./init.js 2 2 1
echo -e "${COLOR_SUCCESS}Done, infrastructure initialized${COLOR_RESET}"

############################################################################################################################
############################################################################################################################
############################################################################################################################

cd $WORKING_DIR_OLD
exit 0
