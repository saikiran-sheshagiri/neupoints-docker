#!/bin/bash

if (!set -u; : $CHAINCORE_ACCESS_TOKEN)2> /dev/null
then
    export CHAINCORE_ACCESS_TOKEN=$(tail /var/log/chain/client-token)
fi

npm start

exit 0