import { createPlotService } from "@/services/plot/createPlot.service"
import { deletePlotService } from "@/services/plot/deletePlot.service"
import { getPlot } from "@/services/plot/getPlot.service"
import { updatePlotService } from "@/services/plot/updatePlot.service"
import { CreatePlotDto, UpdatePlot } from "@/types/plot"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Alert } from "react-native"


export const usePlot = () => {
    return useQuery({
        queryKey: ["plot"],
        queryFn: async () => {
            const plot = await getPlot()
            return plot
        }
    })
}

export const useCreatePlot = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: CreatePlotDto) => {
            const plot = await createPlotService(data)
            return plot
        },
        onSuccess: () => {
            Alert.alert("Thành công", "Đã thêm lô đất mới!")
            queryClient.invalidateQueries({ queryKey: ["plot"] })
        },
        onError: (error) => {
            Alert.alert("Thất bại", error.message)
        }
    })
}


export const useUpdatePlot = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ id, data }: { id: string, data: UpdatePlot }) => {
            const plot = await updatePlotService(id, data)
            return plot;
        },
        onSuccess: (data) => {
            if (data) {
                Alert.alert("Thành công", "Đã cập nhật lô đất!")
                queryClient.invalidateQueries({ queryKey: ["plot"] })
            }
        },
        onError: (error) => {
            Alert.alert("Thất bại", error.message)
        }
    })
}

export const useDeletePlot = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id: string) => {
            const plot = await deletePlotService(id)
            return plot
        },
        onSuccess: () => {
            Alert.alert("Thành công", "Đã xóa lô đất!")
            queryClient.invalidateQueries({ queryKey: ["plot"] })
        },
        onError: (error) => {
            Alert.alert("Thất bại", error.message)
        }
    })
}