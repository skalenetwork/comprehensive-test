#!/bin/bash

# SPDX-License-Identifier: AGPL-3.0-only

# @license
# SKALE ADVANCED IMA JS
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.

#
# @file clean.sh
# @copyright SKALE Labs 2019-Present
#

# truffle related:
rm -rf ./build || true &> /dev/null
rm -f ./data/*.json || true &> /dev/null 

# hardhat related:
#rm -rf ./node_modules || true
rm -rf ./cache || true
rm -rf ./artifacts || true
