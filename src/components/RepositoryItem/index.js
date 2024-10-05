import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = repoDetails

  return (
    <li className="list-item">
      <div className="repo-item">
        <img src={avatarUrl} alt={name} className="avatar-img" />
        <h1 className="name">{name}</h1>
        <div>
          <div className="star-count-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
              alt="stars"
              className="stars-logo"
            />
            <p className="stars-count">{starsCount} stars</p>
          </div>
          <div className="forks-count-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
              alt="forks"
              className="forks-logo"
            />
            <p className="forks-count">{forksCount} forks</p>
          </div>
          <div className="open-issue-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
              alt="open issues"
              className="issue-logo"
            />
            <p className="issues-count">{issuesCount} issues</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
