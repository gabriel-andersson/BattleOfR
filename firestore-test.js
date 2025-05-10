const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");

// Firebase configuration
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
const db = getFirestore(app);

async function testFirestore() {
  console.log("Testing Firestore connection...");
  
  try {
    // Test adding a document to the participants collection
    const docRef = await addDoc(collection(db, "participants"), {
      name: "Test User",
      email: "test@example.com",
      team: "Test Team",
      points: 50,
      events: {},
      timestamp: new Date().toISOString()
    });
    
    console.log("Document successfully added with ID:", docRef.id);
    return true;
  } catch (error) {
    console.error("Error adding document:", error);
    return false;
  }
}

// Run the test
testFirestore()
  .then(result => {
    if (result) {
      console.log("Firestore connection successful!");
    } else {
      console.log("Failed to connect to Firestore.");
    }
    process.exit(0);
  })
  .catch(error => {
    console.error("Unhandled error:", error);
    process.exit(1);
  }); 