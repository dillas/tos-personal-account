import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:4000/"
})

const apis = {
  getUser: (user) => api.get(`users?username=${user.username}&password=${user.password}`),
  removeContacts: id => api.delete("contacts/" + id),
  getContacts: () => api.get("contacts"),
  editeContacts: contact => api.put("contacts/" + contact.id, contact),
  createContacts: contact => api.post("contacts/", contact)
}

export default apis