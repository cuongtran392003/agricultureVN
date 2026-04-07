import { createFarmService } from "@/services/farm/createFarm.service";
import { deleteFarm } from "@/services/farm/deleteFarm.service";
import { getFarm } from "@/services/farm/getFarm.service";
import { updateFarmService } from "@/services/farm/updateFarm.service";
import { CreateFarmDto, UpdateFarmDto } from "@/types/farm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFarm = () => {
  return useQuery({
    queryKey: ["farm"],
    queryFn: async () => {
      const farm = await getFarm();
      return farm;
    },
  });
};

export const useAddFarm = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateFarmDto) => {
      const farm = await createFarmService(data);
      console.log(">>> check create farm", farm);
      return farm;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["farm"] });
    },
    onError: (error) => {
      console.log(">>> check error", error);
    },
  });
};

export const useUpdateFarm = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateFarmDto }) => {
      const farm = await updateFarmService(id, data);
      return farm;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["farm"] });
    },
    onError: (error) => {
      console.log(">>> check error", error);
    },
  });
};

export const useDeleteFarm = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const farm = await deleteFarm(id);
      return farm;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["farm"] });
    },
    onError: (error) => {
      console.log(">>> check error", error);
    },
  });
};
