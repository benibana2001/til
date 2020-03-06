import CardList from '../components/carList'
import { connect } from 'react-redux'
import { AppState } from '../store'

const mapStateToProps = (state: AppState) => {
    return ({
        cards: state.CardList.cards
    })
}

export default connect(mapStateToProps)(CardList)