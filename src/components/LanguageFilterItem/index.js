import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, onChangeLanguage, isActive} = props
  const {language, id} = languageDetails
  const className = isActive ? 'active' : ''
  const onClickLanguage = () => {
    onChangeLanguage(id)
  }

  return (
    <li className="list-item">
      <button
        type="button"
        className={`language-button ${className}`}
        onClick={onClickLanguage}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
