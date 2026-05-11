export interface CropStatusItemProps {
  name: string;
  status: string;
  icon: any;
}

export interface FarmMetricCardProps {
  name: string;
  value: number | string;
  icons: any;
}

export interface TaskItemProps {
  nameWork: string;
  note: string;
  id: string;
  status: string;
  onPress?: () => void;
}
