import { Image, StyleSheet, Text, View } from "react-native";
import Button from "../common/Button";
import { router } from "expo-router";

const NoCourse = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/book.png")}
        style={{ width: 200, height: 200 }}
        resizeMode="contain"
      />
      <Text style={styles.title}>You Don't Have Any Course</Text>
      <Button text="+ Create New Course" onPress={() => router.push("/addCourse")}/>
      <Button text="Explore Existing Courses" type="outline"/>
    </View>
  );
};

export default NoCourse;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontFamily: "outfit-bold",
    textAlign: "center",
  },
});
