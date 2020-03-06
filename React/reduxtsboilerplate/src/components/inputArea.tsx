import React from 'react'

type InputAreaProps = {
    add: (text: string) => void
    remove: () => void
}

const ADD = 'add'
const REMOVE = 'remove'

const InputArea: React.FunctionComponent<InputAreaProps> = props => {
    const textInput = React.createRef<HTMLInputElement>()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (e.currentTarget.getAttribute('data-type') === ADD
            && textInput.current
            && textInput.current.value
        ) {
            props.add(textInput.current.value)
            textInput.current.value = ''
        }
        if (e.currentTarget.getAttribute('data-type') === REMOVE) {
            props.remove()
        }
    }
    return (
        <div>
            {/* TODO: ref */}
            <input type="text" ref={textInput} />

            <button onClick={handleClick} data-type={ADD}>
                {ADD}</button>
            <button onClick={handleClick} data-type={REMOVE}>
                {REMOVE}</button>
        </div>
    )
}

export default InputArea
