import { CategoryModule } from './category/category.module'
import { Module } from '@nestjs/common'
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo'
import { GraphQLModule } from '@nestjs/graphql'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async(configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true,
        logging: true
      })
    }),

    /*
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://postgres:root@localhost:5432/devshop',
      autoLoadEntities: true,
      synchronize: true,
      //entities: [Category],
      logging: true

    }),
    */
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql'
    }),

    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
