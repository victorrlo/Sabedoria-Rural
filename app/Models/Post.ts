import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, ManyToMany,belongsTo, column,  manyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public content: string

  @column()
  public title: string

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
  //like
  @manyToMany(() => User, {
    pivotTable: 'user_post',
  })
  public likedUsers: ManyToMany<typeof User>

  public async liked(user: User) {
    //console.log("aqui começa")
    
    const post: Post = this
    await post.load('likedUsers')
    //console.log(post)
    for await (const likedUser of post.likedUsers) {
      if (user.id === likedUser.id) {
        return true
      }
    }

    return false
  }


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
