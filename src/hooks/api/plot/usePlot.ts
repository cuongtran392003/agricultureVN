import { getPlot } from "@/services/plot/getPlot.service"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Alert } from "react-native"


export const usePlot = () => {
    return useQuery({
        queryKey: ["plot"],
        queryFn: async() => {
            const plot = await getPlot()
            return plot
        }
    })
}

