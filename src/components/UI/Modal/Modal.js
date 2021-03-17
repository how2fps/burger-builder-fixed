import React from "react";

import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.css";
const Modal = (props) => {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     nextProps.show !== this.props.show ||
  //     nextProps.children !== this.props.children
  //   );
  // }

  return (
    <React.Fragment>
      <Backdrop clickHandler={props.modalClosed} show={props.show} />
      <div
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",

          opacity: props.show ? "1" : "0",
        }}
        className={classes.Modal}>
        {props.children}
      </div>
    </React.Fragment>
  );
};

export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
