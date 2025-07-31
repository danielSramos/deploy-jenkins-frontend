pipeline {
    agent any

    environment {
        // As variáveis de ambiente estão bem definidas
        DOCKER_IMAGE_NAME = "danielsramos/frontend-pos" 
        DOCKER_CREDENTIALS_ID = "docker-hub-login"
        KUBERNETES_CREDENTIALS_ID = "rancher-credentials"
        KUBERNETES_NAMESPACE = "fleet-local"
    }

    stages {
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
                    withDockerRegistry(credentialsId: env.DOCKER_CREDENTIALS_ID) {
                        sh "docker push ${DOCKER_IMAGE_NAME}:${env.BUILD_NUMBER}"
                        sh "docker push ${DOCKER_IMAGE_NAME}:latest"
                    }
                }
            }
        }

        stage('Deploy to Kubernetes (Rancher)') {
            steps {
                script {
                    // Use withCredentials para injetar o arquivo kubeconfig na sessão
                    withCredentials([file(credentialsId: env.KUBERNETES_CREDENTIALS_ID, variable: 'KUBECONFIG_FILE')]) {
                        // Exporte a variável KUBECONFIG para o kubectl
                        sh 'export KUBECONFIG=${KUBECONFIG_FILE}'
                        
                        // Use kubectl para fazer o deploy
                        sh "kubectl set image deployment/mentor-frontend-deployment mentor-frontend=${DOCKER_IMAGE_NAME}:${env.BUILD_NUMBER} -n ${KUBERNETES_NAMESPACE}"
                    }
                }
            }
        }
    }
}