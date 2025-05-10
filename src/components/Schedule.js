import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import styles, { isSmallScreen } from '../styles/styles';

const Schedule = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
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
  
  const scheduleItems = [
    { 
      time: '09:00', 
      event: 'Opening Ceremony',
      details: 'Welcome to our Pentathlon Event! The opening ceremony will include speeches from organizers, introduction of teams, and a brief overview of today\'s events.',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    { 
      time: '10:00', 
      event: 'Event 1: Swimming',
      details: '200m freestyle swimming competition at the Olympic-sized pool. Participants must arrive 30 minutes before the event for warm-up.',
      image: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    { 
      time: '12:00', 
      event: 'Lunch Break',
      details: 'A healthy lunch will be served at the main cafeteria. Vegetarian and vegan options are available.',
      image: 'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    { 
      time: '14:00', 
      event: 'Event 2: Running',
      details: '3000m cross-country running. The course will go through the park and surrounding areas. Water stations are available every 1km.',
      image: 'https://images.unsplash.com/photo-1486218119243-13883505764c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    { 
      time: '16:00', 
      event: 'Event 3: Cycling',
      details: '10km cycling race on the city circuit. Helmets are mandatory. Participants must bring their own bikes or reserve one in advance.',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    { 
      time: '18:00', 
      event: 'Dinner',
      details: 'A celebratory dinner will be served at the main hall, featuring a variety of dishes to accommodate all dietary requirements.',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ];
  
  return (
    <View style={styles.scheduleSectionContainer}>
      <Text style={styles.sectionTitle}>Today's Schedule</Text>
      <View style={styles.scheduleContainer}>
        {scheduleItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.scheduleItem}
            onPress={() => setSelectedEvent(item)}
            activeOpacity={0.7} // Add touch feedback
          >
            <Text style={styles.scheduleTime}>{item.time}</Text>
            <View style={styles.scheduleContent}>
              <Text style={styles.scheduleEvent}>{item.event}</Text>
              <Text style={styles.scheduleDetailsHint}>Tap for details →</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {selectedEvent && (
        <View style={styles.eventDetailsModal}>
          <View style={[
            styles.eventDetailsContent,
            smallScreen && styles.eventDetailsContentMobile
          ]}>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setSelectedEvent(null)}
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }} // Expand touch area
              activeOpacity={0.7} // Add touch feedback
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            
            <View style={styles.eventImageContainer}>
              <Image 
                source={{ uri: selectedEvent.image }} 
                style={styles.eventImage}
                resizeMode="cover"
              />
            </View>
            
            <View style={styles.eventDetailsContainer}>
              <View style={styles.eventDetailsHeader}>
                <Text style={styles.eventDetailsTitle}>{selectedEvent.event}</Text>
                <Text style={styles.eventDetailsTime}>{selectedEvent.time}</Text>
              </View>
              
              <ScrollView style={styles.eventDetailsScroll}>
                <Text style={styles.eventDescription}>{selectedEvent.details}</Text>
              </ScrollView>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Schedule; 