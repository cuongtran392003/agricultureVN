import { getPlot } from "@/services/plot/getPlot.service"
import { useQuery } from "@tanstack/react-query"


export const usePlot = () => {
    return useQuery({
        queryKey: ["plot"],
        queryFn: async() => {
            const plot = await getPlot()
            return plot
        }
    })
}