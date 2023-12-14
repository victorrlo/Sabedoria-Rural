import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mail from '@ioc:Adonis/Addons/Mail'
import Route from '@ioc:Adonis/Core/Route'
import Env from '@ioc:Adonis/Core/Env'

export default class PasswordResetController {
    public async forgot({view}:HttpContextContract){
        return view.render('password.forgot')
    }
}
