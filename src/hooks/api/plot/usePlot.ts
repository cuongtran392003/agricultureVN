import { createPlotService } from "@/services/plot/createPlot.service"
import { getPlot } from "@/services/plot/getPlot.service"
import { CreatePlotDto } from "@/types/plot"
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
