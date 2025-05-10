import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import styles, { isSmallScreen } from '../styles/styles';

const Leaderboard = ({ participants }) => {
  const [smallScreen, setSmallScreen] = useState(isSmallScreen());
  
  // Handle screen resize
  useEffect(() => {
    const handleDimensionsChange = ({ window }) => {
      setSmallScreen(window.width < 768);
    };
    
    // Use Dimensions.addEventListener
    const subscription = Dimensions.addEventListener('change', handleDimensionsChange);
    
    // Return cleanup function
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Live Leaderboard</Text>
      <View style={styles.leaderboardContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, { flex: smallScreen ? 0.5 : 1 }]}>Rank</Text>
          <Text style={[styles.tableHeaderCell, { flex: smallScreen ? 2 : 3 }]}>Name</Text>
          <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Team</Text>
          <Text style={[styles.tableHeaderCell, { flex: smallScreen ? 1 : 2 }]}>Points</Text>
        </View>
        <ScrollView style={styles.tableBody}>
          {participants.map((participant, index) => (
            <View key={participant.id} style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: smallScreen ? 0.5 : 1 }]}>{index + 1}</Text>
              <Text style={[styles.tableCell, { flex: smallScreen ? 2 : 3 }]}>{participant.name}</Text>
              <Text style={[styles.tableCell, { flex: 2 }]}>{participant.team}</Text>
              <Text style={[styles.tableCell, { flex: smallScreen ? 1 : 2 }]}>{participant.points}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Leaderboard; 