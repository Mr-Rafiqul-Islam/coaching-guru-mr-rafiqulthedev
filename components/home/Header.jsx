import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuthUser } from "../../context/UserContextProvider";
import Ionicons from "@expo/vector-icons/Ionicons";

const Header = () => {
  const { userData } = useAuthUser();
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
      <View>
        <Text style={styles.heading}>Hello, {userData?.fullName}</Text>
        <Text style={styles.subHeading}>Lets Get Started.!</Text>
      </View>
      <TouchableOpacity>
        <Ionicons name="settings-outline" size={32} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    fontFamily: "outfit-bold",
  },
  subHeading: {
    fontSize: 17,
    fontFamily: "outfit",
  },
});
