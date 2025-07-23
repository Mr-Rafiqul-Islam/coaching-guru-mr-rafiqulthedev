import { FlatList, Text, View } from "react-native";
import colors from "../../constants/colors";
import { courseCategory } from "../../constants/option";
import CoursesByCategory from "../../components/explore/CoursesByCategory";

const Explore = () => {
  return (
    <FlatList
      data={courseCategory}
      style={{ flex: 1, backgroundColor: colors.WHITE }}
      ListHeaderComponent={
        <View style={{ flex: 1, padding: 25 }}>
          <Text style={{ fontSize: 30, fontFamily: "outfit-bold",marginTop: 20 }}>
            Explore More Courses
          </Text>
        </View>
      }
      renderItem={({item, index}) => (
        <View key={index} style={{ marginTop: 10 }}>
          <CoursesByCategory category={item} />
        </View>
      )}
    />
  );
};

export default Explore;
