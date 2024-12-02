import { useSession } from "@/components/contexts/AuthContext";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Redirect, Tabs } from "expo-router";


const TabsLayout = () => {
	const { session } = useSession();

	if(!session) {
		return <Redirect href="/home" />
	}

	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
				headerShown: false,
			}}
			>
			<Tabs.Screen name="index" options={{
				title: 'STUPitnici',
				tabBarIcon: ({ color, focused }) => (
					<TabBarIcon name={focused ? 'calendar' : 'calendar-outline'} color={color} />
				),
			}} />

			<Tabs.Screen name="survey-create" options={{
				title: 'Kreiraj STUPitnik',
				tabBarIcon: ({ color, focused }) => (
					<TabBarIcon name={focused ? 'add-circle' : 'add-circle-outline'} color={color} />
				),
			}} />
			<Tabs.Screen name="profile" options={{
				title: 'Profil',
				tabBarIcon: ({ color, focused }) => (
					<TabBarIcon onLongPress={() => console.log('hello')} name={focused ? 'person-circle' : 'person-circle-outline'} color={color} />
				),
			}} />
		</Tabs>
	);
}

export default TabsLayout;