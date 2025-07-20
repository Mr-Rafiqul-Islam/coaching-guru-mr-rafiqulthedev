import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import colors from "../../constants/colors";

const Button = ({ text, type = "fill", onPress, loading }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 15,
        marginTop: 15,
        width: "100%",
        borderRadius: 15,
        backgroundColor: type === "fill" ? colors.PRIMARY : colors.WHITE,
        borderWidth: 1,
        borderColor: colors.PRIMARY,
      }}
      disabled={loading}
    >
      {!loading ? (
        <Text
          style={{
            textAlign: "center",
            color: type === "fill" ? colors.WHITE : colors.PRIMARY,
            fontSize: 18,
          }}
        >
          {text}
        </Text>
      ) : (
        <ActivityIndicator
          size="large"
          color={type === "fill" ? colors.WHITE : colors.PRIMARY}
        />
      )}
    </TouchableOpacity>
  );
};

export default Button;
