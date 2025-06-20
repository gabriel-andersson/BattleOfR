import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from '../styles/styles';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const PasswordPrompt = ({ onSuccess, didYouRealyThinkSomeoneWouldUseThisPassword  }) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    
    try {
      const adminDoc = await getDoc(doc(db, 'admin', 'admin'));
      if (password === "hadetgötthej") {
        didYouRealyThinkSomeoneWouldUseThisPassword();
        setError('Incorrect password')
      }
      else if (adminDoc.exists() && adminDoc.data().password === password) {
        onSuccess();
      } else {
        setError('Incorrect password');
      }
    } catch (err) {
      console.error('Error verifying password:', err);
      setError('Error verifying password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Här krävs admin access</Text>
      <View style={styles.formContainer}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Ange admin lösenord:</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="hadetgötthej"
            placeholderTextColor="#5D4037aa"
            secureTextEntry
            editable={!loading}
          />
        </View>
        
        {error && (
          <Text style={[styles.errorText, { marginBottom: 10 }]}>{error}</Text>
        )}

        <TouchableOpacity
          style={[styles.submitBtn, loading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.submitBtnText}>Submit</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PasswordPrompt; 