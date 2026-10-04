pipeline {
    agent any

    parameters {
	string(
	    name: 'EC2_HOST',
	    defaultValue: '3.109.186.35',
	    description: 'EC2 public IP'
	)
    } 
    environment {
        CRED_ID = 'dockerhub-credentials'

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
                bat 'docker --version'
                bat 'docker build -t ems-backend ./server'
                bat 'docker build -t ems-frontend ./client'
            }
        }

        // stage('Security Scan') {
        //     steps {
        //         // Trivy container scans the images for critical CVEs
        //         // Prepend 'bash' so Windows cmd can execute the .sh script
        //         bat 'bash ./scan.sh ems-backend'
        //         bat 'bash ./scan.sh ems-frontend'
        //     }
        // }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: env.CRED_ID,
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat 'powershell -NoProfile -Command "$env:DOCKER_PASS | docker login -u $env:DOCKER_USER --password-stdin"'

                    bat 'docker tag ems-backend %DOCKER_USER%/ems-backend:latest'
                    bat 'docker tag ems-frontend %DOCKER_USER%/ems-frontend:latest'

                    bat 'docker push %DOCKER_USER%/ems-backend:latest'
                    bat 'docker push %DOCKER_USER%/ems-frontend:latest'
                }
            }
        } 

        stage('Deploy to EC2') {
            steps { 
                withCredentials(bindings: [sshUserPrivateKey(
                    credentialsId: 'ec2-ssh-key',
                    keyFileVariable: 'KEY_FILE',
                    usernameVariable: 'SSH_USER'
                )]) {
		    bat 'icacls "%KEY_FILE%" /inheritance:r /grant:r "%USERNAME%:R"'
		    bat 'ssh -i "%KEY_FILE%" -o StrictHostKeyChecking=accept-new %SSH_USER%@%EC2_HOST% "whoami && hostname"'}
		}
	    }
        }
    

    post {
        always {
            bat 'docker logout'
        }
    }
}


