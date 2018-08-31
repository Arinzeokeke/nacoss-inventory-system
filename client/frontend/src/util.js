export const required = value => (value ? undefined : 'Required')
export const confirmPassword = values =>
  values.password !== values.confirmPassword
    ? { confirmPassword: 'Must be same with password' }
    : {}
