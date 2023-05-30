
import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'

const Header = ({ title, onAdd, onShow }) => {
  const location = useLocation()

  return (
    <header className='header'>
      
      <h1>{title}</h1>
      {location.pathname === '/' ? <Button color={onShow ? 'red' : 'green'} text={onShow ? 'Close' : 'Add'} onClick= {onAdd}/> : ''}
    </header>
  )
} 



Header.propTypes = {
  title: PropTypes.string.isRequired
}

export default Header