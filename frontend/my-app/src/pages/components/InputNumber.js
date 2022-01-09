import React from "react";
import TextField from "@material-ui/core/TextField";

class InputNumber extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.props.onChange(event.target.name,event.target.value);
  }
  render() {
    return (
      <React.Fragment>
        <TextField
          id="outlined-number"
          label={this.props.label}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{ inputProps: { min: 0} }}
          fullWidth
          placeholder={this.props.placeholder}
          name={this.props.name}
          value={this.props.value}
          onChange={this.onChange}
          variant="outlined"
        />
      </React.Fragment>
    );
  }
}

export default InputNumber;
