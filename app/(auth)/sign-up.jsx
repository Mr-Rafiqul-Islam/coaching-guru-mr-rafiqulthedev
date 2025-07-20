import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../constants/colors";
import { router } from "expo-router";
const SignUp = () => {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={{ width: 180, height: 180 }}
          resizeMode="contain"
        />
        <Text style={styles.heading}>Create New Account</Text>
        <TextInput
          placeholder="Enter Your Full Name"
          placeholderTextColor={colors.LIGHT_GRAY}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Enter Your Email"
          placeholderTextColor={colors.LIGHT_GRAY}
          style={styles.textInput}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Enter Your Password"
          placeholderTextColor={colors.LIGHT_GRAY}
          style={styles.textInput}
          secureTextEntry
        />
        <TouchableOpacity onPress={() => {}} style={styles.button}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", gap: 5, marginTop: 20 }}>
          <Text style={{ fontFamily: "outfit" }}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/sign-in")}>
            <Text style={{ color: colors.PRIMARY ,fontFamily: "outfit-bold"}}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  scrollView: {
    alignItems: "center",
    paddingTop: 80,
    backgroundColor: colors.WHITE,
    padding: 25,
    minHeight: "100%",
  },
  heading: {
    fontSize: 30,
    fontFamily: "outfit-bold",
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.GRAY,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  button: {
    backgroundColor: colors.PRIMARY,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: "100%",
  },
  buttonText: {
    color: colors.WHITE,
    fontSize: 20,
    fontFamily: "outfit",
    textAlign: "center",
  },
});
