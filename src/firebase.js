// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator, enableIndexedDbPersistence, disableNetwork, enableNetwork } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCq2OzVOFhsqeaBtxOgkqWlWCJu8Vm-JiI",
  authDomain: "my-test-app-ea549.firebaseapp.com",
  projectId: "my-test-app-ea549",
  storageBucket: "my-test-app-ea549.firebasestorage.app",
  messagingSenderId: "639334781101",
  appId: "1:639334781101:web:2c24400753cdfd4ee57624"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Enable offline persistence (helps with connectivity issues)
try {
  enableIndexedDbPersistence(db)
    .then(() => {
      console.log("Firestore persistence enabled successfully");
    })
    .catch((err) => {
      console.error("Error enabling Firestore persistence:", err.code, err.message);
      if (err.code === 'failed-precondition') {
        console.warn("Multiple tabs open, persistence can only be enabled in one tab at a time");
      } else if (err.code === 'unimplemented') {
        console.warn("The current browser does not support all features required for Firestore persistence");
      }
    });
} catch (err) {
  console.error("Error in persistence setup:", err);
}

// Function to check connectivity and reset if needed
const resetFirestoreConnection = async () => {
  console.log("Attempting to reset Firestore connection...");
  try {
    // Disable and re-enable the network connection
    await disableNetwork(db);
    console.log("Network disabled");
    
    // Wait a moment before re-enabling
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    await enableNetwork(db);
    console.log("Network re-enabled");
    return true;
  } catch (error) {
    console.error("Error resetting Firestore connection:", error);
    return false;
  }
};

// Function to check Firestore configuration
const checkFirestoreConfig = () => {
  console.log("Checking Firestore configuration...");
  console.log("Project ID:", firebaseConfig.projectId);
  console.log("API Key (first 5 chars):", firebaseConfig.apiKey.substring(0, 5) + "...");
  // Return configuration status (true if it looks valid)
  return firebaseConfig.projectId && firebaseConfig.apiKey;
};

export { db, resetFirestoreConnection, checkFirestoreConfig }; 