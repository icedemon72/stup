import React, { useEffect, useState } from 'react';
import { ThemedText } from '@/components/themed/ThemedText';
import { Survey } from '@/types';
import InputContainer from '@/components/ui/InputContainer';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/constants/Firebase';
import { useSession } from '@/components/contexts/AuthContext';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import SurveyItem from '@/components/ui/survey/SurveyItem';
import { MaterialIcons } from '@expo/vector-icons';
import RelativeLogo from '@/components/ui/RelativeLogo';
import SurveyNotFound from '@/components/ui/survey/SurveyNotFound';

const CompletedSurveys = () => {
  const { session } = useSession();
  const [ surveys, setSurveys ] = useState<Survey[]>([]);
  const [ isLoading, setIsLoading ] = useState(false);

  const fetchSurveys = async () => {
    try {
      setIsLoading(true);
      const surveysRef = collection(db, 'surveys');
      const q = query(surveysRef, 
        where('answeredBy', 'array-contains-any', [session!.uid])
      );

      const querySnapshot = await getDocs(q);
      const surveys: Survey[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as Survey));

      setSurveys(surveys);
    } catch(err) {
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
        <ThemedText style={styles.title} type='subtitle'>Rešeni STUPitnici</ThemedText>
        <FlatList
          data={surveys}
          scrollEnabled={false}
          renderItem={({ item }) => <SurveyItem item={item} inReseni={true} />} 
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

export default CompletedSurveys;