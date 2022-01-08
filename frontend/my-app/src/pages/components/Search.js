import * as React from "react";
import TextField from '@material-ui/core/TextField';


class Search extends React.Component {
  render() {
    return (
      <React.Fragment>
        <TextField
          id="outlined-full-width"
          label={this.props.label}
          placeholder={this.props.placeholder}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      </React.Fragment>
    );
  }
}
export default Search;
