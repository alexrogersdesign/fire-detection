import React from 'react'

import JupyterViewer from "react-jupyter-notebook";
import notebook from "../../assets/notebook/Fire_Detection_v2.json"


export default function Notebook() {
  return (
    <div>
      <JupyterViewer rawlpynb={notebook}/>
    </div>
  )
}
