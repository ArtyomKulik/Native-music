import { Text } from '@react-navigation/elements';
import React, { memo } from 'react'
import { View, StyleSheet } from 'react-native';
import Player from '../../ui/player/Player';

function Home() {
  return (
    <View style={styles.container}>
    <Text>Native Music</Text>
    <Player/>
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },
  });
  

export default memo(Home)