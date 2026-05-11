import dayjs from "dayjs";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type WeekDay = {
  day: number;
  date: number;
  fullDate: string;
  hasEvent: boolean;
};

type WeekCalendarProps = {
  onDateSelect: (date: string) => void;
  eventDates: number[];
};

export const WeekCalendar = ({
  onDateSelect,
  eventDates,
}: WeekCalendarProps) => {
  const [selectedDateStr, setSelectedDateStr] = useState(
    dayjs().format("YYYY-MM-DD"),
  );
  const [weekOffset, setWeekOffset] = useState(0);

  const getWeekDays = (): WeekDay[] => {
    const days: WeekDay[] = [];
    // Tính toán ngày bắt đầu của tuần hiện tại (dựa vào weekOffset)
    let current = dayjs().add(weekOffset, "week");

    // Đưa về ngày đầu tuần (Thứ 2)
    const dayOfWeek = current.day(); // 0 (CN) -> 6 (T7)
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    current = current.add(diff, "day");

    for (let i = 0; i < 7; i++) {
      days.push({
        day: current.day(),
        date: current.date(),
        fullDate: current.format("YYYY-MM-DD"),
        hasEvent: eventDates.includes(current.date()),
      });
      current = current.add(1, "day");
    }
    return days;
  };

  const weekDays = getWeekDays();

  const getMonthLabel = () => {
    // Kiểm tra xem ngày đang được chọn có nằm trong tuần hiện tại không
    const isSelectedInCurrentWeek = weekDays.some(
      (day) => day.fullDate === selectedDateStr
    );

    if (isSelectedInCurrentWeek) {
      // Nếu có, hiển thị tháng của ngày đang chọn
      const d = dayjs(selectedDateStr);
      return `Tháng ${d.month() + 1}, ${d.year()}`;
    }

    // Nếu không (khi user bấm mũi tên qua lại), lấy tháng của ngày giữa tuần làm chuẩn
    const midWeekDay = weekDays[3];
    if (midWeekDay) {
      const d = dayjs(midWeekDay.fullDate);
      return `Tháng ${d.month() + 1}, ${d.year()}`;
    }

    let current = dayjs().add(weekOffset, "week");
    return `Tháng ${current.month() + 1}, ${current.year()}`;
  };

  const getDayName = (dayIndex: number) => {
    if (dayIndex === 0) return "CN";
    return `T${dayIndex + 1}`;
  };

  const handleDateSelect = (fullDateStr: string) => {
    setSelectedDateStr(fullDateStr);
    onDateSelect?.(fullDateStr);
  };

  return (
    <View className="bg-white rounded-b-[24px] px-[16px] py-[20px] shadow-sm">
      {/* Header: Tháng / Năm và nút chuyển tuần */}
      <View className="flex-row justify-between items-center mb-5">
        <TouchableOpacity
          onPress={() => setWeekOffset((prev) => prev - 1)}
          className="w-9 h-9 items-center justify-center rounded-full bg-gray-100"
        >
          <Text className="text-[20px] text-gray-600 font-medium leading-none mt-[-2px]">
            ‹
          </Text>
        </TouchableOpacity>

        <Text className="font-bold text-[16px] text-gray-800 capitalize">
          {getMonthLabel()}
        </Text>

        <TouchableOpacity
          onPress={() => setWeekOffset((prev) => prev + 1)}
          className="w-9 h-9 items-center justify-center rounded-full bg-gray-100"
        >
          <Text className="text-[20px] text-gray-600 font-medium leading-none mt-[-2px]">
            ›
          </Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách các ngày trong tuần */}
      <View className="flex-row justify-between items-center">
        {weekDays.map((item, index) => {
          const isSelected = item.fullDate === selectedDateStr;

          return (
            <TouchableOpacity
              activeOpacity={0.8}
              key={`${item.fullDate}-${index}`}
              onPress={() => handleDateSelect(item.fullDate)}
              className={`items-center justify-center w-[44px] h-[64px] rounded-[16px] ${
                isSelected ? "bg-[#10B981]" : "bg-transparent"
              }`}
            >
              {/* Tên thứ (T2, T3...) */}
              <Text
                className={`text-[12px] font-medium mb-1 ${
                  isSelected ? "text-white" : "text-gray-400"
                }`}
              >
                {getDayName(item.day)}
              </Text>

              {/* Ngày (12, 13...) */}
              <Text
                className={`text-[16px] font-bold ${
                  isSelected ? "text-white" : "text-gray-800"
                }`}
              >
                {item.date}
              </Text>

              {/* Dấu chấm sự kiện */}
              <View className="h-[4px] mt-1 flex-row items-center justify-center">
                {item.hasEvent && (
                  <View
                    className={`w-[4px] h-[4px] rounded-full ${
                      isSelected ? "bg-white" : "bg-[#10B981]"
                    }`}
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
