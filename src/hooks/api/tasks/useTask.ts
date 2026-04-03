import { createTask } from "@/services/tasks/createTask.service";
import { deleteTask } from "@/services/tasks/deleteTask.service";
import { getAllTasks } from "@/services/tasks/getAllTask.service";
import { updateTask } from "@/services/tasks/updateTask.service";
import { CreateTaskDto, UpdateTaskDto } from "@/types/tasks";
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


export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({id,status}:{id: string,status: string}) => {
      const task = await updateTask(id, {status});
      return task;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      Alert.alert("Thất bại", "Cập nhật công việc thất bại");
    },
  });
}

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
}
