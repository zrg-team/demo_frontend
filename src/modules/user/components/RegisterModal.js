import React, { Component } from 'react'
import { Form, Field } from 'react-final-form'
import ReCAPTCHA from 'react-google-recaptcha'
import validate from 'validate.js'
import Loading from '../../../common/components/widgets/Loading'
import { toast } from 'react-toastify'
import { RECAPTCHA_KEY, DEV } from '../../../configs'
import i18n from 'i18n-js'
export default class RegisterModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      accountType: 3,
      email: '',
      loading: false,
      recaptcha: null,
      forgotPasswordMode: false
    }
    this.validate = this.validate.bind(this)
    this.onSelectType = this.onSelectType.bind(this)
    this.validateLogin = this.validateLogin.bind(this)
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this)
    this.handleChangeCapcha = this.handleChangeCapcha.bind(this)
    this.validateForgotPassword = this.validateForgotPassword.bind(this)
  }

  handleChangeCapcha (recaptcha) {
    this.setState({
      recaptcha
    })
  }

  onSelectType (type) {
    this.setState({
      accountType: type
    })
  }

  validate (values) {
    const errors = validate(values, {
      email: {
        presence: true,
        email: {
          message: `${i18n.t('messages.invalid_email_format')}`
        }
      },
      password: {
        presence: true,
        length: {
          minimum: 8,
          message: `${i18n.t('messages.must_be_at_least_8_characters')}`
        }
      },
      confirm: {
        equality: 'password'
      }
    })
    return errors
  }

  validateLogin (values) {
    const errors = validate(values, {
      email: {
        presence: true,
        email: {
          message: `${i18n.t('user_login.password')}`
        }
      },
      password: {
        presence: true,
        length: {
          minimum: 8,
          message: `${i18n.t('messages.must_be_at_least_8_characters')}`
        }
      }
    })
    return errors
  }

  validateForgotPassword (values) {
    const errors = validate(values, {
      email: {
        presence: true,
        email: {
          message: `${i18n.t('messages.invalid_email_format')}`
        }
      }
    })
    return errors
  }

  async handleSubmitLogin (values) {
    this.setState({
      loading: true
    })
    const { login } = this.props
    const { recaptcha } = this.state
    const result = await login({
      user_name: values.email,
      password: values.password,
      recaptcha
    })
    if (result.success) {
      toast(`${i18n.t('user_login.login_success')}`, { type: 'success' })
      setTimeout(() => {
        window.location.reload()
      }, 500)
    } else {
      toast(result.message, { type: 'error' })
    }
    this.setState({
      loading: false
    })
  }

  render () {
    const {
      loading,
      recaptcha
    } = this.state
    return (
      <div id='sign-in-dialog' className='zoom-anim-dialog mfp-hide dialog-with-tabs'>
        {loading ? <Loading /> : null}
        <div className='sign-in-form'>
          <ul className='popup-tabs-nav'>
            <li><a href='#login'>{i18n.t('user_login.log_in')}</a></li>
            <li><a href='#register'>{i18n.t('user_login.register')}</a></li>
            <li><a href='#forgot'>{i18n.t('user_login.forgot_password')}</a></li>
          </ul>

          <div className='popup-tabs-container'>
            <div className='popup-tab-content' id='login'>
              <div className='welcome-text'>
                <h3>{i18n.t('messages.were_glad_to_see_you_again')}</h3>
                <span>{i18n.t('messages.dont_have_an_account')}<a href='#' className='register-tab'>{i18n.t('user_login.sign_up')}</a></span>
              </div>
              <Form
                onSubmit={this.handleSubmitLogin}
                validate={this.validateLogin}
                render={({ handleSubmit, pristine, invalid }) => {
                  return (
                    <form onSubmit={handleSubmit} method='post' id='login-form'>
                      <Field name='email'>
                        {({ input, meta }) => (
                          <div className='input-with-icon-left'>
                            <i className='icon-material-baseline-mail-outline' />
                            <input
                              type='text'
                              className='input-text with-border'
                              name='emailaddress'
                              id='emailaddress'
                              placeholder='Email'
                              required
                              {...input}
                            />
                            {meta.touched && meta.error && <p style={{ marginTop: -20, color: 'red' }}>{meta.error}</p>}
                          </div>
                        )}
                      </Field>
                      <Field name='password' type='password'>
                        {({ input, meta }) => (
                          <div className='input-with-icon-left'>
                            <i className='icon-material-outline-lock' />
                            <input
                              type='password'
                              className='input-text with-border'
                              name='password'
                              id='password'
                              placeholder={i18n.t('user_login.password')}
                              required
                              {...input}
                            />
                            {meta.touched && meta.error && <p style={{ marginTop: -20, color: 'red' }}>{meta.error}</p>}
                          </div>
                        )}
                      </Field>
                      {/* <a href='#' className='forgot-tab'>Forgot Password?</a> */}
                      {
                        loading
                          ? null
                          : (
                            <ReCAPTCHA
                              sitekey={RECAPTCHA_KEY}
                              onChange={this.handleChangeCapcha}
                            />
                          )
                      }
                      <button
                        className='button full-width button-sliding-icon ripple-effect'
                        type='submit'
                        form='login-form'
                        disabled={!DEV && !recaptcha}
                        style={!DEV && !recaptcha ? { backgroundColor: 'gray' } : {}}
                      >{i18n.t('user_login.log_in')}<i className='icon-material-outline-arrow-right-alt' />
                      </button>
                    </form>
                  )
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
