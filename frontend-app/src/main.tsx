// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
// Importe seu componente e o CSS dele
import { TesteFront } from './TesteFront' 
import './TesteFront.css' 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TesteFront /> 
  </React.StrictMode>,
)