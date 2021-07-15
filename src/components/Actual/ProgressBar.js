import React from 'react'

import { Progress, Container} from "reactstrap";


export default function ProgressBar({value, style}) {
  return (
    <Container  style={style} >
      <Progress  
      value={value} 
      barClassName="progress-bar-info"
      />
    </Container>
  )
}


