import React, { memo } from 'react';
import { View, StyleSheet, Animated, Dimensions, Platform } from 'react-native';

interface ProgressBarProps {
  progress: number;
}

 const ProgressBar = ({ progress }: ProgressBarProps) => {
    const screenWidth = Dimensions.get('window').width;
    const progressWidthAndroid = (Math.round(progress) / 100) * screenWidth;
   const progressBarDimension:  number | `${number}%` = Platform.OS === 'android' ? progressWidthAndroid : `${progress}%`
   

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.progress, 
          { width: progressBarDimension }
        ]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: '100%',
    height: 10,
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