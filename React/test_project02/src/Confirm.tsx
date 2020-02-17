import React from 'react';
import './Confirm.css'
interface IProps {
    open: boolean
    title: string
    content: string
    cancelCaption?: string
    okCaption?: string
    onOkClick: () => void
    onCancelClick: () => void
}
const Confirm: React.SFC<IProps> = props => {
    const [cancelCount, setCancelCount] = React.useState(0)
    // The function takes in a second parameter, which determines when our arrow function is called.
    //   This parameter is an array of values that, when changed, will cause the arrow function to be invoked. 
    React.useEffect(() => {
        console.log("open changed")
        return () => console.log("Confirm unmounted")
    }, [props.open])
    const handleOkClick = () => {
        props.onOkClick()
    }
    const handleCancelClick = () => {
        let newCount = cancelCount + 1
        setCancelCount(newCount)
        if (newCount >= 2) props.onCancelClick()
    }
    return (
        // Check state open or not
        <div className={props.open ? "confirm-wrapper confirm-visible" : "confirm-wrapper"}>
            <div className="confirm-container">
                {/* Title */}
                <div className="confirm-title-container">
                    <span>{props.title}</span></div>
                {/* Content */}
                <div className="confirm-content-container">
                    <p>{props.content}</p></div>
                {/* Button */}
                <div className="confirm-buttons-container">
                    <button className="confirm-cancel" onClick={handleCancelClick}>{cancelCount === 0 ? props.cancelCaption : "Really?"}</button>
                    <button className="confirm-ok" onClick={handleOkClick}>{props.okCaption}</button></div>
            </div>
        </div>
    )
}
Confirm.defaultProps = {
    cancelCaption: "Cancel",
    okCaption: "Okay"
}
// const ConfirmMemo = React.memo(Confirm)
export default Confirm