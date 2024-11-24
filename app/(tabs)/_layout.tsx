import { Redirect } from "expo-router";
import { Text } from "react-native";

const TabsLayout = () => {
	if(true) {
		return <Redirect href="/home" />
	}

	return <Text>Hello</Text>
}

export default TabsLayout;