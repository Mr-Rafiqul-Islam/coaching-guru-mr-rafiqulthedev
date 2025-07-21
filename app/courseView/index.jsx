import { useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Intro from "../../components/course-view/Intro";
import colors from "../../constants/colors";
import Chapters from "../../components/course-view/Chapters";

const CourseView = () => {
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        minHeight: "100%",
        backgroundColor: colors.WHITE,
      }}
    >
        <Intro course={course}/>
        <Chapters course={course}/>
      <StatusBar backgroundColor="#ffffff" style="inverted" />
    </SafeAreaView>
  );
};

export default CourseView;

const styles = StyleSheet.create({});
