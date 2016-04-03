import React         from 'react'
import nanoxhr       from 'nanoxhr'
import LinkCollector from './components/LinkCollector'
import TextReader    from './components/TextReader'
import Controls      from './components/Controls'
import readStyle     from './read.styl'

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
                <LinkCollector 
                  queryLink={this.props.query.link} 
                  getText={this.getText.bind(this)}
                  />
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
    getText(link) {
        nanoxhr(`/api?link=${link}`)
            .call(res => {
                this.setState({
                    text : res.response,
                    textLoaded : true,
                    textLoadedStatus : res.status
                })
            })
    }
    onSentenceSpoken(index) {
    //    console.log('spoken',index)
        setTimeout(() => {
          this.setState({ readIndex : index+1 })
        },100)
    }
    componentDidMount() {
        if (this.props.canSpeak && this.props.query.link) 
          this.getText(this.props.query.link)
    }
}
