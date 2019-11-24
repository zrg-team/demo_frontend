import { connect } from 'react-redux'
import Footer from '../components/Footer'
import { MODULE_NAME } from '../../modules/user/models'
import { MODULE_NAME as MODULE_COMMON } from '../models'

const mapStateToProps = (state, props) => ({
  user: state[MODULE_NAME].user || {},
  language: state[MODULE_COMMON].language || 'en'
})

export default connect(mapStateToProps)(Footer)
