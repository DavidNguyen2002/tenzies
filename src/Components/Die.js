import React from 'react'

function Die(props) {
    return (
        <div 
            className="die btn" 
            style={{backgroundColor: props.isHeld ? "#59E391" : "white"}}
            onClick={() => props.handleClick(props.id)}
        >
            <h2>{props.value}</h2>
        </div>
    )
}

export default Die