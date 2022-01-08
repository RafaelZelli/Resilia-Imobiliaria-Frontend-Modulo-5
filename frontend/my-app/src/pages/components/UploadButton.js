import React from "react";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';

class UploadButton extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Button
          variant="contained"
          color="default"
          className={classes.button}
          startIcon={<CloudUploadIcon />}
        >
          Upload
        </Button>
      </React.Fragment>
    );
  }
}

export default UploadButton;
