# Digital E Gram Panchayat (HTML + CSS + JS + Firebase)

## Problem Statement
This project improves village citizen services by computerizing Gram Panchayat service applications.
Users can apply for services online and track progress, while Admin/Staff manage approvals and services.

## Tech Stack
- HTML, CSS, JavaScript
- Firebase Authentication
- Firebase Firestore
- (Optional) Firebase Hosting

## Roles / Modules
### User
- Register, Login
- Search services
- Apply services
- My application status
- My profile
- Logout

### Staff
- Login
- View services
- Update application status
- Logout

### Officer/Admin
- Login
- Create services
- Update/Delete services
- Update application status
- Logout

## Folder Structure
See the repository structure:
- `css/` UI styles
- `js/` modular JS (auth, services, applications, logger)
- HTML pages for each module

## Firebase Setup (IMPORTANT)
1. Create a Firebase project
2. Enable **Authentication → Email/Password**
3. Enable **Firestore Database**
4. Open `js/firebase.js` and paste your Firebase config.

## Firestore Collections
- `users/{uid}` : user profile with role (user/staff/admin)
- `services/{serviceId}` : Panchayat services
- `applications/{applicationId}` : citizen applications
- `logs/{logId}` : logs for every action

## Create Staff/Admin Accounts
1. Register normally (creates role = `user`)
2. In Firestore, go to `users/{uid}` and update:
   - `role: "staff"` OR `role: "admin"`

## Running Locally
Open `index.html` using VS Code Live Server extension.

## Deployment (Firebase Hosting)
```bash
npm i -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## Logging (Mandatory)
Logging is implemented in `js/logger.js` and writes to Firestore `logs` for:
- register, login, logout
- create/update/delete services
- apply service
- update application status

## Testing (Sample Test Cases)
- Register with valid inputs
- Login with invalid password
- Apply for active service
- Admin toggles service active/inactive
- Admin/Staff updates application status
