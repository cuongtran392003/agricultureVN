import { isAxiosError } from "axios";
import { Crop, CropInput } from "@/types/crops";

export const cropApiError = (error: unknown) => {
  const response = isAxiosError<{ message?: unknown }>(error) ? error.response : undefined;
  const status = response?.status;
  if (status === 401) return { status, messages: ["Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại."] };
  if (status === 404) return { status, messages: ["Cây trồng không tồn tại hoặc không thuộc tài khoản của bạn."] };
  const raw = response?.data?.message;
  const messages = (Array.isArray(raw) ? raw : [raw]).filter((item): item is string => typeof item === "string" && !!item.trim());
  return { status, messages: messages.length ? messages : ["Không thể xử lý yêu cầu. Vui lòng thử lại."] };
};

export const regionError = (regions: string[], input: string) => {
  const value = input.trim();
  if (!value) return "Vui lòng nhập tên vùng.";
  if (value.length > 100) return "Tên vùng tối đa 100 ký tự.";
  if (regions.includes(value)) return "Vùng này đã có trong danh sách.";
  if (regions.length >= 20) return "Chỉ được chọn tối đa 20 vùng.";
  return "";
};

export const buildCropInput = (values: { name: string; variety: string; description: string; regions: string[] }, existing?: Crop): Partial<CropInput> => {
  const normalized = { ...values, name: values.name.trim(), variety: values.variety.trim(), regions: values.regions.map(region => region.trim()) };
  if (!existing) return {
    name: normalized.name,
    ...(normalized.variety ? { variety: normalized.variety } : {}),
    ...(normalized.description ? { description: normalized.description } : {}),
    regions: normalized.regions,
  };
  const changed: Partial<CropInput> = {};
  if (normalized.name !== existing.name) changed.name = normalized.name;
  if (normalized.variety !== (existing.variety ?? "") && normalized.variety) changed.variety = normalized.variety;
  if (normalized.description !== (existing.description ?? "")) changed.description = normalized.description;
  if (JSON.stringify(normalized.regions) !== JSON.stringify(existing.regions ?? [])) changed.regions = normalized.regions;
  return changed;
};
