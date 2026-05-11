import axiosInstance from "@/libs/axiosInstance";
import { Task } from "@/types/tasks";

export interface TaskParams {
  page?: number;
  limit?: number;
}

export interface TaskResponse {
  data: Task[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export const getAllTasks = async (
  params: TaskParams = {},
): Promise<TaskResponse> => {
  const res = await axiosInstance.get("/tasks", {
    params: {
      page: 1,
      limit: 10,
      ...params,
    },
  });
  return res.data;
};
