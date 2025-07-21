import { StyleSheet, Text, View } from "react-native";
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

const Home = () => {
  const [courseList, setCourseList] = useState([]);
  const { userData } = useAuthUser();

  const GetCourseList = async () => {
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
  };

  useEffect(() => {
    userData && GetCourseList();
  }, [userData]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        minHeight: "100%",
        padding: 20,
        backgroundColor: colors.WHITE,
      }}
    >
      <Header />
      {courseList.length > 0 ?(
        <View>
        <PractiseSection />
        <CourseList courseList={courseList}/>
        </View>
        ) : <NoCourse />}
      <StatusBar backgroundColor="#ffffff" style="inverted" />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
