import { AppHeader } from "./AppHeader";
import { Colors } from "@/constant/Colors";
import { ReactNode } from "react";
import { Modal, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
type Props = { visible: boolean; onClose?: () => void; title: string; rightAction?: ReactNode; children: ReactNode };
export const ManageModal = ({ visible, onClose, title, rightAction, children }: Props) => <Modal visible={visible} animationType="slide" onRequestClose={onClose}><SafeAreaView style={{ flex: 1, backgroundColor: Colors.offwhite }}><AppHeader title={title} subtitle="Quản lý khu vực canh tác của bạn" onBack={onClose} rightAction={rightAction} /><View style={{ flex: 1 }}>{children}</View></SafeAreaView></Modal>;
