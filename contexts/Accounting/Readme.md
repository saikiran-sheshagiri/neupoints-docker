# Accounting Bounded Context

# Building
To build the accounting context use the docker-compose command.
> docker-compose build

This will create both the Accounting image and the ChainCore image used to debug and test the accounting context. 

# Running

## Using Docker
<p>To run the accounting context use the docker-compose up command.</p>
<p>This command will start ChainCore and the Accounting containers as well as set the default Chain configuration without detaching from the containers.

> docker-compose up

<p>To detach from the containers once started use the following command.</p>

> docker-compose up -d

## Removing the Docker containers
<p>You can stop the continers and remove them by running the docker-compose down command. This will remove the containers but not the built images.</p>

> docker-compose down

## Cleaning up the docker volumes
<p>The docker volume command can be used to clean up volumes that are not current in use.</p>

> docker volume rm $(docker volume ls -f dangling=true -q)

## Cleaning up the docker images
<p>The docker rmi command can be used to clean up intermediate images</p>

> docker rmi $(docker images -f dangling=true -q)

## Clean start
<p>If you need a clean start run the following commands to get back to clean.</p>

> docker-compose down</br>
> docker volume rm $(docker volume ls -f dangling=true -q)</br>
> docker rmi $(docker images -f dangling=true -q)</br>
> docker-compose build