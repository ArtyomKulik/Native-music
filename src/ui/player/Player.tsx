import React, { memo } from "react";
import {
  StyleSheet,
  Text,
} from "react-native";
import { useAudioPlayerController } from "@/src/hooks/useAudioPlayerController";
import { TrackType, UseAudioPlayerControllerType } from "@/src/types/track";
import PlayerControls from "./PlayerControls";
import  ProgressBar from "./ProgressBar";
import * as Notifications from 'expo-notifications';

interface PlayerPropsType {
  tracks: TrackType[],
  playerControlsProps: UseAudioPlayerControllerType
}

const Player: React.FC<PlayerPropsType> = memo(({tracks, playerControlsProps}) => {

  const {
    currentTrackIndex,
    isPlaying,
    progressBar,
    playerStatus,
    handlePlay,
    handlePause,
    handleNextTrack,
    handlePrevTrack
  } = playerControlsProps

  const currentTrackTitle = tracks[currentTrackIndex].title



  return (
    <>
          <Text style={styles.nowPlayingText}>{isPlaying ? `Играет: ${currentTrackTitle}` : `Текущий трек: ${currentTrackTitle}`}</Text>
     <ProgressBar progress={progressBar}/>
      <PlayerControls
        handlePlay={handlePlay}
        handlePause={handlePause}
        handleNextTrack={handleNextTrack}
        handlePrevTrack={handlePrevTrack}
        isPlaying={isPlaying}
        isLoaded={playerStatus.isLoaded}
        canGoNext={currentTrackIndex < tracks.length - 1}
        canGoPrev={currentTrackIndex > 0}
        />
    </>

  );
})


const styles = StyleSheet.create({
  nowPlayingText: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  }
})
export default Player;
