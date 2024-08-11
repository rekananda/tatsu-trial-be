import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ example: 'JohnDoe123' })
  password: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;
}

export class LoginUserDto {
  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ example: 'JohnDoe123' })
  password: string;
}
