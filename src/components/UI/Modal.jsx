import React, { Component, useEffect, useRef } from "react";
import ReactDOM, { createPortal } from "react-dom";

// export default function Modal({ children, open, className = "" }) {
//     const dialog = useRef();

//     useEffect(() => {
//         const modal = dialog.current;
//         if (open)
//         {
//             modal.showModal();
//         }

//         return () => modal.close();
//     }, [open]);
//     return createPortal(<dialog ref={dialog} className={`modal ${className}`}>{children}</dialog>, document.getElementById("modal"));
// }

export default class Modal extends Component {
    constructor(props) {
        super(props);
        this.dialog = React.createRef();
    }

    componentDidUpdate(previosState)
    {
        if (this.props.open)
        {
            this.dialog.current.showModal();
        }
        else
        {
            this.dialog.current.close();
        }
    }

    render() {
        return ReactDOM.createPortal(
            <dialog ref={this.dialog} className={`modal ${this.props.className}`}>
                {this.props.children}
            </dialog>,
        document.getElementById("modal"));
    }
}