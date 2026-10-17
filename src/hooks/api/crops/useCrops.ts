import { createCrop, deleteCrop, getCrop, getCrops, updateCrop } from "@/services/crops/crops.service";
import { useAuthStore } from "@/stores/authStore";
import { CropInput, CropParams } from "@/types/crops";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCrops = (params: CropParams) => {
  const userId = useAuthStore(state => state.user?._id);
  return useQuery({
    queryKey: ["crops", userId, "list", params],
    queryFn: ({ signal }) => getCrops(params, signal),
    enabled: !!userId,
  });
};
export const useCrop = (id: string) => {
  const userId = useAuthStore(state => state.user?._id);
  return useQuery({
    queryKey: ["crops", userId, "detail", id],
    queryFn: ({ signal }) => getCrop(id, signal),
    enabled: !!userId && !!id,
    retry: false,
  });
};
export const useCropMutations = () => {
  const userId = useAuthStore(state => state.user?._id);
  const client = useQueryClient();
  const refreshLists = () => { void client.invalidateQueries({ queryKey: ["crops", userId, "list"] }); };
  const create = useMutation({ mutationFn: (input: CropInput) => createCrop(input), onSuccess: refreshLists });
  const update = useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<CropInput> }) => updateCrop(id, input),
    onSuccess: (result, { id }) => {
      client.setQueryData(["crops", userId, "detail", id], result);
      refreshLists();
    },
  });
  const remove = useMutation({
    mutationFn: (id: string) => deleteCrop(id),
    onSuccess: (_, id) => {
      client.removeQueries({ queryKey: ["crops", userId, "detail", id], exact: true });
      refreshLists();
    },
  });
  return { create, update, remove };
};
