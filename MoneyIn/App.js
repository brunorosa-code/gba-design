import { StatusBar } from 'expo-status-bar';
import { CountryProvider } from './src/contexts/CountryContext';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  return (
    <CountryProvider>
      <StatusBar style="auto" />
      <HomeScreen />
    </CountryProvider>
  );
}
