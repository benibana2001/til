import React, { ReactElement, ReactHTMLElement, ReactComponentElement } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
const user: {
    firstName: string
    lastName: string
} = {
    firstName: 'Ichiro',
    lastName: 'Suzuki'
}
let parent: HTMLElement | null = document.getElementById('root')
let elem: ReactElement = (
    <div>
        <h1>Hello {user.firstName + ' ' + user.lastName}</h1>
        <h2>Good to see you here.</h2>
    </div>
);
let Welcome = (props: any): ReactElement => {
    return <h1>Hello {props.name}</h1>
}
let Greet = (): ReactElement => {
    return (
        <div>
            <Welcome name="Sara" />
            <Welcome name="Toma" />
            <Welcome name="Miku" />
        </div>
    )
}
class Clock extends React.Component<{}, {date: Date}> {
    constructor(props: any){
        super(props);
        this.state = {date: new Date()}
    }
    render() {
        return <div>{this.state.date.toLocaleTimeString()}</div>
    }
}

ReactDOM.render(<Clock />, parent);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
