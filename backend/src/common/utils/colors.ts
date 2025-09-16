// A curated set of distinct, pleasant colors used for participant defaults.
export const NICE_COLORS: string[] = [
  '#FF6B6B', '#F06595', '#CC5DE8', '#845EF7', '#5C7CFA', '#339AF0',
  '#22B8CF', '#20C997', '#51CF66', '#94D82D', '#FCC419', '#FFA94D',
  '#FF8787', '#FF9F9F', '#E599F7', '#B197FC', '#91A7FF', '#74C0FC',
  '#66D9E8', '#63E6BE', '#8CE99A', '#B2F2BB', '#D8F5A2', '#FFE066',
  '#FFC078', '#FFA8A8', '#FFADAD', '#F4A4F9', '#D0BFFF', '#A5D8FF',
  '#99E9F2', '#96F2D7', '#C3FAE8', '#E9FAC8', '#FFF3BF', '#FFE8CC',
  '#E03131', '#C2255C', '#9C36B5', '#7048E8', '#4263EB', '#1971C2',
  '#0C8599', '#087F5B', '#2B8A3E', '#5C940D', '#E67700', '#D9480F',
  '#D6336C', '#AE3EC9', '#7048E8', '#4C6EF5', '#1C7ED6', '#1098AD',
  '#0CA678', '#37B24D', '#74B816', '#F08C00', '#E8590C', '#D9480F'
];

export function getRandomNiceColor(rand: () => number = Math.random): string {
  const idx = Math.floor(rand() * NICE_COLORS.length);
  return NICE_COLORS[idx];
}
