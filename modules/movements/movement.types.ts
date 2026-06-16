export interface Movement {
  id: string;
  name: string;
  abbreviation?: string | null;
  description?: string | null;
}

export interface MovementFilters {
  q?: string;
  page?: number;
  limit?: number;
}

export interface CreateMovementDto {
  name: string;
  abbreviation?: string;
  description?: string;
}

export interface UpdateMovementDto extends Partial<CreateMovementDto> {}
