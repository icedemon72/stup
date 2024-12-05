import React from 'react'
import { useSession } from '@/components/contexts/AuthContext'
import { ThemedText } from '@/components/themed/ThemedText'
import { ThemedView } from '@/components/themed/ThemedView'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons'

import RelativeLogo from '@/components/ui/RelativeLogo'
import { ThemedTouchableOpacity } from '@/components/themed/ThemedTouchableOpacity'

const Index = () => {
  const { signOut, session } = useSession();

	return (
		<SafeAreaView style={ styles.container }>
		<ThemedView style={ styles.profileContainer }>
			<RelativeLogo name='person-outline' size={48} />

			<ThemedText type='subtitle' style={{ textAlign: 'center', paddingTop: 10, paddingBottom: 30 }} textColor='muted'>{ session?.name ?? session!.email }</ThemedText>
			
			<ThemedTouchableOpacity style={styles.pressable}>
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
		</ThemedView>
	</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
		alignContent: 'center',
	},
	profileContainer: {
		position: 'relative',
		padding: 15,
		paddingTop: 80,
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
		minHeight: '75%'
	},
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