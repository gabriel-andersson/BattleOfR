import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import styles, { isSmallScreen } from '../styles/styles';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Leaderboard = ({ participants, loading, onRefresh }) => {
  const [smallScreen, setSmallScreen] = useState(isSmallScreen());
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('total');
  const [viewMode, setViewMode] = useState('individual');
  const [teams, setTeams] = useState([]);
  const [loadingTeams, setLoadingTeams] = useState(true);
  
  // Define game events
  const gameEvents = [
    'Game 1: Elda snöre',
    'Game 2: Ö-golf', 
    'Game 3: Närmast flaggan', 
    'Game 4: Pilbågsskytte',
    'Game 5: Puzzel',
    'Game 6: Skrotholmen Surf', 
    'Game 7: Spika spik', 
    'Game 8: Såga stock',
  ];
  
  // Fetch team data
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoadingTeams(true);
        const teamsRef = collection(db, 'teams');
        const teamsSnapshot = await getDocs(teamsRef);
        const teamsData = teamsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTeams(teamsData);
      } catch (err) {
        console.error("Error fetching teams:", err);
        setError("Error loading team data");
      } finally {
        setLoadingTeams(false);
      }
    };

    fetchTeams();
  }, []);

  // Handle screen resize
  useEffect(() => {
    const handleDimensionsChange = ({ window }) => {
      setSmallScreen(window.width < 768);
    };
    
    const subscription = Dimensions.addEventListener('change', handleDimensionsChange);
    
    return () => {
      subscription.remove();
    };
  }, []);

  // For debugging
  useEffect(() => {
    console.log("Leaderboard component - participants:", participants);
    console.log("Leaderboard component - teams:", teams);
    console.log("Leaderboard component - loading states:", { participants: loading, teams: loadingTeams });
    
    try {
      if (participants && !Array.isArray(participants)) {
        setError("Participants data is not in the expected format");
        console.error("Participants data is not an array:", participants);
      } else {
        setError(null);
      }
    } catch (err) {
      setError("Error processing data");
      console.error("Error in Leaderboard component:", err);
    }
  }, [participants, teams, loading, loadingTeams]);

  // Sort participants or teams for the selected game or by total points
  const getSortedData = () => {
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
      if (!teams || teams.length === 0) return [];
      
      if (activeTab === 'total') {
        return [...teams].sort((a, b) => b.points - a.points);
      } else {
        return [...teams].sort((a, b) => {
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

  if (true) { // temporary before teams are fixed!!!
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Håll i hatten.</Text>
        <View style={styles.headerContainer}>
          <Text style={styles.categoryTitle}>Här inväntas lagindelning innan någon resultatvy visas.</Text>
          {/* <Text style={styles.errorSubtext}>Please check the console for details.</Text> */}
        </View>
      </View>
    );
  }


  return (
    <View style={styles.section}>
      <View style={styles.headerContainer}>
        <Text style={styles.sectionTitle}>Live Resultat</Text>
        <TouchableOpacity 
          style={styles.refreshButton}
          onPress={onRefresh}
          disabled={loading || loadingTeams}
        >
          <Text style={styles.refreshButtonText}>↻ Uppdatera</Text>
        </TouchableOpacity>
      </View>
      
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
              {event.split(':')[1]}
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
        {(loading && viewMode === 'individual') || (loadingTeams && viewMode === 'team') ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingText}>Laddar data...</Text>
          </View>
        ) : (
          <ScrollView style={styles.tableBody}>
            {getSortedData().length === 0 ? (
              <View style={styles.emptyStateContainer}>
                <Text style={styles.emptyStateText}>Inga data hittades</Text>
              </View>
            ) : (
              getSortedData().map((item, index) => (
                <View key={item.id || item.name} style={styles.tableRow}>
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