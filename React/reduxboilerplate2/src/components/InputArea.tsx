import * as React from 'react'

type InputAreaProps = {
    add: (text: string) => void
    remove: () => void
}

const ADD = 'add'
const REMOVE = 'remove'

const InputArea: React.FunctionComponent<InputAreaProps> = props => {
    const textInput = React.createRef<HTMLInputElement>()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const clickAdd: boolean = (e.currentTarget.getAttribute('data-type') === ADD
                && textInput.current !== undefined
                && textInput.current.value !== undefined)
        const clickRemove: boolean = e.currentTarget.getAttribute('data-type') === REMOVE

        if (clickAdd) {
            props.add(textInput.current.value)
            textInput.current.value = ''
        }
        if (clickRemove) props.remove()
    }

    return (
        <div>
            <input type="text" ref={textInput} />
            <button onClick={handleClick} data-type={ADD}>
                {ADD}
            </button>
            <button onClick={handleClick} data-type={REMOVE}>
                {REMOVE}
            </button>
        </div>
    )
}

export default InputArea