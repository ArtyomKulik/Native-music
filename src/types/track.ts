import { AudioStatus } from "expo-audio";
import { GestureResponderEvent } from "react-native";

export type TrackType = {
    id: string;
    title: string;
    uri: string;
}

export type UseAudioPlayerControllerType = {
    currentTrackIndex: number;
    isPlaying: boolean;
    progressBar: number;
    playerStatus: AudioStatus;
    handlePlay: () => void;
    handlePause: () => void;
    handleNextTrack: () => Promise<void>;
    handlePrevTrack: () => Promise<void>;
    handleProgressBarSeek: (width: number, event: GestureResponderEvent) => void
  }

