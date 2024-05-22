import { Component } from "react";

// export default function Input({label, id, ...props}) {
//     return <p className="control">
//         <label htmlFor={id}>{label}</label>
//         <input id={id} name={id} required {...props}></input>
//     </p>
// }

export default class Input extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <p className="control">
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <input id={this.props.id} name={this.props.id} required {...this.props}></input>
    </p>
    }
}