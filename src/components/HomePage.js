import React, { useState, useEffect } from 'react';
import { View, Text, Animated, Easing, TouchableOpacity, Image, Dimensions } from 'react-native';
import styles from '../styles/styles';

const HomePage = ({ setActiveSection }) => {
  // Animation values
  const titleOpacity = useState(new Animated.Value(0))[0];
  const titleScale = useState(new Animated.Value(0.5))[0];
  const countdownOpacity = useState(new Animated.Value(0))[0];
  const pulseAnim = useState(new Animated.Value(1))[0];
  const backgroundPosition = useState(new Animated.Value(0))[0];
  
  // State to track window dimensions and animation direction
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [isMovingRight, setIsMovingRight] = useState(true);

  // Update dimensions when window resizes
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
      // Check if image should animate based on new dimensions
      const imageWidth = window.width * 1.5; // 150% of screen width
      const imageHeight = window.height;
      setShouldAnimate(imageWidth > window.width);
    });

    return () => subscription?.remove();
  }, []);

  // Background animation
  useEffect(() => {
    if (!shouldAnimate) {
      backgroundPosition.setValue(0);
      return;
    }

    const maxOffset = -dimensions.width * 0.5; // 50% of screen width (since image is 150% wide)

    const animate = () => {
      const toValue = isMovingRight ? maxOffset : 0;
      
      Animated.timing(backgroundPosition, {
        toValue,
        duration: 8000, // # of milliseconds for each direction
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setIsMovingRight(!isMovingRight); // Reverse direction
        }
      });
    };

    animate();
  }, [shouldAnimate, dimensions.width, isMovingRight]);

  // Set initial countdown values - July 16, 2025 at 11:30 AM CEST
  const [timeRemaining, setTimeRemaining] = useState({
    days: 175,
    hours: 8,
    minutes: 30,
    seconds: 0
  });

  // State to track if event has started
  const [eventStarted, setEventStarted] = useState(false);
  
  // Start animations when component mounts
  useEffect(() => {
    // Title animation sequence
    Animated.sequence([
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 400,
        easing: Easing.easeOut,
        useNativeDriver: true
      }),
      Animated.timing(titleScale, {
        toValue: 1,
        duration: 400,
        easing: Easing.bounce,
        useNativeDriver: true
      })
    ]).start();
    
    // Countdown fade in after title animation
    Animated.timing(countdownOpacity, {
      toValue: 1,
      duration: 1200,
      delay: 800,
      easing: Easing.easeIn,
      useNativeDriver: true
    }).start();
    
    // Start pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.04,
          duration: 1000,
          easing: Easing.easeInOut,
          useNativeDriver: true
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.easeInOut,
          useNativeDriver: true
        })
      ])
    ).start();
    
    // Calculate the initial remaining time dynamically
    try {
      const now = new Date();
      const eventDate = new Date(2025, 6, 16, 11, 30, 0); // July 16, 2025 at 11:30
      const diffMs = eventDate - now;
      
      // Check if event has already started
      if (diffMs <= 0) {
        setEventStarted(true);
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);
      
      // Update with calculated values instead of hardcoded ones
      setTimeRemaining({
        days: diffDays,
        hours: diffHours,
        minutes: diffMinutes,
        seconds: diffSeconds
      });
    } catch (error) {
      console.error("Error calculating initial time:", error);
      // Keep using the fallback values
    }
  }, []);
  
  // Simple countdown timer that just decrements the seconds
  useEffect(() => {
    // Skip setting up the timer if the event has already started
    if (eventStarted) return;
    
    const countdown = () => {
      setTimeRemaining(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        // Decrement seconds
        seconds--;
        
        // Handle time unit rollovers
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          
          if (minutes < 0) {
            minutes = 59;
            hours--;
            
            if (hours < 0) {
              hours = 23;
              days--;
              
              if (days < 0) {
                // Event has started
                setEventStarted(true);
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    };
    
    // Update every second
    const timer = setInterval(countdown, 1000);
    
    // Cleanup
    return () => clearInterval(timer);
  }, [eventStarted]);
  
  // Rendering countdown display
  const renderCountdownUnit = (value, label) => (
    <Animated.View 
      style={[
        styles.countdownUnit,
        { transform: [{ scale: pulseAnim }] }
      ]}
    >
      <Text style={styles.countdownValue}>{value}</Text>
      <Text style={styles.countdownLabel}>{label}</Text>
    </Animated.View>
  );
  
  // Render event in progress view
  const renderEventInProgress = () => (
    <Animated.View 
      style={[
        styles.eventInProgressContainer,
        { opacity: countdownOpacity }
      ]}
    >
      <Animated.View 
        style={[
          styles.eventStatusBadge,
          { transform: [{ scale: pulseAnim }] }
        ]}
      >
        <Text style={styles.eventStatusText}>GAME ON</Text>
      </Animated.View>
      
      <Text style={styles.eventInProgressTitle}>Battle Of Rossö</Text>
      
      <TouchableOpacity 
        style={styles.eventInProgressButton} 
        onPress={() => setActiveSection('schedule')}
      >
        <Text style={styles.eventInProgressText}>
          Kika in på schemat här
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.currentActivityButton} 
        onPress={() => setActiveSection('leaderboard')}
      >
        <Text style={styles.currentActivityText}>
          Kika in på resultaten här
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
  
  return (
    <View style={styles.homePageContainer}>
      <Animated.View style={styles.backgroundImageContainer}>
        <Animated.Image
          source={require('../background.png')}
          style={[
            styles.backgroundImage,
            {
              transform: [{
                translateX: backgroundPosition
              }]
            }
          ]}
        />
      </Animated.View>

      <Animated.View 
        style={[
          styles.titleContainer, 
          { 
            opacity: titleOpacity,
            transform: [{ scale: titleScale }]
          }
        ]}
      >
        <Animated.Text 
          style={[
            styles.homePageTitle,
            { transform: [{ scale: pulseAnim }] }
          ]}
        >
          Battle Of Rossö
        </Animated.Text>
      </Animated.View>
      
      {eventStarted ? (
        renderEventInProgress()
      ) : (
        <Animated.View 
          style={[
            styles.countdownContainer,
            { opacity: countdownOpacity }
          ]}
        >
          <Text style={styles.countdownHeader}>Startar om:</Text>
          <View style={styles.countdownUnitsContainer}>
            {renderCountdownUnit(timeRemaining.days, 'DAYS')}
            {renderCountdownUnit(timeRemaining.hours, 'HOURS')}
            {renderCountdownUnit(timeRemaining.minutes, 'MINS')}
            {renderCountdownUnit(timeRemaining.seconds, 'SECS')}
          </View>
          <Text style={styles.eventDate}>16 Juli 2025 kl 11:30 </Text>
        </Animated.View>
      )}
    </View>
  );
};

export default HomePage; 