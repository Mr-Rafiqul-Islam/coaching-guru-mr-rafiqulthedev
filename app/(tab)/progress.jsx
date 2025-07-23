import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useAuthUser } from "../../context/UserContextProvider";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import CourseProgressCard from "../../components/common/CourseProgressCard";
import colors from "../../constants/colors";
import { router } from "expo-router";

const Progress = () => {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userData } = useAuthUser();

  const GetCourseList = async () => {
    setLoading(true);
    setCourseList([]);
    const q = query(
      collection(db, "courses"),
      where("createdBy", "==", userData.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      setCourseList((prev) => [...prev, doc.data()]);
    });
    setLoading(false);
  };

  useEffect(() => {
    userData && GetCourseList();
  }, [userData]);
  return (
    <View style={{ flex: 1, backgroundColor: colors.WHITE }}>
      <Image
        source={require("../../assets/images/wave.png")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 700,
        }}
      />
      <View
        style={{
          width: "100%",
          padding: 20,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontFamily: "outfit-bold",
            marginTop: 20,
            color: colors.WHITE,
          }}
        >
          Course Progress
        </Text>
        <FlatList
          data={courseList}
          showsVerticalScrollIndicator={false}
          onRefresh={() => GetCourseList()}
          refreshing={loading}
          contentContainerStyle={{ marginTop: 20 }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/courseView",
                  params: { courseParams: JSON.stringify(item) },
                })
              }
              key={index}
            >
              <CourseProgressCard item={item} containerWidth={"96%"} />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Progress;

const styles = StyleSheet.create({});
