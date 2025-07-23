import {
  ActivityIndicator,
  Alert,
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
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig";
import { useAuthUser } from "../../context/UserContextProvider";
const SignUp = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { setUserData } = useAuthUser();
  const [loading, setLoading] = useState(false);

  const handleSignUp = () => {
    if (!form.fullName || !form.email || !form.password) {
      return alert("Please fill all the fields");
    }
    setLoading(true);
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then(async (response) => {
        const user = response.user;
        await saveUser(user);
        setLoading(false);
        router.replace("/sign-in");
      })
      .catch((error) => {
        console.log(error.message);
        Alert.alert("Error", error.message);
        setLoading(false);
      });
  };

  const saveUser = async (user) => {
    const data = {
      uid: user.uid,
      email: user.email,
      fullName: form.fullName,
      member: false,
    };
    await setDoc(doc(db, "users", user.email), data);
    setUserData(data);
    console.log("user saved successfully");
  };

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
          onChangeText={(text) => setForm({ ...form, fullName: text })}
        />
        <TextInput
          placeholder="Enter Your Email"
          placeholderTextColor={colors.LIGHT_GRAY}
          style={styles.textInput}
          keyboardType="email-address"
          onChangeText={(text) => setForm({ ...form, email: text })}
        />
        <TextInput
          placeholder="Enter Your Password"
          placeholderTextColor={colors.LIGHT_GRAY}
          style={styles.textInput}
          secureTextEntry
          onChangeText={(text) => setForm({ ...form, password: text })}
        />
        <TouchableOpacity
          onPress={handleSignUp}
          style={[
            styles.button,
            { backgroundColor: loading ? colors.GRAY : colors.PRIMARY },
          ]}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.WHITE} size={"large"} />
          ) : (
            <Text style={styles.buttonText}>Create Account</Text>
          )}
        </TouchableOpacity>

        <View style={{ flexDirection: "row", gap: 5, marginTop: 20 }}>
          <Text style={{ fontFamily: "outfit" }}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/sign-in")}>
            <Text style={{ color: colors.PRIMARY, fontFamily: "outfit-bold" }}>
              Sign In
            </Text>
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
