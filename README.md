# JobSearchSite 

A comprehensive platform designed to connect job seekers and employers. Job seekers can explore job opportunities, apply for positions, and manage their applications, while employers can post job openings, manage candidates, and schedule interviews seamlessly.  

---

## 🌟 Features 

### Job Seeker
- Browse and search for job opportunities.
- Apply for positions with a simple and user-friendly interface.
- Track the status of your job applications.  

### Employer
- Post and manage job listings.
- View and manage job applications from candidates.
- Schedule interviews and manage the hiring process.  

### Platform 
- Secure user authentication and authorization.  
- Microservices-based architecture for scalability and maintainability.  
- Intuitive and responsive UI for a smooth user experience.

---

## 🚀 Technologies Used 

### Backend
- **Java**: Primary backend development.  
- **Spring Boot**: Framework for microservices and APIs.  
- **Eureka Server**: For service discovery.  
- **Gateway API**: Unified entry point for microservices.  
- **Database**: Relational database (MySQL).  

### Frontend
- **React.js**: Dynamic and responsive user interface.  
- **CSS**: For custom styling.  
- **JavaScript**: Client-side scripting.  

### Additional Tools
- **Spring Security**: Authentication and authorization.  
- **Maven**: Dependency management.  

---

## 📂 Project Structure 

```
├── AuthenticatorService/       # Authentication and user management service  
├── EmployerService/            # Microservice for employers  
├── JobSeekerService/           # Microservice for job seekers  
├── InterviewSchedulerService/  # Service for scheduling interviews  
├── GatewayAPI/                 # API Gateway for routing  
├── Frontend/                   # React.js application for UI  
├── SharedModule/               # Shared resources across microservices  
├── Server/                     # Eureka Server for service discovery
``` 

----------

## 🔧 Setup and Installation

### Prerequisites

-   **Java 11** or higher
-   **Node.js** (for the frontend)
-   **Maven**
-   **MySQL/PostgreSQL**

### Steps to Run

1.  **Clone the repository**
    
    ```bash
    git clone https://github.com/adilnaib/JobSearchSite.git
    cd JobSearchSite
    ```
    
2.  **Setup the Backend**
    
    -   Navigate to each microservice directory and configure the database credentials in the application properties.
    -   Build the services using Maven:
        
	     ```
	     mvn clean install
	     ```
        
    -   Start each service:
        
	    ```
	    java -jar target/<service-name>.jar
	    ```
        
3.  **Setup the Frontend**
    
    -   Navigate to the `Frontend` directory.
    -   Install dependencies:
      
        ```
        npm install
        ```
        
    -   Start the development server:
	       ```
	       npm start
	       ```
        
4.  **Access the Platform**
    
    -   Open your browser and navigate to `http://localhost:3000`

----------

## 👨‍💻 Contributors

-   [Adil Naib](https://github.com/adilnaib)
-   [Manoj CG](https://github.com/manojncg)
-   [Aniket CG](https://github.com/cganiket)
-   [Akaran CG](https://github.com/akarancg)
-   [Kaustubh Digarse](https://github.com/kaustubhdigarse9)
