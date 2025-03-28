const NAME_REGEX = "^[A-Za-z ]+$"
const PASSWORD_REGEX = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#!$])[A-Za-z\d@#!$]{5,10}$"
const EMAIL_REGEX = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"

const UserAction = {
    login: "Login",
    signup: "Sign Up"
} 

export {NAME_REGEX, PASSWORD_REGEX, EMAIL_REGEX, UserAction};