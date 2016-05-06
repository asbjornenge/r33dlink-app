import React from 'react'
import Svg from '@asbjornenge/react-svg'
import githubMark from '../graphics/github-big-logo.svg'

export default class Header extends React.Component {
    render() {
        return (
            <div className="Header">
              r33d.link
              <a href="https://github.com/asbjornenge/r33dlink-app" target="_blank">
                <Svg className="githubMark" svg={githubMark} />
              </a>
            </div>
        )
    }
}
