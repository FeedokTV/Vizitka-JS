import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Project {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ description: 'Ссылка на проект или репозиторий' })
  url: string;

  @Field(() => String, { nullable: true })
  description: string | null;
}
