import { Image, StyleSheet, Text, View } from "react-native";
import { imageAssets } from "../../constants/option";
import * as Progress from "react-native-progress";
import colors from "../../constants/colors";

const CourseProgressCard = ({ item, containerWidth }) => {
  return (
    <View style={[styles.courseContainer, { width: containerWidth }]}>
      <View
        style={{
          flexDirection: "row",
          marginTop: 5,
          gap: 10,
        }}
      >
        <Image
          source={imageAssets[item.banner_image]}
          style={{ width: 80, height: 80, borderRadius: 15 }}
          resizeMode="cover"
        />

        <View style={{ flex: 1 }}>
          <Text
            style={{ fontFamily: "outfit-bold", flexWrap: "wrap" }}
            numberOfLines={2}
          >
            {item?.courseTitle}
          </Text>
          <Text style={{ fontFamily: "outfit", margingTop: 5 }}>
            {item?.chapters?.length} Chapters
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        <Progress.Bar progress={1 / 3} width={containerWidth-20} />
        <Text style={{ fontFamily: "outfit", marginTop: 5 }}>
          3 Out of 5 Chapter Completed
        </Text>
      </View>
    </View>
  );
};

export default CourseProgressCard;

const styles = StyleSheet.create({
  courseContainer: {
    padding: 10,
    backgroundColor: colors.BG_GRAY,
    borderRadius: 15,
    margin: 6,
  },
});
