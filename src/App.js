import React, { useState, useEffect } from 'react';
import { 
  View, 
  ScrollView,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import './index.css'; // Import global CSS
import logoImage from './logo.png'; // Import your logo image
import scenicBackgroundImage from './background.png'; // Import the scenic background image
import styles, { isSmallScreen } from './styles/styles';
import { db, resetFirestoreConnection, checkFirestoreConfig } from './firebase';
import { collection, getDocs, addDoc, doc, updateDoc, arrayUnion, query, orderBy } from 'firebase/firestore';

// Import components
import NavBar from './components/NavBar';
import Schedule from './components/Schedule';
import Registration from './components/Registration';
import Leaderboard from './components/Leaderboard';
import Results from './components/Results';

// Main App
const App = () => {
  const [activeSection, setActiveSection] = useState('schedule');
  const [participants, setParticipants] = useState([]);
  const [_smallScreen, setSmallScreen] = useState(isSmallScreen());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isResetting, setIsResetting] = useState(false);
  
  // Handle screen resize
  useEffect(() => {
    const handleDimensionsChange = ({ window }) => {
      setSmallScreen(window.width < 768);
    };
    
    // Use Dimensions.addEventListener instead of window.addEventListener
    const subscription = Dimensions.addEventListener('change', handleDimensionsChange);
    
    // Return cleanup function
    return () => {
      subscription.remove();
    };
  }, []);
  
  // Check Firestore config on startup
  useEffect(() => {
    const isConfigValid = checkFirestoreConfig();
    console.log("Firebase config check result:", isConfigValid);
    
    if (!isConfigValid) {
      setError("Invalid Firebase configuration");
      setLoading(false);
    }
  }, []);
  
  // Load data from Firestore on initial render
  useEffect(() => {
    const fetchParticipants = async () => {
      // Skip if we're already resetting the connection
      if (isResetting) return;
      
      try {
        console.log(`Starting to fetch participants from Firestore... (Attempt ${retryCount + 1})`);
        setLoading(true);
        setError(null);
        
        const participantsRef = collection(db, 'participants');
        console.log("Created collection reference to 'participants'");
        
        try {
          const querySnapshot = await getDocs(participantsRef);
          console.log(`Firestore query executed. Received ${querySnapshot.size} documents.`);
          
          if (querySnapshot.empty) {
            console.log("No participants found. Adding sample data...");
            // Add sample data if collection is empty
            const sampleParticipants = [
              { name: 'John Doe', email: 'john@example.com', team: 'Team A', points: 100, events: {} },
              { name: 'Jane Smith', email: 'jane@example.com', team: 'Team B', points: 85, events: {} },
              { name: 'Mike Johnson', email: 'mike@example.com', team: 'Team A', points: 95, events: {} }
            ];
            
            // Add sample participants to Firestore
            console.log("Adding sample participants to Firestore...");
            for (const participant of sampleParticipants) {
              try {
                const docRef = await addDoc(participantsRef, participant);
                console.log(`Added sample participant with ID: ${docRef.id}`);
              } catch (error) {
                console.error(`Error adding sample participant: ${error.message}`);
              }
            }
            
            // Fetch again after adding sample data
            console.log("Fetching updated participant data...");
            try {
              const newSnapshot = await getDocs(participantsRef);
              console.log(`Received ${newSnapshot.size} documents after adding samples.`);
              
              const participantsData = newSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
              console.log("Processed participant data:", participantsData);
              setParticipants(participantsData);
            } catch (error) {
              console.error(`Error fetching after adding samples: ${error.message}`);
              throw error;
            }
          } else {
            // Collection exists, get the data
            console.log("Participants collection exists. Processing data...");
            const participantsData = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            console.log("Processed participant data:", participantsData);
            setParticipants(participantsData);
          }
        } catch (error) {
          console.error(`Error in getDocs: ${error.message}`);
          throw error;
        }
      } catch (error) {
        console.error(`Error fetching participants: ${error.message}`, error);
        
        // Increment retry count if needed (max 3 retries)
        if (retryCount < 3) {
          console.log(`Retrying in 2 seconds... (Attempt ${retryCount + 1} of 3)`);
          setRetryCount(retryCount + 1);
          setTimeout(() => {
            fetchParticipants();
          }, 2000);
          return; // Don't set loading to false yet since we're retrying
        }
        
        setError(`Failed to load participants after ${retryCount + 1} attempts. ${error.message}`);
        
        // Fallback to localStorage if Firestore fails
        console.log("Attempting to fallback to localStorage...");
        try {
          const storedParticipants = localStorage.getItem('participants');
          if (storedParticipants) {
            console.log("Found data in localStorage, using it as fallback");
            setParticipants(JSON.parse(storedParticipants));
          } else {
            console.log("No data in localStorage. Using empty array.");
            setParticipants([]);
          }
        } catch (localStorageError) {
          console.error(`LocalStorage fallback error: ${localStorageError.message}`);
          setParticipants([]);
        }
      } finally {
        console.log("Finished loading data, setting loading state to false");
        setLoading(false);
      }
    };
    
    fetchParticipants();
  }, [retryCount, isResetting]);
  
  // Function to manually reset the connection
  const handleResetConnection = async () => {
    setIsResetting(true);
    setError(null);
    console.log("Manual connection reset requested");
    
    try {
      const resetSuccess = await resetFirestoreConnection();
      if (resetSuccess) {
        console.log("Connection reset successful, reloading data...");
        // Reset retry count and trigger a reload
        setRetryCount(0);
      } else {
        setError("Failed to reset connection. Check console for details.");
      }
    } catch (error) {
      console.error("Error in reset:", error);
      setError(`Reset failed: ${error.message}`);
    } finally {
      setIsResetting(false);
    }
  };
  
  // Add a new participant
  const addParticipant = async (participant) => {
    try {
      const newParticipant = {
        ...participant,
        points: participant.points || 0,
        events: {} // Initialize an object to store event-specific scores
      };
      
      const docRef = await addDoc(collection(db, 'participants'), newParticipant);
      
      // Update state with the new participant including Firestore ID
      const participantWithId = { id: docRef.id, ...newParticipant };
      setParticipants([...participants, participantWithId]);
    } catch (error) {
      console.error("Error adding participant:", error);
      // Fallback to localStorage
      const newParticipant = {
        ...participant,
        id: Date.now(),
        points: participant.points || 0,
        events: {}
      };
      
      const updatedParticipants = [...participants, newParticipant];
      setParticipants(updatedParticipants);
      localStorage.setItem('participants', JSON.stringify(updatedParticipants));
    }
  };
  
  const updateScore = async (participantId, pointsToAdd, eventName) => {
    try {
      const participantRef = doc(db, 'participants', participantId);
      const participant = participants.find(p => p.id === participantId);
      
      if (!participant) return;
      
      // Calculate new points and event scores
      const currentPoints = participant.points || 0;
      const newPoints = currentPoints + pointsToAdd;
      const currentEventPoints = participant.events && participant.events[eventName] ? participant.events[eventName] : 0;
      const newEventPoints = currentEventPoints + pointsToAdd;
      
      // Create events object if it doesn't exist
      const events = participant.events || {};
      events[eventName] = newEventPoints;
      
      // Update the document in Firestore
      await updateDoc(participantRef, {
        points: newPoints,
        [`events.${eventName}`]: newEventPoints
      });
      
      // Update local state
      const updatedParticipants = participants.map(p => {
        if (p.id === participantId) {
          return { 
            ...p, 
            points: newPoints, 
            events: events
          };
        }
        return p;
      });
      
      setParticipants(updatedParticipants);
      alert(`Score updated for event: ${eventName} successfully!`);
    } catch (error) {
      console.error("Error updating score:", error);
      // Fallback to localStorage
      const updatedParticipants = participants.map(p => {
        if (p.id === participantId) {
          const newEventScores = { ...(p.events || {}), [eventName]: ((p.events && p.events[eventName]) || 0) + pointsToAdd };
          return { 
            ...p, 
            points: (p.points || 0) + pointsToAdd, 
            events: newEventScores
          };
        }
        return p;
      });
      setParticipants(updatedParticipants);
      localStorage.setItem('participants', JSON.stringify(updatedParticipants));
      alert(`Score updated for event: ${eventName} successfully!`);
    }
  };
  
  return (
    <ImageBackground 
      source={scenicBackgroundImage} 
      style={styles.appBackgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeAreaContainer}>
        <NavBar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          logoImage={logoImage}
        />
        
        {error && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorBannerText}>{error}</Text>
            <TouchableOpacity 
              style={styles.resetButton} 
              onPress={handleResetConnection}
              disabled={isResetting}
            >
              {isResetting ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.resetButtonText}>Reset Connection</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
        
        <ScrollView 
          style={styles.mainScrollContainer}
          showsVerticalScrollIndicator={false} // Hide scrollbar on mobile
          contentContainerStyle={styles.mainScrollContent}
        >
          {activeSection === 'schedule' && <Schedule />}
          {activeSection === 'registration' && <Registration addParticipant={addParticipant} />}
          {activeSection === 'leaderboard' && <Leaderboard 
            participants={[...participants].sort((a, b) => b.points - a.points)} 
            loading={loading}
          />}
          {activeSection === 'results' && <Results participants={participants} updateScore={updateScore} loading={loading} />}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default App;
