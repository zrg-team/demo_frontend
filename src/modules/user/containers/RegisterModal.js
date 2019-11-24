import { connect } from 'react-redux'
import RegisterModal from '../components/RegisterModal'
import handlers from '../handlers'

const mapDispatchToProps = (dispatch, props) => ({
  ...handlers({ dispatch, props })
})

const mapStateToProps = (state, props) => {
  // TODO: Only map something usefull
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal)
