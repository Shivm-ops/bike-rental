pipeline {
    agent any

    environment {
        REPO_URL = 'git@github.com:Shivm-ops/bike-rental.git'
        SLACK_CHANNEL = '#all-superheros'
    }

    stages {
        stage('Cleanup') {
            steps {
                echo 'Cleaning up previous workspace...'
                cleanWs() 
            }
        }

      stage('Checkout') {
    steps {
        echo "Fetching code from main branch..."
        // This command automatically inherits the 'main' branch setting from the UI
        checkout scm 
    }
}
        stage('Install Dependencies') {
            steps {
                echo 'Installing npm packages...'
                sh 'npm install' 
            }
        }

        stage('Build') {
            steps {
                echo 'Building the production files...'
                sh 'npm run build' 
            }
        }

        stage('Deploy') {
            steps {
                echo 'Moving files to Nginx server...'
                // Ensure 'jenkins' user has sudo access as we discussed
                sh 'sudo cp -R dist/* /var/www/html/' 
                echo 'Deployment complete!'
            }
        }
    }

    post {
        success {
            echo 'Build and Deployment Successful!'
            slackSend(
                channel: "${env.SLACK_CHANNEL}",
                color: 'good',
                tokenCredentialId: 'slack-token',
                message: "✅ *SUCCESS*: Job '${env.JOB_NAME}' [${env.BUILD_NUMBER}]\nURL: ${env.BUILD_URL}"
            )
        }
        failure {
            echo 'Pipeline Failed!'
            slackSend(
                channel: "${env.SLACK_CHANNEL}",
                color: 'danger',
                tokenCredentialId: 'slack-token',
                message: "❌ *FAILED*: Job '${env.JOB_NAME}' [${env.BUILD_NUMBER}]\nLogs: ${env.BUILD_URL}console"
            )
        }
    }
} 