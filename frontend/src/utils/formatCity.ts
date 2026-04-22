import { airports } from "@/data/airports";

export const getCityName = (code: string) => {
  const airport = airports.find(a => a.code === code);
  return airport ? `${airport.city} (${code})` : code;
};