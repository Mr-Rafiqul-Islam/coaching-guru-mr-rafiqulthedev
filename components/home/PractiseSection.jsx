import { FlatList, Image, Text, View } from "react-native";
import { PracticeOption } from "../../constants/option";
import colors from "../../constants/colors";

const PractiseSection = () => {
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 25, fontFamily: "outfit-bold" }}>Practice</Text>
      <View style={{ marginTop: 10 }}>
        <FlatList
          numColumns={3}
          data={PracticeOption}
          renderItem={({ item, index }) => (
            <View
              key={index}
              style={{
                flex: 1,
                margin: 5,
                aspectRatio: 1,
              }}
            >
              <Image
                source={item.image}
                style={{
                  width: "100%",
                  height: "100%",
                  maxHeight: 160,
                  borderRadius: 15,
                }}
              />
              <Text
                style={{
                  position: "absolute",
                  padding: 15,
                  color: colors.WHITE,
                  fontFamily: "outfit",
                }}
              >
                {item.name}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default PractiseSection;
