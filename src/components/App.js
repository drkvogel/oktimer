import React, { Component } from 'react';
import logo from './logo.svg';
import Timer from './Timer'
import debounce from '../debounce'
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      timers: ['eat', 'drink', 'fuck']
    }
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount() {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      this.recognition = new SpeechRecognition()
      this.recognition.interimResults = true
      this.recognition.addEventListener('result', debounce(this.detectOkTimer, 200, true))
      this.recognition.addEventListener('end', this.recognition.start)
      this.recognition.start()
  }
 
  detectOkTimer(e) {
    const transcript = Array.from(e.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('')

      if(transcript.toLowerCase() === ("ok timer")) {
          const msg = new SpeechSynthesisUtterance()
          msg.text = "OK"
          speechSynthesis.speak(msg)
        }
  }

  handleClose (target) {
    const timers = this.state.timers.filter(t => timers !== t)
    this.setState({
      timers
    })
  }

  render() {

    const timers = this.state.timers.map((t,i) => (
      <Timer key={i} onClose={this.handleClose}>{t}</Timer>
      ))
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {timers}
      </div>
    );
  }
}

export default App;
