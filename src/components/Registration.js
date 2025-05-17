import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import styles from '../styles/styles';

const Registration = ({ addParticipant }) => {
  const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  const [team, setTeam] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // Four hardcoded teams
  const teams = [
    'Team Rossö',
    'Team Strömstad',
    'Team Skee',
    'Team Tjärnö'
  ];
  
  const handleSubmit = async () => {
    if (name && team) {
      // If name already exists.. do not allow it. 
      try {
        setSubmitting(true);
        await addParticipant({ name, team });
        setName('');
        // setEmail('');
        setTeam('');
        alert('Otroligt! Du är nu anmäld till Battle of Rossö. ');
      } catch (error) {
        console.error("Error registering participant:", error);
        alert('Registration failed. Please try again.');
      } finally {
        setSubmitting(false);
      }
    } else {
      alert('Fyll i alla fält');
    }
  };
  
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const selectTeam = (selectedTeam) => {
    setTeam(selectedTeam);
    setDropdownOpen(false);
  };

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
  
  return (
    <View style={[styles.section, { zIndex: 1 }]}>
      <Text style={styles.sectionTitle}>Deltagar Registrering</Text>
      <View style={[styles.formContainer, { zIndex: 1 }]}>
        <View style={[styles.formGroup, { zIndex: 2 }]}>
          <Text style={styles.label}>Fullständigt Namn:</Text>
          <TextInput 
            style={styles.input} 
            value={name}
            onChangeText={setName}
            placeholder="Gustav Valdemar Olsson"
            placeholderTextColor="#5D4037aa"
            editable={!submitting}
          />
        </View>
        {/* <View style={styles.formGroup}>
          <Text style={styles.label}>Email:</Text>
          <TextInput 
            style={styles.input} 
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor="#5D4037aa"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!submitting}
          />
        </View> */}
        <View style={[styles.formGroup, { zIndex: 3 }]}>
          <Text style={styles.label}>Välj Lag:</Text>
          <View style={[styles.dropdownContainer, { zIndex: 1000 }]}>
            <TouchableOpacity 
              style={[dropdownStyles.trigger, dropdownOpen && dropdownStyles.menuItemActive]} 
              onPress={toggleDropdown}
              disabled={submitting}
            >
              <Text style={dropdownStyles.triggerText}>
                {team || 'Välj ett lag'}
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
                  {teams.map((teamOption, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        dropdownStyles.menuItem,
                        team === teamOption && dropdownStyles.menuItemActive,
                        index === teams.length - 1 && { borderBottomWidth: 0 }
                      ]}
                      onPress={() => selectTeam(teamOption)}
                    >
                      <Text 
                        style={[
                          dropdownStyles.menuItemText,
                          team === teamOption && dropdownStyles.menuItemTextActive
                        ]}
                      >
                        {teamOption}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        </View>
        <View style={{ zIndex: 1 }}>
          <TouchableOpacity 
            style={[styles.submitBtn, submitting && styles.disabledButton]} 
            onPress={handleSubmit}
            disabled={submitting}
            activeOpacity={submitting ? 1 : 0.7}
          >
            {submitting ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.submitBtnText}>Register</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Registration; 