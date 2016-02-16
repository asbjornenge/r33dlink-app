import React from 'react'

export default class Text extends React.Component {
    render() {
        return (
            <div className="Text">
                <pre ref="text" style={{wordWrap: 'break-word', whiteSpace: 'pre-wrap'}}>
                    {this.props.text || ''}
                </pre>
            </div>
        )
    }
}
