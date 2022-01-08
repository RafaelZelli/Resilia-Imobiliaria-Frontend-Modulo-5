import React from "react";
import Slide from "react-slideshow-image";

class SlideShow extends React.Component {
  constructor() {
    super();
    console.log(this.props);
    this.state = {
      photos: ["batata"],
    };
  }
  render() {
    return (
      <React.Fragment>
        <div className="slide-container">
          TESTE
         
        </div>
      </React.Fragment>
    );
  }
}

export default SlideShow;
