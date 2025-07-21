import { FlatList, StyleSheet, Text, View } from "react-native";
import { Image } from "react-native";
import { imageAssets } from "../../constants/option";
import colors from "../../constants/colors";
import * as Progress from 'react-native-progress';

const CourseProgress = ({ courseList }) => {
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 25, fontFamily: "outfit-bold" }}>Progress</Text>
      <FlatList
        data={courseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.courseContainer}>
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

              <View>
                <Text style={{ fontFamily: "outfit-bold"}} numberOfLines={2}>
                  {item?.courseTitle}
                </Text>
                <Text style={{ fontFamily: "outfit", margingTop: 5 }}>
                  {item?.chapters?.length} Chapters
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>

            <Progress.Bar progress={0} width={220} />
            <Text style={{ fontFamily: "outfit", marginTop: 5 }}>
                3 Out of 5 Chapter Completed
            </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default CourseProgress;

const styles = StyleSheet.create({
  courseContainer: {
    padding: 10,
    backgroundColor: colors.BG_GRAY,
    borderRadius: 15,
    margin: 6,
    borderRadius: 15,
    width: 240,
  },
});
