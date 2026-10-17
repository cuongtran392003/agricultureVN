import { AppHeader } from "@/components/common/AppHeader";
import { FormField } from "@/components/common/FormField";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { Colors } from "@/constant/Colors";
import { useGetAllTask } from "@/hooks/api/tasks/useTask";
import { TaskItem } from "@/screens/home/common/TaskItem";
import { Task } from "@/types/tasks";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, TouchableOpacity, View } from "react-native";
import { LocalizedText as Text } from "@/components/common/LocalizedText";
import { SafeAreaView } from "react-native-safe-area-context";
export default function TaskListScreen() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const query = useGetAllTask({ page, limit: 10 });
  useEffect(() => {
    if (!query.data?.data || query.isPlaceholderData) return;
    setTasks(previous => page === 1 ? query.data!.data : [...previous.filter(item => !query.data!.data.some(newItem => newItem._id === item._id)), ...query.data!.data]);
  }, [query.data, query.isPlaceholderData, page]);
  const filtered = tasks.filter(task => (status === "all" || task.status === status) && task.title.toLocaleLowerCase("vi").includes(search.trim().toLocaleLowerCase("vi")));
  const refresh = () => { if (page === 1) void query.refetch(); else setPage(1); };
  return <SafeAreaView style={{ flex: 1, backgroundColor: Colors.offwhite }}>
    <AppHeader title="Công việc" subtitle="Tìm và theo dõi kế hoạch chăm sóc" onBack={() => router.back()} />
    <FlatList data={filtered} keyExtractor={item => item._id} keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 20, paddingBottom: 32 }} showsVerticalScrollIndicator={false}
      ListHeaderComponent={<View>
        <PrimaryButton title="+ Tạo công việc" onPress={() => router.push("/task/add-task")} />
        <View style={{ marginTop: 20 }}><FormField label="Tìm trong công việc đã tải" icon="search-outline" placeholder="Nhập tên công việc…" value={search} onChangeText={setSearch} /></View>
        <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>{[{ value: "all", label: "Tất cả" }, { value: "pending", label: "Đang chờ" }, { value: "completed", label: "Hoàn thành" }, { value: "cancelled", label: "Đã hủy" }].map(item => <TouchableOpacity activeOpacity={1} key={item.value} onPress={() => setStatus(item.value)} style={{ paddingHorizontal: 14, paddingVertical: 10, borderRadius: 14, backgroundColor: status === item.value ? Colors.forestgreen : Colors.surface }}><Text style={{ color: status === item.value ? "white" : Colors.textSecondary, fontWeight: "700" }}>{item.label}</Text></TouchableOpacity>)}</View>
      </View>}
      renderItem={({ item }) => <TaskItem id={item._id} status={item.status} nameWork={item.title} note={item.note} onPress={() => router.push({ pathname: "/task/[id]", params: { id: item._id } })} />}
      ListEmptyComponent={<View style={{ paddingVertical: 30, alignItems: "center" }}>{query.isLoading ? <ActivityIndicator color={Colors.leafgreen} /> : <Text style={{ color: Colors.textSecondary }}>{query.isError ? "Chưa tải được công việc." : "Không có công việc phù hợp."}</Text>}</View>}
      ListFooterComponent={<View style={{ marginTop: 20 }}>{query.isFetching && !query.isLoading ? <ActivityIndicator color={Colors.leafgreen} /> : query.isError ? <PrimaryButton title="Thử tải lại" onPress={() => void query.refetch()} /> : query.data?.meta.hasNextPage ? <PrimaryButton title="Tải thêm công việc" onPress={() => { if (!query.isFetching && !query.isPlaceholderData) setPage(value => value + 1); }} /> : null}</View>}
      refreshControl={<RefreshControl refreshing={query.isRefetching && page === 1} onRefresh={refresh} tintColor={Colors.leafgreen} />}
    />
  </SafeAreaView>;
}
