import React     from 'react'
import Svg       from '@asbjornenge/react-svg'
import Style     from '@asbjornenge/react-style'
import locale    from 'locale-string'
import iStyle    from './index.styl'
import prevIcon  from './graphics/prev.svg'
import playIcon  from './graphics/play.svg'
import pauseIcon from './graphics/pause.svg'
import resetIcon from './graphics/reset.svg'
import nextIcon  from './graphics/next.svg'
import downIcon  from './graphics/down.svg'

export default class Controls extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        extended : false 
      }
    }
    render() {
        let classes = 'Controls'
        let extendedClasses = 'extended controlItem'
        let extendedControls;
        if (this.state.extended) {
          classes += ' extended'
          extendedClasses += ' open'
          let voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : []
          let languageOptions = voices.map((v,index) => {
            let _locale = locale.parse(v.lang)
            let _lang   = _locale != undefined ? (_locale.language || '') : ''
            let _name   = v.name || 'Unknown'
            return <option key={v.lang+index} value={index}>{_lang+" - "+_name}</option>
          })
          extendedControls = (
            <div className="extendedControls">
              <select name="language" onChange={this.onLanguageChange.bind(this)} defaultValue={this.props.languageIndex}>
                {languageOptions}
              </select>
            </div>
          )
        }
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
            <div className={classes}>
                <Style style={iStyle} />
                {extendedControls}
                <div className="basicControls">
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
                  <div className={extendedClasses} onClick={this.extendControls.bind(this)}>
                    <Svg svg={downIcon} />
                  </div>
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
    extendControls() {
      this.setState({ extended : !this.state.extended })
    }
    onLanguageChange(e) {
      this.props.readController({ languageIndex : e.target.value })
    }
}
