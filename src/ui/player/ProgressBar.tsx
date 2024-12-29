import { useAudioPlayerController } from '@/src/hooks/useAudioPlayerController';
import React, { memo } from 'react';
import { View, StyleSheet, Animated, Dimensions, Platform, TouchableOpacity, GestureResponderEvent } from 'react-native';

interface ProgressBarProps {
  progress: number;
  handleProgressBarSeek: (width: number, event: GestureResponderEvent) => void
}

 const ProgressBar = ({ handleProgressBarSeek, progress }: ProgressBarProps) => {

    const screenWidth = Dimensions.get('window').width;
    const progressWidthAndroid = (Math.round(progress) / 100) * screenWidth;
   const progressBarDimension:  number | `${number}%` = Platform.OS === 'android' ? progressWidthAndroid : `${progress}%`
   
  return (
    <TouchableOpacity style={styles.container}  onPress={(event) => handleProgressBarSeek(screenWidth, event)}>
      <Animated.View
        style={[
          styles.progress, 
          { width: progressBarDimension }
        ]} 
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: '100%',
    height: 16,
    backgroundColor: '#e0e0e0',
    overflow: 'hidden',
    
  },
  progress: {
    maxWidth: '100%',
    height: '100%',
    backgroundColor: '#8BED4F',
  },
});

export default memo(ProgressBar)