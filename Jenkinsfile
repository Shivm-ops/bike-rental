pipeline {
    agent any

    environment {
        // Defining variables here makes the script cleaner
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
                echo "Fetching code from ${env.REPO_URL}..."
                // Uses the SSH key you added to Jenkins credentials
                git credentialsId: 'github-ssh-key', url: "${env.REPO_URL}"
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm packages...'
                // Running npm install to get project libraries
                sh 'npm install' 
            }
        }

        stage('Build') {
            steps {
                echo 'Building the production files...'
                // Generates the 'dist' or 'build' folder
                sh 'npm run build' 
            }
        }

        stage('Deploy') {
            steps {
                echo 'Moving files to Nginx server...'
                // Deploys the application to the web server path
                // Note: Ensure you gave 'jenkins' user sudo permissions earlier
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
                message: "✅ *SUCCESS*: Job '${env.