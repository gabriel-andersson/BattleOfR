import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from '../styles/styles';

const Results = ({ participants, updateScore, loading }) => {
  const [participantName, setParticipantName] = useState('');
  const [points, setPoints] = useState('');
  const events = [
    'Game 1: Golf ö', 
    'Game 2: Golf flagga', 
    'Game 3: Pilbåge variant ett', 
    'Game 4: Pilbåge a la golf', 
    'Game 5: Skrotholmen Surf', 
    'Game 6: Elda snöre'
  ];
  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (loading) {
      alert('Please wait until data is loaded');
      return;
    }

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

    try {
      setSubmitting(true);
      // Pass participantId, points, and optionally the event name
      await updateScore(participant.id, pointsToAdd, selectedEvent);
      setParticipantName('');
      setPoints('');
      // Optionally reset selectedEvent or provide feedback
    } catch (error) {
      console.error("Error submitting score:", error);
      alert('Error submitting score. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.section}> 
        <Text style={styles.sectionTitle}>Register Results</Text>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Loading participants...</Text>
        </View>
      </View>
    );
  }

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
            editable={!submitting}
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
                  selectedEvent === event && styles.pickerButtonActive,
                  submitting && styles.disabledButton
                ]}
                onPress={() => !submitting && setSelectedEvent(event)}
                activeOpacity={submitting ? 1 : 0.7} // Add touch feedback
                disabled={submitting}
              >
                <Text style={[
                  styles.pickerButtonText,
                  selectedEvent === event && styles.pickerButtonTextActive,
                  submitting && styles.disabledText
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
            editable={!submitting}
          />
        </View>
        <TouchableOpacity 
          style={[styles.submitBtn, submitting && styles.disabledButton]} 
          onPress={handleSubmit}
          activeOpacity={submitting ? 1 : 0.7} // Add touch feedback
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.submitBtnText}>Submit Score</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Results; 