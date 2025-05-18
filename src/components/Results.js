import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import styles from '../styles/styles';
import PasswordPrompt from './PasswordPrompt';

const Results = ({ participants, updateScore, loading }) => {
  const [selectedParticipantId, setSelectedParticipantId] = useState('');
  const [points, setPoints] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scoringMode, setScoringMode] = useState('individual'); // 'individual' or 'team'
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const events = [
      'Game 1: Elda snöre',
      'Game 2: Ö-golf', 
      'Game 3: Närmast flaggan', 
      'Game 4: Pilbågsskytte',
      'Game 5: Puzzel',
      'Game 6: Skrotholmen Surf', 
      'Game 7: Spika spik', 
      'Game 8: Såga stock',
  ];
  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const [submitting, setSubmitting] = useState(false);

  // Check for existing session authentication
  useEffect(() => {
    const isAuth = sessionStorage.getItem('isAdminAuthenticated');
    if (isAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('isAdminAuthenticated', 'true');
  };

  // Get unique teams from participants
  const teams = [...new Set(participants.map(p => p.team))].filter(Boolean);
  const dropdownStyles = {
    trigger: {
      backgroundColor: '#F5F5DC',
      borderWidth: 1,
      borderColor: '#793D23',
      borderRadius: 8,
      padding: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    triggerText: {
      color: '#5D4037',
      fontSize: 16,
    },
    menu: {
      backgroundColor: '#F5F5DC',
      borderWidth: 1,
      borderColor: '#793D23',
      borderRadius: 8,
      marginTop: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      maxHeight: 200,
    },
    menuItem: {
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#DDD5C7',
    },
    menuItemActive: {
      backgroundColor: '#DDD5C7',
    },
    menuItemText: {
      color: '#5D4037',
      fontSize: 16,
    },
    menuItemTextActive: {
      color: '#793D23',
      fontWeight: 'bold',
    }
  };

  // For debugging
  useEffect(() => {
    console.log("All participants:", participants);
    console.log("Selected participant ID:", selectedParticipantId);
    console.log("Current scoring mode:", scoringMode);
    
    if (selectedParticipantId) {
      const selected = participants.find(p => p.id === selectedParticipantId);
      console.log("Found participant:", selected);
    }
  }, [participants, selectedParticipantId, scoringMode]);

  const handleSubmit = async () => {
    if (loading) {
      alert('Please wait until data is loaded');
      return;
    }

    const pointsToAdd = parseInt(points, 10);

    if (!selectedParticipantId) {
      alert('Please select a ' + (scoringMode === 'individual' ? 'participant' : 'team'));
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
      await updateScore(selectedParticipantId, pointsToAdd, selectedEvent, scoringMode);
      setPoints('');
    } catch (error) {
      console.error("Error submitting score:", error);
      alert('Error submitting score. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const selectParticipant = (id) => {
    setSelectedParticipantId(id);
    setDropdownOpen(false);
  };

  const getSelectedParticipantName = () => {
    if (scoringMode === 'team') {
      const team = teams.find(t => t === selectedParticipantId);
      return team || 'Välj ett lag';
    } else {
      const participant = participants.find(p => p.id === selectedParticipantId);
      return participant ? `${participant.name} (${participant.team})` : 'Välj en deltagare';
    }
  };
    // If not authenticated, show password prompt
    if (!isAuthenticated) {
      return <PasswordPrompt onSuccess={handleAuthSuccess} />;
    }
  

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
      
      {/* Scoring mode toggle */}
      <View style={styles.viewModeContainer}>
        <TouchableOpacity 
          style={[styles.viewModeButton, scoringMode === 'individual' && styles.viewModeButtonActive]}
          onPress={() => {
            setScoringMode('individual');
            setSelectedParticipantId('');
          }}
        >
          <Text style={[styles.viewModeButtonText, scoringMode === 'individual' && styles.viewModeButtonTextActive]}>
            Individuellt
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.viewModeButton, scoringMode === 'team' && styles.viewModeButtonActive]}
          onPress={() => {
            setScoringMode('team');
            setSelectedParticipantId('');
          }}
        >
          <Text style={[styles.viewModeButtonText, scoringMode === 'team' && styles.viewModeButtonTextActive]}>
            Lag
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <View style={[styles.formGroup, { zIndex: 3 }]}>
          <Text style={styles.label}>{scoringMode === 'individual' ? 'Välj deltagare:' : 'Välj lag:'}</Text>
          <View style={[styles.dropdownContainer, { zIndex: 1000 }]}>
            <TouchableOpacity 
              style={[dropdownStyles.trigger, dropdownOpen && dropdownStyles.menuItemActive]} 
              onPress={toggleDropdown}
              disabled={submitting}
            >
              <Text style={dropdownStyles.triggerText}>
                {getSelectedParticipantName()}
              </Text>
              <Text style={dropdownStyles.triggerText}>{dropdownOpen ? '▲' : '▼'}</Text>
            </TouchableOpacity>
            
            {dropdownOpen && (
              <View style={[
                dropdownStyles.menu,
                { 
                  position: 'absolute', 
                  top: '100%', 
                  left: 0, 
                  right: 0, 
                  zIndex: 9999,
                }
              ]}>
                <ScrollView 
                  nestedScrollEnabled={true}
                  keyboardShouldPersistTaps="handled"
                >
                  {scoringMode === 'individual' ? (
                    participants.map((participant, index) => (
                      <TouchableOpacity
                        key={participant.id}
                        style={[
                          dropdownStyles.menuItem,
                          selectedParticipantId === participant.id && dropdownStyles.menuItemActive,
                          index === participants.length - 1 && { borderBottomWidth: 0 }
                        ]}
                        onPress={() => selectParticipant(participant.id)}
                      >
                        <Text 
                          style={[
                            dropdownStyles.menuItemText,
                            selectedParticipantId === participant.id && dropdownStyles.menuItemTextActive
                          ]}
                        >
                          {participant.name} ({participant.team})
                        </Text>
                      </TouchableOpacity>
                    ))
                  ) : (
                    teams.map((team, index) => (
                      <TouchableOpacity
                        key={team}
                        style={[
                          dropdownStyles.menuItem,
                          selectedParticipantId === team && dropdownStyles.menuItemActive,
                          index === teams.length - 1 && { borderBottomWidth: 0 }
                        ]}
                        onPress={() => selectParticipant(team)}
                      >
                        <Text 
                          style={[
                            dropdownStyles.menuItemText,
                            selectedParticipantId === team && dropdownStyles.menuItemTextActive
                          ]}
                        >
                          {team}
                        </Text>
                      </TouchableOpacity>
                    ))
                  )}
                </ScrollView>
              </View>
            )}
          </View>
        </View>
        
        {/* Game selection */}
        <View style={[styles.formGroup, { zIndex: 2 }]}>
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
        <View style={[styles.formGroup, { zIndex: 1 }]}>
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
        <View style={{ zIndex: 1 }}>
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
    </View>
  );
};

export default Results; 