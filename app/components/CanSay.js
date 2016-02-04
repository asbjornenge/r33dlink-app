import React   from 'react'
import nanoxhr from 'nanoxhr'
import _artyom from 'artyom/src/artyom'

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
        return (
            <div className="CanSay">
                <div className="Header">
                    Header
                </div>
                <div className="Text">
                    <pre ref="text" style={{wordWrap: 'break-word', whiteSpace: 'pre-wrap'}}>
                        {this.state.text || ''}
                    </pre>
                </div>
                <div className="Controls">
                    <div onClick={this.play.bind(this)}>Play</div>
                    <div onClick={this.pause.bind(this)}>Pause</div>
                    <div onClick={this.stop.bind(this)}>Stop</div>
                </div>
            </div>
        )
    }
    play() {
        if (this.speaking) return this.resume()
        artyom.shutUp()
        artyom.say(this.refs.text.innerHTML.replace(/\n/g,''))
        this.speaking = true
    }
    resume() {
        speechSynthesis.resume()
    }
    pause() {
        speechSynthesis.pause()
    }
    stop() {
        artyom.shutUp()
        this.speaking = false
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
    }
}

var speechUtteranceChunker = function (utt, settings, callback) {
    settings = settings || {};
    var newUtt;
    var txt = (settings && settings.offset !== undefined ? utt.text.substring(settings.offset) : utt.text);
    if (utt.voice && utt.voice.voiceURI === 'native') { // Not part of the spec
        newUtt = utt;
        newUtt.text = txt;
        newUtt.addEventListener('end', function () {
            if (speechUtteranceChunker.cancel) {
                speechUtteranceChunker.cancel = false;
            }
            if (callback !== undefined) {
                callback();
            }
        });
    }
    else {
        var chunkLength = (settings && settings.chunkLength) || 160;
        var pattRegex = new RegExp('^[\\s\\S]{' + Math.floor(chunkLength / 2) + ',' + chunkLength + '}[.!?,]{1}|^[\\s\\S]{1,' + chunkLength + '}$|^[\\s\\S]{1,' + chunkLength + '} ');
        var chunkArr = txt.match(pattRegex);

        if (chunkArr[0] === undefined || chunkArr[0].length <= 2) {
            //call once all text has been spoken...
            if (callback !== undefined) {
                callback();
            }
            return;
        }
        var chunk = chunkArr[0];
        newUtt = new SpeechSynthesisUtterance(chunk);
        var x;
        for (x in utt) {
            if (utt.hasOwnProperty(x) && x !== 'text') {
                newUtt[x] = utt[x];
            }
        }
        newUtt.addEventListener('end', function () {
            if (speechUtteranceChunker.cancel) {
                speechUtteranceChunker.cancel = false;
                return;
            }
            settings.offset = settings.offset || 0;
            settings.offset += chunk.length - 1;
            speechUtteranceChunker(utt, settings, callback);
        });
    }

    if (settings.modifier) {
        settings.modifier(newUtt);
    }
    console.log(newUtt); //IMPORTANT!! Do not remove: Logging the object out fixes some onend firing issues.
    //placing the speak invocation inside a callback fixes ordering and onend issues.
    console.log(newUtt.length)
    setTimeout(function () {
        speechSynthesis.speak(newUtt);
    }, 0);
};
