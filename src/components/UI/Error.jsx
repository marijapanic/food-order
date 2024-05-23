import { Component } from "react";

// export default function Error({ title, message })
// {
//     return(
//         <div className="error">
//             <h2>{title}</h2>
//             <p>{message}</p>
//         </div>
//     );
// }

export default class Error extends Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
            <div className="error">
                <h2>{this.props.title}</h2>
                <p>{this.props.message}</p>
            </div>
        );
    }
}