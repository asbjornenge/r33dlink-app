import React from 'react'

export default class Controls extends React.Component {
    render() {
        return (
            <div className="Controls">
                <div onClick={this.prev.bind(this)}>Prev</div>
                <div onClick={this.play.bind(this)}>Play</div>
                <div onClick={this.pause.bind(this)}>Pause</div>
                <div onClick={this.stop.bind(this)}>Reset</div>
                <div onClick={this.next.bind(this)}>Next</div>
            </div>
        )
    }
    play() {
        this.props.readController({ read : true })
    }
    pause() {
        this.props.readController({ read : false })
    }
    stop() {
        this.props.readController({ read : false, readIndex : 0 })
    }
    prev() {
        this.props.readController({ readIndex : this.props.readIndex-1 })
    }
    next() {
        this.props.readController({ readIndex : this.props.readIndex+1 })
    }
}
