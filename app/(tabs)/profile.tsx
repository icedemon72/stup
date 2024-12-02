import { useSession } from '@/components/contexts/AuthContext'
import { ThemedText } from '@/components/themed/ThemedText'
import React from 'react'
import { Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Index = () => {
  const { signOut } = useSession();

	return (
		<SafeAreaView>
      <Pressable onPress={() => signOut()}>
        <ThemedText>Odjavi se</ThemedText>
      </Pressable>
    </SafeAreaView>
	);
}

export default Index;