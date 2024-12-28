import React, { memo } from "react";

import {
  StyleSheet,
  Text,
} from "react-native";

import { useAudioPlayerController } from "@/src/hooks/useAudioPlayerController";
import { TrackType } from "@/src/types/track";
import PlayerControls from "./PlayerControls";
import  ProgressBar from "./ProgressBar";

interface PlayerPropsType {
  tracks: TrackType[]
}

const Player: React.FC<PlayerPropsType> = memo(({tracks}) => {

  const {
    currentTrackIndex,
    isPlaying,
    progressBar,
    playerStatus,
    handlePlay,
    handlePause,
    handleNextTrack,
    handlePrevTrack
  } = useAudioPlayerController(tracks);

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
