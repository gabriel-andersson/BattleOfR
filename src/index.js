import { AppRegistry } from 'react-native';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Use a hardcoded app name instead of importing it from package.json
const appName = 'pentathlon-app';

// Register the app
AppRegistry.registerComponent(appName, () => App);

// Run the web app
AppRegistry.runApplication(appName, {
  rootTag: document.getElementById('root')
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
