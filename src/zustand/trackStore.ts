import { create } from 'zustand';
import { TrackType } from '../types/track';
import Baby_Why_mp3 from "../assets/Sarah Cothran — Baby Why.mp3";
import Beautiful_Things_mp3 from "../assets/Benson Boone - Beautiful Things.mp3";

interface PlayerState {
  tracks: TrackType[];
  addTrack: (track: TrackType) => void;  
}

export const useTrackStore = create<PlayerState>((set, _) => ({
  tracks: [
    { id: "1", title: "Baby Why", uri: Baby_Why_mp3 },
    { id: "2", title: "Beautiful Things", uri: Beautiful_Things_mp3 },
  ],

  addTrack: (track: TrackType) => set((state) => ({   
    tracks: [...state.tracks, track]
  })),
}));

