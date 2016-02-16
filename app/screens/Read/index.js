import React     from 'react'
import Text      from './components/Text'
import Controls  from './components/Controls'
import readStyle from './read.styl'

export default class Read extends React.Component {
    render() {
        return (
            <div className="Read">
                <style>{readStyle}</style>
                <Text />
                <Controls />
            </div>
        )
    }
}
