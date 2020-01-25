import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.scss'
import Routes from './Routes'

const parent: HTMLElement | null = document.getElementById('root')
//
// class Apps extends React.Component {
//     render() {
//         return (
//             <div>
//                 <Routes />
//                 <div>Hello world!</div>
//             </div>
//         )
//     }
// }
// ReactDOM.render(<Apps />, parent)
ReactDOM.render(<Routes />, parent)