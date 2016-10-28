# Neupoints
POC for a loyality points application implemented on Chain Core [Chain Core] (https://chain.com/).

# Requirements
* [Docker] (http://docker.com)
* Any Editor [VS Code] (https://code.visualstudio.com) was used for this POC.

# How to run
## Start the Chaincore Docker container
To start the docker container run the following command
> docker run -p 1999:1999 chaincore/developer --name chain

You can use these commands to look at the logs
> docker exec -it chain tail /var/log/chain/init.log </br>
> docker exec -it chain tail /var/log/chain/cored.log </br>
> docker exec -it chain tail /var/log/chain/client-token

To receive a command prompt inside the container
> docker exec -it chain /bin/sh

## Run the console application to initialize the chain
From the console window run the command line application
> node neupoints.js -i

This will create the MockHSM key and setup the Points asset.

You can browse to http://localhost:1999 to view the Chaincore dashboard.