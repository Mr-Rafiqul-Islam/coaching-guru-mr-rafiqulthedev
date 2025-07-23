import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions, // For responsive width
} from "react-native";
import { router } from "expo-router"; // Assuming expo-router for navigation
import Ionicons from "@expo/vector-icons/Ionicons";

import colors from "../../constants/colors";
import { imageAssets } from "../../constants/option";

// Get screen width for responsive sizing
const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.6; // For example, 60% of screen width

const CourseList = ({ courseList, heading = "Courses" }) => {
  // Defensive check for courseList
  if (!courseList || courseList.length === 0) {
    return (
      <View style={{ marginTop: 20, paddingHorizontal: 15 }}>
        <Text style={{ fontSize: 25, fontFamily: "outfit-bold", marginBottom: 10 }}>{heading}</Text>
        <Text style={{ textAlign: 'center', color: colors.GRAY }}>
          No courses available in this category yet.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{heading}</Text>

      <FlatList
        data={courseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item.id || index.toString()} // Use a unique ID if available, otherwise index
        renderItem={({ item }) => ( // No need for index if not used directly
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/courseView",
                params: { courseParams: JSON.stringify(item) },
              })
            }
            style={styles.courseCard}
          >
            {/* Image rendering: ensure item.banner_image maps to imageAssets keys or is a valid URI */}
            <Image
              source={imageAssets[item.banner_image] || imageAssets.default_course_banner}
              style={styles.courseImage}
              resizeMode="cover"
              onError={(e) => console.log("Image load error:", e.nativeEvent.error)} // Debug image loading
            />
            <Text style={styles.courseTitle} numberOfLines={2}>
              {item?.courseTitle || 'Untitled Course'}
            </Text>
            <View style={styles.courseMeta}>
              <Ionicons name="book-outline" size={20} color={colors.BLACK} />
              <Text style={styles.chapterText}>
                {item?.chapters?.length || 0} Chapters
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CourseList;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 25, 
    flex:1// Only pad left, let cards handle horizontal spacing
  },
  heading: {
    fontSize: 25,
    fontFamily: "outfit-bold",
    marginBottom: 15, // Space between heading and list
  },
  courseCard: {
    padding: 10,
    backgroundColor: colors.BG_GRAY,
    borderRadius: 15,
    marginRight: 15, // Space between cards
    width: ITEM_WIDTH, // Use calculated width
    // Add shadow properties for better visual separation
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    
  },
  courseImage: {
    width: "100%",
    height: 120, // Slightly reduced height for better aspect ratio
    borderRadius: 10, // Match card borderRadius
    marginBottom: 10,
  },
  courseTitle: {
    fontFamily: "outfit-bold",
    fontSize: 16,
    // Add margin bottom if more space is needed
  },
  courseMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    gap: 5,
  },
  chapterText: {
    fontFamily: "outfit",
    fontSize: 14,
    color: colors.DARK_GRAY,
  },
});