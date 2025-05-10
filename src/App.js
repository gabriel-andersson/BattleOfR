import React, { useState, useEffect } from 'react';
import { 
  View, 
  ScrollView,
  SafeAreaView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import './index.css'; // Import global CSS
import logoImage from './logo.png'; // Import your logo image
import scenicBackgroundImage from './background.png'; // Import the scenic background image
import styles, { isSmallScreen } from './styles/styles';

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
  
  // Load data from localStorage on initial render
  useEffect(() => {
    const storedParticipants = localStorage.getItem('participants');
    if (storedParticipants) {
      setParticipants(JSON.parse(storedParticipants));
    } else {
      // Add sample data for testing
      const sampleParticipants = [
        { id: 1, name: 'John Doe', email: 'john@example.com', team: 'Team A', points: 100, events: {} },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', team: 'Team B', points: 85, events: {} },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', team: 'Team A', points: 95, events: {} }
      ];
      setParticipants(sampleParticipants);
      localStorage.setItem('participants', JSON.stringify(sampleParticipants));
    }
  }, []);
  
  // Add a new participant
  const addParticipant = (participant) => {
    const newParticipant = {
      ...participant,
      id: Date.now(),
      points: participant.points || 0,
      events: {} // Initialize an object to store event-specific scores
    };
    
    const updatedParticipants = [...participants, newParticipant];
    setParticipants(updatedParticipants);
    localStorage.setItem('participants', JSON.stringify(updatedParticipants));
  };
  
  const updateScore = (participantId, pointsToAdd, eventName) => {
    const updatedParticipants = participants.map(p => {
      if (p.id === participantId) {
        // Add to total points & store event-specific points
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
        <ScrollView 
          style={styles.mainScrollContainer}
          showsVerticalScrollIndicator={false} // Hide scrollbar on mobile
          contentContainerStyle={styles.mainScrollContent}
        >
          {activeSection === 'schedule' && <Schedule />}
          {activeSection === 'registration' && <Registration addParticipant={addParticipant} />}
          {activeSection === 'leaderboard' && <Leaderboard participants={[...participants].sort((a, b) => b.points - a.points)} />}
          {activeSection === 'results' && <Results participants={participants} updateScore={updateScore} />}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default App;
