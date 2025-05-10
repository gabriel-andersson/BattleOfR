import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  TextInput,
  Image
} from 'react-native';
import './index.css'; // Import global CSS

// Navigation component
const NavBar = ({ activeSection, setActiveSection }) => {
  return (
    <View style={styles.navbar}>
      <Text style={styles.logo}>Pentathlon Event</Text>
      <View style={styles.navLinks}>
        <TouchableOpacity 
          style={[styles.navBtn, activeSection === 'schedule' && styles.navBtnActive]} 
          onPress={() => setActiveSection('schedule')}
        >
          <Text style={styles.navBtnText}>Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navBtn, activeSection === 'meals' && styles.navBtnActive]} 
          onPress={() => setActiveSection('meals')}
        >
          <Text style={styles.navBtnText}>Meals</Text>
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
    <View style={styles.section}>
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

// Meals Component
const Meals = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Meal Schedule</Text>
      <View style={styles.mealsContainer}>
        <View style={styles.mealCard}>
          <Text style={styles.mealTitle}>Lunch Menu</Text>
          <View style={styles.mealList}>
            <Text style={styles.mealItem}>• Grilled Chicken Salad</Text>
            <Text style={styles.mealItem}>• Vegetable Pasta</Text>
            <Text style={styles.mealItem}>• Fresh Fruit</Text>
            <Text style={styles.mealItem}>• Water & Sports Drinks</Text>
          </View>
        </View>
        <View style={styles.mealCard}>
          <Text style={styles.mealTitle}>Dinner Menu</Text>
          <View style={styles.mealList}>
            <Text style={styles.mealItem}>• Grilled Salmon</Text>
            <Text style={styles.mealItem}>• Quinoa Bowl</Text>
            <Text style={styles.mealItem}>• Mixed Vegetables</Text>
            <Text style={styles.mealItem}>• Dessert Selection</Text>
          </View>
        </View>
      </View>
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
        { id: 1, name: 'John Doe', email: 'john@example.com', team: 'Team A', points: 100 },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', team: 'Team B', points: 85 },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', team: 'Team A', points: 95 }
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
      points: 0
    };
    
    const updatedParticipants = [...participants, newParticipant];
    setParticipants(updatedParticipants);
    localStorage.setItem('participants', JSON.stringify(updatedParticipants));
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <NavBar activeSection={activeSection} setActiveSection={setActiveSection} />
      <ScrollView style={styles.main}>
        {activeSection === 'schedule' && <Schedule />}
        {activeSection === 'meals' && <Meals />}
        {activeSection === 'registration' && <Registration addParticipant={addParticipant} />}
        {activeSection === 'leaderboard' && <Leaderboard participants={[...participants].sort((a, b) => b.points - a.points)} />}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  main: {
    flex: 1,
    padding: 16,
  },
  navbar: {
    backgroundColor: '#2c3e50',
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  logo: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
  },
  navLinks: {
    flexDirection: 'row',
    gap: 8,
  },
  navBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  navBtnActive: {
    backgroundColor: '#3498db',
  },
  navBtnText: {
    color: 'white',
    fontWeight: '500',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 24,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 24,
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
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  scheduleTime: {
    fontWeight: '700',
    width: 80,
    color: '#3498db',
  },
  scheduleContent: {
    flex: 1,
  },
  scheduleEvent: {
    fontWeight: '500',
    color: '#2c3e50',
    marginBottom: 4,
    fontSize: 16,
  },
  scheduleDetailsHint: {
    color: '#3498db',
    fontSize: 12,
    fontWeight: '500',
  },
  eventDetailsModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  eventDetailsContent: {
    backgroundColor: 'white',
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
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
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
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  eventDetailsTime: {
    fontSize: 16,
    color: '#3498db',
    fontWeight: '500',
  },
  eventDetailsScroll: {
    flex: 1,
  },
  eventDescription: {
    color: '#2c3e50',
    fontSize: 16,
    lineHeight: 24,
  },
  // Meals styles
  mealsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  mealCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    width: '48%',
    minWidth: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 16,
  },
  mealList: {
    gap: 8,
  },
  mealItem: {
    marginBottom: 8,
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
    color: '#2c3e50',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
  },
  submitBtn: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  submitBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  // Leaderboard styles
  leaderboardContainer: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableHeaderCell: {
    fontWeight: '600',
  },
  tableBody: {
    maxHeight: 400,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tableCell: {
  },
});

export default App;
