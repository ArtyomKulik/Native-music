import React, { FC, useState } from 'react'
import { Alert, Button} from 'react-native'
import * as DocumentPicker from "expo-document-picker";
import { TrackType } from '@/src/types/track';


interface AddLocalTrackFilePropsType {
    setTracks: React.Dispatch<React.SetStateAction<TrackType[]>>
}

 const AddLocalTrackFile: FC<AddLocalTrackFilePropsType> = ({setTracks}) => {
    const [file, setFile] = useState<DocumentPicker.DocumentPickerResult | null>(null);

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
                id: (prev.length + 1).toString(),
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
  return (
    <>
           <Button title="Загрузить трек" onPress={pickDocument} />
      </>
  )
}



export default AddLocalTrackFile