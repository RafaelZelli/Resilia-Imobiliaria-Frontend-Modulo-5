import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

class ComboBox extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.props.onChange(event.target.value);
  }
  
  render() {
    return (
      <React.Fragment>
        <Autocomplete
          id="country-select-demo"
          options={this.props.options}
          autoHighlight
          inputValue={this.props.value}
          getOptionLabel={(option) => option}
          renderOption={(option) => (
            <React.Fragment>
              <span>{option}</span>
            </React.Fragment>
          )}
          renderInput={(params) => (
            <TextField
              fullWidth
              {...params}
              label={this.props.label}
              onChange={this.onChange}
              onSelect={this.onChange}
              value={this.props.value}
              placeholder={this.props.placeholder}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
        />{" "}
      </React.Fragment>
    );
  }
}

export default ComboBox;
