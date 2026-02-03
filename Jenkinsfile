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
            // This is the CRITICAL part you need to add/update
            slackSend(
                channel: '#general', 
                color: 'good', 
                message: "Build Successful! Job: ${env.JOB_NAME} Build: ${env.BUILD_NUMBER}"
            )
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