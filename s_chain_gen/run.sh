#!/bin/bash
echo inside run.sh the SKALED=$SKALED
/bin/bash ~/Work/comprehensive-test/s_chain_gen/chain_00/run.sh SKALED=$SKALED &>/dev/null &
/bin/bash ~/Work/comprehensive-test/s_chain_gen/chain_01/run.sh SKALED=$SKALED &>/dev/null &
