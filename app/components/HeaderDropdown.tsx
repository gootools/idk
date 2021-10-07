import { Entypo } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const HeaderDropdown: React.FC<any> = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => setOpen(!open)}>
      <View style={styles.textWrap}>
        <Text style={styles.text}>{props.children}</Text>
        <View style={styles.iconWrap}>
          <Entypo
            name={open ? "chevron-up" : "chevron-down"}
            color={"rgba(0, 0, 0, 0.7)"}
            size={20}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textWrap: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    display: "flex",
    alignItems: "center",
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  iconWrap: {
    marginTop: 2,
    marginLeft: 3,
  },
});

export default HeaderDropdown;
