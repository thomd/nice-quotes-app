import React from "react";
import { View, Button } from "react-native";

export default props => {
  return (
    <View style={props.style}>
      <Button title={props.title} onPress={props.onPress} />
    </View>
  );
};
