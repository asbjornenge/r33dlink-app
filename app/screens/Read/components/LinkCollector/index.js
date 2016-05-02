import React   from 'react'
import Style   from '@asbjornenge/react-style'
import myStyle from './index.styl' 

export default class LinkCollector extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let editText = this.props.editingText ? 'Done' : 'Edit'
    return (
      <div className="LinkCollector">
        <Style style={myStyle} />
        <input 
          ref="linkInput"
          type="text"
          defaultValue={this.props.queryLink}
          placeholder="Paste link here..." />
        <button onClick={this.onFetch.bind(this)}>Fetch</button>
        <button onClick={this.onEdit.bind(this)}>{editText}</button>
      </div>
    )
  }
  onEdit() {
    if (this.props.editingText) {
      this.props.readController({ 
        text : document.querySelector("#editingTextarea").value,
        editingText: !this.props.editingText 
      })
    } else {
      this.props.readController({ editingText: !this.props.editingText })
    }
  }
  onFetch() {
    let val = this.refs.linkInput.value
    this.props.getText(val)
  }
  fetchOnEnter(e) {
    // Enter 
    if (this.props.editingText) return
    if (e.which == 13) {
      e.preventDefault()
      this.onFetch()
    }
  }
  componentDidMount() {
    this.enterFetcher = this.fetchOnEnter.bind(this)
    window.addEventListener('keypress', this.enterFetcher)
  }
  componentWillUmount() {
    window.removeEventListener('keypress', this.enterFetcher)
  }
}
