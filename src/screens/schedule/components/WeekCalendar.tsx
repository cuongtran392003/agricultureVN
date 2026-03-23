import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { WeekDayItems } from "../common/WeekDayItems";

type WeekDay = {
  day: number;
  date: number;
  hasEvent: boolean;
};

type WeekCalendarProps = {
  onDateSelect: (date: number) => void;
  eventDates: number[];
};

export const WeekCalendar = ({ onDateSelect, eventDates }: WeekCalendarProps) => {
  const [today, setToday] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [weekOffset, setWeekOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setToday(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const getWeekDays = (): WeekDay[] => {
    const days: WeekDay[] = [];
    const current = new Date(today);

    const dayOfWeek = current.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    current.setDate(current.getDate() + diff + weekOffset * 7);

    for (let i = 0; i < 21; i++) {
      const dow = current.getDay();
      const dayIndex = dow === 0 ? 6 : dow - 1;
      days.push({
        day: dayIndex,
        date: current.getDate(),
        hasEvent: eventDates.includes(current.getDate()),
      });
      current.setDate(current.getDate() + 1);
    }
    return days;
  };

  const weekDays = getWeekDays();

  // Fix: dùng () thay vì {}
  const weeks = Array.from({ length: 3 }, (_, i) =>
    weekDays.slice(i * 7, (i + 1) * 7)
  );

  const getMonthLabel = () => {
    const current = new Date(today);
    const dayOfWeek = current.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    current.setDate(current.getDate() + diff + weekOffset * 7);
    return `Tháng ${current.getMonth() + 1}, ${current.getFullYear()}`;
  };

  const handleDateSelect = (date: number) => {
    setSelectedDate(date);
    onDateSelect?.(date);
  };

  return (
    <View className="bg-white rounded-b-[24px] p-[16px]">
      <View className="flex-row justify-between items-center mb-3">
        <TouchableOpacity onPress={() => setWeekOffset((prev) => prev - 1)}>
          <Text className="text-[20px]">‹</Text>
        </TouchableOpacity>
        <Text className="font-semibold text-[14px]">{getMonthLabel()}</Text>
        <TouchableOpacity onPress={() => setWeekOffset((prev) => prev + 1)}>
          <Text className="text-[20px]">›</Text>
        </TouchableOpacity>
      </View>

      {/* Bỏ FlatList, dùng .map() */}
      {weeks.map((week, weekIndex) => (
        <View key={weekIndex} className="flex-row justify-between mb-2">
          {week.map((item, index) => (
            <WeekDayItems
              key={`${item.date}-${index}`}
              day={item.day}
              date={item.date}
              isSelected={item.date === selectedDate}
              hasEvent={item.hasEvent}
              onPress={() => handleDateSelect(item.date)}
            />
          ))}
        </View>
      ))}
    </View>
  );
};