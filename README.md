# Employee Management System — DevOps CI/CD

This project started as a MERN-based Employee Management System. I used the application as the base for building and testing a DevOps workflow with Docker, Docker Compose, Jenkins, Trivy, and Docker Hub.

## Tech Stack

**Application:** React, Vite, Node.js, Express.js, MongoDB, Mongoose

**DevOps:** Git, Docker, Docker Compose, Jenkins, Trivy, Nginx, Shell scripting

# What I Worked On

- Fixed the existing application before starting the DevOps work.
- Created Dockerfiles for the frontend and backend.
- Configured Nginx for the React application.
- Added Docker Compose for running the application services together.
- Created shell scripts for common Docker and Trivy operations.
- Built a Jenkins CI/CD pipeline.
- Added Trivy scanning to test how security checks can be integrated    into the pipeline.
- pushed frontend and backend images to Docker Hub.

## Key Troubleshooting

During development I resolved:

- Invalid MongoDB environment configuration.
- `/dashboard` frontend routing issue.
- Employee creation/API 500 error caused by frontend form/request issues.
- Nginx 404 for React SPA routes.
- Jenkins `sh` executable/PATH issue on Windows.

I documented the problems, fixes, and decisions in [`DECISIONS.md`](DECISIONS.md).


# Docker setup

Once the application was working, I containerized the application.

There are separate Dockerfiles for the frontend and backend.

### Frontend

The React application is built and served using Nginx.

```text
Host: 5173
Container: 80
```

### Backend

The Node.js/Express application runs in its own container.

```text
Port: 8000
```

### MongoDB

MongoDB runs as a separate container during Docker Compose testing.

```text
Port: 27017
```

The backend connects to MongoDB using the Docker Compose service name rather than `localhost`.

---

I created a `docker-compose.yml` to run the application services together.

The Compose setup contains:

```text
employee-client
employee-server
employee-mongodb
```

To start the application:

docker compose up --build

To stop it:

docker compose down

The frontend is available at:

```text
http://localhost:5173
```

---

# CI/CD Pipeline

After Dockerization, I created a Jenkins pipeline to automate the image build, security check, and push to dockerhub

The pipeline has five main stages.

## 1. Checkout

Jenkins checks out the source code from GitHub.

## 2. Build Images

Jenkins builds the frontend and backend images:

```text
ems-frontend
ems-backend
```

## 3. Docker Hub Authentication

Docker Hub credentials are stored in Jenkins Credentials.

The Docker Hub access token is not written directly inside the Jenkinsfile or committed to GitHub.

Jenkins retrieves the stored credentials when the pipeline reaches the authentication stage.

## 4. Push Images

After the required stages succeed, Jenkins tags and pushes the images to Docker Hub.

The overall pipeline is:

```text
Checkout
   ↓
Build Images
   ↓
Trivy Scan
   ↓
Docker Hub Login
   ↓
Push Images
```

---

# Shell Scripts

added shell scripts to make common Docker operations easier to repeat.

```text
build.sh
push_images.sh
scan.sh
```

The scripts are used for Docker image building, image publishing, and Trivy scanning.

---

# Application Source

This repository is a fork of an existing Employee Management System application.poll SCM test
