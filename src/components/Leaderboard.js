import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import styles, { isSmallScreen } from '../styles/styles';

const Leaderboard = ({ participants, loading }) => {
  const [smallScreen, setSmallScreen] = useState(isSmallScreen());
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('total');
  const [viewMode, setViewMode] = useState('individual'); // 'individual' or 'team'
  
  // Define game events
  const gameEvents = [
    'Game 1: Ö-golf', 
    'Game 2: Närmast flaggan', 
    'Game 3: Pilbågsskytte',
    'Game 4: Skrotholmen Surf', 
    'Game 5: Spika spik', 
    'Game 6: Såga stock',
    'Game 7: Elda snöre',
  ];
  
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

  // For debugging - check if data is available
  useEffect(() => {
    console.log("Leaderboard component - participants:", participants);
    console.log("Leaderboard component - loading state:", loading);
    
    try {
      // Validate that participants is an array
      if (participants && !Array.isArray(participants)) {
        setError("Participants data is not in the expected format");
        console.error("Participants data is not an array:", participants);
      } else {
        setError(null);
      }
    } catch (err) {
      setError("Error processing participants data");
      console.error("Error in Leaderboard component:", err);
    }
  }, [participants, loading]);

  // Get team data by aggregating individual scores
  const getTeamData = () => {
    if (!participants || participants.length === 0) return [];
    
    const teams = {};
    
    participants.forEach(participant => {
      const teamName = participant.team;
      if (!teamName) return;
      
      if (!teams[teamName]) {
        teams[teamName] = {
          name: teamName,
          points: 0,
          events: {}
        };
      }
      
      // Add total points
      teams[teamName].points += participant.points || 0;
      
      // Add event-specific points
      if (participant.events) {
        Object.entries(participant.events).forEach(([eventName, points]) => {
          if (!teams[teamName].events[eventName]) {
            teams[teamName].events[eventName] = 0;
          }
          teams[teamName].events[eventName] += points;
        });
      }
    });
    
    return Object.values(teams);
  };

  // Sort participants or teams for the selected game or by total points
  const getSortedParticipants = () => {
    if (viewMode === 'individual') {
      if (!participants || participants.length === 0) return [];
      
      if (activeTab === 'total') {
        return [...participants].sort((a, b) => b.points - a.points);
      } else {
        return [...participants].sort((a, b) => {
          const aPoints = a.events && a.events[activeTab] ? a.events[activeTab] : 0;
          const bPoints = b.events && b.events[activeTab] ? b.events[activeTab] : 0;
          return bPoints - aPoints;
        });
      }
    } else { // Team view
      const teamData = getTeamData();
      
      if (activeTab === 'total') {
        return teamData.sort((a, b) => b.points - a.points);
      } else {
        return teamData.sort((a, b) => {
          const aPoints = a.events && a.events[activeTab] ? a.events[activeTab] : 0;
          const bPoints = b.events && b.events[activeTab] ? b.events[activeTab] : 0;
          return bPoints - aPoints;
        });
      }
    }
  };

  if (error) {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Live Resultat</Text>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <Text style={styles.errorSubtext}>Please check the console for details.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Live Resultat</Text>
      
      {/* View mode toggle */}
      <View style={styles.viewModeContainer}>
        <TouchableOpacity 
          style={[styles.viewModeButton, viewMode === 'individual' && styles.viewModeButtonActive]}
          onPress={() => setViewMode('individual')}
        >
          <Text style={[styles.viewModeButtonText, viewMode === 'individual' && styles.viewModeButtonTextActive]}>
            Individuellt
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.viewModeButton, viewMode === 'team' && styles.viewModeButtonActive]}
          onPress={() => setViewMode('team')}
        >
          <Text style={[styles.viewModeButtonText, viewMode === 'team' && styles.viewModeButtonTextActive]}>
            Lag
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Tab navigation */}
      <View style={styles.pickerContainer}>
        <TouchableOpacity 
          style={[styles.pickerButton, activeTab === 'total' && styles.pickerButtonActive]}
          onPress={() => setActiveTab('total')}
        >
          <Text style={[styles.pickerButtonText, activeTab === 'total' && styles.pickerButtonTextActive]}>
            Total poäng
          </Text>
        </TouchableOpacity>
        
        {gameEvents.map(event => (
          <TouchableOpacity 
            key={event}
            style={[styles.pickerButton, activeTab === event && styles.pickerButtonActive]}
            onPress={() => setActiveTab(event)}
          >
            <Text style={[styles.pickerButtonText, activeTab === event && styles.pickerButtonTextActive]}>
              {event.split(':')[0]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.leaderboardContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, { flex: smallScreen ? 0.5 : 1 }]}>Placering</Text>
          <Text style={[styles.tableHeaderCell, { flex: smallScreen ? 2 : 3 }]}>
            {viewMode === 'individual' ? 'Namn' : 'Lag'}
          </Text>
          {viewMode === 'individual' && (
            <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Lag</Text>
          )}
          <Text style={[styles.tableHeaderCell, { flex: smallScreen ? 1 : 2 }]}>
            {activeTab === 'total' ? 'Poäng' : 'Game Points'}
          </Text>
        </View>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingText}>Laddar deltagare...</Text>
            <Text style={styles.loadingSubtext}>Kolla konsolen för att se progress.</Text>
          </View>
        ) : (
          <ScrollView style={styles.tableBody}>
            {getSortedParticipants().length === 0 ? (
              <View style={styles.emptyStateContainer}>
                <Text style={styles.emptyStateText}>Inga data hittades</Text>
              </View>
            ) : (
              getSortedParticipants().map((item, index) => (
                <View key={viewMode === 'individual' ? item.id : item.name} style={styles.tableRow}>
                  <Text style={[styles.tableCell, { flex: smallScreen ? 0.5 : 1 }]}>{index + 1}</Text>
                  <Text style={[styles.tableCell, { flex: smallScreen ? 2 : 3 }]}>{item.name}</Text>
                  {viewMode === 'individual' && (
                    <Text style={[styles.tableCell, { flex: 2 }]}>{item.team}</Text>
                  )}
                  <Text style={[styles.tableCell, { flex: smallScreen ? 1 : 2 }]}>
                    {activeTab === 'total' 
                      ? item.points || 0 
                      : (item.events && item.events[activeTab]) || 0}
                  </Text>
                </View>
              ))
            )}
          </ScrollView>
        )}
      </View>
      
      {activeTab !== 'total' && (
        <View style={styles.leaderboardInfo}>
          <Text style={styles.leaderboardInfoText}>
            {activeTab}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Leaderboard; 