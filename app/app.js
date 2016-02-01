import React       from 'react'
import ReactDOM    from 'react-dom'
import Style       from '@taghub/component-style'
import queryString from 'query-string'
import CantSay     from './components/CantSay'
import CanSay      from './components/CanSay'
import appstyle    from './app.styl'

let canSay = window.speechSynthesis != undefined
let query  = queryString.parse(window.location.search)

class SayMyLink extends React.Component {
    render() {
        let comp
        if (canSay) comp = (
            <CanSay query={query} />
        )
        else comp = (
            <CantSay />
        )
        return (
            <div className="App">
                <Style style={appstyle} />
                {comp}
            </div>
        )
    }
}

ReactDOM.render(<SayMyLink />, document.querySelector('#app'))
