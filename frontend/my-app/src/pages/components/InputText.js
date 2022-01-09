import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

class InputText extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    console.log(event.target)
    this.props.onChange(event.target.name, event.target.value);
  }
  render() {
    return (
      <React.Fragment>
        <TextField
          id="outlined-number"
          label={this.props.label}
          InputProps={{
            endAdornment: <InputAdornment position="end">m²</InputAdornment>, inputProps: { min: 0} 
          }}
          type="number"
          placeholder={this.props.placeholder}
          InputLabelProps={{
            shrink: true,
          }}
          value={this.props.value}
          name={this.props.name}
          onChange={this.onChange}
          variant="outlined"
        />
      </React.Fragment>
    );
  }
}

export default InputText;
