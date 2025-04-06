import { Injectable, Post } from '@nestjs/common';
import { Posts } from './posts.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts) private postRepository: Repository<Posts>,
  ) {}

  async save(user: Posts): Promise<Posts> {
    return this.postRepository.save(user);
  }

  async findByUserId(userId: number): Promise<Posts[]> {
    return await this.postRepository.findBy({ user_id: userId });
  }

  async findByUserIdAndPostId(userId: number, postId: number): Promise<Posts> {
    const post = await this.postRepository.findOne({
      where: {
        user_id: userId,
        id: postId,
      },
    });
    if (!post) {
      return new Posts();
    }
    return post;
  }

  async deleteById(postId: number) {
    await this.postRepository.delete({ id: postId });
  }
}
