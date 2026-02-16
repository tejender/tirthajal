export type SeasonType = 'peak' | 'off'

export interface TariffItem {
  roomType: string
  sharing: string
  rate: number
}

export const b2bTariff: Record<SeasonType, TariffItem[]> = {
  peak: [
    {
      roomType: 'Standard Room',
      sharing: 'Double Sharing',
      rate: 2500,
    },
    {
      roomType: 'Standard Room',
      sharing: 'Triple Sharing',
      rate: 2300,
    },
    {
      roomType: 'Duplex Structure',
      sharing: 'Quad Sharing',
      rate: 2000,
    },
    {
      roomType: 'Duplex Structure',
      sharing: '5-6 Person sharing',
      rate: 1800,
    }
  ],
  off: [
    {
      roomType: 'Standard Room',
      sharing: 'Double Sharing',
      rate: 1700,
    },
    {
      roomType: 'Standard Room',
      sharing: 'Triple Sharing',
      rate: 1500,
    },
    {
      roomType: 'Duplex Structure',
      sharing: 'Quad Sharing',
      rate: 1300,
    },
    {
      roomType: 'Duplex Structure',
      sharing: '5-6 person Sharing',
      rate: 1200,
    },
  ],
}
