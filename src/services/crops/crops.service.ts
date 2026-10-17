import axiosInstance from "@/libs/axiosInstance";
import { Crop, CropInput, CropListResult, CropParams, CropResult } from "@/types/crops";

// axiosInstance uses the shared /api/v1 base URL and adds the Bearer token.
export const getCrops = async (params: CropParams, signal?: AbortSignal) =>
  (await axiosInstance.get<CropListResult>("/crops", { params, signal })).data;
export const getCrop = async (id: string, signal?: AbortSignal) =>
  (await axiosInstance.get<CropResult<Crop>>(`/crops/${encodeURIComponent(id)}`, { signal })).data;
export const createCrop = async (input: CropInput) =>
  (await axiosInstance.post<CropResult<Crop>>("/crops", input)).data;
export const updateCrop = async (id: string, input: Partial<CropInput>) =>
  (await axiosInstance.patch<CropResult<Crop>>(`/crops/${encodeURIComponent(id)}`, input)).data;
export const deleteCrop = async (id: string) =>
  (await axiosInstance.delete<CropResult<null>>(`/crops/${encodeURIComponent(id)}`)).data;
