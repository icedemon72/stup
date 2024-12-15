import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSession } from '@/components/contexts/AuthContext'
import { ThemedText } from '@/components/themed/ThemedText'
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { ThemedTouchableOpacity } from '@/components/themed/ThemedTouchableOpacity'
import { useRouter } from 'expo-router'

import RelativeLogo from '@/components/ui/RelativeLogo'
import InputContainer from '@/components/ui/InputContainer'

const Index = () => {
	const router = useRouter();
  const { signOut, session } = useSession();

	return (
		<InputContainer absolute={<RelativeLogo name='person-outline' size={48} />}>
			<View>
				<ThemedText type='subtitle' style={{ textAlign: 'center', paddingTop: 10, paddingBottom: 30 }} textColor='muted'>{ session?.name ?? session!.email }</ThemedText>
				
				<ThemedTouchableOpacity style={styles.pressable} onPress={() => router.navigate('/(profile)/user-profile')}>
					<ThemedText style={{ position: 'absolute', left: 10 }}><Ionicons name='person-outline' size={24} /></ThemedText>
					<ThemedText style={{ flex: 1, textAlign: 'center' }}>Moje informacije</ThemedText>
				</ThemedTouchableOpacity>
				
				<ThemedTouchableOpacity style={styles.pressable}>
					<ThemedText style={{ position: 'absolute', left: 10 }}><MaterialIcons name="playlist-add" size={24} /></ThemedText>
					<ThemedText style={{ flex: 1, textAlign: 'center' }}>Moji STUPitnici</ThemedText>
				</ThemedTouchableOpacity>

				<ThemedTouchableOpacity style={styles.pressable}>
					<ThemedText style={{ position: 'absolute', left: 10 }}><MaterialIcons name="playlist-add-check" size={24}  /></ThemedText>
					<ThemedText style={{ flex: 1, textAlign: 'center' }}>Rešeni STUPitnici</ThemedText>
				</ThemedTouchableOpacity>

				<ThemedTouchableOpacity onPress={() => signOut()} style={styles.pressable} >
					<ThemedText style={{ position: 'absolute', left: 10 }}><Feather name="log-out" size={24} /></ThemedText>
					<ThemedText style={{ flex: 1, textAlign: 'center' }}>Odjavi se</ThemedText>
				</ThemedTouchableOpacity>
			</View>
		</InputContainer>
	);
}

const styles = StyleSheet.create({
	pressable: {
		position: 'relative',
		flexDirection: 'row',
		alignItems: 'center',
		height: 50,
		paddingHorizontal: 10,
		borderRadius: 10,
		marginBottom: 10
	}
});

export default Index;