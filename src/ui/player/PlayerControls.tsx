import React, { memo } from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PlayerControlsPropsType {
  isPlaying: boolean;
  canGoNext: boolean;
  canGoPrev: boolean;
  isLoaded: boolean;
  handlePlay: () => void;
  handlePause: () => void;
  handleNextTrack: () => Promise<void>;
  handlePrevTrack: () => Promise<void>;
}

 const PlayerControls: React.FC<PlayerControlsPropsType> = memo(({ 
  handlePlay, 
  handlePause, 
  handleNextTrack, 
  handlePrevTrack, 
  isPlaying, 
  isLoaded,
  canGoNext,
  canGoPrev 
}) => {
  return (
    <View style={styles.playerControls}>
    <Button title="<" onPress={handlePrevTrack} disabled={!canGoPrev} />
    {isPlaying ? (
      <TouchableOpacity disabled={!isLoaded} onPress={handlePause}>
        <Text style={styles.playPauseInner}>⏸️</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity disabled={!isLoaded} onPress={handlePlay}>
        <Text style={styles.playPauseInner}>▶️</Text>
      </TouchableOpacity>
    )}
    <Button title=">" onPress={handleNextTrack} disabled={!canGoNext} />
  </View>
  )
})

const styles = StyleSheet.create({
  playerControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  playPauseInner: {
    marginBottom: 3,
    fontSize: 36,
  }
})

export default PlayerControls