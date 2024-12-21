# Employer Service Frontend

A modern React-based frontend for the Employer Service application. This application allows employers to manage job postings, review applications, and search for job seekers based on skills.

## Features

- Complete job management (create, read, update, delete)
- Application tracking system
- Job seeker search functionality
- Modern UI with Material-UI components
- Responsive design
- Error handling and loading states
- Form validation

## Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)
- Backend service running on localhost:8080

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The application will start on http://localhost:3000

## Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   └── Navbar.jsx
│   ├── Jobs/
│   │   ├── JobList.jsx
│   │   ├── JobForm.jsx
│   │   └── JobDetails.jsx
│   ├── Applications/
│   │   └── ApplicationList.jsx
│   └── Seekers/
│       └── SeekerList.jsx
├── services/
│   └── api.js
├── context/
│   └── AuthContext.js
├── utils/
│   └── constants.js
├── App.js
└── index.js
```

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from create-react-app

## API Integration

The frontend connects to the following backend endpoints:

### Jobs
- GET `/getJob/{empId}` - Get all jobs for an employer
- GET `/getjob/{empId}/{jobId}` - Get specific job details
- POST `/addJob/{empId}` - Create a new job
- PATCH `/editJob/{jobId}` - Update a job
- DELETE `/deleteJob/{jobId}` - Delete a job

### Applications
- GET `/getApplications/{empId}` - Get all applications for an employer
- PATCH `/applications/{applicationId}` - Update application status

### Job Seekers
- GET `/jobseekers/{jobId}` - Get job seekers who applied for a specific job
- GET `/getJobseekers/{skillset}` - Search job seekers by skills

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
