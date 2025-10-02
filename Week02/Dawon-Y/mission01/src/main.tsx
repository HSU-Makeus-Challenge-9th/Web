import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'  
import './App.css'    

// HTML의 <div id="root"></div>를 찾아서 그 안에 React 앱을 렌더링
ReactDOM.createRoot(document.getElementById('root')!).render(
  // 개발 모드에서 잠재적 문제를 찾아주는 도구
  <React.StrictMode> 
    <App />
  </React.StrictMode>,
)