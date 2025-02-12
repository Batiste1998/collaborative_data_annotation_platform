import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import Button from '../components/button'
import { login, register } from '../services/authService'
import { useAuth } from '../context/AuthContext'

const Registration = ({ format }) => {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (format === 'inscription') {
        await register(formData.username, formData.email, formData.password)
        navigate('/login')
      } else {
        const response = await login(formData.email, formData.password)
        setUser(response.user)
        navigate('/dashboard')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white/40 w-full sm:w-fit py-6 md:py-5 xl:py-10 sm:pl-8 sm:px-14 md:px-10 xl:px-20 rounded-3xl flex flex-col items-center sm:items-stretch ${
        format === 'inscription' ? 'gap-8' : 'gap-4 sm:gap-14'
      }`}
    >
      {format === 'inscription' && (
        <div className="flex flex-col justify-between gap-2 sm:gap-10 md:gap-20 sm:flex-row">
          <label className="text-white md:text-xl xl:text-2xl font-Roboto">
            Username
          </label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="inputRegistration"
            required
          />
        </div>
      )}
      <div className="flex flex-col justify-between gap-2 sm:gap-10 md:gap-20 sm:flex-row">
        <label className="text-white md:text-xl xl:text-2xl font-Roboto">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="inputRegistration"
          required
        />
      </div>
      <div className="flex flex-col justify-between gap-2 sm:gap-10 md:gap-20 sm:flex-row">
        <label className="text-white md:text-xl xl:text-2xl font-Roboto">
          Password
        </label>
        <div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="inputRegistration"
            required
            minLength={6}
          />
          {format === 'inscription' && (
            <a href="/login">
              <p className="mt-2 font-semibold text-white underline underline-offset-4">
                Already have an account ?
              </p>
            </a>
          )}
          {format === 'connexion' && (
            <a href="/registrer">
              <p className="mt-2 font-semibold text-white underline underline-offset-4">
                Not yet registered ?
              </p>
            </a>
          )}
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          <div className="flex justify-start mt-5 sm:justify-end">
            <Button
              variant="primary"
              text={
                loading
                  ? 'Chargement...'
                  : format === 'inscription'
                  ? 'Inscription'
                  : 'Connexion'
              }
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </form>
  )
}

Registration.propTypes = {
  format: PropTypes.oneOf(['inscription', 'connexion']).isRequired,
}

export default Registration
