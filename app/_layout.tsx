import { Stack } from "expo-router";
import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from "expo-font";
import { useEffect } from "react";
import Toast from 'react-native-toast-message';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "@/components/contexts/AuthContext";
import ToastWrapper from "@/components/ui/ToastWrapper";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
	const colorScheme = useColorScheme();

	const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
	
  return (
		<>
			<AuthProvider>
				<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
					<Stack screenOptions={{ 
						headerShown: false
					}}>
						<Stack.Screen name='login' />
						<Stack.Screen name='(register)' />
						<Stack.Screen name='home' />
						<Stack.Screen name='forgot-password' />
						<Stack.Screen name='(tabs)' />
					</Stack>
					<StatusBar style="light" />
				</ThemeProvider>
			</AuthProvider>
			<ToastWrapper scheme={colorScheme} />
		</>
	);
}

export default RootLayout;
