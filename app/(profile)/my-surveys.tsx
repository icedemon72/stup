import React, { useEffect, useState } from 'react';
import { useSession } from '@/components/contexts/AuthContext';
import { ThemedText } from '@/components/themed/ThemedText';
import { db } from '@/constants/Firebase';
import { Survey } from '@/types';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import InputContainer from '@/components/ui/InputContainer';
import RelativeLogo from '@/components/ui/RelativeLogo';
import SurveyItem from '@/components/ui/survey/SurveyItem';
import SurveyNotFound from '@/components/ui/survey/SurveyNotFound';

const MySurveys = () => {
  const { session } = useSession();

  const [ surveys, setSurveys ] = useState<Survey[]>([]);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);

  const fetchSurveys = async () => {
    try {
      setIsLoading(true);
      const surveysRef = collection(db, 'surveys');
      const q = query(surveysRef, 
        where('createdBy.id', '==', session!.uid)
      );

      const querySnapshot = await getDocs(q);
      const surveys: Survey[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as Survey));
      
      setSurveys(surveys);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchSurveys();
  }, []);

  return (
    <InputContainer absolute={<RelativeLogo name="playlist-add-check" size={48} iconPack='MaterialIcons' />}>
      <View>
        <ThemedText style={styles.title} type='subtitle'>Moji STUPitnici</ThemedText>
        <FlatList
          data={surveys}
          scrollEnabled={false}
          renderItem={({ item }) => <SurveyItem item={item} />} 
          keyExtractor={(item) => item.id}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : null
          }
        />
        { (!isLoading && !surveys.length) && <SurveyNotFound /> }
      </View>
    </InputContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    paddingBottom: 20
  }
});

export default MySurveys;