pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = "daniel/frontend-pos:1" 
        DOCKER_CREDENTIALS_ID = "docker-hub-login"
        KUBERNETES_CREDENTIALS_ID = "rancher-credentials"
        KUBERNETES_NAMESPACE = "fleet-local"
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/danielSramos/deploy-jenkins-frontend.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE_NAME}:${env.BUILD_NUMBER} ."
                    sh "docker tag ${DOCKER_IMAGE_NAME}:${env.BUILD_NUMBER} ${DOCKER_IMAGE_NAME}:latest"
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Usa a credencial do Docker Hub para fazer login
                    withCredentials([usernamePassword(credentialsId: env.DOCKER_CREDENTIALS_ID, passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh "echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin"
                        sh "docker push ${DOCKER_IMAGE_NAME}:${env.BUILD_NUMBER}"
                        sh "docker push ${DOCKER_IMAGE_NAME}:latest"
                    }
                }
            }
        }

        stage('Deploy to Kubernetes (Rancher)') {
            steps {
                script {
                    withKubeConfig(credentialsId: env.KUBERNETES_CREDENTIALS_ID) {
                        sh "kubectl set image deployment/mentor-frontend-deployment mentor-frontend=${DOCKER_IMAGE_NAME}:${env.BUILD_NUMBER} -n ${KUBERNETES_NAMESPACE}"
                    }
                }
            }
        }
    }
}