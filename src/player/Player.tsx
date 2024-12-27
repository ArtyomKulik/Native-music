import { AudioModule, useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import React, { useEffect, useState } from "react";
import Baby_Why_mp3 from "../assets/Sarah Cothran — Baby Why.mp3";
import Beautiful_Things_mp3 from "../assets/Benson Boone - Beautiful Things.mp3";
import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import * as DocumentPicker from "expo-document-picker";

interface Track {
  id: string;
  title: string;
  uri: string;
}

function Player() {
  const [file, setFile] = useState<DocumentPicker.DocumentPickerResult | null>(
    null
  );
  const [tracks, setTracks] = useState<Track[]>([
    { id: "1", title: "Baby Why", uri: Baby_Why_mp3 },
    { id: "2", title: "Beautiful Things", uri: Beautiful_Things_mp3 },
  ]);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "audio/mpeg",
        copyToCacheDirectory: true,
      });
      if (!result.canceled && result.assets[0].mimeType === "audio/mpeg") {
        setFile(result);
        setTracks((prev) => [
          ...prev,
          {
            id: (tracks.length + 1).toString(),
            title: result.assets[0].name,
            uri: result.assets[0].uri,
          },
        ]);
        Alert.alert(`Выбран файл, URI: ${result.assets[0].uri}`);
      } else {
        Alert.alert("Ошибка");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while picking the file.");
    }
  };
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const player = useAudioPlayer(tracks[currentTrackIndex].uri);

  const playerStatus = useAudioPlayerStatus(player);
  const [progressBar, setProgressBar] = useState<number>(0);

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
      setProgressBar(
        Math.max(
          0,
          Math.min(100, trackListenedInSeconds / trackDurationInSeconds) * 100
        )
      );
    }
  }, [playerStatus]);

  useEffect(() => {
    if (isPlaying) {
      player.play();
    }
  }, [player.id]);

  const handlePlay = () => {
    setIsPlaying(true);
    player.play();
  };

  const handlePause = () => {
    setIsPlaying(false);
    player.pause();
  };

  const handlePrevTrack = () => {
    if (currentTrackIndex > 0) {
      console.log(typeof tracks[currentTrackIndex]);
      if (typeof tracks[currentTrackIndex].uri === "string") {
        player.remove();
        player.replace(tracks[currentTrackIndex]);
      }
      setCurrentTrackIndex((prev) => prev - 1);
    }
  };

  const handleNextTrack = () => {
    if (currentTrackIndex < tracks.length - 1) {
      if (typeof tracks[currentTrackIndex].uri === "string") {
        player.remove();
        player.replace(tracks[currentTrackIndex]);
      }
      setCurrentTrackIndex((prev) => prev + 1);
    }
  };
  return (
    <View style={styles.container}>
      <Button title="Загрузить трек" onPress={pickDocument} />
      {file && (
        <Text>
          Selected File: {file && file.assets && file?.assets[0]?.name}
        </Text>
      )}
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
          <Text>{item.title}</Text>        
          </>
        )}
      />

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progressBar}%` }]} />
      </View>
      <Text>Сейчас играет: {tracks[currentTrackIndex].title}</Text>
      <View style={styles.playerControls}>
        <Button
          title="<"
          onPress={handlePrevTrack}
          disabled={currentTrackIndex === 0}
        />

        {playerStatus.playing || isPlaying ? (
          <TouchableOpacity
            disabled={playerStatus.isLoaded === false}
            onPress={handlePause}
          >
            <Text style={styles.buttonText}>⏸️</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            disabled={playerStatus.isLoaded === false}
            onPress={handlePlay}
          >
            <Text style={styles.buttonText}>▶️</Text>
          </TouchableOpacity>
        )}

        <Button
          title=">"
          onPress={handleNextTrack}
          disabled={currentTrackIndex === tracks.length - 1}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
  },
  progressBarContainer: {
    height: 20,
    borderRadius: 5,
  },
  progressBar: {
    height: "100%",
    width: "auto",
    backgroundColor: "tomato",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  playerControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  buttonText: {
    fontSize: 37,
  },
});

export default Player;
