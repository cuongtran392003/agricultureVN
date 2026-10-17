export type Crop = {
  _id: string;
  userId: string;
  name: string;
  variety?: string;
  description?: string;
  regions: string[];
  createdAt: string;
  updatedAt: string;
};

export type CropInput = { name: string; variety?: string; description?: string; regions?: string[] };
export type CropParams = { page: number; limit: number; search?: string; region?: string };
export type CropResult<T> = { statusCode: number; message: string; data: T };
export type CropListResult = CropResult<Crop[]> & {
  meta: { page: number; limit: number; total: number; totalPages: number; hasNextPage: boolean; hasPrevPage: boolean };
};
