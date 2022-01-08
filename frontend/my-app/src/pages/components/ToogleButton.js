import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

class ToogleButton extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.props.onChange(event.target.name,event.target.checked);
  }
  render() {
    return (
      <React.Fragment>
        <FormControlLabel
        style={{color:"#505050", margin:"10px"} }
        labelPlacement="start"
        control={
          <Switch
            checked={this.props.checked}
            onChange={this.onChange}
            name={this.props.name}
            color="default"
          />
        }
        label={this.props.label}
      />
      </React.Fragment>
    );
  }
}

export default ToogleButton;
