import React   from 'react'
import Style   from '@asbjornenge/react-style'
import myStyle from './index.styl' 

export default class LinkCollector extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="LinkCollector">
        <Style style={myStyle} />
        <input 
          ref="linkInput"
          type="text"
          defaultValue={this.props.queryLink}
          placeholder="Paste link here..." />
        <button onClick={this.onFetch.bind(this)}>Fetch</button>
      </div>
    )
  }
  onFetch() {
    let val = this.refs.linkInput.value
    this.props.getText(val)
  }
  fetchOnEnter(e) {
    // Enter 
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
