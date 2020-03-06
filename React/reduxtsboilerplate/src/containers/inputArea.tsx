import { Dispatch } from "react";
import { connect } from "react-redux";
import InputArea from "../components/inputArea";
import { add, remove } from '../modules/cardList'
import { ActionTypes } from '../store'

const mapDisPatchToProps = (dispatch: Dispatch<ActionTypes>) => {
    return ({
        add: (text: string) => dispatch(add(text)),
        remove: () => dispatch(remove())
    })
}

export default connect(null, mapDisPatchToProps)(InputArea)