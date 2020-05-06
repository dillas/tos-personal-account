const faker = require('faker')

module.exports = () => {
    function getUser() {
        return {
            username: faker.internet.userName(),
            password: faker.internet.password()
        }
    }

    function getContacts() {
        return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            username: faker.internet.userName(),
            email: faker.internet.email(),
            phone: faker.phone.phoneNumber(),
            website: faker.internet.url()
        }
    }

    const data = { users: [], contacts: [] }

    for (let i = 0; i < 10; i++) {
        data.users.push(getUser())
    }

    data.users.push({username: 'user', password: "pass"})

    faker.locale = "ru";
    for (let i = 0; i < 100; i++) {
        data.contacts.push(getContacts())
    }

    return data
}
