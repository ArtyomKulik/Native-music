import { TrackType } from "@/src/types/track";
import { useTrackStore } from "@/src/zustand/trackStore";
import { useAudioPlayer } from "expo-audio";
import { FC, memo } from "react";
import { FlatList, StyleSheet, Text } from "react-native";

export const TrackList: FC = memo(() => {
  const {tracks} = useTrackStore()
    return (
        <FlatList
        style={styles.list}
          data={tracks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Text>{item.title}</Text>}
        />
      
      );
} )

const styles = StyleSheet.create({
    list: {
      width: "100%",
      flexGrow: 0,
    }
  });
