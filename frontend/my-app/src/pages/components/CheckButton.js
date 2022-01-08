import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

class CheckButton extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.props.onChange(event.target.name, event.target.checked);
  }
  render() {
    return (
      <React.Fragment>
        <FormControlLabel
          style={{ color: "#505050" }}
          labelPlacement="start"
          control={
            <Checkbox
              checked={this.props.checked}
              onChange={this.onChange}
              name={this.props.name}
              color="primary"
            />
          }
          label={this.props.label}
        />
      </React.Fragment>
    );
  }
}

export default CheckButton;
