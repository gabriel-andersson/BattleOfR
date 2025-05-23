import { StyleSheet, Dimensions } from 'react-native';

// Helper function to get window dimensions
export const getWindowDimensions = () => Dimensions.get('window');
export const isSmallScreen = () => getWindowDimensions().width < 768;

// Define base style properties shared by sections to avoid repetition
const baseSectionStyle = {
  borderRadius: 8,
  padding: 24,
  marginVertical: 16,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 10,
  elevation: 3,
};

const styles = StyleSheet.create({
  // Home Page styles
  homePageContainer: {    
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    minHeight: Dimensions.get('window').height * 0.9,
    // minHeight: 1000,
    position: 'relative',
    overflow: 'hidden',
  },
  titleContainer: {
    marginBottom: 60,
    alignItems: 'center',
  },
  homePageTitle: {
    fontSize: Dimensions.get('window').width < 768 ? 38 : 64,
    fontWeight: 'bold',
    color: '#F5F5DC', // Beige - Theme color
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  countdownContainer: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 800,
  },
  countdownHeader: {
    fontSize: 24,
    color: '#F5F5DC',
    marginBottom: 30,
    fontWeight: '600',
  },
  countdownUnitsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: Dimensions.get('window').width < 768 ? 15 : 30,
  },
  countdownUnit: {
    alignItems: 'center',
    minWidth: Dimensions.get('window').width < 768 ? 65 : 120,
    backgroundColor: 'rgba(160, 82, 45, 0.7)', // Semi-transparent Sienna
    borderRadius: 10,
    padding: Dimensions.get('window').width < 768 ? 10 : 20,
    borderWidth: 2,
    borderColor: '#793D23', // Darker Sienna
  },
  countdownValue: {
    fontSize: Dimensions.get('window').width < 768 ? 28 : 48,
    fontWeight: 'bold',
    color: '#F5F5DC',
  },
  countdownLabel: {
    fontSize: Dimensions.get('window').width < 768 ? 12 : 16,
    color: '#F5F5DC',
    marginTop: 5,
    fontWeight: '500',
  },
  eventDate: {
    marginTop: 40,
    fontSize: 18,
    color: '#F5F5DC',
    fontWeight: '500',
  },
  // Event In Progress styles
  eventInProgressContainer: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 800,
    marginTop: 20,
  },
  eventStatusBadge: {
    backgroundColor: '#FF5722', // Bright orange for attention
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#FFC107', // Gold border
  },
  eventStatusText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  eventInProgressTitle: {
    fontSize: Dimensions.get('window').width < 768 ? 32 : 42,
    fontWeight: 'bold',
    color: '#F5F5DC',
    textAlign: 'center',
    marginBottom: 25,
  },
  eventInProgressText: {
    fontSize: 20,
    color: '#F5F5DC',
    textAlign: 'center',
    lineHeight: 30,
    maxWidth: 600,
  },
  eventInProgressButton: {
    backgroundColor: 'rgba(160, 82, 45, 0.7)', // Semi-transparent Sienna
    borderRadius: 10,
    padding: 15,
    paddingHorizontal: 25,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#793D23', // Darker Sienna
    marginBottom: 30,
  },
  currentActivityButton: {
    backgroundColor: 'rgba(160, 82, 45, 0.7)', // Semi-transparent Sienna
    borderRadius: 10,
    padding: 15,
    paddingHorizontal: 25,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#793D23', // Darker Sienna
  },
  currentActivityContainer: {
    backgroundColor: 'rgba(160, 82, 45, 0.7)', // Semi-transparent Sienna
    borderRadius: 10,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#793D23', // Darker Sienna
  },
  currentActivityLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFC107', // Gold
    marginBottom: 15,
  },
  currentActivityText: {
    fontSize: 18,
    color: '#F5F5DC',
    textAlign: 'center',
    fontWeight: '500',
  },
  // End Home Page styles
  
  appBackgroundImage: {
    flex: 1,
    backgroundColor: 'rgba(44, 62, 80, 0.75)', // This acts as an overlay/tint on the image
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: 'transparent', // Important: SafeAreaView should be transparent to see ImageBackground
  },
  mainScrollContainer: { // Renamed from 'main' to avoid confusion, keeps original padding
    flex: 1,
    padding: 16,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#A0522D', // Sienna - Theme color
    borderBottomWidth: 2,
    borderBottomColor: '#793D23', // Darker Sienna for border
    zIndex: 100, // Ensure dropdown menu appears above other content
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Take up available space
  },
  logoImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F5F5DC', // Beige - Theme color
  },
  navLinks: {
    flexDirection: 'row',
  },
  navBtn: {
    marginLeft: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  navBtnMobile: {
    marginLeft: 0,
    marginBottom: 10,
    paddingVertical: 12, // Larger touch target
    paddingHorizontal: 16,
    width: '100%', // Full width in mobile menu
  },
  navBtnActive: {
    backgroundColor: '#793D23', // Darker Sienna - Theme color for active
  },
  navBtnText: {
    fontSize: 17,
    color: '#F5F5DC', // Beige - Theme color
    fontWeight: '500',
  },
  section: { // Common style for other sections (Meals, Registration, Leaderboard)
    ...baseSectionStyle,
    backgroundColor: '#3E4E5E', // Muted dark blue-grey
    padding: Dimensions.get('window').width < 768 ? 16 : 24,
    overflow: 'visible', // Ensure dropdowns can extend outside
  },
  scheduleSectionContainer: { // Specific style for Schedule section container
    ...baseSectionStyle,
    backgroundColor: 'transparent',
    padding: Dimensions.get('window').width < 768 ? 16 : 24,
  },
  sectionTitle: {
    fontSize: Dimensions.get('window').width < 768 ? 24 : 28,
    fontWeight: 'bold',
    color: '#F5F5DC',
    marginBottom: Dimensions.get('window').width < 768 ? 16 : 25,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  refreshButton: {
    backgroundColor: '#793D23',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
    opacity: 1,
  },
  refreshButtonText: {
    color: '#F5F5DC',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Schedule styles
  scheduleContainer: {
    gap: 12,
  },
  categoryContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F5F5DC',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#A0522D',
  },
  scheduleItem: {
    flexDirection: Dimensions.get('window').width < 480 ? 'column' : 'row',
    alignItems: Dimensions.get('window').width < 480 ? 'flex-start' : 'center',
    padding: 16,
    backgroundColor: '#5D4037',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 3,
    shadowRadius: 8,
    elevation: 1,
    marginBottom: 10,
  },
  scheduleTime: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F5F5DC',
    width: Dimensions.get('window').width < 480 ? 'auto' : 80,
    marginBottom: Dimensions.get('window').width < 480 ? 8 : 0,
  },
  scheduleContent: {
    flex: 1,
  },
  scheduleEvent: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFF8DC', // Cornsilk
    marginBottom: 4,
  },
  scheduleDetailsHint: {
    fontSize: 14,
    color: '#A0522D', // Sienna - to make it stand out a bit
    marginTop: 5,
  },
  eventDetailsModal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(44, 62, 80, 0.9)', // Darker, semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    display: 'flex',
    paddingTop: '10vh', // Add some padding from the top
    paddingBottom: '10vh', // Add some padding from the bottom
  },
  eventDetailsContent: {
    backgroundColor: '#34495e', // Section-like background
    padding: 0,
    borderRadius: 12,
    width: '90%',
    maxWidth: 500,
    maxHeight: '80vh', // Change to viewport height units
    position: 'relative',
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#A0522D',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    cursor: 'pointer',
    border: '2px solid #F5F5DC',
    display: 'flex',
    padding: 0,
  },
  closeButtonText: {
    color: '#F5F5DC',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: '16px',
    textAlign: 'center',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -2, // Fine-tune vertical alignment
  },
  eventImageContainer: {
    width: '100%',
    height: 300,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  eventDetailsContainer: {
    padding: 16, 
    paddingTop: 10,
    flex: 1,
  },
  eventDetailsHeader: {
    paddingBottom: 8,
  },
  eventDetailsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F5F5DC', // Beige
    marginBottom: 5,
  },
  eventDetailsTime: {
    fontSize: 16,
    color: '#FFF8DC', // Cornsilk
    marginBottom: 2,
  },
  eventDetailsScroll: {
    flex: 1,
  },
  eventDescription: {
    fontSize: 16,
    color: '#F5F5DC', // Beige
    lineHeight: 24,
  },
  // Registration styles
  formContainer: {
    maxWidth: 500,
    alignSelf: 'center',
    width: '100%',
  },
  formGroup: {
    marginBottom: 16,
    position: 'relative',
    overflow: 'visible', // Allow dropdown to be visible outside container
  },
  label: {
    marginBottom: 8,
    color: '#F5F5DC', // Beige - Theme color for better contrast
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#A0522D',
    padding: Dimensions.get('window').width < 768 ? 14 : 12,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: '#FFF8DC',
    color: '#5D4037',
    marginBottom: 15,
  },
  submitBtn: {
    backgroundColor: '#A0522D',
    padding: Dimensions.get('window').width < 768 ? 18 : 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  submitBtnText: {
    color: '#F5F5DC',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#A0522D88',
    opacity: 0.7,
  },
  disabledText: {
    opacity: 0.7,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#F5F5DC',
  },
  loadingSubtext: {
    marginTop: 5,
    fontSize: 14,
    color: '#F5F5DC88',
    fontStyle: 'italic',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#5D403788',
    borderRadius: 5,
  },
  errorText: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorSubtext: {
    marginTop: 5,
    fontSize: 14,
    color: '#F5F5DC',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#B71C1C',
    marginBottom: 10,
  },
  errorBannerText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#5D4037',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 10,
    minWidth: 120,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyStateContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#F5F5DC',
    fontStyle: 'italic',
  },
  // Leaderboard styles
  leaderboardContainer: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#A0522D', // Sienna
    paddingBottom: 10,
    marginBottom: 10,
    backgroundColor: '#5D4037', // Dark Brown for header background
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    fontSize: Dimensions.get('window').width < 768 ? 14 : 16,
    color: '#F5F5DC',
    textAlign: 'center',
  },
  tableBody: {
    maxHeight: 400,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#5D4037', // Dark Brown for row separator
  },
  tableCell: {
    fontSize: Dimensions.get('window').width < 768 ? 13 : 15,
    color: '#FFF8DC',
    textAlign: 'center',
  },
  // New styles for game-specific leaderboard information
  leaderboardInfo: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#5D4037',
    borderRadius: 5,
    alignSelf: 'center',
  },
  leaderboardInfoText: {
    color: '#F5F5DC',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Styles for the basic event picker in Results section
  pickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 15,
    position: 'relative',
    zIndex: 1, // Lower z-index than dropdown
  },
  pickerButton: {
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#5D4037',
    minWidth: 80,
  },
  pickerButtonActive: {
    backgroundColor: '#A0522D',
  },
  pickerButtonText: {
    color: '#F5F5DC',
    textAlign: 'center',
    fontSize: 15,
  },
  pickerButtonTextActive: {
    fontWeight: 'bold',
  },
  // View mode toggle styles
  viewModeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  viewModeButton: {
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: '#5D4037',
    minWidth: 100,
  },
  viewModeButtonActive: {
    backgroundColor: '#A0522D',
  },
  viewModeButtonText: {
    color: '#F5F5DC',
    textAlign: 'center',
    fontSize: 16,
  },
  viewModeButtonTextActive: {
    fontWeight: 'bold',
  },
  // Mobile Menu Styles
  menuToggle: {
    padding: 10,
  },
  menuToggleText: {
    color: '#F5F5DC',
    fontSize: 24,
    fontWeight: 'bold',
  },
  mobileMenu: {
    position: 'absolute',
    top: 50, // Position below the navbar
    right: 0,
    backgroundColor: '#A0522D',
    padding: 15,
    borderRadius: 5,
    borderTopRightRadius: 0, // Square top-right corner to connect with navbar
    borderWidth: 2,
    borderColor: '#793D23',
    borderTopWidth: 0, // No top border to connect with navbar
    width: 200, // Fixed width for the dropdown
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  // Enhanced event details modal for mobile
  eventDetailsContentMobile: {
    width: '95%',
    maxWidth: '100%',
    maxHeight: '90%',
    borderRadius: 8,
  },
  mainScrollContent: {
    paddingBottom: 30, // Add padding at the bottom for better mobile scrolling
  },
  // Dropdown styles for participant selector
  dropdownContainer: {
    position: 'relative',
    marginBottom: 15,
    zIndex: 9999,
  },
  dropdownTrigger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF8DC',
    borderWidth: 1,
    borderColor: '#A0522D',
    borderRadius: 5,
    padding: 12,
  },
  dropdownTriggerActive: {
    backgroundColor: '#FFF8DC',
    borderColor: '#A0522D',
    borderWidth: 2,
    zIndex: 9999,
    overflow: 'visible'
  },
  dropdownTriggerText: {
    fontSize: 16,
    color: '#5D4037',
    flex: 1,
  },
  dropdownTriggerTextActive: {
    color: '#A0522D',
    fontWeight: 'bold',
  },
  dropdownArrow: {
    color: '#A0522D',
    fontSize: 16,
    marginLeft: 10,
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#FFF8DC',
    borderWidth: 1,
    borderColor: '#A0522D',
    borderRadius: 5,
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 9999,
    overflow: 'visible', // Ensure menu items are visible
  },
  dropdownScrollView: {
    maxHeight: 200,
  },
  dropdownMenuItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#A0522D22',
  },
  dropdownMenuItemActive: {
    backgroundColor: '#A0522D33',
  },
  dropdownMenuItemText: {
    fontSize: 16,
    color: '#5D4037',
  },
  dropdownMenuItemTextActive: {
    fontWeight: 'bold',
    color: '#A0522D',
  },
  // Background image styles
  backgroundImageContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
  backgroundImage: {
    position: 'absolute',
    height: '100%',
    width: '150%', // Make the image wider than the screen
    resizeMode: 'cover',
  },
});

export default styles; 