import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mail from '@ioc:Adonis/Addons/Mail'
import Route from '@ioc:Adonis/Core/Route'
import Env from '@ioc:Adonis/Core/Env'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import Token from 'App/Models/Token'

export default class PasswordResetController {
    public async forgot({view}:HttpContextContract){
        return view.render('password.forgot')
    }

    public async send({request, response, session}:HttpContextContract) {
        const emailSchema = schema.create({
            email:schema.string([rules.email()])
        })

        const {email} = await request.validate({schema:emailSchema})
        const user = await User.findBy('email', email)
        const token = await Token.generatePasswordResetToken(user)
        const resetLink = Route.makeUrl('password.reset', [token])

        if(user){
            await Mail.sendLater(message=>{
                message
                    .from('noreply@noreply.com')
                    .to(user.email)
                    .subject('Mude sua senha')
                    .html(`Mude sua senha <a href="${Env.get('DOMAIN')}${resetLink}">clicando aqui</a>`)
            })
        }

        session.flash('sucess', 'Se alguma conta está relacionada a esse email, você receberá um link para o reset de sua senha em poucos momentos')
        return response.redirect().back()
    }
    
    public async reset({}:HttpContextContract) {

    }

    public async store({}:HttpContextContract) {

    }

    
}
