import { View, Image, DimensionValue, ImageSourcePropType } from "react-native";

interface Props {
  imageSize?: DimensionValue;
  stickerSource?: ImageSourcePropType;
}

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  return (
    <View style={{ top: -350 }}>
      <Image
        source={stickerSource}
        resizeMode="contain"
        style={{ width: imageSize, height: imageSize }}
      />
    </View>
  );
}
