import React       from 'react'
import ReactDOM    from 'react-dom'
import Style       from '@asbjornenge/react-style'
import queryString from 'query-string'
import FastClick   from 'fastclick'
import Header      from './components/Header'
import Read        from './screens/Read'
import appstyle    from './app.styl'

let canSpeak = window.speechSynthesis != undefined
let query    = queryString.parse(window.location.search)

class ReadLink extends React.Component {
    render() {
        return (
            <div className="App">
                <Style style={appstyle} />
                <Header />
                <Read canSpeak={canSpeak} query={query} />
            </div>
        )
    }
}

ReactDOM.render(<ReadLink />, document.querySelector('#app'))

// FastClick (avoid 200ms delay on mobile)
window.addEventListener('load', () => {
  FastClick(document.body);
})
