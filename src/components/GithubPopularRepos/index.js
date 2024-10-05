import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    activeLanguageId: languageFiltersData[0].id,
    gitReposData: [],
    apiStatus: 'initial',
  }

  componentDidMount() {
    this.getGithubRepos()
  }

  getGithubRepos = async () => {
    this.setState({apiStatus: 'ISLOADING'})
    const {activeLanguageId} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`
    const options = {
      mathod: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const formattedData = data.popular_repos.map(eachData => ({
        name: eachData.name,
        id: eachData.id,
        issuesCount: eachData.issues_count,
        forksCount: eachData.forks_count,
        starsCount: eachData.stars_count,
        avatarUrl: eachData.avatar_url,
      }))
      this.setState({
        gitReposData: formattedData,
        apiStatus: 'SUCCESS',
      })
    } else {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  onChangeLanguage = id => {
    const {activeLanguageId} = this.state
    this.setState({activeLanguageId: id}, this.getGithubRepos)
    console.log(activeLanguageId)
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <p className="failure-message">Something Went Wrong!</p>
    </div>
  )

  renderSuccessView = () => {
    const {gitReposData} = this.state
    return (
      <ul className="git-repo-list-container">
        {gitReposData.map(eachRepo => (
          <RepositoryItem repoDetails={eachRepo} key={eachRepo.id} />
        ))}
      </ul>
    )
  }

  renderRepos = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'ISLOADING':
        return this.renderLoader()
      case 'SUCCESS':
        return this.renderSuccessView()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {activeLanguageId} = this.state
    return (
      <div className="app-container">
        <h1 className="popular">Popular</h1>
        <ul className="language-list-container">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              languageDetails={eachLanguage}
              key={eachLanguage.id}
              onChangeLanguage={this.onChangeLanguage}
              isActive={eachLanguage.id === activeLanguageId}
            />
          ))}
        </ul>
        {this.renderRepos()}
      </div>
    )
  }
}
export default GithubPopularRepos
