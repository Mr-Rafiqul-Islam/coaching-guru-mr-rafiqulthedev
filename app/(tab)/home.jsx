import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/home/Header";
import colors from "../../constants/colors";
import { StatusBar } from "expo-status-bar";
import NoCourse from "../../components/home/NoCourse";

const Home = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        minHeight: "100%",
        padding: 20,
        backgroundColor: colors.WHITE,
      }}
    >
      <Header />
      <NoCourse/>
      <StatusBar backgroundColor="#ffffff" style="inverted" />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
