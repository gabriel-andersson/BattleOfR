import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import styles, { isSmallScreen } from '../styles/styles';
import golf_ö_image from '../images/golfö2.png'
import golf_flagga from '../images/golf_2.jpg'
import pilbåge_v1 from '../images/arrows2.png'
// import pilbåge_v2 from '../images/pilbåge1.png'
import surf from '../images/surf1.png'
import saw from '../images/saw.png'
import elda_snöre from '../images/elda_snöre3.png'
import spik from '../images/spik.png'

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
      time: '11:30', 
      event: 'Öppnings Cermoni',
      details: 'Welcome to our Pentathlon Event! The opening ceremony will include speeches from organizers, introduction of teams, and a brief overview of today\'s events.',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'general'
    },
    { 
      time: '12:30', 
      event: 'Game 1: Ö-golf',
      details: 'Ett slag, ett mål: en ö. Kom inte törstig för här vill du undvika vatten. Öl tillhandahålls som hjälpmedel. Poäng ges för att landa bollen på ön.',
      image: golf_ö_image,
      category: 'precision'
    },
    { 
      time: '13:00', 
      event: 'Game 2: Närmast flaggan',
      details: 'En klassiker. Slå ett slag, kom närmast flaggan. Inga puttar, inga greener',
      image: golf_flagga,
      category: 'precision'
    },
    { 
      time: '13:30', 
      event: 'Game 3: Pilbågsskytte',
      details: 'Klassiskt pilbågsskytte mot tavla.  ',
      image: pilbåge_v1,
      category: 'precision'
    },
    { 
      time: '14:00', 
      event: 'Game 4: Skrotholmen Surf',
      details: 'Över vattnet, bygga torn, tillbaka.',
      image: surf,
      category: 'brunk'
    },
    { 
      time: '15:00', 
      event: 'Game 5: Spika spik',
      details: 'Hammare, spik.... ',
      image: spik,
      category: 'brunk'
    },
    { 
      time: '15:30', 
      event: 'Game 6: Såga stock',
      details: 'Nu kommer äntligen fogsvansen fram.',
      image: saw,
      category: 'brunk'
    },
    { 
      time: '16:00', 
      event: 'Game 7: Elda snöre',
      details: 'Få upp eld med tändstål, elda av snöret så snabbt som möjligt.  ',
      image: elda_snöre,
      category: 'överlevnad'
    },
    { 
      time: '17:00', 
      event: 'Middag och Cermoni',
      details: 'A celebratory dinner will be served at the main hall, featuring a variety of dishes to accommodate all dietary requirements. (Körv).',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'general'
    }
    // { 
    //   time: '12:00', 
    //   event: 'Lunch Break',
    //   details: 'A healthy lunch will be served at the main cafeteria. Vegetarian and vegan options are available.',
    //   image: 'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    // },
    // { 
    //   time: '14:00', 
    //   event: 'Event 2: Running',
    //   details: '3000m cross-country running. The course will go through the park and surrounding areas. Water stations are available every 1km.',
    //   image: 'https://images.unsplash.com/photo-1486218119243-13883505764c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    // },
    // { 
    //   time: '16:00', 
    //   event: 'Event 3: Cycling',
    //   details: '10km cycling race on the city circuit. Helmets are mandatory. Participants must bring their own bikes or reserve one in advance.',
    //   image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    // },
  ];
  
  // Group schedule items by category
  const groupedScheduleItems = {
    general: scheduleItems.filter(item => item.category === 'general'),
    precision: scheduleItems.filter(item => item.category === 'precision'),
    brunk: scheduleItems.filter(item => item.category === 'brunk'),
    överlevnad: scheduleItems.filter(item => item.category === 'överlevnad')
  };

  return (
    <View style={styles.scheduleSectionContainer}>
      <Text style={styles.sectionTitle}>Vad händer under dagen?</Text>
      <View style={styles.scheduleContainer}>
        {/* General events (opening and closing ceremonies) */}
        {groupedScheduleItems.general.filter(item => item.time === '11:30').map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.scheduleItem}
            onPress={() => setSelectedEvent(item)}
            activeOpacity={0.7}
          >
            <Text style={styles.scheduleTime}>{item.time}</Text>
            <View style={styles.scheduleContent}>
              <Text style={styles.scheduleEvent}>{item.event}</Text>
              <Text style={styles.scheduleDetailsHint}>Tap for details →</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Precision Category */}
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>Precision</Text>
          {groupedScheduleItems.precision.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.scheduleItem}
              onPress={() => setSelectedEvent(item)}
              activeOpacity={0.7}
            >
              <Text style={styles.scheduleTime}>{item.time}</Text>
              <View style={styles.scheduleContent}>
                <Text style={styles.scheduleEvent}>{item.event}</Text>
                <Text style={styles.scheduleDetailsHint}>Tap for details →</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Brunk Category */}
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>Brunk</Text>
          {groupedScheduleItems.brunk.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.scheduleItem}
              onPress={() => setSelectedEvent(item)}
              activeOpacity={0.7}
            >
              <Text style={styles.scheduleTime}>{item.time}</Text>
              <View style={styles.scheduleContent}>
                <Text style={styles.scheduleEvent}>{item.event}</Text>
                <Text style={styles.scheduleDetailsHint}>Tap for details →</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Överlevnad Category */}
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>Överlevnad</Text>
          {groupedScheduleItems.överlevnad.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.scheduleItem}
              onPress={() => setSelectedEvent(item)}
              activeOpacity={0.7}
            >
              <Text style={styles.scheduleTime}>{item.time}</Text>
              <View style={styles.scheduleContent}>
                <Text style={styles.scheduleEvent}>{item.event}</Text>
                <Text style={styles.scheduleDetailsHint}>Tap for details →</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Final ceremony */}
        {groupedScheduleItems.general.filter(item => item.time === '17:00').map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.scheduleItem}
            onPress={() => setSelectedEvent(item)}
            activeOpacity={0.7}
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