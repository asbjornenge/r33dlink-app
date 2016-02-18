import React      from 'react'
import nanoxhr    from 'nanoxhr'
import TextReader from './components/TextReader'
import Controls   from './components/Controls'
import readStyle  from './read.styl'

export default class Read extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text : '',
            textLoaded : false,
            textLoadedStatus : 0,
            read : false,
            readIndex : 0
        }
    }
    render() {
        return (
            <div className="Read">
                <style>{readStyle}</style>
                <TextReader 
                    text={this.state.text}
                    read={this.state.read}
                    readIndex={this.state.readIndex}
                    onSentenceSpoken={this.onSentenceSpoken.bind(this)} />
                <Controls 
                    read={this.state.read}
                    readIndex={this.state.readIndex}
                    readController={this.setState.bind(this)} />
            </div>
        )
    }
    getText() {
        nanoxhr(`http://localhost:1337/?link=${this.props.query.link}`)
            .call(res => {
                this.setState({
                    text : res.response,
                    textLoaded : true,
                    textLoadedStatus : res.status
                })
            })
    }
    onSentenceSpoken(index) {
        console.log('spoken',index)
        this.setState({ readIndex : index+1 })
    }
    componentDidMount() {
        if (this.props.canSpeak && this.props.query.link) this.getText()
    }
}
