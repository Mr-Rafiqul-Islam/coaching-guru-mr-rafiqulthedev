import React, { useEffect, useState, useCallback } from "react"; 
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native"; 
import { db } from "../../config/firebaseConfig";
import colors from "../../constants/colors";

import CourseList from "../home/CourseList";

const CoursesByCategory = ({ category }) => {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); // State for error handling

  // Use useCallback to memoize the fetch function, preventing unnecessary re-creations
  const fetchCourseListByCategory = useCallback(async () => {
    setLoading(true);
    setCourseList([]); // Clear previous data
    setError(null); // Clear previous errors

    try {
      if (typeof category !== 'string' || !category) {
        console.warn("CoursesByCategory: Invalid category prop:", category);
        // Set an error or just stop
        setError("Invalid category provided.");
        setLoading(false);
        return;
      }

      const coursesCollectionRef = collection(db, "courses");
      const q = query(
        coursesCollectionRef,
        where("category", "==", category),
        orderBy("createdOn", "desc")
      );

      const querySnapshot = await getDocs(q);

      const fetchedCourses = [];
      if (querySnapshot.empty) {
        console.log(`No courses found for category: "${category}"`);
      } else {
        querySnapshot.forEach((doc) => {
          fetchedCourses.push({ id: doc.id, ...doc.data() }); // Include doc.id for unique keys
        });
      }
      setCourseList(fetchedCourses);
    } catch (err) {
      console.error("Error fetching courses by category:", err);
      setError("Failed to load courses. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [category]); 

  useEffect(() => {
    fetchCourseListByCategory();
  }, [fetchCourseListByCategory]); // Depend on the memoized function

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.PRIMARY} style={styles.loadingIndicator} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : courseList.length > 0 && (
        // Pass the actual heading here, which is the category name
        <CourseList courseList={courseList} heading={category} enroll={true}/>
      )}
    </View>
  );
};

export default CoursesByCategory;

const styles = StyleSheet.create({
  container: { 
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20
  },
  loadingIndicator: {
    marginTop: 50,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
});