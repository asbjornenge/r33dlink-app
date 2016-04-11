import React         from 'react'
import nanoxhr       from 'nanoxhr'
import LinkCollector from './components/LinkCollector'
import TextReader    from './components/TextReader'
import Controls      from './components/Controls'
import readStyle     from './read.styl'
import Loader        from '../../components/Loader'

let cantSpeakText = `Sorry. It appears your device does not support reading text`
let preloadedText = `Hi, and welcome to r33d.link!

Paste a link in the field above.
Hit Fetch to load it's text. 
Hit play to start listening

We support both PDFs and websites (html).

Enjoy!
`

export default class Read extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text : '',
            textLoaded : false,
            textLoadedStatus : 0,
            read : false,
            readIndex : 0,
            loading : false,
            languageIndex: -1 // Will default to english 
        }
    }
    render() {
        let loader;
        if (this.state.loading)
          loader = <Loader />
        let text = this.state.text
        if (!this.props.canSpeak)
          text = cantSpeakText
        if (this.state.text == '')
          text = preloadedText
        return (
            <div className="Read">
                <style>{readStyle}</style>
                {loader}
                <LinkCollector 
                  queryLink={this.props.query.link} 
                  getText={this.getText.bind(this)}
                  />
                <TextReader 
                    text={text}
                    read={this.state.read}
                    readIndex={this.state.readIndex}
                    languageIndex={this.state.languageIndex}
                    onSentenceSpoken={this.onSentenceSpoken.bind(this)} />
                <Controls 
                    read={this.state.read}
                    readIndex={this.state.readIndex}
                    languageIndex={this.state.languageIndex}
                    readController={this.setState.bind(this)} />
            </div>
        )
    }
    getText(link) {
        this.setState({ loading : true })
        nanoxhr(`/api?link=${link}`)
            .call(res => {
                this.setState({
                    text : res.response,
                    textLoaded : true,
                    textLoadedStatus : res.status,
                    loading : false
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
