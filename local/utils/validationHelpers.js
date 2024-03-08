


function validateUser(user) {
    let errors = {}

    if(!user) {
        return {
            user: "No user body submitted"
        }
    }

    if (!user.name) {
        errors.name = "No name submitted"
    }
    const hasErrors = Object.keys(errors).length > 0;
    return [errors, hasErrors]
}

module.exports = {
    validateUser
}