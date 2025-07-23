import { useLocalSearchParams } from "expo-router";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import colors from "../../../constants/colors";
import Intro from "../../../components/course-view/Intro";
import Chapters from "../../../components/course-view/Chapters";
import { db } from "../../../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const CourseView = () => {
  const { courseParams, enroll, courseId } = useLocalSearchParams();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    if (!courseParams) {
      GetCourseById();
    } else {
      setCourse(JSON.parse(courseParams));
    }
  }, [courseId, courseParams]);
  const GetCourseById = async () => {
    const docRef = getDoc(doc(db, "courses", courseId));
    const courseData = docRef.data();
    setCourse(courseData);
  };
  return (
    course && (
      <FlatList
        data={[]}
        ListHeaderComponent={
          <SafeAreaView
            style={{
              flex: 1,
              minHeight: "100%",
              backgroundColor: colors.WHITE,
            }}
          >
            <Intro course={course} enroll={enroll} />
            <Chapters course={course} />
            <StatusBar backgroundColor="#ffffff" style="inverted" />
          </SafeAreaView>
        }
      />
    )
  );
};

export default CourseView;
