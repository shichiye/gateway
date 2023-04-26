import { Inject, Injectable } from '@nestjs/common'
import { MongoRepository } from 'typeorm'
import { User } from './entities/user.mongo.entity'

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: MongoRepository<User>
  ) {}

  createOrSave(user: User) {
    return this.userRepository.save(user)
  }
}
