import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Post from 'App/Models/Post'
import PostService from 'App/Services/PostService'
import CreatePostValidator from 'App/Validators/CreatePostValidator'

export default class PostsController {
  public async create({ view }: HttpContextContract) {
   
    return view.render('posts/create')
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreatePostValidator)
    
    //TODO: Pegar o usuario logado
    const user = await User.findOrFail(payload.id)
    
    const postService = new PostService()
    const post = await postService.create(user, payload)
    
    return response.redirect().toRoute('posts.index', { id: post.id })
  }

  public async show({ params, view }: HttpContextContract) {//listar os posts de um usuário
    
    const post = await Post.query().where('user_id', params.id)
    //const post = await Post.findByOrFail('id_user', params.id)
   // console.log(post)

    //await post.load('user')
    
    
    return view.render('posts/show', { post: post })
  }

  public async update({}: HttpContextContract) {}

  public async patch({}: HttpContextContract) {}

  public async index({auth,view, params}: HttpContextContract) {
   
    //await post.load('user')
    //console.log(auth.user)
    const post = await Post.findOrFail(params.id)
    await post.load('user')
    //console.log(post.createdAt)
    //const post = await Post.query().('user_id', params.id)

    return view.render('posts/index',{ post: post })
  }

  
}
