import React from 'react'
import { getLogoSvgPath, getWhiteLogoSvgPath, } from '../urls'

const Logo = ({ color, height, inline, text, size, ...rest }) => {

  var style = {
    height: "100%",
    padding: "10px",
    verticalAlign: "middle"
  }

  if (inline) {
    style = {
      ...style,
      display: "inline",
    }
  }

  if (text) {
    return (
      <span style={{
        fontFamily: "sonsie_oneregular",
        fontSize: size,
        color: color,
      }}
      >
        {"FM"}
      </span>
    )
  } else {
    return (
      <div style={{
        height: height,
        verticalAlign: "middle",
      }}>
        <object className="logo" {...rest}
          type="image/svg+xml"
          data={color === "white" ? getWhiteLogoSvgPath() : getLogoSvgPath()}
          style={style}
        />
      </div>
    )
  }
}

export default Logo
