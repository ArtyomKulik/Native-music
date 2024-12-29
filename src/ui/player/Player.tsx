import React, { memo } from "react";
import {
  StyleSheet,
  Text,
} from "react-native";
import { UseAudioPlayerControllerType } from "@/src/types/track";
import PlayerControls from "./PlayerControls";
import  ProgressBar from "./ProgressBar";
import { useTrackStore } from "@/src/zustand/trackStore";

interface PlayerPropsType {
  playerControlsProps: UseAudioPlayerControllerType
}

const Player: React.FC<PlayerPropsType> = memo(({playerControlsProps}) => {
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
    handleProgressBarSeek
  } = playerControlsProps



  const currentTrackTitle = tracks[currentTrackIndex].title

  return (
    <>
          <Text style={styles.nowPlayingText}>{isPlaying ? `Играет: ${currentTrackTitle}` : `На паузе: ${currentTrackTitle}`}</Text>
     <ProgressBar handleProgressBarSeek={handleProgressBarSeek} progress={progressBar}/>
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
