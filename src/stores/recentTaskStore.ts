import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type TaskTemplate = {
  title: string; farmId: string; plotId: string; cropName: string;
  description: string; note: string; priority: string;
};
export const templateKey = (task: TaskTemplate) => [task.title.trim().toLocaleLowerCase(), task.farmId, task.plotId].join("|");
type RecentTask = TaskTemplate & { userId: string; usedAt: string };
export const useRecentTaskStore = create<{ items: RecentTask[]; remember: (userId: string, task: TaskTemplate) => void }>()(
  persist((set) => ({
    items: [],
    remember: (userId, task) => set(state => {
      const key = templateKey(task);
      const own = [{ ...task, userId, usedAt: new Date().toISOString() }, ...state.items.filter(item => item.userId === userId && templateKey(item) !== key)].slice(0, 8);
      return { items: [...state.items.filter(item => item.userId !== userId), ...own].slice(-40) };
    }),
  }), { name: "recent-task-templates", storage: createJSONStorage(() => AsyncStorage) }),
);
