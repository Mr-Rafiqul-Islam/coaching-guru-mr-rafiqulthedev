import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { imageAssets } from "../../constants/option";
import colors from "../../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
const CourseList = ({ courseList }) => {
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 25, fontFamily: "outfit-bold" }}>
        Course List
      </Text>

      <FlatList
        data={courseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.courseContainer}>
            <Image
              source={imageAssets[item.banner_image]}
              style={{ width: "100%", height: 150, borderRadius: 15 }}
              resizeMode="cover"
            />
            <Text style={{ fontFamily: "outfit-bold", marginTop: 10 }}>
              {item?.courseTitle}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
                gap: 5,
              }}
            >
              <Ionicons name="book-outline" size={24} color="black" />
              <Text style={{ fontFamily: "outfit", margingTop: 5 }}>
                {item?.chapters?.length} Chpaters
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default CourseList;

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
