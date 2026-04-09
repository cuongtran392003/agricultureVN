export interface CreatePlotDto {
    userId: string;
    farmId: string;
    name: string;
    description: string;
}

export interface UpdatePlot {
    name: string;
    description: string;
    farmId: string;
}