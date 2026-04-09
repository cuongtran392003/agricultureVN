export interface TaskResponse {
  _id: string;
  farmId: {
    _id: string;
    name: string;
  };
  plotId: {
    _id: string;
    name: string;
    code: string;
  };
  title: string;
  description: string;
  cropName: string;
  scheduledDate: string;
  scheduledTime: string;
  status: string;
  priority: string;
  note: string;
}

export interface CreateTaskDto {
  userId: string;
  farmId: string;
  plotId: string;
  title: string;
  description: string;
  cropName: string;
  scheduledDate: string;
  scheduledTime: string;
  status: string;
  priority: string;
  note: string;
}

export interface UpdateTaskDto {
  status: string;
}
