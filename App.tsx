import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
const PlaceholderImage = require("./assets/images/background-image.png");
import ImageViewer from "./src/components/ImageViewer";
import Button from "./src/components/Button";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useState } from "react";
import IconButton from "./src/components/IconButton";
import CircleButton from "./src/components/CircleButton";

export default function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAppOptions, setShowAppOptions] = useState(false);

  const pickImageAsync = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("You did not select any image.");
    }
  }, []);

  const handleShowAppOptions = useCallback(() => {
    setShowAppOptions(true);
  }, []);

  const handleResetAppOptions = useCallback(() => {
    setShowAppOptions(false);
  }, []);

  const onAddSticker = useCallback(() => {
    // we will implement this later
  }, []);

  const onSaveImageAsync = useCallback(async () => {
    // we will implement this later
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton
              icon="refresh"
              label="Reset"
              onPress={handleResetAppOptions}
            />
            <CircleButton onAddSticker={onAddSticker} />
            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            chosePhoto={pickImageAsync}
            handleShowAppOptions={handleShowAppOptions}
            theme="primary"
            label="Choose a photo"
          />
          <Button
            chosePhoto={pickImageAsync}
            handleShowAppOptions={handleShowAppOptions}
            label="Use this photo"
          />
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
