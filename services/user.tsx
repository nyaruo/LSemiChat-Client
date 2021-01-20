import { getRequest, postRequest } from './common'

export interface User {
  id: string,
  userID: string,
  name: string,
  mail: string,
  profile: string,
  password: string,
}

export class UserService {
  // REF: singleton pettern: https://typescript-jp.gitbook.io/deep-dive/main-1/singleton
  private static _instance: UserService
  static getInstance(): UserService {
    if (!UserService._instance) {
      UserService._instance = new UserService()
    }
    return UserService._instance
  }

  public async getSelf(): Promise<any> {
    return getRequest("/account")
  }

  public async getAll(): Promise<any> {
    return getRequest("/users")
  }

  public async create(user: User): Promise<any> {
    const newUser = {
      user_id: user.userID,
      name: user.name,
      mail: user.mail,
      image: "a.png",
      profile: user.profile,
      password: user.password
    }
    return postRequest("/account", newUser)
  }
}
