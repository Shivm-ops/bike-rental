pipeline {
    agent any
    stages {
        // ... your other stages (Build, Test) ...
    }
    post {
        success {
            echo 'Build Successful! System is healthy.' // This stays in Jenkins
            slackSend(
                channel: '#general', // Use your Channel Name or ID here
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