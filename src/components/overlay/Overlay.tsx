import React from "react";
import './Overlay.css';

const Overlay:React.FC<{zIndex: number}> = ({zIndex}) => (<div className="overlay" style={{zIndex: zIndex}}></div>);

export default Overlay;