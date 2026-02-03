pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Fetching code from GitHub...'
            }
        }
        stage('Build') {
            steps {
                echo 'Building the application...'
            }
        }
        stage('Test') {
            steps {
                echo 'Running Unit Tests...'
            }
        }
    }

    post {
        success {
            slackSend(
                channel: '#general',
                color: 'good',
                tokenCredentialId: 'slack-token', // This MUST match the ID in Jenkins Credentials
                message: "SUCCESS: Job '${env.JOB_NAME}' [${env.BUILD_NUMBER}] (${env.BUILD_URL})"
            )
        }
    }
        failure {
            slackSend(
                channel: '#general',
                color: 'danger',
                message: "Build Failed! Job: ${env.JOB_NAME} Build: ${env.BUILD_NUMBER}"
            )
        }
    }
}