import { Text } from '@react-navigation/elements';
import React, { memo } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native';
import Player from '../../ui/player/Player';
import AddLocalTrackFile from '@/src/ui/player/AddLocalTrackFile';
import { TrackList } from '@/src/ui/player/TrackList';
import * as Notifications from 'expo-notifications';
import { useAudioPlayerController } from '@/src/hooks/useAudioPlayerController';
import { useTrackStore } from '@/src/zustand/trackStore';


const Home = memo(() => {
   Notifications.requestPermissionsAsync();


  const {tracks} = useTrackStore()

  const {
    currentTrackIndex,
    isPlaying,
    progressBar,
    playerStatus,
    handlePlay,
    handlePause,
    handleNextTrack,
    handlePrevTrack,
    handleProgressBarSeek,
  } = useAudioPlayerController(tracks);


  return (
    <SafeAreaView style={styles.safeArea}>
      
      <View style={styles.container}>
        <Text style={styles.title}>Native Music</Text>
        <View style={styles.content}>
          <TrackList />
          <AddLocalTrackFile />
        </View>
        <Player  playerControlsProps={{
          currentTrackIndex,
    isPlaying,
    progressBar,
    playerStatus,
    handlePlay,
    handlePause,
    handleNextTrack,
    handlePrevTrack,
    handleProgressBarSeek
    }}/> 
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