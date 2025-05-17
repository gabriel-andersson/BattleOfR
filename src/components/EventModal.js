import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import ReactDOM from 'react-dom';
import styles from '../styles/styles';

const EventModal = ({ event, onClose }) => {
  // Create portal for modal
  return ReactDOM.createPortal(
    <>
      {/* Overlay */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(44, 62, 80, 0.9)',
          zIndex: 999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}
        onClick={onClose}
      >
        {/* Modal Container */}
        <div 
          style={{
            width: '100%',
            maxWidth: '500px',
            maxHeight: '90vh',
            backgroundColor: '#34495e',
            borderRadius: '12px',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
          }}
          onClick={e => e.stopPropagation()}
        >
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={onClose}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          
          <View style={styles.eventImageContainer}>
            <Image 
              source={{ uri: event.image }} 
              style={styles.eventImage}
              resizeMode="cover"
            />
          </View>
          
          <View style={styles.eventDetailsContainer}>
            <View style={styles.eventDetailsHeader}>
              <Text style={styles.eventDetailsTitle}>{event.event}</Text>
              <Text style={styles.eventDetailsTime}>{event.time}</Text>
            </View>
            
            <ScrollView style={styles.eventDetailsScroll}>
              <Text style={styles.eventDescription}>{event.details}</Text>
            </ScrollView>
          </View>
        </div>
      </div>
    </>,
    document.body
  );
};

export default EventModal; 