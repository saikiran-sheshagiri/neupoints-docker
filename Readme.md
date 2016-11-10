# Neupoints
POC for a loyality points application implemented on [Chain Core] (https://chain.com/).

# Requirements
* [Docker] (http://docker.com)
* Any Editor [VS Code] (https://code.visualstudio.com) was used for this POC.

# Building the Solution

# Running the Solution

# Getting familiar with Blockchain and ChainCore
## Start the Chaincore Docker container
To start the docker container run the following command
> docker run -p 1999:1999 chaincore/developer --name chain

You can use these commands to look at the logs
> docker exec -it chain tail /var/log/chain/init.log </br>
> docker exec -it chain tail /var/log/chain/cored.log </br>
> docker exec -it chain tail /var/log/chain/client-token

To receive a command prompt inside the container
> docker exec -it chain /bin/sh

You can browse to the ChainCore dashboard at http://localhost:1999.  Create some assets, accounts and transactions to familiarize youself with the Blockchain.