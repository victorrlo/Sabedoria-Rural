import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from 'App/Validators/BaseValidator'

export default class CreateUserValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    username: schema.string([
      rules.minLength(2),
      rules.maxLength(20),
      rules.trim(),
      rules.unique({ table: 'users', column: 'username' })
    ]),
    name: schema.string([
      rules.minLength(2),
      rules.maxLength(200),
      rules.trim(),
    ]),
    email: schema.string([
      rules.regex(/\S+@\S+\.\S+/),
      rules.unique({ table: 'users', column: 'email' })
    ]),

    password: schema.string([
      rules.minLength(8)
    ])
  })

  
  public messages: CustomMessages = {
    ...this.messages,
  }
}

