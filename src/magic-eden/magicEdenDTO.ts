import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, Max } from 'class-validator';

export enum SortOptions {
  listPrice = 'listPrice',
  updatedAt = 'updatedAt',
}

export enum SortDirection {
  asc = 'asc',
  dsc = 'dsc',
}

export class PaginationListingDTO {
  @IsOptional()
  @IsInt()
  @ApiProperty({ required: false })
  offset?: number;

  @IsOptional()
  @IsInt()
  @Max(100)
  @ApiProperty({ example: 20, required: false })
  limit?: number;

  @IsOptional()
  @IsEnum(SortOptions)
  @ApiProperty({ required: false, enum: SortOptions })
  sort?: SortOptions;

  @IsOptional()
  @IsEnum(SortDirection)
  @ApiProperty({ required: false, enum: SortDirection })
  sort_direction?: SortDirection;
}
