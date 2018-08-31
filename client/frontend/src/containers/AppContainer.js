import { Container } from 'unstated'
import { Account } from '../agent'

class AppContainer extends Container {
  state = {
    user: null,
    token: null,
    loaded: false,
    error: null,
    equipmentTypes: {
      title: '',
      list: []
    },
    equipments: {
      title: '',
      list: []
    }
  }

  addEquipments = async ({ title, list }) => {
    await this.setState(state => ({ ...state, equipments: { title, list } }))
  }

  addEquipmentTypes = async ({ title, list }) => {
    await this.setState(state => ({
      ...state,
      equipmentTypes: { title, list }
    }))
  }

  removeEquipments = async () => {
    await this.setState(state => ({
      ...state,
      equipments: { title: '', list: [] }
    }))
  }

  removeEquipmentTypes = async () => {
    await this.setState(state => ({
      ...state,
      equipmentTypes: { title: '', list: [] }
    }))
  }

  logout = async () => {
    window.localStorage.removeItem('term_project_token')
    await this.setState(state => ({
      token: null,
      user: null,
      loaded: true,
      error: null
    }))
  }

  login = async ({ email, password }, history) => {
    try {
      const res = await Account.login(email, password)
      const currentUser = await Account.show(res.userId)
      console.log(currentUser)
      await this.setState(
        state => {
          console.log('fff')
          return {
            token: res.id,
            user: currentUser,
            loaded: true,
            error: null
          }
        },
        () => console.log(this.state)
      )
      window.localStorage.setItem('term_project_token', res.id)
      history.push('/dashboard')
    } catch (err) {
      await this.setState(state => ({
        error: err,
        loaded: true,
        token: null,
        user: null
      }))
      console.log('didnt log in', err)
    }
  }
}

export default AppContainer
