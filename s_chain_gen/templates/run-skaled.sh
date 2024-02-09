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
export UNIX_SYSTEM_NAME=$(uname -s)
export NUMBER_OF_CPU_CORES=1
if [ "${UNIX_SYSTEM_NAME}" = "Linux" ];
then
	export NUMBER_OF_CPU_CORES=$(grep -c ^processor /proc/cpuinfo)
	export READLINK=readlink
	export SO_EXT=so
fi
if [ "$UNIX_SYSTEM_NAME" = "Darwin" ];
then
	export NUMBER_OF_CPU_CORES=$(sysctl -n hw.ncpu)
	# required -> brew install coreutils
	export READLINK=/usr/local/bin/greadlink
	export SO_EXT=dylib
fi

# detect working directories, change if needed
WORKING_DIR_OLD=$(pwd)
WORKING_DIR_NEW="$(dirname "$0")"
WORKING_DIR_OLD=$(${READLINK} -f "${WORKING_DIR_OLD}")
WORKING_DIR_NEW=$(${READLINK} -f "${WORKING_DIR_NEW}")
cd "${WORKING_DIR_NEW}" || exit 251

############################################################################################################################
############################################################################################################################
############################################################################################################################

if [ -z "$SKALED" ];
then
	echo -e "${COLOR_NOTICE}Will try to auto-detect ${COLOR_ATTENTION}skaled${COLOR_NOTICE} executable location${COLOR_RESET}"
	#
	APP_CACHE_DIR=$(realpath "${WORKING_DIR_NEW}"/../../../app_cache)
	echo -e "${COLOR_NOTICE}Trying ${COLOR_ATTENTION}APP_CACHE_DIR${COLOR_NOTICE} =${COLOR_ATTENTION}" ${APP_CACHE_DIR} "${COLOR_RESET}"
	if [[ -z "${APP_CACHE_DIR}" ]];
	then
		echo -e "${COLOR_ERROR}cannot find directory of ${COLOR_ATTENTION}skaled${COLOR_ERROR} C++ project${COLOR_RESET}"
		cd "${WORKING_DIR_OLD}" || exit 249
		exit 252
	fi
	echo -e "${COLOR_SUCCESS}Done${COLOR_RESET}"
	#
	SKALED_DIR=$(realpath "${APP_CACHE_DIR}/bin")
	echo -e "${COLOR_NOTICE}Trying ${COLOR_ATTENTION}SKALED_DIR${COLOR_NOTICE} =${COLOR_ATTENTION}" $SKALED_DIR "${COLOR_RESET}"
	if [ ! -d "${SKALED_DIR}" ];
	then
		cd "${WORKING_DIR_OLD}" || exit 248
		exit 252
	fi
	echo -e "${COLOR_SUCCESS}Done${COLOR_RESET}"
	#
	SKALED="$SKALED_DIR/skaled"
	if ! [ -x "$(command -v ${SKALED})" ];
	then
		echo -e "${COLOR_ERROR}cannot find ${COLOR_WARN}skaled${COLOR_ERROR} executable in ${COLOR_WARN}${SKALED_DIR}${COLOR_RESET}"
		exit 1
	fi
else
	echo -e "${COLOR_NOTICE}Will use externally specified ${COLOR_ATTENTION}SKALED${COLOR_NOTICE} =${COLOR_ATTENTION}" $SKALED "${COLOR_RESET}"
fi

echo -e "${COLOR_VAR_NAME}WORKING_DIR_OLD${COLOR_DOTS}........${COLOR_VAR_DESC}Started in directory${COLOR_DOTS}...................${COLOR_VAR_VAL}$WORKING_DIR_OLD${COLOR_RESET}"
echo -e "${COLOR_VAR_NAME}WORKING_DIR_NEW${COLOR_DOTS}........${COLOR_VAR_DESC}Switched to directory${COLOR_DOTS}..................${COLOR_VAR_VAL}${WORKING_DIR_NEW}${COLOR_RESET}"
echo -e "${COLOR_VAR_NAME}UNIX_SYSTEM_NAME${COLOR_DOTS}.......${COLOR_VAR_DESC}Running on host${COLOR_DOTS}........................${COLOR_VAR_VAL}$UNIX_SYSTEM_NAME${COLOR_RESET}"
echo -e "${COLOR_VAR_NAME}NUMBER_OF_CPU_CORES${COLOR_DOTS}....${COLOR_VAR_DESC}Running on host having CPU cores${COLOR_DOTS}.......${COLOR_VAR_VAL}$NUMBER_OF_CPU_CORES${COLOR_RESET}"
echo -e "${COLOR_VAR_NAME}SKALED_DIR${COLOR_DOTS}.............${COLOR_VAR_DESC}Directory of skaled${COLOR_DOTS}....................${COLOR_VAR_VAL}$SKALED_DIR${COLOR_RESET}"
echo -e "${COLOR_VAR_NAME}SKALED${COLOR_DOTS}.................${COLOR_VAR_DESC}skaled executable${COLOR_DOTS}......................${COLOR_VAR_VAL}$SKALED${COLOR_RESET}"

############################################################################################################################
############################################################################################################################
############################################################################################################################

if [ ! -f ./ipcx/geth.ipc ];
then
	# OSX requires IPC file to exist
	touch ./ipcx/geth.ipc &> /dev/null
fi

###

rm -f ./*.pem || true > /dev/null
openssl req -new -newkey rsa:4096 -days 365 -nodes -x509 -subj "/C=US/ST=Denial/L=Springfield/O=Dis/CN=www.example.com" -keyout key.pem -out cert.pem &> ./ssl_init_log.txt
SSL_OPTS="--ssl-key ./key.pem --ssl-cert ./cert.pem"
echo -e "${COLOR_VAR_NAME}SSL_OPTS${COLOR_DOTS}...............${COLOR_VAR_DESC}SSL options variable${COLOR_DOTS}...................${COLOR_VAR_VAL}$SSL_OPTS${COLOR_RESET}"
echo -e "${COLOR_VAR_NAME}OUTPUT_OPTS${COLOR_DOTS}............${COLOR_VAR_DESC}Output options variable${COLOR_DOTS}................${COLOR_VAR_VAL}$OUTPUT_OPTS${COLOR_RESET}"
echo -e "${COLOR_VAR_NAME}PROXY_PORT${COLOR_DOTS}.............${COLOR_VAR_DESC}HTTP port${COLOR_DOTS}..............................${COLOR_VAR_VAL}%%PROXY_PORT%%${COLOR_RESET}"
echo -e "${COLOR_VAR_NAME}PROXY_PORT_S${COLOR_DOTS}...........${COLOR_VAR_DESC}HTTPS port${COLOR_DOTS}.............................${COLOR_VAR_VAL}%%PROXY_PORT_S%%${COLOR_RESET}"
echo -e "${COLOR_VAR_NAME}PROXY_PORT_WS${COLOR_DOTS}..........${COLOR_VAR_DESC}WS port${COLOR_DOTS}................................${COLOR_VAR_VAL}%%PROXY_PORT_WS%%${COLOR_RESET}"
echo -e "${COLOR_VAR_NAME}PROXY_PORT_WSS${COLOR_DOTS}.........${COLOR_VAR_DESC}WSS port${COLOR_DOTS}...............................${COLOR_VAR_VAL}%%PROXY_PORT_WSS%%${COLOR_RESET}"

OUTPUT_OPTS=""
#OUTPUT_OPTS="1>./log/aleth.out 2>./log/aleth.err"

# normal:
export DATA_DIR=./node/data_dir/data

#note: readlink does not work on btrfs
export DATA_DIR=$($READLINK -f $DATA_DIR)
mkdir -p "${DATA_DIR}"
echo -e "${COLOR_VAR_NAME}DATA_DIR${COLOR_DOTS}...............${COLOR_VAR_DESC}Data directory${COLOR_DOTS}.........................${COLOR_VAR_VAL}$DATA_DIR${COLOR_RESET}"

#export NO_ULIMIT_CHECK=1
ulimit -n 65535 > /dev/null
echo "ulimit is now set to $(ulimit -n)"

export SGX_CERT_FOLDER=$(${READLINK} -f "../../../engine/create_pems")
export SGX_CERT_FILE="client.crt"
export SGX_KEY_FILE="k.key"

if [ -z "$URL_W3_ETHEREUM" ]; then
	export URL_W3_ETHEREUM="http://127.0.0.1:8545"
fi
echo "URL_W3_ETHEREUM is set to $URL_W3_ETHEREUM"

COLOR_OPT="--no-colors"
# if [ "${NO_ANSI_COLORS}" = "1" ]; then
# 	echo "Colorized logs in skaled - turned off"
# else
# 	echo "Colorized logs in skaled - turned on"
# 	COLOR_OPT="--colors"
# fi

ALL_COMMAND_LINE_ARGUMENTS=" $COLOR_OPT \
--config ./config.json \
-v 9 \
--log-value-size-limit 1024000 \
--performance-timeline-enable --performance-timeline-max-items=16000000 \
--sgx-url https://127.0.0.1:1026 \
--main-net-url=$URL_W3_ETHEREUM \
--block-rotation-period 10 \
${SSL_OPTS} ${OUTPUT_OPTS}"

# -d $DATA_DIR \
# --db=leveldb \

# --db=leveldb \
# --db=rocksdb \
# --db=memorydb \


# --http-port %%PROXY_PORT%% --https-port %%PROXY_PORT_S%% --ws-port %%PROXY_PORT_WS%% --wss-port %%PROXY_PORT_WSS%%
# --ipcpath ./ipcx
# -d ./node
# --acceptors 1
# --aa always
# --web3-trace
# --enable-debug-behavior-apis
# --web3-shutdown
# --sync-http-transfer-mode

export NO_NTP_CHECK=1

echo "Will run ${SKALED} with command line: ${ALL_COMMAND_LINE_ARGUMENTS}"

$SKALED $ALL_COMMAND_LINE_ARGUMENTS
# valgrind --tool=callgrind ${SKALED} ${ALL_COMMAND_LINE_ARGUMENTS}

############################################################################################################################
############################################################################################################################
############################################################################################################################

cd "${WORKING_DIR_OLD}" || exit 250
exit 0
