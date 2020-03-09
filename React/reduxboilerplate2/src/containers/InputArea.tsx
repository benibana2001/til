import { Dispatch } from 'react'
import { connect } from 'react-redux'
import InputArea from '../components/InputArea'
import { add, remove } from '../Actions/cardListActions'
import { ActionTypes } from '../store'

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>) => ({
    add: (text: string) => dispatch(add(text)),
    remove: () => dispatch(remove())
})

export default connect(null, mapDispatchToProps)(InputArea)