# Airtribe Assessment

Airtribe Backend Assessment submission by Prabal Pratap

## Table of Contents

- [Technologies Used](#technologies-used)
- [Prerequisite](#prerequisite)
- [Installation](#installation)

## Technologies Used

#### Backend: Node.js, Express, Sequelise

<p>
<img src="https://miro.medium.com/v2/resize:fit:1400/1*23BkSGzcN3cBxvTuf0zFfg.png" height="150"/>
<img src="https://miro.medium.com/v2/resize:fit:1400/1*rL8Buu7o6jnG-TYV1WubeQ.png" height="150"/>
</p>
<img src="https://miro.medium.com/v2/resize:fit:661/1*TkP2EwaX95ItAv_jGS7hSA.png" height="150"/>
</p>

#### Containerization && Database: Docker, Postgres

<p>
<img src="https://bunnyacademy.b-cdn.net/what-is-docker.png" height="150" display="span"/>
<img src="https://raw.githubusercontent.com/docker-library/docs/01c12653951b2fe592c1f93a13b4e289ada0e3a1/postgres/logo.png" height="150" display="span"/>
</p>

#### Authentication : JWT (JSON Web Token)

<p>
<img src="https://miro.medium.com/v2/resize:fit:800/0*WddOBoMIYbSPNGSD.png" height="150"/>
</p>

## Prerequisites

### Docker Desktop for running the container

### Postman for backend api testing

## Installation

- Method 1: Using Docker

### Just only Download the Docker Compose File

### Create a .env file in the root of directory and add the following variables:

```javascript
PORT = "5000" // this port are mapped to docker
DB_NAME = "airtribe" // or your own name
DB_USERNAME = "postgres" // keep the default username ("postgres") otherwise have to change username in the container manually
DB_PASSWORD = "123456" // or your own password but remember the password
DB_PORT = "5432" // this db port is mapped
DB_HOST = db // keep the same db host
JWT_SECRET_KEY = "your_JWT_secretKey" // or your own jwt secret key
```

#### up the compose File

```bash
docker-compose up
```

- Method 2: Using Github

#### Clone the repo:

```bash
git clone https://github.com/ranaprabal/airtribe.git
```

#### Create a .env file in the root of directory and add the following variables:

```javascript
PORT = "5000" // this port are mapped to docker
DB_NAME = "airtribe" // or your own name
DB_USERNAME = "postgres" // keep the default username ("postgres") otherwise have to change username in the container manually
DB_PASSWORD = "123456" // or your own password but remember the password
DB_PORT = "5432" // this db port is mapped
DB_HOST = db // keep the same db host
JWT_SECRET_KEY = "your_JWT_secretKey" // or your own jwt secret key
```

#### Install dependencies:

```bash
npm i
```
