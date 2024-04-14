# Dockument management (Backend Service)
## Install

1. Clone this repository on your PC. You must have a preset Docker.
2. Change `.env.def` name to `.env`. Then change the values of the variables in this file.
3. In local repository open console and write down these commands:

```
docker-compose up -d
docker container list -a
```
(Take web container ID) 
```
docker exec <Container ID> python .\manage.py migrate
```
4. Add Realm Role, User in Keycloak. Regenerate Client Creditinals, take this and write this in `.env` file.

## Testing

1. GET Contracts without Bearer Token from Keycloak.
![image](docs/images/1.png)

![image](docs/images/2.png)

2. GET Contracts with Bearer Token from Keycloak.
![image](docs/images/3.png)

![image](docs/images/4.png)

## SAST Testing(flake8)
### Before
![image](docs/images/5.png)
### After
![image](docs/images/6.png)

# SAST Testing(pylint)
### Before
![image](docs/images/7.png)
### After
![image](docs/images/8.png)
