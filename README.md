# roommate-finder-api
the back end for the room mate finder app


## Set Up
 - run `npm install`
 
 ### To Seed the Database
 - CREATE A DATABASE CALLED `roomies` everytime you want to run the app. Docker will delete the data when closed.
 - RUN `npm resetdb`
 
 ## install docker && create roomies DB in psql w/ docker
  - https://docs.docker.com/get-docker/
  - commands
  for linux
    -sudo docker-compose up -d
  how to PSQL in
    -sudo docker exec -it roommate-finder-api_database_1 psql -d roomies -U labber
    
  ## install libpq.
 - wont work without libpq. Go install that now.