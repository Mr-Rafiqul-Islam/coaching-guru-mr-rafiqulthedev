import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/home/Header";
import colors from "../../constants/colors";
import { StatusBar } from "expo-status-bar";
import NoCourse from "../../components/home/NoCourse";
import { useAuthUser } from "../../context/UserContextProvider";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import CourseList from "../../components/home/CourseList";
import PractiseSection from "../../components/home/PractiseSection";
import CourseProgress from "../../components/home/CourseProgress";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const Home = () => {
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
      console.log(doc.id, " => ", doc.data());
      setCourseList((prev) => [...prev, doc.data()]);
    });
    setLoading(false);
  };

  useEffect(() => {
    userData && GetCourseList();
  }, [userData]);
  return (
    <>
      <FlatList
        data={[]} 
        onRefresh={() => GetCourseList()}
        refreshing={loading}
        ListHeaderComponent={
          <SafeAreaView
            style={{
              flex: 1,
              minHeight: "100%",
              padding: 20,
              backgroundColor: colors.WHITE,
            }}
          >
            <Header />
            <Pressable
              onPress={() => router.push("/addCourse")}
              style={{
                marginTop: 20,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Ionicons name="add-circle-outline" size={32} color="black" />
              <Text style={{ fontSize: 20, fontFamily: "outfit-bold" }}>
                Add Course
              </Text>
            </Pressable>
              
            {courseList.length > 0 ? (
              <View>
                <CourseProgress courseList={courseList} />
                <PractiseSection />
                <CourseList courseList={courseList} />
              </View>
            ) : (
              <NoCourse />
            )}
            <StatusBar backgroundColor="#ffffff" style="inverted" />
          </SafeAreaView>
        }
      />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({});
