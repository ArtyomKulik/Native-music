import { Text } from '@react-navigation/elements';
import React, { memo, useState } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native';
import Player from '../../ui/player/Player';
import AddLocalTrackFile from '@/src/ui/player/AddLocalTrackFile';
import { TrackType } from '@/src/types/track';
import Baby_Why_mp3 from "../../assets/Sarah Cothran — Baby Why.mp3";
import Beautiful_Things_mp3 from "../../assets/Benson Boone - Beautiful Things.mp3";
import { TrackList } from '@/src/ui/player/TrackList';

const Home = memo(() => {
  const [tracks, setTracks] = useState<TrackType[]>([
    { id: "1", title: "Baby Why", uri: Baby_Why_mp3 },
    { id: "2", title: "Beautiful Things", uri: Beautiful_Things_mp3 },
  ]);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Native Music</Text>
        <View style={styles.content}>
          <TrackList tracks={tracks} />
       
          <AddLocalTrackFile setTracks={setTracks} />
       
        </View>
        <Player  tracks={tracks} /> 
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
   
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  content: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  },
  
});
  

export default Home