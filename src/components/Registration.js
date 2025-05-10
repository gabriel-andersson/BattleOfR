import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from '../styles/styles';

const Registration = ({ addParticipant }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [team, setTeam] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const handleSubmit = async () => {
    if (name && email && team) {
      try {
        setSubmitting(true);
        await addParticipant({ name, email, team });
        setName('');
        setEmail('');
        setTeam('');
        alert('Registration successful!');
      } catch (error) {
        console.error("Error registering participant:", error);
        alert('Registration failed. Please try again.');
      } finally {
        setSubmitting(false);
      }
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
            placeholderTextColor="#5D4037aa"
            editable={!submitting}
          />
        </View>
        <View style={styles.formGroup}>
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
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Team:</Text>
          <TextInput 
            style={styles.input} 
            value={team}
            onChangeText={setTeam}
            placeholder="Enter your team name"
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