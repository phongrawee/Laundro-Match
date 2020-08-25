import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default class DatePicker extends Component {
  constructor() {
    super();
    this.state = {
      pickerMode: null,
      setPickerMode: null,
    };
  }

  showDatePicker = () => {
    this.setPickerMode("date");
  };

  showTimePicker = () => {
    this.setPickerMode("time");
  };

  hidePicker = () => {
    this.setPickerMode(null);
  };

  handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hidePicker();
  };
  render() {
    return (
      <View style={style.root}>
        <Button title="Show Date Picker" onPress={showDatePicker} />
        <Button title="Show Time Picker" onPress={showTimePicker} />
        <DateTimePickerModal
          isVisible={pickerMode !== null}
          mode={pickerMode}
          onConfirm={handleConfirm}
          onCancel={hidePicker}
          isDarkModeEnabled={true}
        />
      </View>
    );
  }
}
const style = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DatePicker;
