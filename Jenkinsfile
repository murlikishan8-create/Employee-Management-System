pipeline {
    agent any
    
    environment {
        CRED_ID = 'dockerhub-credentials'
        DOCKER_USER = 'harryp0tter'
        environment {
        PATH = "C:\\Users\\dmurl\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin;${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Images') {
            steps {
                bat 'docker build -t ems-backend ./server'
                bat 'docker build -t ems-frontend ./client'
            }
        }

        stage('Security Scan') {
            steps {
                // Trivy container scans the images for critical CVEs
                // Prepend 'bash' so Windows cmd can execute the .sh script
                bat 'bash ./scan.sh ems-backend'
                bat 'bash ./scan.sh ems-frontend'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    bat 'echo %PASS% | docker login -u %USER% --password-stdin'
                    
                    bat 'docker tag ems-backend %DOCKER_USER%/ems-backend:latest'
                    bat 'docker tag ems-frontend %DOCKER_USER%/ems-frontend:latest'
                    
                    bat 'docker push %DOCKER_USER%/ems-backend:latest'
                    bat 'docker push %DOCKER_USER%/ems-frontend:latest'
                }
            }
        }
    }
}
