import React, { useEffect, useState, useCallback } from "react"; 
import { Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native"; 
import { FlatList } from "react-native";
import { useAuthUser } from "../../context/UserContextProvider";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import CourseProgressCard from "../../components/common/CourseProgressCard";
import colors from "../../constants/colors";
import { router } from "expo-router";

const Progress = () => {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true); // Start loading as true for initial fetch
  const [error, setError] = useState(null); // Add error state
  const { userData } = useAuthUser();

  // Memoize GetCourseList using useCallback
  // It only re-creates if userData.email changes
  const GetCourseList = useCallback(async () => {
    if (!userData?.email) {
      console.log("User data or email not available, skipping course fetch.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setCourseList([]); // Clear previous data
    setError(null); // Clear any previous errors

    try {
      const q = query(
        collection(db, "courses"),
        where("createdBy", "==", userData.email)
      );
      const querySnapshot = await getDocs(q);

      const fetchedCourses = [];
      if (querySnapshot.empty) {
        console.log("No courses found created by:", userData.email);
      } else {
        querySnapshot.forEach((doc) => {
          // It's good practice to include the document ID
          fetchedCourses.push({ id: doc.id, ...doc.data() });
        });
      }
      setCourseList(fetchedCourses);
    } catch (err) {
      console.error("Error fetching courses for user:", err);
      setError("Failed to load your courses. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [userData?.email]); // Dependency array: re-create GetCourseList if userData.email changes

  useEffect(() => {
    // Call GetCourseList only when userData is available and GetCourseList changes
    GetCourseList();
  }, [GetCourseList]); 

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/wave.png")}
        style={styles.waveImage}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.headerText}>
          Course Progress
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color={colors.PRIMARY} style={styles.loadingIndicator} />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : courseList.length === 0 ? (
          <Text style={styles.noCoursesText}>No courses created by you yet.</Text>
        ) : (
          <FlatList
            data={courseList}
            showsVerticalScrollIndicator={false}
            onRefresh={GetCourseList} // Use the memoized function here
            refreshing={loading}
            contentContainerStyle={styles.flatListContentContainer}
            keyExtractor={(item) => item.id} // Use item.id as key if available
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/courseView",
                    params: { courseParams: JSON.stringify(item) },
                  })
                }
                style={styles.cardTouchable} // Apply style to TouchableOpacity
              >
                <CourseProgressCard item={item} containerWidth={"96%"} />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default Progress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  waveImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 700,
  },
  contentContainer: {
    width: "100%",
    padding: 20,
    marginTop: 20,
    flex: 1, 
  },
  headerText: {
    fontSize: 25,
    fontFamily: "outfit-bold",
    marginTop: 20,
    color: colors.WHITE,
  },
  loadingIndicator: {
    marginTop: 50,
  },
  errorText: {
    color: colors.RED,
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
  noCoursesText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: colors.GRAY,
  },
  flatListContentContainer: {
    marginTop: 20,
    paddingBottom: 50, 
  },
  cardTouchable: {
    marginBottom: 15, 
  }
});