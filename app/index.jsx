import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";


export default function Index() {
  return (
    <SafeAreaView style={{ height: '100%',  }}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: colors.WHITE,
        }}
      >
        <Image
          source={require("../assets/images/landing.png")}
          style={{ width: "100%", height: 300 }}
          resizeMode="contain"
        />

        <View
          style={{
            padding: 25,
            backgroundColor: colors.PRIMARY,
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
            gap: 20,
            minHeight: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontFamily: "outfit-bold",
              textAlign: "center",
              color: colors.WHITE,
            }}
          >
            Welcome to Coaching Guru
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "outfit",
              textAlign: "center",
              color: colors.WHITE,
            }}
          >
            Transform your ideas into engaging educational content, effortlessly
            with AI! 📚 🤖.
          </Text>

          <TouchableOpacity onPress={()=> router.push("/sign-up")} style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={()=> router.push("/sign-in")}
            style={[
              styles.button,
              {
                backgroundColor: colors.PRIMARY,
                borderWidth: 1,
                borderColor: colors.WHITE,
              },
            ]}
          >
            <Text style={[styles.buttonText, { color: colors.WHITE }]}>
              Already have an account?
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#ffffff" style="inverted" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.WHITE,
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: colors.PRIMARY,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
