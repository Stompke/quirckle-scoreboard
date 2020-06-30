import React, { useState, useEffect } from 'react';
import './App.css';

//components
import Scores from './components/Scores';





function App() {

  const [ position, setPosition ] = useState(window.pageYOffset)
  const listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop
  
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight

    const scrolled = winScroll / height

  
    setPosition({
      scrolled,
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll)
  },[])


  console.log(position)



//   this.setState({
//     post: post,
//     theposition: window.pageYOffset
// });

  return (
    <div className="App">
      <header style={{opacity: position.scrolled * 10 }} className="App-header">
      <Scores  />
      </header>
      {/* <header style={{opacity: position.scrolled}} className="App-header">
      <h3>HELLO THERE SECOND BOX</h3>
      </header> */}
    </div>
  );
}

export default App;
