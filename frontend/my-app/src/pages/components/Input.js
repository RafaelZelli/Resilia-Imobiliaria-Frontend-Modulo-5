import React from 'react';
import TextField from '@material-ui/core/TextField';


class Input extends React.Component {
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
          id="outlined-multiline-flexible"
          label={this.props.label}
          name={this.props.name}
          placeholder={this.props.placeholder}
          onChange={this.onChange}
          
          value={this.props.value}
          margin={this.props.margin?"normal":"none"}
          InputLabelProps={{
            shrink: true,
          }}
          type={this.props.password?"password":""}
          fullWidth
          variant="outlined"
        />
      </React.Fragment>
    );
  }
}

export default Input;
