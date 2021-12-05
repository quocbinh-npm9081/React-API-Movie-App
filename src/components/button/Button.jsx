import React from 'react'
import PropTypes from 'prop-types'
import './button.scss'
function Button(props) {
    return (
       <button className={`btn ${props.className}`} onClick={props.onClick ? ()=>props.onClick(): null}>
           {props.children}
       </button>
    )
}
export function OutlineButton(props) {
    return (
        <button className={`btn btn-outline ${props.className}`} onClick={props.onClick ? ()=>props.onClick(): null}>
            {props.children}
        </button>
    )
}
Button.propTypes = {
    onClick: PropTypes.func
}
export default Button;
