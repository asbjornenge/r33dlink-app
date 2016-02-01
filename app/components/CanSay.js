import React from 'react'

export default class CanSay extends React.Component {
    render() {
        return (
            <div className="CanSay">
                <div className="Header">
                    Header
                </div>
                <div className="Frame" ref="text">
Abstract. Cryptography rearranges power: it configures who can do
what, from what. This makes cryptography an inherently political tool,
and it confers on the field an intrinsically moral dimension. The Snowden
revelations motivate a reassessment of the political and moral positioning
of cryptography. They lead one to ask if our inability to effectively
address mass surveillance constitutes a failure of our field. I believe that
it does. I call for a community-wide effort to develop more effective means
to resist mass surveillance. I plead for a reinvention of our disciplinary
culture to attend not only to puzzles and math, but, also, to the societal
implications of our work.
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
    componentDidMount() {
        this.msg = new SpeechSynthesisUtterance(this.refs.text.innerHTML)
        speechSynthesis.speak(this.msg)
        speechSynthesis.pause()
    }
}
