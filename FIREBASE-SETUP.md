# Firebase Setup Guide

This application uses Firebase Firestore for persistent data storage. Follow these steps to set up your Firebase project correctly.

## 1. Firebase Console Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use your existing one (my-test-app-ea549)
3. Navigate to Firestore Database in the left sidebar
4. Click "Create database" 
5. Choose "Start in test mode" (for development)
6. Select a database location closest to your users
7. Click "Enable"

## 2. Security Rules

Copy the security rules from `firebase-security-rules.txt` to your Firebase console:

1. In the Firebase console, navigate to Firestore Database
2. Click on the "Rules" tab
3. Replace the default rules with the ones from `firebase-security-rules.txt`
4. Click "Publish"

**IMPORTANT**: The current rules allow anyone to read and write to your database. For production, implement proper authentication and secure your rules.

## 3. Deploy Your App

Now that your Firebase setup is complete, you can deploy your app to GitHub Pages:

```bash
npm run build
npm run deploy
```

## 4. Next Steps for Production

For a production environment, consider implementing:

1. **Firebase Authentication**: Add user login/logout functionality
2. **Admin Interface**: Create a separate admin panel for managing participants and scores
3. **Security Rules**: Update the security rules to protect your data
4. **Real-time Updates**: Use Firebase's real-time capabilities for live updates
5. **Offline Support**: Implement offline capabilities for unreliable connections

## Troubleshooting

If you encounter issues with Firebase:

1. Check your Firebase configuration in `src/firebase.js`
2. Ensure your project's Firestore database is created and enabled
3. Verify that your security rules are published
4. Check the console for any Firebase-related errors 