# WebWeave

This project aims to provide a streamlined solution for deploying websites on the internet using AWS services such as S3, Cloudflare for DNS management, and Redis queues for handling deployment requests. It consists of three main components: the Upload Service, Deployment, and Request Handler.

## Components:

### 1. Upload Service:

The Upload Service is responsible for receiving website files from users and storing them securely. It interacts with AWS S3 for storage.

#### Features:
- Accepts website files from users
- Validates and securely stores files on AWS S3
- Provides feedback to users upon successful upload

### 2. Deployment:

The Deployment component manages the deployment process of the uploaded website to a specified domain. It interacts with AWS S3 for fetching website files, Cloudflare for DNS configuration, and Redis queues for task management.

#### Features:
- Retrieves website files from AWS S3
- Configures DNS settings using Cloudflare API
- Manages deployment tasks using Redis queues
- Provides status updates to users during deployment process

### 3. Request Handler:

The Request Handler component receives and processes deployment requests from users. It communicates with the Deployment component to initiate the deployment process.

#### Features:
- Accepts deployment requests from users
- Validates request parameters
- Initiates deployment process through Deployment component

## Setup Instructions:

1. Clone the repository:
   git clone <repository_url>

2. Install dependencies:
  npm install


3. Configure AWS SDK, Cloudflare API, and Redis credentials in the respective configuration files.

4. Start each component of the project:

- Upload Service:

npm run start:upload-service



- Deployment:

npm run start:deployment

- Request Handler:

npm run start:request-handler

5. Access the components through their respective endpoints and start deploying your website!

## Technologies Used:

- Node.js
- AWS SDK (S3)
- Cloudflare API
- Redis
- Express.js

