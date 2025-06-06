import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import styles, { isSmallScreen } from '../styles/styles';
import EventModal from './EventModal';
import golf_ö_image from '../images/golfö.png'
import golf_flagga from '../images/golf_2.jpg'
import pilbåge_v1 from '../images/arrows2.png'
// import pilbåge_v2 from '../images/pilbåge1.png'
import surf from '../images/surf.png'
import saw from '../images/saw.png'
import elda_snöre from '../images/elda_snöre16-9.png'
import spik from '../images/spik.png'
import korv from '../images/korv.png'
import grill from '../images/grill1.png'
import bastu from '../images/bastu.png'
import puzzle from '../images/puzzle.png'

const Schedule = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [smallScreen, setSmallScreen] = useState(isSmallScreen());
  
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

  const scheduleItems = [
    { 
      time: '11:30', 
      event: 'Öppnings Cermoni',
      details: 'Energiladdning inför dagen.  ',
      image: korv,
      category: 'pregame'
    },
    { 
      time: '12:30', 
      event: 'Elda snöre',
      details: 'Få upp eld med tändstål, elda av snöret så snabbt som möjligt.  ',
      image: elda_snöre,
      category: 'överlevnad'
    },
    { 
      time: '13:00', 
      event: 'Ö-golf',
      details: 'Kom inte törstig för här vill du undvika vatten. Öl tillhandahålls som hjälpmedel. Poäng ges för att landa bollen på ön.',
      image: golf_ö_image,
      category: 'precision'
    },
    { 
      time: '13:30', 
      event: 'Närmast flaggan',
      details: 'Inga krussiduller. Slå ett slag, kom närmast flaggan.',
      image: golf_flagga,
      category: 'precision'
    },
    { 
      time: '14:00', 
      event: 'Pilbågsskytte',
      details: 'Klassiskt pilbågsskytte mot tavla.',
      image: pilbåge_v1,
      category: 'precision'
    },
    { 
      time: '14:30', 
      event: 'Pussel',
      details: 'Här kommer ett fantastiskt motiv att sättas ihop. Speciellt efterfrågad av J.O.',
      image: puzzle,
      category: 'precision'
    },  
    { 
      time: '15:00', 
      event: 'Skrotholmen Surf',
      details: 'Över vattnet, bygg tornet, tillbaka.',
      image: surf,
      category: 'brunk'
    },
    { 
      time: '15:30', 
      event: 'Spika spik',
      details: 'Hammare, spik.... ',
      image: spik,
      category: 'brunk'
    },
    { 
      time: '16:00', 
      event: 'Såga stock',
      details: 'Nu kommer äntligen fogsvansen fram.',
      image: saw,
      category: 'brunk'
    },
    { 
      time: '17:00', 
      event: 'Mat',
      details: 'Dagens aktiviteter avrundas framför grillen.',
      image: grill,
      category: 'postludos'
    },
    { 
      time: '18:30', 
      event: 'Bada Bada B...',
      details: 'Fram med björkriset och bastumössan.',
      image: bastu,
      category: 'postludos'
    }
  ];
  
  // Group schedule items by category
  const groupedScheduleItems = {
    pregame: scheduleItems.filter(item => item.category === 'pregame'),
    precision: scheduleItems.filter(item => item.category === 'precision'),
    brunk: scheduleItems.filter(item => item.category === 'brunk'),
    överlevnad: scheduleItems.filter(item => item.category === 'överlevnad'),
    postludos: scheduleItems.filter(item => item.category === 'postludos')
  };

  return (
    <View style={styles.scheduleSectionContainer}>
      <Text style={styles.sectionTitle}>Vad händer under dagen?</Text>
      <View style={styles.scheduleContainer}>
        {/* General events (opening and closing ceremonies) */}
        <Text style={styles.categoryTitle}>Farciminis</Text>
        {groupedScheduleItems.pregame.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.scheduleItem}
            onPress={() => setSelectedEvent(item)}
            activeOpacity={0.7}
          >
            <Text style={styles.scheduleTime}>{item.time}</Text>
            <View style={styles.scheduleContent}>
              <Text style={styles.scheduleEvent}>{item.event}</Text>
              <Text style={styles.scheduleDetailsHint}>Klicka för info →</Text>
            </View>
          </TouchableOpacity>
        ))}
        
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
                <Text style={styles.scheduleDetailsHint}>Klicka för info →</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

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
                <Text style={styles.scheduleDetailsHint}>Klicka för info →</Text>
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
                <Text style={styles.scheduleDetailsHint}>Klicka för info →</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Final ceremony */}
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>Post Ludos</Text>
        {groupedScheduleItems.äntligen_vila.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.scheduleItem}
            onPress={() => setSelectedEvent(item)}
            activeOpacity={0.7}
          >
            <Text style={styles.scheduleTime}>{item.time}</Text>
            <View style={styles.scheduleContent}>
              <Text style={styles.scheduleEvent}>{item.event}</Text>
              <Text style={styles.scheduleDetailsHint}>Klicka för info →</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      </View>

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </View>
  );
};

export default Schedule; 