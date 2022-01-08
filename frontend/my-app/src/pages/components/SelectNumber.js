import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';

class SelectNumber extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }
  
  
  onChange(event) {
    this.props.onChange(event.target.value)
  }

  render() {
    return (
      <React.Fragment>
       <TextField
          id="standard-select"
          select
          label={this.props.label}
          value={this.props.value}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={this.onChange}
        >
          {this.props.options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          
        </TextField>
      </React.Fragment>
    );
  }
}

export default SelectNumber;
