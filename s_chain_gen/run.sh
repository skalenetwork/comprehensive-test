#!/bin/bash
echo inside run.sh the SKALED=$SKALED
/bin/bash /home/serge/Work/functional-test/functional_check/s_chain_gen/chain_00/run.sh SKALED=$SKALED &>/dev/null &
/bin/bash /home/serge/Work/functional-test/functional_check/s_chain_gen/chain_01/run.sh SKALED=$SKALED &>/dev/null &
