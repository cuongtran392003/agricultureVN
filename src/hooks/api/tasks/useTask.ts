import { createTask } from "@/services/tasks/createTask.service";
import { deleteTask } from "@/services/tasks/deleteTask.service";
import { getAllTasks, TaskParams } from "@/services/tasks/getAllTask.service";
import { getTaskById } from "@/services/tasks/getTaskById.service";
import { updateTask } from "@/services/tasks/updateTask.service";
import { CreateTaskDto } from "@/types/tasks";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Alert } from "react-native";

export const useGetAllTask = (params: TaskParams) => {
  return useQuery({
    queryKey: ["tasks", params],
    queryFn: async () => {
      const tasks = await getAllTasks(params);
      return tasks;
    },
    placeholderData: keepPreviousData,
  });
};

export const useGetTaskById = (id: string) => {
  return useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const task = await getTaskById(id);
      return task;
    },
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

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const task = await updateTask(id, { status });
      return task;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", variables.id] });
    },
    onError: () => {
      Alert.alert("Thất bại", "Cập nhật công việc thất bại");
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const task = await deleteTask(id);
      return task;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      Alert.alert("Thất bại", "Xóa công việc thất bại");
    },
  });
};
