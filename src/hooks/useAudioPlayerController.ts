import { AudioModule, useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { useEffect, useState } from "react";
import { TrackType, UseAudioPlayerControllerType } from "../types/track";

interface AudioPlayerState {
    currentTrackIndex: number;
    isPlaying: boolean;
    progressBar: number;
  }


export const useAudioPlayerController = (tracks: TrackType[], initialTrackIndex = 0): UseAudioPlayerControllerType => {
    const [audioPlayerState, setAudioPlayerState] = useState<AudioPlayerState>({
        currentTrackIndex: initialTrackIndex,
        isPlaying: false,
        progressBar: 0,
      });

      const player = useAudioPlayer(tracks[audioPlayerState.currentTrackIndex].uri);
      const playerStatus = useAudioPlayerStatus(player);

      useEffect(() => {
        const configureAudioMode = async () => {
          AudioModule.setAudioModeAsync({
            playsInSilentMode: true,
            shouldPlayInBackground: true,
            shouldRouteThroughEarpiece: false,
          });
        };
        configureAudioMode();
      }, []);

      useEffect(() => {
        const trackListenedInSeconds = Math.floor(playerStatus.currentTime / 1000);
        const trackDurationInSeconds = Math.floor(playerStatus.duration / 1000);
        if (trackDurationInSeconds > 0) {
            setAudioPlayerState(prev => ({
              ...prev,
              progressBar: Math.max(0, Math.min(100, trackListenedInSeconds / trackDurationInSeconds) * 100)
            }));
          }
        }, [playerStatus.currentTime]);

        useEffect(() => {
            if (audioPlayerState.isPlaying) {
              player.play();
            }
          }, [player.id]);

       

          const handlePlay = async () => {
            setAudioPlayerState(prev => ({ ...prev, isPlaying: true }));
            player.play();
          
            
          }

          const handlePause = async () => {
            setAudioPlayerState(prev => ({ ...prev, isPlaying: false }));
            player.pause();
            
          }


          const handlePrevTrack = async () => {
            if (audioPlayerState.currentTrackIndex > 0) {
            try {
              await player.remove();
              setAudioPlayerState(prev => ({
                ...prev,
                currentTrackIndex: prev.currentTrackIndex - 1
              }));
              if (typeof tracks[audioPlayerState.currentTrackIndex].uri === "string") {
                await player.replace(tracks[audioPlayerState.currentTrackIndex].uri);
              }
            } catch {}
            }
        }
        const handleNextTrack = async () => {
            if (audioPlayerState.currentTrackIndex < tracks.length - 1) {
              await player.remove();
              setAudioPlayerState(prev => ({
                ...prev,
                currentTrackIndex: prev.currentTrackIndex + 1
              }));
              if (typeof tracks[audioPlayerState.currentTrackIndex].uri === "string") {
                await player.replace(tracks[audioPlayerState.currentTrackIndex].uri);
              }
            }
          }
    
    return {
        currentTrackIndex: audioPlayerState.currentTrackIndex,
        isPlaying: audioPlayerState.isPlaying,
        progressBar: audioPlayerState.progressBar,
        playerStatus,
        handlePlay,
        handlePause,
        handleNextTrack,
        handlePrevTrack,
    };
  };