import { CacheModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { getConfig } from './utils'
import { redisStore } from 'cache-manager-redis-store'
import { RedisClientOptions } from 'redis'

const redisConfig = getConfig('REDIS_CONFIG')

const redisStoreConfig: RedisClientOptions = {
  socket: {
    host: redisConfig.host,
    port: +redisConfig.port
  },
  password: redisConfig.auth,
  database: redisConfig.db
}

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore(redisStoreConfig),
        ttl: 60 * 60 * 24 * 7
      })
    }),
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig]
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
