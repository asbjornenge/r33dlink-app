import React    from 'react'
import ReactDOM from 'react-dom'
import Style    from '@taghub/component-style'
import appstyle from './app.styl'

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Style style={appstyle} />
                <div>This be app</div>
                <button>with button!</button>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#app'))
