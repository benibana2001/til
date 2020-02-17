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
// class Confirm extends React.Component<IProps> {
//     private handleOkClick = () => {
//         this.props.onOkClick()
//     }
//     private handleCancelClick = () => {
//         this.props.onCancelClick()
//     }
//     public render() {
//         return (
//             // Check state open or not
//             <div className={this.props.open ? "confirm-wrapper confirm-visible" : "confirm-wrapper"}>
//                 <div className="confirm-container">
//                     {/* Title */}
//                     <div className="confirm-title-container">
//                         <span>{this.props.title}</span></div>
//                     {/* Content */}
//                     <div className="confirm-content-container">
//                         <p>{this.props.content}</p></div>
//                     {/* Button */}
//                     <div className="confirm-buttons-container">
//                         <button className="confirm-cancel" onClick={this.handleCancelClick}>{this.props.cancelCaption}</button>
//                         <button className="confirm-ok" onClick={this.handleOkClick}>{this.props.okCaption}</button></div>
//                 </div>
//             </div>
//         )
//     }
// }

const Confirm: React.SFC<IProps> = props => {
    const [cancelCount, setCancelCount] = React.useState(0)
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

export default Confirm