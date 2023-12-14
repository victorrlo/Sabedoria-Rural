import { DateTime } from 'luxon'
import { BaseModel, HasMany, ManyToMany, column, hasMany, beforeSave,  manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Post from 'App/Models/Post'
import Hash from '@ioc:Adonis/Core/Hash'
import Token from './Token'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>
  //like
  @manyToMany(() => Post, {
    pivotTable: 'user_post_like',
  })
  public likedPosts: ManyToMany<typeof Post>

  //favourite
  @manyToMany(() => Post, {
    pivotTable: 'user_post_favourite',
  })
  public favouritesPosts: ManyToMany<typeof Post>

  @hasMany(() => Token)
  public tokens: HasMany<typeof Token>

  @hasMany(()=>Token, {
    onQuery:query=>query.where('type', 'PASSWORD_RESET')
  })
  public passwordResetTokens: HasMany<typeof Token>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
