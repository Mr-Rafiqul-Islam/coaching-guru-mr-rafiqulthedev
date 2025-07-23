import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import colors from "../../constants/colors";
import ProfileInfo from "../../components/profile/ProfileInfo";
import { useAuthUser } from "../../context/UserContextProvider";
import { profileMenu } from "../../constants/option";
import { Ionicons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { router } from "expo-router";

const Profile = () => {
  const { userData, setUserData } = useAuthUser();

  const onMenuClick = (menu) => {
    console.log(menu);
    if (menu.name == "Logout") {
      signOut(auth)
        .then(() => {
          setUserData(null);
          router.replace(menu.path);
          console.log("signed out");
        })
        .catch((err) => console.log(err));
    } else {
      router.push(menu.path);
      console.log("navigate to", menu.name);
    }
  };
  return (
    <View style={{ backgroundColor: colors.WHITE, flex: 1, padding: 20 }}>
      <FlatList
        data={profileMenu}
        ListHeaderComponent={
          <View style={styles.contentContainer}>
            <Text style={styles.headerText}>Profile</Text>
            <ProfileInfo
              usermail={userData?.email}
              username={userData?.fullName}
            />
          </View>
        }
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.btn}
            key={index}
            onPress={() => onMenuClick(item)}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
              }}
            >
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 50,
                  height: 50,
                  borderRadius: 15,
                  backgroundColor: colors.BG_GRAY,
                }}
              >
                <Ionicons name={item.icon} size={20} color={colors.PRIMARY} />
              </View>
              <Text style={{ fontSize: 18, fontFamily: "outfit" }}>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  contentContainer: {
    width: "100%",
    marginTop: 20,
  },
  headerText: {
    fontSize: 30,
    fontFamily: "outfit-bold",
    marginTop: 20,
  },
  btn: {
    padding: 10,
    borderRadius: 10,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginVertical: 5,
    backgroundColor: colors.WHITE,
  },
});
