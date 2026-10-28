import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Ссылка на профессиональный ресурс (GitHub, LinkedIn, Telegram...)' })
export class Link {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  url: string;
}
