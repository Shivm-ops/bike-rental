pipeline {
    agent any

    environment {
        SLACK_CHANNEL = '#all-superheros'
    }

    stages {
        stage('Cleanup') {
            steps {
                echo 'Cleaning up the workspace...'
                cleanWs() 
            }
        }

        stage('Checkout') {
            steps {
                echo "Fetching code from main branch..."
                // This ensures Jenkins uses the correct branch and SSH key
                checkout scm 
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing frontend dependencies...'
                // THIS IS THE FIX: Jenkins moves into the 'frontend' folder
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                echo 'Building the production app...'
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying build files to Nginx...'
                // Copies the build results from frontend/dist to Nginx root
                sh 'sudo cp -R frontend/dist/* /var/www/html/'
                echo 'Deployment finished!'
            }
        }
    }

    post {
        success {
            slackSend(
                channel: "${env.SLACK_CHANNEL}",
                color: 'good',
                tokenCredentialId: 'slack-token',
                message: "✅ *SUCCESS*: Project '${env.JOB_NAME}' Build #${env.BUILD_NUMBER} is Live!"
            )
        }
        failure {
            slackSend(
                channel: "${env.SLACK_CHANNEL}",
                color: 'danger',
                tokenCredentialId: 'slack-token',
                message: "❌ *FAILED*: Project '${env.JOB_NAME}' Build #${env.BUILD_NUMBER}\nCheck logs here: ${env.BUILD_URL}console"
            )
        }
    }
}