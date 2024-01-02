import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsArray()
  tags: string[];
}
