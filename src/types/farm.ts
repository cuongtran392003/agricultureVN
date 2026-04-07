export interface CreateFarmDto {
    userId?: string;
    name: string;
    description?: string;
    location?: string;
}

export interface UpdateFarmDto {
    name?: string;
    description?: string;
    location?: string;
}