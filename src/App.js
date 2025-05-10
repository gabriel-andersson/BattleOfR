import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  TextInput,
  Image,
  ImageBackground
} from 'react-native';
import './index.css'; // Import global CSS
import logoImage from './logo.png'; // Import your logo image
import scenicBackgroundImage from './background.png'; // Import the scenic background image

// Navigation component
const NavBar = ({ activeSection, setActiveSection }) => {
  return (
    <View style={styles.navbar}>
      <View style={styles.logoContainer}> 
        <Image source={logoImage} style={styles.logoImage} />
        <Text style={styles.logoText}>Battle Of Rossö</Text>
      </View>
      <View style={styles.navLinks}>
        <TouchableOpacity 
          style={[styles.navBtn, activeSection === 'schedule' && styles.navBtnActive]} 
          onPress={() => setActiveSection('schedule')}
        >
          <Text style={styles.navBtnText}>Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navBtn, activeSection === 'registration' && styles.navBtnActive]} 
          onPress={() => setActiveSection('registration')}
        >
          <Text style={styles.navBtnText}>Registration</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navBtn, activeSection === 'leaderboard' && styles.navBtnActive]} 
          onPress={() => setActiveSection('leaderboard')}
        >
          <Text style={styles.navBtnText}>Leaderboard</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navBtn, activeSection === 'results' && styles.navBtnActive]} 
          onPress={() => setActiveSection('results')}
        >
          <Text style={styles.navBtnText}>Results</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Schedule Component
const Schedule = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  const scheduleItems = [
    { 
      time: '09:00', 
      event: 'Opening Ceremony',
      details: 'Welcome to our Pentathlon Event! The opening ceremony will include speeches from organizers, introduction of teams, and a brief overview of today\'s events.',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    { 
      time: '10:00', 
      event: 'Event 1: Swimming',
      details: '200m freestyle swimming competition at the Olympic-sized pool. Participants must arrive 30 minutes before the event for warm-up.',
      image: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    { 
      time: '12:00', 
      event: 'Lunch Break',
      details: 'A healthy lunch will be served at the main cafeteria. Vegetarian and vegan options are available.',
      image: 'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    { 
      time: '14:00', 
      event: 'Event 2: Running',
      details: '3000m cross-country running. The course will go through the park and surrounding areas. Water stations are available every 1km.',
      image: 'https://images.unsplash.com/photo-1486218119243-13883505764c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    { 
      time: '16:00', 
      event: 'Event 3: Cycling',
      details: '10km cycling race on the city circuit. Helmets are mandatory. Participants must bring their own bikes or reserve one in advance.',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    { 
      time: '18:00', 
      event: 'Dinner',
      details: 'A celebratory dinner will be served at the main hall, featuring a variety of dishes to accommodate all dietary requirements.',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ];
  
  return (
    <View style={styles.scheduleSectionContainer}>
      <Text style={styles.sectionTitle}>Today's Schedule</Text>
      <View style={styles.scheduleContainer}>
        {scheduleItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.scheduleItem}
            onPress={() => setSelectedEvent(item)}
          >
            <Text style={styles.scheduleTime}>{item.time}</Text>
            <View style={styles.scheduleContent}>
              <Text style={styles.scheduleEvent}>{item.event}</Text>
              <Text style={styles.scheduleDetailsHint}>Tap for details →</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {selectedEvent && (
        <View style={styles.eventDetailsModal}>
          <View style={styles.eventDetailsContent}>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setSelectedEvent(null)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            
            <View style={styles.eventImageContainer}>
              <Image 
                source={{ uri: selectedEvent.image }} 
                style={styles.eventImage}
                resizeMode="cover"
              />
            </View>
            
            <View style={styles.eventDetailsContainer}>
              <View style={styles.eventDetailsHeader}>
                <Text style={styles.eventDetailsTitle}>{selectedEvent.event}</Text>
                <Text style={styles.eventDetailsTime}>{selectedEvent.time}</Text>
              </View>
              
              <ScrollView style={styles.eventDetailsScroll}>
                <Text style={styles.eventDescription}>{selectedEvent.details}</Text>
              </ScrollView>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

// Registration Component
const Registration = ({ addParticipant }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [team, setTeam] = useState('');
  
  const handleSubmit = () => {
    if (name && email && team) {
      addParticipant({ name, email, team });
      setName('');
      setEmail('');
      setTeam('');
      alert('Registration successful!');
    } else {
      alert('Please fill in all fields');
    }
  };
  
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Participant Registration</Text>
      <View style={styles.formContainer}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Full Name:</Text>
          <TextInput 
            style={styles.input} 
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email:</Text>
          <TextInput 
            style={styles.input} 
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Team:</Text>
          <TextInput 
            style={styles.input} 
            value={team}
            onChangeText={setTeam}
            placeholder="Enter your team name"
          />
        </View>
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitBtnText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Leaderboard Component
const Leaderboard = ({ participants }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Live Leaderboard</Text>
      <View style={styles.leaderboardContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Rank</Text>
          <Text style={[styles.tableHeaderCell, { flex: 3 }]}>Name</Text>
          <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Team</Text>
          <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Points</Text>
        </View>
        <ScrollView style={styles.tableBody}>
          {participants.map((participant, index) => (
            <View key={participant.id} style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 1 }]}>{index + 1}</Text>
              <Text style={[styles.tableCell, { flex: 3 }]}>{participant.name}</Text>
              <Text style={[styles.tableCell, { flex: 2 }]}>{participant.team}</Text>
              <Text style={[styles.tableCell, { flex: 2 }]}>{participant.points}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

// Results Component
const Results = ({ participants, updateScore }) => {
  const [participantName, setParticipantName] = useState('');
  const [points, setPoints] = useState('');
  // Predefined events for simplicity. Could be dynamic based on Schedule items.
  const events = ['Event 1: Swimming', 'Event 2: Running', 'Event 3: Cycling'];
  const [selectedEvent, setSelectedEvent] = useState(events[0]); // Default to first event

  const handleSubmit = () => {
    const participant = participants.find(p => p.name.toLowerCase() === participantName.toLowerCase());
    const pointsToAdd = parseInt(points, 10);

    if (!participant) {
      alert('Participant not found. Please check the name.');
      return;
    }
    if (isNaN(pointsToAdd)) {
      alert('Please enter a valid number for points.');
      return;
    }
    if (!selectedEvent) {
      alert('Please select an event.');
      return;
    }

    // Pass participantId, points, and optionally the event name
    updateScore(participant.id, pointsToAdd, selectedEvent);
    setParticipantName('');
    setPoints('');
    // Optionally reset selectedEvent or provide feedback
  };

  return (
    <View style={styles.section}> 
      <Text style={styles.sectionTitle}>Register Results</Text>
      <View style={styles.formContainer}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Participant Name:</Text>
          <TextInput 
            style={styles.input} 
            value={participantName}
            onChangeText={setParticipantName}
            placeholder="Enter participant's full name"
          />
        </View>
        
        {/* Basic Picker for Events - For a true dropdown, a custom component or library is needed */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Event:</Text>
          {/* This is a very basic way to show a picker. For better UX, use a proper dropdown component */}
          <View style={styles.pickerContainer}> 
            {events.map(event => (
              <TouchableOpacity 
                key={event} 
                style={[
                  styles.pickerButton,
                  selectedEvent === event && styles.pickerButtonActive
                ]}
                onPress={() => setSelectedEvent(event)}
              >
                <Text style={styles.pickerButtonText}>{event}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Points Awarded:</Text>
          <TextInput 
            style={styles.input} 
            value={points}
            onChangeText={setPoints}
            placeholder="Enter points"
            keyboardType="number-pad"
          />
        </View>
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitBtnText}>Submit Score</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Main App
const App = () => {
  const [activeSection, setActiveSection] = useState('schedule');
  const [participants, setParticipants] = useState([]);
  
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
        <NavBar activeSection={activeSection} setActiveSection={setActiveSection} />
        <ScrollView style={styles.mainScrollContainer}>
          {activeSection === 'schedule' && <Schedule />}
          {activeSection === 'registration' && <Registration addParticipant={addParticipant} />}
          {activeSection === 'leaderboard' && <Leaderboard participants={[...participants].sort((a, b) => b.points - a.points)} />}
          {activeSection === 'results' && <Results participants={participants} updateScore={updateScore} />}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

// Define base style properties shared by sections to avoid repetition
const baseSectionStyle = {
  borderRadius: 8,
  padding: 24,
  marginVertical: 16,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 10,
  elevation: 3,
};

const styles = StyleSheet.create({
  appBackgroundImage: {
    flex: 1,
    backgroundColor: 'rgba(44, 62, 80, 0.75)', // This acts as an overlay/tint on the image
                                                // Adjust opacity (0.0 to 1.0) as needed
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: 'transparent', // Important: SafeAreaView should be transparent to see ImageBackground
  },
  mainScrollContainer: { // Renamed from 'main' to avoid confusion, keeps original padding
    flex: 1,
    padding: 16,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#A0522D', // Sienna - Theme color
    borderBottomWidth: 2,
    borderBottomColor: '#793D23', // Darker Sienna for border
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F5F5DC', // Beige - Theme color
  },
  navLinks: {
    flexDirection: 'row',
  },
  navBtn: {
    marginLeft: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  navBtnActive: {
    backgroundColor: '#793D23', // Darker Sienna - Theme color for active
  },
  navBtnText: {
    fontSize: 17,
    color: '#F5F5DC', // Beige - Theme color
    fontWeight: '500',
  },
  section: { // Common style for other sections (Meals, Registration, Leaderboard)
    ...baseSectionStyle,
    backgroundColor: '#3E4E5E', // Muted dark blue-grey
  },
  scheduleSectionContainer: { // Specific style for Schedule section container
    ...baseSectionStyle,
    backgroundColor: 'transparent',
  },
  sectionTitle: {
    fontSize: 28, // Increased size
    fontWeight: 'bold',
    marginBottom: 25, // Increased margin
    color: '#F5F5DC', // Beige - Theme color
    textAlign: 'center',
  },
  // Schedule styles
  scheduleContainer: {
    gap: 12,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#5D4037', // Dark Brown
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  scheduleTime: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F5F5DC', // Beige
    width: 80,
  },
  scheduleContent: {
    flex: 1,
  },
  scheduleEvent: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFF8DC', // Cornsilk
    marginBottom: 4,
  },
  scheduleDetailsHint: {
    fontSize: 14,
    color: '#A0522D', // Sienna - to make it stand out a bit
    marginTop: 5,
  },
  eventDetailsModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(44, 62, 80, 0.9)', // Darker, semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  eventDetailsContent: {
    backgroundColor: '#34495e', // Section-like background
    padding: 0,
    borderRadius: 12,
    width: '90%',
    maxWidth: 500,
    maxHeight: '80%',
    position: 'relative',
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#A0522D', // Sienna
    padding: 8,
    borderRadius: 15,
    zIndex: 2, // Ensure it's above other content
  },
  closeButtonText: {
    color: '#F5F5DC', // Beige
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventImageContainer: {
    width: '100%',
    height: 200,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  eventDetailsContainer: {
    padding: 16, 
    paddingTop: 0,
    flex: 1,
  },
  eventDetailsHeader: {
    paddingBottom: 8,
  },
  eventDetailsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F5F5DC', // Beige
    marginBottom: 5,
  },
  eventDetailsTime: {
    fontSize: 16,
    color: '#FFF8DC', // Cornsilk
    marginBottom: 15,
  },
  eventDetailsScroll: {
    flex: 1,
  },
  eventDescription: {
    fontSize: 16,
    color: '#F5F5DC', // Beige
    lineHeight: 24,
  },
  // Registration styles
  formContainer: {
    maxWidth: 500,
    alignSelf: 'center',
    width: '100%',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    color: '#F5F5DC', // Beige - Theme color for better contrast
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#A0522D', // Sienna border
    padding: 12, // Increased padding
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: '#FFF8DC', // Cornsilk background for input
    color: '#5D4037', // Dark Brown text
    marginBottom: 15, // Spacing
  },
  submitBtn: {
    backgroundColor: '#A0522D', // Sienna background
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10, // Spacing
  },
  submitBtnText: {
    color: '#F5F5DC', // Beige text
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Leaderboard styles
  leaderboardContainer: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#A0522D', // Sienna
    paddingBottom: 10,
    marginBottom: 10,
    backgroundColor: '#5D4037', // Dark Brown for header background
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#F5F5DC', // Beige
    textAlign: 'center',
  },
  tableBody: {
    maxHeight: 400,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#5D4037', // Dark Brown for row separator
  },
  tableCell: {
    fontSize: 15,
    color: '#FFF8DC', // Cornsilk for cell text
    textAlign: 'center',
  },
  // Styles for the basic event picker in Results section
  pickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 15,
  },
  pickerButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#5D4037', // Dark Brown
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#A0522D', // Sienna
  },
  pickerButtonActive: {
    backgroundColor: '#A0522D', // Sienna for active
    borderColor: '#F5F5DC', // Beige border for active
  },
  pickerButtonText: {
    color: '#F5F5DC', // Beige
    fontSize: 14,
  },
});

export default App;
