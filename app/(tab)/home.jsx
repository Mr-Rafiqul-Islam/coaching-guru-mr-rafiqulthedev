import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

import Header from "../../components/home/Header";
import NoCourse from "../../components/home/NoCourse";
import CourseList from "../../components/home/CourseList";
import PractiseSection from "../../components/home/PractiseSection";
import CourseProgress from "../../components/home/CourseProgress";
import colors from "../../constants/colors";
import { useAuthUser } from "../../context/UserContextProvider";

const Home = () => {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const { userData } = useAuthUser();

  // Memoized function to fetch courses created by the user
  const getCoursesCreatedByUser = useCallback(async () => {
    // Only fetch if userData and userData.email are available
    if (!userData?.email) {
      console.log("User data or email not available, skipping course fetch.");
      setLoading(false); 
      return;
    }

    setLoading(true);
    setCourseList([]); // Clear previous data
    setError(null); 

    try {
      const coursesCollectionRef = collection(db, "courses");
      const q = query(
        coursesCollectionRef,
        where("createdBy", "==", userData.email)
      );
      const querySnapshot = await getDocs(q);

      const fetchedCourses = [];
      if (querySnapshot.empty) {
        console.log(`No courses found created by ${userData.email}.`);
      } else {
        querySnapshot.forEach((doc) => {
          // Include doc.id for better key management in lists
          fetchedCourses.push({ id: doc.id, ...doc.data() });
        });
      }
      setCourseList(fetchedCourses);
    } catch (err) {
      console.error("Home: Error fetching user's courses:", err);
      setError("Failed to load your courses. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [userData?.email]); 

  // Effect to call the memoized fetch function
  useEffect(() => {
    getCoursesCreatedByUser();
  }, [getCoursesCreatedByUser]); 

  
  // Function to render the main content of the Home screen
  const renderHomeContent = () => {
    if (loading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100%",
            marginTop: 50,
          }}
        >
          <ActivityIndicator size="large" color={colors.PRIMARY} />
          <Text style={{ marginTop: 10, fontSize: 16, color: colors.GRAY }}>
            Loading your courses...
          </Text>
        </View>
      );
    }

    if (error) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            minHeight: 200,
            marginTop: 50,
          }}
        >
          <Text
            style={{
              color: colors.RED,
              textAlign: "center",
              fontSize: 16,
              marginBottom: 10,
            }}
          >
            {error}
          </Text>
          <Pressable
            onPress={getCoursesCreatedByUser}
            style={{
              backgroundColor: colors.PRIMARY,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: colors.WHITE, fontFamily: "outfit-bold" }}>
              Retry
            </Text>
          </Pressable>
        </View>
      );
    }

    return (
      <SafeAreaView
        style={{
          flex: 1,
          padding: 20,
        }}
      >
        <Header />

        {courseList.length > 0 ? (
          <View>
            <CourseProgress courseList={courseList} />
            <PractiseSection />
            <CourseList courseList={courseList} />
          </View>
        ) : (
          <NoCourse />
        )}
        <StatusBar backgroundColor={colors.WHITE} style="dark" />
      </SafeAreaView>
    );
  };

  return (
    <>
      <FlatList
        data={[]}
        onRefresh={getCoursesCreatedByUser}
        refreshing={loading}
        ListHeaderComponent={
          <View
            style={{
              flex: 1,
              backgroundColor: colors.WHITE,
              minHeight: "100%",
            }}
          >
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
            {renderHomeContent()}
          </View>
        }
        contentContainerStyle={{ paddingBottom: 50 ,backgroundColor: colors.WHITE} }
      />
    </>
  );
};

export default Home;
