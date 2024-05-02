import { Component } from "react";

export default class Button extends Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        let cssClasses = this.props.textOnly ? "text-button" : "button";
        cssClasses +=  ` ${this.props.className || ""}`;

        return (
            <button className={cssClasses} {...this.props}>{this.props.children}</button>
        );
    }
}