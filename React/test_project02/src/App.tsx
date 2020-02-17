import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Confirm from './Confirm'
interface IState {
    confirmOpen: boolean
}
function App() {
    // https://reactjs.org/docs/hooks-intro.html
    //   - Hooks are functions that let you “hook into” React state and lifecycle features from function components. 
    //
    //   - useState is a build-in hook function.
    //       Args express a initial value.
    //   - State don't need to be an Object.
    //   - You don’t have to use many state variables. 
    //       State variables can hold objects and arrays just fine, so you can still group related data together.
    //       However, unlike this.setState in a class, updating a state variable always replaces it instead of merging it.
    const [count, setCount] = React.useState(0)
    const [open, setOpen] = React.useState(false)
    const [confirmMsg, setConfirmMsg] = React.useState("Please hit the confirm button")
    const [confirmVisible, setConfirmVisible] = React.useState(true)
    const [countDown, setCountDown] = React.useState(10)
    let timer: number = 0
    // useEffect は毎回のレンダー後に呼ばれるのか？ その通りです！
    //   デフォルトでは、副作用関数は初回のレンダー時および毎回の更新時に呼び出されます。 
    //   React は、副作用が実行される時点では DOM が正しく更新され終わっていることを保証します。
    useEffect(() => {
        document.title = `You clicked ${count} times`
    })
    // useEffect(()=>{
        // timer = window.setInterval(() => handleTimerTick(), 1000)
    // })
    // const handleTimerTick = () => {
        // setConfirmMsg(`Please hit the confirm button ${countDown} secs to go`)
        // setCountDown(countDown - 1)
        // if (countDown <= 0) {
            // clearInterval(timer)
            // setConfirmMsg("Too late to confirm!")
            // setConfirmVisible(false)
        // }
    // }
    const handleOkClick = () => {
        setConfirmMsg("Cool, carry on!")
        setOpen(false)
        clearInterval(timer)
    }
    const handleCancelClick = () => {
        setConfirmMsg("Take a break ...")
        setOpen(false)
        clearInterval(timer)
    }
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.</p>
                    <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer">
                    Learn React and TypeScript</a>
                <p>You clicked {count} times</p>
                <button onClick={() => setCount(count + 1)}>Click me</button>
            </header>
            <p>{confirmMsg}</p>
            {confirmVisible && (
                <button onClick={() => setOpen(true)}>Confirm</button>
            )}
            <Confirm
                open={open}
                title="React and TypeScript"
                content="Are you sure you want to learn React and TypeScript?"
                cancelCaption="Cancel"
                okCaption="Okay"
                onCancelClick={handleCancelClick}
                onOkClick={handleOkClick}
            />
        </div>
    );
}

export default App;
