import React from 'react'
import Style from '@asbjornenge/react-style'
import myStyle from './index.styl'

export default class Loader extends React.Component {
  render() {
    return (
      <div className="Loader">
        <Style style={myStyle} />
        <div className='Cube panelLoad'>
          <div className='cube-face cube-face-front'>r</div>
          <div className='cube-face cube-face-back'>3</div>
          <div className='cube-face cube-face-left'>3</div>
          <div className='cube-face cube-face-right'>d</div>  
          <div className='cube-face cube-face-bottom'>#</div>
          <div className='cube-face cube-face-top'>#</div>
        </div>
      </div>
    )
  }
}
