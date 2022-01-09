import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

class InputValues extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.props.onChange(event.target.name, event.target.value);
  }
  render() {
    return (
      <React.Fragment>
        <TextField
          id="outlined-number"
          label={this.props.label}
          InputProps={{
            endAdornment: <InputAdornment position="end">R$</InputAdornment>, inputProps: { min: 0} 
          }}
          type="number"
          fullWidth
          placeholder={this.props.placeholder}
          InputLabelProps={{
            shrink: true,
          }}
          name={this.props.name}
          onChange={this.onChange}
          value={this.props.value}
          variant="outlined"
        />
      </React.Fragment>
    );
  }
}

export default InputValues;
