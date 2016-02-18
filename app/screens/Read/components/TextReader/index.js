import React    from 'react'
import Sentence from './components/Sentence'

export default class Text extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sentences : []
        }
    }
    render() {
        let sentenceIndex = -1
        let text = this.state.sentences.map((sentenceList, pindex) => {
            let sentences = sentenceList.map((sentence,sindex) => { 
                sentenceIndex++
                return <Sentence 
                            key={`sentence-${pindex}-${sindex}`}
                            text={sentence}
                            read={this.props.read && sentenceIndex == this.props.readIndex}
                            index={sentenceIndex}
                            readIndex={this.props.readIndex}
                            highlight={sentenceIndex == this.props.readIndex}
                            onSpoken={this.props.onSentenceSpoken} /> 
            })
            return (
                <p key={`paragrap-${pindex}`}>{sentences}</p>
            )
        })
        return (
            <div className="Text">
                <pre ref="text" style={{wordWrap: 'break-word', whiteSpace: 'pre-wrap'}}>
                    {text}
                </pre>
            </div>
        )
    }
    makeSentences() {
        let sentences = this.props.text
            .split('\n\n')
            .reduce((_coll, paragraph) => {
                // TODO: Also split in things like ?! etc.
                let sentences = paragraph.split('. ')
                if (sentences.length > 1) sentences = sentences.map(s => s+='. ')
                _coll.push(sentences)
                return _coll
            },[])
        this.setState({
            sentences : sentences
        })
    }
    componentDidUpdate(nextProps, nextState) {
        if (nextProps.text != this.props.text) this.makeSentences()
    }
    componentDidMount() {
        if (this.props.text != '') this.makeSentences()  
    }
}
