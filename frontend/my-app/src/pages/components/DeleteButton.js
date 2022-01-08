import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";

class DeleteButton extends React.Component {
  render() {
    return (
      <React.Fragment>
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </React.Fragment>
    );
  }
}

export default DeleteButton;
