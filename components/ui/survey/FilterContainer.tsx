import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type FilterContainerProps = {
  filterList: string[];
}

const FilterContainer = ({ filterList }: FilterContainerProps) => {
  return(
    <ThemedView style={styles.filters} backgroundKey='backgroundSecondary'>
      <ThemedText style={styles.title} textColor='muted' type='defaultSemiBold'>Filteri</ThemedText>

      <View style={styles.filtersContent}>
        <ThemedText>Filter 1</ThemedText>
        <ThemedText>Filter 1</ThemedText>
        <ThemedText>Filter 1</ThemedText>
        <ThemedText>Filter 1</ThemedText>
        <ThemedText>Filter 1</ThemedText>
        <ThemedText>Filter 1</ThemedText>
        <ThemedText>Filter 1</ThemedText>
      </View>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  filters: {
		padding: 10,
		borderRadius: 10,
	},
  filtersContent: {
    padding: 10
  },
  title: {
    paddingHorizontal: 10,
    paddingBottom: 10
  }
});

export default FilterContainer;