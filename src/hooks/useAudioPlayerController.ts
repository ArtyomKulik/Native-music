import { AudioModule, useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { useEffect, useRef, useState } from "react";
import { TrackType, UseAudioPlayerControllerType } from "../types/track";
import { GestureResponderEvent, Platform, AppState } from "react-native";
import * as Notifications from 'expo-notifications';

interface AudioPlayerState {
    currentTrackIndex: number;
    isPlaying: boolean;
    progressBar: number;
  }


  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
      priority: Notifications.AndroidNotificationPriority.MAX
    }),
  });

export const useAudioPlayerController = (tracks: TrackType[], initialTrackIndex = 0): UseAudioPlayerControllerType => {

  useEffect(() => {
    const configureAudioMode = async () => {
      AudioModule.setAudioModeAsync({
        playsInSilentMode: true,
        shouldPlayInBackground: true,
        shouldRouteThroughEarpiece: false,
        interruptionMode: "doNotMix",
      });
    };
    configureAudioMode();
  }, []);

    const [audioPlayerState, setAudioPlayerState] = useState<AudioPlayerState>({
        currentTrackIndex: initialTrackIndex,
        isPlaying: false,
        progressBar: 0,
      });

      const player = useAudioPlayer(tracks[audioPlayerState.currentTrackIndex].uri);
      const playerStatus = useAudioPlayerStatus(player);

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




// Notification logic
          if(Platform.OS === 'android' || Platform.OS === 'ios') {
          const notificationIdRef = useRef<string | null>(null);
          useEffect(() => {
            const currentTrack = tracks[audioPlayerState.currentTrackIndex];

            Notifications.setNotificationCategoryAsync('audio-controls', [
              {
                identifier: 'previous',
                buttonTitle: 'Previous',
              },
              {
                identifier:  audioPlayerState.isPlaying ? 'pause' : 'play',
                buttonTitle: audioPlayerState.isPlaying ? '<button>pause</button>' : 'Play', // fixed P
              },
              {
                identifier: 'next',
                buttonTitle: 'Next',
              },
           
              ]);

              Notifications.scheduleNotificationAsync({
                content: {
                  title: currentTrack.title,
                  body: `Playing: ${currentTrack.title}`,
                  data: { trackId: currentTrack.id}, 
                  categoryIdentifier: 'audio-controls', 
                },
                trigger: null,
                
              }).then(id=>  notificationIdRef.current = id).catch()
              
              return () => {
               notificationIdRef.current && Notifications.dismissNotificationAsync(notificationIdRef.current)
              }
          }, [player, tracks[audioPlayerState.currentTrackIndex].uri, audioPlayerState.isPlaying])

          useEffect(() => {
            const subscription = Notifications.addNotificationResponseReceivedListener(response => {
            const action = response.actionIdentifier
        
              if (action === 'play') {
                handlePlay();
              } else if (action === 'pause') {
                handlePause(); 
              } else if (action === 'next') {
                handleNextTrack();
              } else if (action === 'previous') {
                handlePrevTrack();
              } else {
                throw new Error(response.actionIdentifier)
              }
            });
        
            return () => {
              subscription.remove(); 
            };
          }, [notificationIdRef.current]);  
          }

          const handlePlay = async () => {
            setAudioPlayerState(prev => ({ ...prev, isPlaying: true }));
            await player.play();
          }

          const handlePause = async () => {
            setAudioPlayerState(prev => ({ ...prev, isPlaying: false }));
            await player.pause();
            
          }


          const handlePrevTrack = async () => {
            if (audioPlayerState.currentTrackIndex > 0) {
            try {
             
              await player.remove();
              setAudioPlayerState(prev => ({
                ...prev,
                currentTrackIndex: prev.currentTrackIndex - 1,
                progressBar: 0
              }));
             
              if (typeof tracks[audioPlayerState.currentTrackIndex].uri === "string") {
                await player.replace(tracks[audioPlayerState.currentTrackIndex].uri);
              }
            } catch (error: any) {
                throw new Error(error)
            }
            }
        }
        const handleNextTrack = async () => {
                if (audioPlayerState.currentTrackIndex < tracks.length - 1) {
          try {
              await player.remove();
              setAudioPlayerState(prev => ({
                ...prev,
                currentTrackIndex: prev.currentTrackIndex + 1,
                progressBar: 0
              }));
              if (typeof tracks[audioPlayerState.currentTrackIndex].uri === "string") {
                await player.replace(tracks[audioPlayerState.currentTrackIndex].uri);
              }
            }
              catch (error: any) {throw new Error(error)}
            }
          }

          const handleProgressBarSeek = (width: number, event: GestureResponderEvent | MouseEvent): void => {
            if(Platform.OS === 'android') {
              const { locationX } = (event as GestureResponderEvent).nativeEvent;
              const percentage = locationX / width; 
              const newTime = percentage * player.duration;
              player.seekTo(newTime);
              
            } if(Platform.OS === 'web') {
              const { clientX } = event as MouseEvent; 
              const percentage = clientX / width;
              const newTime = percentage * player.duration;
              player.seekTo(newTime);
            }
           
          };
    
    return {
        currentTrackIndex: audioPlayerState.currentTrackIndex,
        isPlaying: audioPlayerState.isPlaying,
        progressBar: audioPlayerState.progressBar,
        playerStatus,
        handlePlay,
        handlePause,
        handleNextTrack,
        handlePrevTrack,
        handleProgressBarSeek,
    };
  };