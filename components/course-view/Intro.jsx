import { Alert, Image, Pressable, Text, View } from "react-native";
import { imageAssets } from "../../constants/option";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/colors";
import Button from "../common/Button";
import { router } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { useAuthUser } from "../../context/UserContextProvider";
import { useState } from "react";

const Intro = ({ course, enroll }) => {
  const { userData } = useAuthUser();
  const [loading, setLoading] = useState(false);
  const onEnrollCourse = async () => {
    setLoading(true);
    console.log("Enroll Now");
    const docId = Date.now().toString();
    const data = {
      ...course,
      createdBy: userData?.email,
      createdOn: new Date(),
      enrolled: true,
    };
    await setDoc(doc(db, "courses", docId), data);
    router.replace({
      pathname: `/courseView/${docId}`,
      params: { enroll: false, courseParams: JSON.stringify(data) },
    });
    setLoading(false);
    Alert.alert("Success", "Course Enrolled Successfully");
  };
  return (
    <View>
      <Image
        source={imageAssets[course.banner_image]}
        style={{ width: "100%", height: 280 }}
      />
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 25, fontFamily: "outfit-bold" }}>
          {course?.courseTitle}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 5,
            gap: 5,
          }}
        >
          <Ionicons name="book-outline" size={24} color="black" />
          <Text style={{ fontFamily: "outfit", margingTop: 5 }}>
            {course?.chapters?.length} Chpaters
          </Text>
        </View>
        <Text
          style={{ fontFamily: "outfit-bold", marginTop: 10, fontSize: 20 }}
        >
          Description:
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            margingTop: 5,
            fontSize: 16,
            color: colors.GRAY,
          }}
        >
          {course?.description}
        </Text>
        {enroll === "true" ? (
          <Button
            text={"Enroll Now"}
            loading={loading}
            onPress={onEnrollCourse}
          />
        ) : (
          <Button text="Start Now" onPress={() => console.log("Start Now")} />
        )}
      </View>
      <Pressable
        onPress={() => router.back()}
        style={{ position: "absolute", padding: 10 }}
      >
        <Ionicons name="arrow-back" size={30} color="black" />
      </Pressable>
    </View>
  );
};

export default Intro;
