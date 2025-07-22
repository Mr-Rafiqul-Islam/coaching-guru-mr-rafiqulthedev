import { Ionicons } from "@expo/vector-icons";
import { FlatList, StyleSheet, Text, View } from "react-native";
import colors from "../../constants/colors";

const Chapters = ({ course }) => {
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <Text style={{ fontSize: 20, fontFamily: "outfit-bold" }}>Chapters</Text>

      <FlatList
        data={course?.chapters}
        renderItem={({ item, index }) => (
          <View style={styles.chapterContainer} key={index}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <Text style={styles.chaperText}>{index + 1}.</Text>
                <Text style={styles.chaperText}>{item.chapterName}</Text>
              </View>
              <Ionicons name="play" size={24} color={colors.PRIMARY} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Chapters;

const styles = StyleSheet.create({
  chaperText: {
    fontFamily: "outfit",
    fontSize: 16,
  },
  chapterContainer: {
    padding: 15,
    borderWidth: 0.5,
    borderRadius: 15,
    marginTop: 10,
  },
});
