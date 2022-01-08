import "date-fns";
import React from "react";
import "date-fns";
import TextField from '@material-ui/core/TextField';

class DatePicker extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    console.log(event.target.value)
    this.props.onChange(event.target.value);
  }
   render() {
    return (
        <TextField
        id="datetime-local"
        label={this.props.label}
        variant = "outlined"
        type="datetime-local"
        fullWidth
        margin={"normal"}
        defaultValue={this.props.selectedDate}
        onChange={this.onChange}
        InputLabelProps={{
          shrink: true,
        }}
        />
    );
  }
}
export default DatePicker;
