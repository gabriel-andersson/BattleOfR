import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import styles from '../styles/styles';

const Results = ({ participants, updateScore, loading }) => {
  const [selectedParticipantId, setSelectedParticipantId] = useState('');
  const [points, setPoints] = useState('');
  const events = [
      'Game 1: Ö-golf', 
      'Game 2: Närmast flaggan', 
      'Game 3: Pilbågsskytte',
      'Game 4: Skrotholmen Surf', 
      'Game 5: Spika spik', 
      'Game 6: Såga stock',
      'Game 7: Elda snöre',
  ];
  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const [submitting, setSubmitting] = useState(false);

  // For debugging
  useEffect(() => {
    console.log("All participants:", participants);
    console.log("Selected participant ID:", selectedParticipantId);
    
    if (selectedParticipantId) {
      const selected = participants.find(p => p.id === selectedParticipantId);
      console.log("Found participant:", selected);
    }
  }, [participants, selectedParticipantId]);

  const handleSubmit = async () => {
    if (loading) {
      alert('Please wait until data is loaded');
      return;
    }

    const pointsToAdd = parseInt(points, 10);

    if (!selectedParticipantId) {
      alert('Please select a participant.');
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
      await updateScore(selectedParticipantId, pointsToAdd, selectedEvent);
      setPoints('');
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
        <Text style={styles.sectionTitle}>Registrera resultat</Text>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Laddar deltagare...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.section}> 
      <Text style={styles.sectionTitle}>Registrera resultat</Text>
      <View style={styles.formContainer}>
        {/* Native select dropdown for participant selection */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Välj deltagare:</Text>
          
          {/* Use native HTML select for better compatibility */}
          <select
            style={{
              width: '100%',
              padding: 12,
              borderRadius: 5,
              border: selectedParticipantId ? '2px solid #A0522D' : '1px solid #A0522D',
              backgroundColor: '#FFF8DC',
              color: selectedParticipantId ? '#A0522D' : '#5D4037',
              fontSize: 16,
              fontWeight: selectedParticipantId ? 'bold' : 'normal',
              marginBottom: 15,
              cursor: 'pointer'
            }}
            value={selectedParticipantId}
            onChange={(e) => {
              console.log("Select changed to:", e.target.value);
              setSelectedParticipantId(e.target.value);
            }}
            disabled={submitting}
          >
            <option value="">Välj en deltagare</option>
            {participants.map((participant) => (
              <option key={participant.id} value={participant.id}>
                {participant.name} ({participant.team})
              </option>
            ))}
          </select>
        </View>
        
        {/* Game selection */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Game:</Text>
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
                activeOpacity={submitting ? 1 : 0.7}
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

        {/* Points input */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Resultat:</Text>
          <TextInput 
            style={styles.input} 
            value={points}
            onChangeText={setPoints}
            placeholder="Ange poäng"
            placeholderTextColor="#5D4037aa"
            keyboardType="number-pad"
            editable={!submitting}
          />
        </View>
        
        {/* Submit button */}
        <TouchableOpacity 
          style={[styles.submitBtn, submitting && styles.disabledButton]} 
          onPress={handleSubmit}
          activeOpacity={submitting ? 1 : 0.7}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.submitBtnText}>
              Registrera resultat
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Results; 