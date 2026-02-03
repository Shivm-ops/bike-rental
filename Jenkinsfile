pipeline {
    agent any
    stages {
        // ... (your existing Build and Test stages) ...
    }
    post {
        success {
            // This sends the actual message to Slack
            slackSend(
                channel: '#general', 
                color: 'good', 
                message: "SUCCESS: Job '${env.JOB_NAME}' [${env.BUILD_NUMBER}] (${env.BUILD_URL})"
            )
        }
        failure {
            slackSend(
                channel: '#general',
                color: 'danger',
                message: "FAILED: Job '${env.JOB_NAME}' [${env.BUILD_NUMBER}] (${env.BUILD_URL})"
            )
        }
    }
}