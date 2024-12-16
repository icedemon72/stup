import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed/ThemedText';
import { FontAwesome6 } from '@expo/vector-icons';

type SurveyNotFoundProps = {
  text?: string;
  icon?: keyof typeof FontAwesome6.glyphMap;
}

const SurveyNotFound = ({ text = 'Nije pronadjen nijedan STUPitnik', icon = 'sad-tear' }: SurveyNotFoundProps) => {
  return (
    <View style={styles.notFoundContainer}>
      <View style={{ marginBottom: 100 }}>
        <ThemedText textColor='muted' style={{ textAlign: 'center', paddingTop: 20 }}>
          <FontAwesome6 name={icon} size={36} />
        </ThemedText>
        <ThemedText textColor='muted'>{ text }</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  notFoundContainer: {
		flex: 1,
		minHeight: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	}
});

export default SurveyNotFound;