pipeline {
    agent any

    environment {
        // As variáveis de ambiente estão bem definidas
        DOCKER_IMAGE_NAME = "danielsramos/frontend-pos" 
        DOCKER_CREDENTIALS_ID = "docker-hub-login"
        KUBERNETES_CREDENTIALS_ID = "rancher-credentials"
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
                    withCredentials([file(credentialsId: env.KUBERNETES_CREDENTIALS_ID, variable: 'KUBECONFIG_FILE')]) {
                        sh '''
                        export KUBECONFIG=${KUBECONFIG_FILE}
                        kubectl get namespaces
                        kubectl set image deployment/mentor-frontend-deployment mentor-frontend=danielsramos/frontend-pos:${BUILD_NUMBER} -n default
                        '''
                    }
                }
            }
        }
    }
}