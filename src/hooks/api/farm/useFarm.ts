import { getFarm } from "@/services/farm/getFarm.service"
import { useQuery } from "@tanstack/react-query"


export const useFarm = () => {
    return useQuery({
        queryKey: ["farm"],
        queryFn: async() => {
            const farm = await getFarm()
            return farm
        }
    })
}