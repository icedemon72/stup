import { useSession } from "@/components/contexts/AuthContext";
import { ThemedText } from "@/components/themed/ThemedText";
import { Link, Redirect } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Home: React.FC = () => {
	const { session } = useSession();
	
	if(session) {
		return <Redirect href="/(tabs)" />
	}

	return (
		<View style={ styles.container }>
			<View style={ styles.inputContainer }>
				<View>
					<ThemedText type='title'>Studentski Upitnik</ThemedText>
					<ThemedText>Rešavajte ankete drugih studenata i postavljajte svoje!</ThemedText>
				</View>

				<View>
					<Link href="/login" asChild>
						<TouchableOpacity style={{ ...styles.button, backgroundColor: '#ff9f00' }}>
							<Text>Prijavi se</Text>
						</TouchableOpacity>
					</Link>
					<Link href="/(register)/register-step-1" asChild>
						<TouchableOpacity style={ styles.button }>
							<Text>Registruj se</Text>
						</TouchableOpacity>
					</Link>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
		alignContent: 'center'
	},
	inputContainer: {
		padding: 10,
		marginBottom: 10,
		marginHorizontal: 10,
	},
	button: {
		alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
		marginVertical: 10,
		borderRadius: 10
	},
});

export default Home;

