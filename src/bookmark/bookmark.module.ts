import { Module } from '@nestjs/common';
import { Bookmark } from './bookmark.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Bookmark])]
})
export class BookmarkModule { }
