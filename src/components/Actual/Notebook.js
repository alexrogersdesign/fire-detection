import React from 'react'

import { IpynbRenderer } from "react-ipynb-renderer";
import notebook from "../../assets/notebook/Fire_Detection_v2.json"

// Jupyter theme
import "react-ipynb-renderer/dist/styles/monokai.css";
// Formula renderer
import 'katex/dist/katex.min.css';


export default function Notebook() {
  return (
    <div>
      <IpynbRenderer 
      ipynb={notebook}
      syntaxTheme="xonokai"
      language="python"
      bgTransparent={true}
      />
    </div>
  )
}
