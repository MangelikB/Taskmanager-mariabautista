Final Project -  Workout Task Manager, Single Page Application (SPA)

Maria Bautista - Student ID:90541121645


Tech Stack: React, Vite, JavaScript, CSS Modules, Firebase Firestore, Firebase Hosting

Description:
Workout Task Manager is a responsive Single Page Application (SPA) built with React and Vite, designed to help users plan, organize, and manage their workout routines efficiently. The app allows users to create multiple custom workout lists, each containing tasks categorized by type (Cardio, Strength, Flexibility) and priority (High, Medium, Low). Within each list, users can add, search, filter, and mark tasks as completed, and navigate between lists using a dynamic sidebar interface.

The application is fully integrated with Firebase Firestore as a cloud database, enabling real-time updates and offline data persistence, so users can interact with their workout plans even without internet access. Additionally, the app is deployed using Firebase Hosting, making it accessible from any device through a public URL.

The interface is clean, responsive, and styled using custom CSS Modules to ensure a smooth experience on both desktop and mobile. This project demonstrates the development of a full-featured, scalable, and modern task management system using cloud-based technologies.

How to use the app:
Users start by creating a new workout list. Inside each list, they can add tasks, assign them a category (Cardio, Strength, or Flexibility), and set a priority level (High, Medium, or Low). Tasks can be marked as completed, filtered by category or priority, and searched by keyword. All updates are saved in real time to Firebase, and the app continues to function even without internet thanks to offline support.

How to run the app:
To run the Workout Task Manager locally, make sure you have Node.js, npm, and the Firebase CLI installed. After cloning the repository, install the dependencies with npm install and configure your Firebase project (Firestore + Hosting). Add your Firebase credentials to a config file (e.g., db.js), and run the app locally using npm run dev.

To make the app publicly accessible, initialize Firebase Hosting with firebase init and deploy using firebase deploy.
