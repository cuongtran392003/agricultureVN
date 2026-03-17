import { useState } from "react";
import { FlatList, View } from "react-native";
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

export const WeekCalendar = ({
  onDateSelect,
  eventDates,
}: WeekCalendarProps) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today.getDate());

  const getWeekDays = (): WeekDay[] => {
    const days: WeekDay[] = [];
    const current = new Date(today);

    const firstDayOfWeek = current.getDate() - current.getDay() + 1;

    for (let i = 0; i < 7; i++) {
      days.push({
        day: current.getDay(),
        date: current.getDate(),
        hasEvent: eventDates.includes(current.getDate()),
      });
      current.setDate(current.getDate() + 1);
    }
    return days;
  };

  const weekDays = getWeekDays();

  const handleDateSelect = (date: number) => {
    setSelectedDate(date);
    onDateSelect?.(date);
  };
  return (
    <View className="bg-white rounded-b-[24px] p-[16px]">
      <FlatList 
      data={weekDays}
      horizontal    
      scrollEnabled={false}
      keyExtractor={(item) => item.date.toString()}
      contentContainerStyle={{ justifyContent: "space-between", flex: 1 }}
      renderItem={({item})=>(
        <WeekDayItems
        day={item.day}
        date={item.date}
        isSelected={item.date===selectedDate}
        hasEvent={item.hasEvent}
        onPress={() => handleDateSelect(item.date)}
        />
      )}
      />
    </View>
  );
};
