pipeline {
    agent any
    
    environment {
        CRED_ID = 'dockerhub-credentials'
        DOCKER_USER = 'harryp0tter'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Images') {
            steps {
                sh 'docker build -t ems-backend ./server'
                sh 'docker build -t ems-frontend ./client'
            }
        }

        stage('Security Scan') {
            steps {
                // Trivy container scans the images for critical CVEs
                sh './scan.sh ems-backend'
                sh './scan.sh ems-frontend'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${CRED_ID}", usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                    
                    sh 'docker tag ems-backend ${DOCKER_USER}/ems-backend:latest'
                    sh 'docker tag ems-frontend ${DOCKER_USER}/ems-frontend:latest'
                    
                    sh 'docker push ${DOCKER_USER}/ems-backend:latest'
                    sh 'docker push ${DOCKER_USER}/ems-frontend:latest'
                }
            }
        }
    }
}
