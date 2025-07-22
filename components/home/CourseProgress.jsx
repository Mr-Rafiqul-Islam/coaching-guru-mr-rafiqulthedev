import { FlatList, Text, View } from "react-native";
import CourseProgressCard from "../common/CourseProgressCard";

const CourseProgress = ({ courseList }) => {
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 25, fontFamily: "outfit-bold" }}>Progress</Text>
      <FlatList
        data={courseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View key={index}>
            <CourseProgressCard item={item} containerWidth={240}/>
          </View>
        )}
      />
    </View>
  );
};

export default CourseProgress;

