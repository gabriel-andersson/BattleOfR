import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

const Results = ({ participants, updateScore }) => {
  const [participantName, setParticipantName] = useState('');
  const [points, setPoints] = useState('');
  const events = ['Event 1: Swimming', 'Event 2: Running', 'Event 3: Cycling'];
  const [selectedEvent, setSelectedEvent] = useState(events[0]);

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
            placeholderTextColor="#5D4037aa" // More visible placeholder
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Event:</Text>
          <View style={styles.pickerContainer}> 
            {events.map(event => (
              <TouchableOpacity 
                key={event} 
                style={[
                  styles.pickerButton,
                  selectedEvent === event && styles.pickerButtonActive
                ]}
                onPress={() => setSelectedEvent(event)}
                activeOpacity={0.7} // Add touch feedback
              >
                <Text style={[
                  styles.pickerButtonText,
                  selectedEvent === event && styles.pickerButtonTextActive
                ]}>
                  {event}
                </Text>
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
            placeholderTextColor="#5D4037aa" // More visible placeholder
            keyboardType="number-pad"
          />
        </View>
        <TouchableOpacity 
          style={styles.submitBtn} 
          onPress={handleSubmit}
          activeOpacity={0.7} // Add touch feedback
        >
          <Text style={styles.submitBtnText}>Submit Score</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Results; 