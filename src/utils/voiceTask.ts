type Area = { _id: string; name: string; farmId?: string | { _id: string } };
export type VoiceDraft = { title: string; scheduledDate?: Date; scheduledTime?: Date; farmId?: string; plotId?: string; priority?: string };
const normalize = (text: string) => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");

// Only explicit dates, times and matching area names are inferred.
// Unrecognized details remain editable in the form.
export const parseVoiceTask = (speech: string, baseDate: Date, farms: Area[], plots: Area[]): VoiceDraft => {
  let title = speech.trim();
  const draft: VoiceDraft = { title };
  if (/ngày mai|tomorrow/i.test(title)) {
    const date = new Date(); date.setDate(date.getDate() + 1); date.setHours(0, 0, 0, 0);
    draft.scheduledDate = date;
    title = title.replace(/ngày mai|tomorrow/ig, "");
  } else if (/hôm nay|today/i.test(title)) {
    draft.scheduledDate = new Date();
    title = title.replace(/hôm nay|today/ig, "");
  }
  const dateMatch = title.match(/(?:ngày|on)\s+(\d{1,2})[\/.-](\d{1,2})(?:[\/.-](\d{4}))?/i);
  if (dateMatch) {
    const day = Number(dateMatch[1]), month = Number(dateMatch[2]), year = Number(dateMatch[3] || new Date().getFullYear());
    const date = new Date(year, month - 1, day);
    if (date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year) {
      draft.scheduledDate = date; title = title.replace(dateMatch[0], "");
    }
  }
  const timeMatch = title.match(/(?:lúc|at)\s+(\d{1,2})(?:(?:\s*[:h]\s*|\s+giờ\s+)(\d{1,2})(?:\s*phút)?)?\s*(?:giờ)?\s*(sáng|chiều|tối|am|pm)?/i);
  if (timeMatch) {
    let hour = Number(timeMatch[1]);
    const minute = Number(timeMatch[2] || 0);
    const period = timeMatch[3]?.toLowerCase();
    if (period === "chiều" || period === "tối" || period === "pm") { if (hour < 12) hour += 12; }
    if ((period === "sáng" || period === "am") && hour === 12) hour = 0;
    if (hour <= 23 && minute <= 59 && (!period || Number(timeMatch[1]) <= 12)) {
      const time = new Date(draft.scheduledDate ?? baseDate); time.setHours(hour, minute, 0, 0);
      draft.scheduledTime = time; title = title.replace(timeMatch[0], "");
    }
  }
  const normalized = normalize(speech);
  const farm = [...farms].sort((a, b) => b.name.length - a.name.length).find(area => area.name.trim() && normalized.includes(normalize(area.name)));
  const plot = [...plots].filter(area => !farm || (typeof area.farmId === "string" ? area.farmId : area.farmId?._id) === farm._id)
    .sort((a, b) => b.name.length - a.name.length).find(area => area.name.trim() && normalized.includes(normalize(area.name)));
  if (farm) draft.farmId = farm._id;
  if (plot) { draft.plotId = plot._id; draft.farmId = typeof plot.farmId === "string" ? plot.farmId : plot.farmId?._id; }
  if (/ưu tiên cao|khẩn cấp|high priority|urgent/i.test(speech)) draft.priority = "high";
  else if (/ưu tiên thấp|low priority/i.test(speech)) draft.priority = "low";
  title = title.replace(/ưu tiên cao|khẩn cấp|high priority|urgent|ưu tiên thấp|low priority/ig, "").replace(/^[\s,.:;-]+|[\s,.:;-]+$/g, "").replace(/\s+/g, " ");
  draft.title = title || speech.trim();
  return draft;
};
