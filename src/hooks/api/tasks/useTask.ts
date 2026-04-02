import { createTask } from "@/services/tasks/createTask.service";
import { getAllTasks } from "@/services/tasks/getAllTask.service";
import { CreateTaskDto } from "@/types/tasks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

export const useGetAllTask = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const tasks = await getAllTasks();
      return tasks;
    },
    staleTime: 1000 * 60,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateTaskDto) => {
      const task = await createTask(data);
      console.log(">>> check create task", task);
      return task;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      Alert.alert("Thất bại", "Thêm công việc thất bại");
    },
  });
};
