import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Picker } from "@react-native-community/picker";

export default function UnitsPicker({ unitsSystem, setUnitsSystem }) {
  return (
    <View style={styles.unitSystem}>
      <Picker
        selectedValue={unitsSystem}
        mod
        onValueChange={item => {
          setUnitsSystem(item);
        }}
        mod="dropdown"
        itemStyle={{ fontSize: 12 }}
      >
        <Picker.Item label="C°" value="metric" />
        <Picker.Item label="F°" value="imperial" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  unitSystem: {
    position: "absolute",
    ...Platform.select({
      ios: {
        top: -10
      },
      android: {
        top: 60
      }
    }),
    left: 20,
    height: 50,
    width: 100
  }
});
