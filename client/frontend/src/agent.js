import axios from 'axios'

const API_ROOT = 'http://localhost:5000/api'

const axiosInstance = axios.create({
  baseURL: API_ROOT,
  timeout: 30000
})

axiosInstance.interceptors.request.use(
  config => {
    if (window.localStorage.getItem('term_project_jwt')) {
      config.headers.authorization = `JWT ${window.localStorage.getItem(
        'term_project_jwt'
      )}`
    }

    return config
  },
  error => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error.response['data'])
)

export const EquipmentType = {
  update: (id, body) => axiosInstance.put(`/EquipmentTypes/${id}`, body),
  create: body => axiosInstance.post('/EquipmentTypes', body),
  index: () => axiosInstance.get('/EquipmentTypes'),
  show: id => axiosInstance.get(`/EquipmentTypes/${id}`),
  destroy: id => axiosInstance.delete(`/EquipmentTypes/${id}`),
  getEquipments: id => axiosInstance.get(`/EquipmentTypes/${id}/equipments`),
  getEquipmentsCount: id =>
    axiosInstance.get(`/EquipmentTypes/${id}/equipments/count`),
  getAllEquipmentTypes: () =>
    axiosInstance.get('/EquipmentTypes/getAllEquipmentTypes'),
  getOfficeEquipmentTypes: officeId =>
    axiosInstance.get('/EquipmentTypes/getOfficeEquipmentTypes'),
  postEquipments: id => axiosInstance.post(`/EquipmentTypes/${id}/equipments`)
}

export const Equipment = {
  update: (id, body) => axiosInstance.put(`/Equipments/${id}`, body),
  create: body => axiosInstance.post('/Equipments', body),
  createBatch: body => axiosInstance.post('/Equipments/createEquipments', body),
  index: filter => axiosInstance.get(`/Equipments?filter[include][office]`),
  show: id => axiosInstance.get(`/Equipments/${id}`),
  destroy: id => axiosInstance.delete(`/Equipments/${id}`)
}

export const Office = {
  update: (id, body) => axiosInstance.patch(`/Offices/${id}`, body),
  create: body => axiosInstance.post('/Offices', body),
  index: () => axiosInstance.get('/Offices?filter[include][manager]'),
  show: id => axiosInstance.get(`/Offices/${id}?filter[include][manager]`),
  destroy: id => axiosInstance.delete(`/Offices/${id}`),
  getEquipments: id => axiosInstance.get(`/Offices/${id}/equipments`),
  getManager: id => axiosInstance.get(`/Offices/${id}/manager`)
}

export const Account = {
  update: (id, body) => axiosInstance.patch(`/Accounts/${id}`, body),
  create: body => axiosInstance.post('/Accounts', body),
  index: () => axiosInstance.get('/Accounts'),
  show: id => axiosInstance.get(`/Accounts/${id}`),
  destroy: id => axiosInstance.delete(`/Accounts/${id}`),
  getOffices: id => axiosInstance.get(`/Accounts/${id}/offices`),
  getRoles: id => axiosInstance.get(`/Accounts/${id}/roles`),
  login: (email, password) =>
    axiosInstance.post(`/Accounts/login`, { email, password }),
  logout: () => axiosInstance.post('/Accounts/logout'),
  getManagers: () => axiosInstance.get('/Accounts/getRoleMembers?name=manager'),
  getSuperAdmin: () =>
    axiosInstance.get('/Accounts/getRoleMembers?name=super-admin')
}
