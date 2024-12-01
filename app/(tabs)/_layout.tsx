import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Redirect, Tabs } from "expo-router";
import { Text } from "react-native";

const TabsLayout = () => {
	if(true) {
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
		</Tabs>
	);
}

export default TabsLayout;