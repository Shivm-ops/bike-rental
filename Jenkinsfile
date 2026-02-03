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
                channel: '#all-superheros', // Change this from #general
                color: 'good',
                tokenCredentialId: 'slack-token',
                message: "SUCCESS: Job '${env.JOB_NAME}' [${env.BUILD_NUMBER}] (${env.BUILD_URL})"
            )
        }
    }
        failure {
            echo 'Build Failed! Check the logs.'
            slackSend(
                channel: '#general',
                color: 'danger', 
                tokenCredentialId: 'slack-token', //
                message: "FAILED: Job '${env.JOB_NAME}' [${env.BUILD_NUMBER}] (${env.BUILD_URL})"
            )
        }
    }
}