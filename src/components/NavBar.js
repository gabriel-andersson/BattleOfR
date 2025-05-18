import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import styles, { isSmallScreen } from '../styles/styles';

const NavBar = ({ activeSection, setActiveSection, logoImage }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [smallScreen, setSmallScreen] = useState(isSmallScreen());
  
  // Handle screen resize for responsive behavior
  useEffect(() => {
    const handleDimensionsChange = ({ window }) => {
      setSmallScreen(window.width < 768);
      if (window.width >= 768) {
        setMenuOpen(false); // Close menu when screen becomes large
      }
    };
    
    // Use Dimensions.addEventListener
    const subscription = Dimensions.addEventListener('change', handleDimensionsChange);
    
    // Return cleanup function
    return () => {
      subscription.remove();
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavigation = (section) => {
    setActiveSection(section);
    if (smallScreen) {
      setMenuOpen(false); // Close menu after selection on small screens
    }
  };

  const renderNavLinks = () => {
    const links = [
      { id: 'home', label: 'Hem' },
      { id: 'schedule', label: 'Schema' },
      { id: 'leaderboard', label: 'Resultat' },
      { id: 'registration', label: 'Registrering' },
      { id: 'results', label: 'Admin' }
    ];

    return links.map(link => (
      <TouchableOpacity 
        key={link.id}
        style={[
          styles.navBtn, 
          activeSection === link.id && styles.navBtnActive,
          smallScreen && styles.navBtnMobile
        ]} 
        onPress={() => handleNavigation(link.id)}
      >
        <Text style={styles.navBtnText}>{link.label}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity 
        style={styles.logoContainer}
        onPress={() => handleNavigation('home')}
      > 
        <Image source={logoImage} style={styles.logoImage} />
        <Text style={styles.logoText}>Battle Of Rossö</Text>
      </TouchableOpacity>
      
      {smallScreen ? (
        <View>
          <TouchableOpacity 
            style={styles.menuToggle} 
            onPress={toggleMenu}
          >
            <Text style={styles.menuToggleText}>☰</Text>
          </TouchableOpacity>
          
          {menuOpen && (
            <View style={styles.mobileMenu}>
              {renderNavLinks()}
            </View>
          )}
        </View>
      ) : (
        <View style={styles.navLinks}>
          {renderNavLinks()}
        </View>
      )}
    </View>
  );
};

export default NavBar; 