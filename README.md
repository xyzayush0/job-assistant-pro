🚀 Job Assistant Pro

Job Assistant Pro is an all-in-one, AI-powered career dashboard designed to streamline the job search process. Instead of jumping between multiple tabs for resume writing, company research, and application tracking, this platform consolidates the entire workflow into a single, intuitive interface.

Powered by the Google Gemini API (with Search Grounding) and Firebase, it acts as your personal recruiter, interview coach, and organization system.

✨ Features

📝 CV Writer: Paste a job description and your experience to instantly generate tailored, action-oriented resume bullet points.

✉️ Cover Letter Generator: Draft professional, targeted cover letters in seconds based on specific job requirements.

📊 Job Application Tracker: A built-in Kanban-style tracker backed by Firestore to save, update, and manage all your job applications in real-time.

🔍 Company Insights: Leverage AI with Google Search Grounding to pull the latest news, financial sentiment, and hidden details about a company before an interview.

🤝 Job Matcher: Input your skills and let the AI search the web for active, highly relevant job postings.

💡 Interview Tips & Mock Questions: Get actionable advice and STAR-method behavioral questions tailored to specific roles.

💼 LinkedIn Optimizer: Refine your LinkedIn 'About' section to align perfectly with your target jobs.

🤖 AI Chatbot: A multi-turn conversational assistant ready to answer any general career or interview questions.

🛠️ Tech Stack

Frontend: HTML5, vanilla JavaScript (ES6+), Tailwind CSS

Backend / BaaS: Firebase Authentication, Cloud Firestore (Database)

AI Integration: Google Gemini API (gemini-2.5-flash) with Google Search Grounding capabilities

Hosting: Firebase Hosting

🚀 Getting Started

To run this project locally, follow these steps:

Prerequisites

A Google AI Studio account for the Gemini API key.

A Firebase account for Authentication and Firestore.

1. Clone the repository

git clone [https://github.com/xyzayush0/job-assistant-pro.git](https://github.com/xyzayush0/job-assistant-pro.git)
cd job-assistant-pro


2. Configure API Keys

Open index.html and locate the configuration section at the top of the <script> tag. Replace the placeholder values with your actual credentials:

// 1. Paste your Gemini API Key
const API_KEY = "YOUR_GEMINI_API_KEY_HERE"; 

// 2. Paste your Firebase Configuration Object
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};


3. Setup Firebase (Authentication & Database)

Go to the Firebase Console and enable Email/Password Authentication.

Enable Firestore Database and update your Security Rules to allow authenticated users to access their own data:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /artifacts/{appId}/users/{userId}/jobs/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}


4. Run the App

Since this is a vanilla HTML/JS/CSS app, you can simply serve the index.html file using any local web server.
For example, using Python or Node.js:

# Python 3
python -m http.server 8000

# OR Node.js (http-server)
npx http-server


Then navigate to http://localhost:8000 in your browser.

📸 Screenshots

(Add some screenshots of your beautiful orange-themed UI here!)

Dashboard View: ![Dashboard](link-to-image)

Job Tracker: ![Tracker](link-to-image)

AI Chatbot: ![Chatbot](link-to-image)

🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

📝 License

This project is MIT licensed.
