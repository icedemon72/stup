import { ThemedText } from '@/components/themed/ThemedText';
import { Link, Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';

export default function NotFoundScreen() {
  return (
    <View>
      <Stack.Screen options={{ title: "Ne postoji stranica." }} />
      <View style={styles.container}>
				<ThemedText>Ne postoji stranica :(</ThemedText>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
