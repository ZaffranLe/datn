import React from "react";
import classNames from "classnames";
import "./style.scss";

function HobbyPill(props) {
    const { hobby, color = "light", removable = false, onClick, hoverable = false } = props;

    const className = classNames(
        "hobby-pill",
        { "hobby-pill--dark": color === "dark" },
        { "hobby-pill--light": color !== "dark" },
        { "hobby-pill--hoverable": hoverable }
    );

    return (
        <div className={className} onClick={onClick}>
            <i className={`${hobby.icon}`} /> {hobby.name}{" "}
            {removable && <i className="remove-icon fas fa-times-circle" />}
        </div>
    );
}

export default HobbyPill;
