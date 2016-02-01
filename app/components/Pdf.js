import React from 'react'
import xhr   from 'nanoxhr'

export default class Pdf extends React.Component {
    render() {
        return (
            <div className="Pdf">
                <div className="Header">
                    Header
                </div>
                <div className="Frame">
                </div>
                <div className="Controls">
                    Controls
                </div>
            </div>
        )
    }
    componentDidMount() {
        xhr('/test.pdf')
            .call(res => {
                console.log(res)
            })
    }
}
