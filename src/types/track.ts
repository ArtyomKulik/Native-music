import { AudioStatus } from "expo-audio";

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
  }

