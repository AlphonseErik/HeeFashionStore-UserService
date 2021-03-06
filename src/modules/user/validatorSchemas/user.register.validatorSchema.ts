import { ValidationSchema, IsEmail, IsDefined } from 'class-validator';


export const RegisterValidatorSchema: ValidationSchema = {
    name: 'RegisterValidatorSchema',
    properties: {
        username: [
            {
                type: 'isDefined',
                message: 'USERNAME_EMPTY'
            },
            {
                type: 'minLength',
                constraints: [4],
                message: 'USERNAME_MIN_IS_6'
            },
            {
                type: 'maxLength',
                constraints: [25],
                message: 'USERNAME_MAX_IS_25'
            },
            {
                type: 'matches',
                constraints: [/^[a-zA-Z][a-zA-Z0-9]+$/],
                message: 'USERNAME_INVALID'
            },
        ],
        phone: [
            {
                type: 'isDefined',
                constraints: [IsDefined],
                message: 'MOBILEPHONE_EMPTY'
            }
        ],
        password: [
            {
                type: 'minLength',
                constraints: [5],
                message: 'PASSWORD_MIN_IS_6'
            },
            {
                type: 'maxLength',
                constraints: [25],
                message: 'PASSWORD_MIN_IS_25'
            },
            {
                type: 'isDefined',
                message: 'PASSWORD_EMPTY'
            }
        ],
        email: [
            {
                type: 'isEmail',
                constraints: [IsEmail],
                message: 'EMAIL_INVALID'
            },
            {
                type: 'isDefined',
                message: 'EMAIL_EMPTY'
            }
        ],
    }
}