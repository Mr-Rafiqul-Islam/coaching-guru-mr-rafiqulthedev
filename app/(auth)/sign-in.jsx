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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebaseConfig";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useAuthUser } from "../../context/UserContextProvider";
const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { setUserData } = useAuthUser();
  const [loading, setLoading] = useState(false);
  const handleSignIn = () => {
    if (!form.email || !form.password) {
      return alert("Please fill all the fields");
    }
    setLoading(true);
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then(async (response) => {
        const user = response.user;
        console.log("user signed in successfully", user);
        const result = await getUserDetail();
        setUserData(result);
        setLoading(false);
        router.replace("/home");
      })
      .catch((error) => {
        console.log(error.message);
        Alert.alert("Error", error.message);
        setLoading(false);
      });
  };

  const getUserDetail = async () => {
    const docRef = doc(db, "users", form.email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={{ width: 180, height: 180 }}
          resizeMode="contain"
        />
        <Text style={styles.heading}>Sign In to Your Account</Text>

        <TextInput
          placeholder="Enter Your Email"
          placeholderTextColor={colors.LIGHT_GRAY}
          style={styles.textInput}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(value) => setForm({ ...form, email: value })}
        />
        <TextInput
          placeholder="Enter Your Password"
          placeholderTextColor={colors.LIGHT_GRAY}
          style={styles.textInput}
          secureTextEntry
          onChangeText={(value) => setForm({ ...form, password: value })}
        />
        <TouchableOpacity
          onPress={handleSignIn}
          style={[
            styles.button,
            { backgroundColor: loading ? colors.GRAY : colors.PRIMARY },
          ]}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.WHITE} size={"large"} />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <View style={{ flexDirection: "row", gap: 5, marginTop: 20 }}>
          <Text style={{ fontFamily: "outfit" }}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/sign-up")}>
            <Text style={{ color: colors.PRIMARY, fontFamily: "outfit-bold" }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

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
