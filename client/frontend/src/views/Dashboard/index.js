import React from 'react'
import { Link } from 'react-router-dom'
import { Subscribe } from 'unstated'
import AppContainer from '../../containers/AppContainer'

class Dashboard extends React.Component {
  state = {
    cards: [
      {
        title: 'Managers',
        description: 'They manage your offices'
      },
      {
        title: 'Your Offices',
        description: 'Offices in the department'
      },
      {
        title: 'Equipment Types',
        description: 'Types of Equipments in the department'
      },
      {
        title: 'Profile',
        description: 'Your Personal Profile'
      }
    ]
  }

  render() {
    const { user } = this.props
    const isAdmin = user.firstName.toLowerCase() == 'bukola'
    return (
      <React.Fragment>
        <div className="row">
          {isAdmin ? (
            <div className="col s6">
              <Card
                title={'Managers'}
                description="They manage your offices"
                count={4}
                viewRoute="/managers"
                addRoute="/managers/create"
              />
            </div>
          ) : null}
          <div className="col s6">
            <Card
              title="Offices"
              description="Offices in the department"
              count={3}
              viewRoute="/offices"
              addRoute="/offices/create"
            />
          </div>
          <div className="col s6">
            <Card
              title="Equipment Types"
              description="Types of Equipments in the department"
              count={3}
              viewRoute="/equipment-types"
              addRoute="/equipment-types/create"
            />
          </div>
          <div className="col s6">
            <Card
              title="Profile"
              description="Your Personal Profile"
              count={3}
              viewRoute={`/managers/${user.id}`}
            />
          </div>
        </div>
        <div className="col s12">
          <Card
            title="Equipments"
            description="Our equipments"
            count={3}
            viewRoute={`/equipments`}
          />
        </div>
      </React.Fragment>
    )
  }
}

const Card = ({ title, description, count, addRoute, viewRoute }) => (
  <div className="row">
    <div className="col s12 m7">
      <div className="card">
        <div className="card-image">
          <img src="https://picsum.photos/400" />
          <span className="card-title">{title}</span>
        </div>
        <div className="card-content">
          <p>{description}</p>
        </div>
        <div className="card-action">
          {addRoute ? <Link to={addRoute}>Add {title}</Link> : null}
          <Link to={viewRoute}>View {title}</Link>
        </div>
      </div>
    </div>
  </div>
)

export default () => (
  <Subscribe to={[AppContainer]}>
    {appContainer => <Dashboard user={appContainer.state.user} />}
  </Subscribe>
)
