import React from 'react'

export default class Sentence extends React.Component {
    render() {
        let classes = "Sentence"
        if (this.props.highlight) classes += ' highlight'
        return (
            <span className={classes}>{this.props.text}</span>
        )
    }
    startReading() {
        speechSynthesis.cancel() // Clear previous errors...
        this.msg = new SpeechSynthesisUtterance()

        this.msg.onend = (event) => {
            delete this.msg
            if (this.props.read) this.props.onSpoken(this.props.index)
        }
        this.msg.onerror = (event) => {
            console.log('Errored ' + event)
        }

        this.msg.text = this.props.text
        speechSynthesis.speak(this.msg)
    }
    componentDidUpdate() {
        if ( this.props.read && !this.msg) this.startReading() 
        if ( this.props.read &&  this.msg) speechSynthesis.resume()
        if (!this.props.read &&  this.msg) speechSynthesis.pause()
        if (this.props.readIndex != this.props.index && this.msg) {
            delete this.msg
            speechSynthesis.resume()
            speechSynthesis.cancel()
        }
    }
}
