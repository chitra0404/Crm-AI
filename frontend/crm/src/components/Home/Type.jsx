import React from 'react'
import Typewriter from "typewriter-effect";

function Type() {
    return (
        <div style={{ fontSize: '3rem' }}>
        <Typewriter
        options={{
          strings: [
            "Welcome to A.I.CRM"
  
            
            
          ],
          autoStart: true,
          loop: true,
          deleteSpeed: 50,
        }}
      />
      </div>
    )
}

export default Type
