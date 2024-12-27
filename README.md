# EduPulse  

### Tech Stack: HTML, CSS, React.js, JavaScript, Firebase  

---

## Overview  
EduPulse is a web application designed to efficiently manage and organize student data and their academic records. It simplifies the administration process and provides role-based access control, ensuring secure and personalized access for different user roles, such as students, teachers, and administrators.

---

## Features  
### **Role-Based Access Control**  
- Secure sign-in and user authentication with Firebase Authentication.  
- Permissions tailored for different roles:
  - **Students**: View personal academic records.  
  - **Teachers**: Update grades and track student performance.  
  - **Administrators**: Manage student records and user roles.  

### **Efficient Student Data Management**  
- Centralized platform to store and retrieve academic records.  
- Real-time synchronization powered by Firebase Realtime Database, ensuring up-to-date information.  

### **Intuitive UI**  
- Responsive design for using on both desktop and mobile devices.  
- Built with React.js, utlizing reusable components and rendering.  

---

## Tech Stack  
1. **Frontend:** HTML, CSS, React.js, JavaScript  
2. **Backend:** Firebase Realtime Database  
3. **Authentication:** Firebase Authentication  

---

## How to Run Locally  
### Prerequisites:  
- **Node.js** installed  
- **Firebase CLI** installed and configured  

### Steps:  
1. **Clone the Repository**  
   ```bash
   git clone <repository-link>
   cd edupulse

   npm install
   firebase init
   npm start
