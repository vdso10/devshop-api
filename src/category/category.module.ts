import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoryService } from './category.service'
import { CategoryResolver } from './category.resolver'
import { Module } from '@nestjs/common'
import { Category } from './category.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    providers: [CategoryService, CategoryResolver]

})

export class CategoryModule{}