import React from 'react'
import Svg from '@asbjornenge/react-svg'
import prevIcon from './graphics/prev.svg'
import playIcon from './graphics/play.svg'
import pauseIcon from './graphics/pause.svg'
import resetIcon from './graphics/reset.svg'
import nextIcon from './graphics/next.svg'

export default class Controls extends React.Component {
    render() {
        let pauseOrPlay = (
          <div className="play controlItem" onClick={this.play.bind(this)}>
            <Svg svg={playIcon} />
          </div>
        )
        if (this.props.read) pauseOrPlay = (
          <div className="pause controlItem" onClick={this.pause.bind(this)}>
            <Svg svg={pauseIcon} />
          </div>
        )
        return (
            <div className="Controls">
                <div className="prev controlItem" onClick={this.prev.bind(this)}>
                  <Svg svg={prevIcon} />
                </div>
                {pauseOrPlay}
                <div className="reset controlItem" onClick={this.stop.bind(this)}>
                  <Svg svg={resetIcon} />
                </div>
                <div className="next controlItem" onClick={this.next.bind(this)}>
                  <Svg svg={nextIcon} />
                </div>
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
