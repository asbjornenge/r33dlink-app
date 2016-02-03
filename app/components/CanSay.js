import React   from 'react'
import nanoxhr from 'nanoxhr'

class TextLines extends React.Component {      
    render() {
        var formatted = this.props.lines.map(function(line) {
            return <p>{line}</p>
        });
        return <div>{ formatted }</div>
    }
}

export default class CanSay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text   : null,
            status : null
        }
    }
    render() {
        console.log(this.props)
        return (
            <div className="CanSay">
                <div className="Header">
                    Header
                </div>
                <div className="Text" ref="text">
                    <pre style={{wordWrap: 'break-word', whiteSpace: 'pre-wrap'}}>
                        {this.state.text || ''}
                    </pre>
                </div>
                <div className="Controls">
                    <div onClick={this.play.bind(this)}>Play</div>
                    <div onClick={this.pause.bind(this)}>Pause</div>
                </div>
            </div>
        )
    }
    play() {
        console.log('play', this.msg)
        speechSynthesis.resume()
    }
    pause() {
        speechSynthesis.pause()
    }
    stop() {

    }
    getText() {
        nanoxhr(`http://localhost:1337/?link=${this.props.query.link}`)
            .call(res => {
                this.setState({
                    text : res.response,
                    status : res.status
                })
            })
    }
    componentDidMount() {
        if (this.props.query.link) this.getText()
//        this.msg = new SpeechSynthesisUtterance(this.refs.text.innerHTML)
//        speechSynthesis.speak(this.msg)
//        speechSynthesis.pause()
    }
}
