import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from '../styles/styles';

const Registration = ({ addParticipant }) => {
  const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  const [team, setTeam] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const handleSubmit = async () => {
    if (name &&  team) {
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
  
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Deltagar Registrering</Text>
      <View style={styles.formContainer}>
        <View style={styles.formGroup}>
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
        <View style={styles.formGroup}>
          <Text style={styles.label}>Ange Lagnamn:</Text>
          <TextInput 
            style={styles.input} 
            value={team}
            onChangeText={setTeam}
            placeholder="RossöLosers"
            placeholderTextColor="#5D4037aa"
            editable={!submitting}
          />
        </View>
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
  );
};

export default Registration; 