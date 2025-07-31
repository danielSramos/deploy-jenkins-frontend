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
        // O checkout inicial já é feito automaticamente pelo Jenkins
        // Não é necessário um estágio 'Checkout' separado.

        stage('Build Docker Image') {
            steps {
                script {
                    // Adiciona o nome do repositório antes da imagem para o push funcionar
                    // A tag 'latest' pode ser criada no Dockerfile ou após a criação da imagem
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
                    // Usa a credencial do Rancher para se autenticar no Kubernetes
                    withKubeConfig(credentialsId: env.KUBERNETES_CREDENTIALS_ID) {
                        sh "kubectl set image deployment/mentor-frontend-deployment mentor-frontend=${DOCKER_IMAGE_NAME}:${env.BUILD_NUMBER} -n ${KUBERNETES_NAMESPACE}"
                    }
                }
            }
        }
    }
}