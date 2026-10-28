import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Профиль специалиста. Связанные данные резолвятся отдельными полями.' })
export class Profile {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ description: 'Краткое описание' })
  description: string;
}
