import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionsController {
    public async create({ view }: HttpContextContract) {
        return view.render('sessions/create')//login
    }

    public async store({ auth, view, request, response }: HttpContextContract) {

        const email = request.input('email', undefined)
        const password = request.input('password', undefined)
        //console.log(email)
        //console.log(password)

        try {
            await auth.use('web').attempt(email,password)
            response.redirect().toRoute('posts.index')
        } catch (error) {
            return response.redirect().toRoute('sessions.create')
            //return response.badRequest('Invalid')
        }
        
        
    }

    public async delete({ auth, view, request, response }: HttpContextContract) {
        await auth.use('web').logout()
        return response.redirect().toRoute('home.index')

        
        
    }
}
