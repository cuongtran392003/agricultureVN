import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Skeleton } from "@/components/Skeleton";
import { Colors } from "@/constant/Colors";
import { useGetAllTask } from "@/hooks/api/tasks/useTask";
import { TaskItem } from "@/screens/home/common/TaskItem";
import { Task } from "@/types/tasks";

export default function TaskListScreen() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [tasks, setTasks] = useState<Task[]>([]);
  const limit = 10;

  const {
    data: taskData,
    isLoading,
    isRefetching,
    refetch,
  } = useGetAllTask({ page, limit });

  useEffect(() => {
    if (taskData?.data) {
      if (page === 1) {
        setTasks(taskData.data);
      } else {
        setTasks((prev) => {
          const newTasks = taskData.data.filter(
            (t) => !prev.some((p) => p._id === t._id),
          );
          return [...prev, ...newTasks];
        });
      }
    }
  }, [taskData, page]);

  const loadMoreTasks = () => {
    if (taskData?.meta?.hasNextPage && !isLoading && !isRefetching) {
      setPage((prev) => prev + 1);
    }
  };

  const handleRefresh = () => {
    setPage(1);
    refetch();
  };

  const renderFooter = () => {
    if (!isRefetching || page === 1) return null;
    return (
      <View style={{ paddingVertical: 10 }}>
        <ActivityIndicator size="small" color={Colors.forestgreen} />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      <View className="flex-row items-center px-5 py-4 border-b border-gray-200 bg-white">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color={Colors.forestgreen} />
        </TouchableOpacity>
        <Text
          className="text-lg font-bold"
          style={{ color: Colors.brownearth }}
        >
          Danh sách công việc
        </Text>
      </View>

      {isLoading && page === 1 ? (
        <View className="px-5 mt-4 gap-y-4">
          <Skeleton width="100%" height={80} borderRadius={16} />
          <Skeleton width="100%" height={80} borderRadius={16} />
          <Skeleton width="100%" height={80} borderRadius={16} />
          <Skeleton width="100%" height={80} borderRadius={16} />
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View className="mb-4">
              <TaskItem
                nameWork={item.title}
                note={item.note}
                id={item._id}
                status={item.status}
                onPress={() =>
                  router.push({
                    pathname: "/task/[id]",
                    params: { id: item._id },
                  })
                }
              />
            </View>
          )}
          onEndReached={loadMoreTasks}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching && page === 1}
              onRefresh={handleRefresh}
              colors={[Colors.forestgreen]}
              tintColor={Colors.forestgreen}
            />
          }
          ListEmptyComponent={
            <View className="items-center mt-10">
              <Text className="text-gray-500">Chưa có công việc nào</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
