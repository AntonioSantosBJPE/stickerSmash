import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
const PlaceholderImage = require("./assets/images/background-image.png");
import ImageViewer from "./src/components/ImageViewer";
import Button from "./src/components/Button";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useState } from "react";
import IconButton from "./src/components/IconButton";
import CircleButton from "./src/components/CircleButton";
import EmojiPicker from "./src/components/EmojiPicker";
import EmojiList from "./src/components/EmojiList";
import EmojiSticker from "./src/components/EmojiSticker";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState<any>(null);

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
    setPickedEmoji(null);
    setSelectedImage(null);
    setIsModalVisible(false);
  }, []);

  const onAddSticker = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const onSaveImageAsync = useCallback(async () => {
    // we will implement this later
  }, []);
  const onModalClose = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
        {pickedEmoji && (
          <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
        )}
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
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onCloseModal={onModalClose} onSelect={setPickedEmoji} />
      </EmojiPicker>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
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
