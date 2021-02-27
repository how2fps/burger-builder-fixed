import React from "react";

import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.css";
class Modal extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  componentDidUpdate() {}

  render() {
    return (
      <React.Fragment>
        <Backdrop
          clickHandler={this.props.modalClosed}
          show={this.props.show}
        />
        <div
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",

            opacity: this.props.show ? "1" : "0",
          }}
          className={classes.Modal}>
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

export default Modal;
