import React from 'react'

export default class Controls extends React.Component {
    render() {
        return (
            <div className="Controls">
                <div onClick={this.play.bind(this)}>Play</div>
                <div onClick={this.pause.bind(this)}>Pause</div>
                <div onClick={this.stop.bind(this)}>Stop</div>
            </div>
        )
    }
    play() {}
    pause() {}
    stop() {}
}
