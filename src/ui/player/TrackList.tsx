import { TrackType } from "@/src/types/track";
import { FC, memo } from "react";
import { FlatList, StyleSheet, Text } from "react-native";

export const TrackList: FC<{tracks: TrackType[]}> = memo(({ tracks }) => {
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
