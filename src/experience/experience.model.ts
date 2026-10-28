import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Место работы' })
export class Experience {
  @Field(() => ID)
  id: string;

  @Field()
  company: string;

  @Field()
  position: string;

  @Field()
  startDate: Date;

  @Field(() => Date, { nullable: true, description: 'null, если работаю здесь сейчас' })
  endDate: Date | null;

  @Field(() => [String])
  achievements: string[];
}

@ObjectType()
export class ExperiencePeriod {
  @Field()
  isCurrent: boolean;

  @Field(() => Int, { description: 'Продолжительность работы в полных месяцах' })
  durationMonths: number;
}
