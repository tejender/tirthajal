'use client'

import { useState } from 'react'
import { Calculator } from 'lucide-react'
import { b2bTariff, SeasonType } from '@/lib/b2bTariff'

type Mode = 'auto' | 'manual'
type RoomKey = 'std1' | 'std2' | 'std3' | 'dup1' | 'dup2'

interface AllocationItem {
  name: string
  guests: number
  rate: number
}

interface ManualRooms {
  std1: number
  std2: number
  std3: number
  dup1: number
  dup2: number
}

export default function B2BCalculator() {
  const [mode, setMode] = useState<Mode>('auto')
  const [season, setSeason] = useState<SeasonType>('peak')
  const [groupSize, setGroupSize] = useState<number>(10)
  const [nights, setNights] = useState<number>(1)

  const [manualRooms, setManualRooms] = useState<ManualRooms>({
    std1: 0,
    std2: 0,
    std3: 0,
    dup1: 0,
    dup2: 0,
  })

  // -----------------------------------
  // RATE RESOLVER (From Tariff Config)
  // -----------------------------------
  const getRate = (roomType: string, guests: number): number => {
    const seasonRates = b2bTariff[season]

    const match = seasonRates.find((item) => {
      if (item.roomType !== roomType) return false

      if (roomType === 'Standard Room') {
        if (guests === 2 && item.sharing.includes('Double')) return true
        if (guests === 3 && item.sharing.toLowerCase().includes('triple'))
          return true
      }

      if (roomType === 'Duplex Structure') {
        if (guests === 4 && item.sharing.includes('Quad')) return true
        if (guests >= 5 && item.sharing.includes('5-6')) return true
      }

      return false
    })

    return match ? match.rate : 0
  }

  // -----------------------------------
  // AUTO MODE
  // -----------------------------------
const calculateAuto = (): { allocation: AllocationItem[]; total: number } => {
  let remaining = groupSize
  const allocation: AllocationItem[] = []
  let total = 0

  // ---------- DUPLEX (Max 2, Max 6 each) ----------
  for (let i = 1; i <= 2; i++) {
    if (remaining >= 4) {
      let guests = 0

      // Prefer balanced distribution
      if (remaining >= 6) {
        // If 6 creates 2 remaining, prefer 5
        if (remaining - 6 === 2) {
          guests = 5
        } else {
          guests = 6
        }
      } else if (remaining === 5) {
        guests = 5
      } else {
        guests = 4
      }

      const rate = getRate('Duplex Structure', guests)

      allocation.push({
        name: `Duplex ${i}`,
        guests,
        rate,
      })

      remaining -= guests
    }
  }

  // ---------- STANDARD (Max 3, Max 3 each) ----------
  for (let i = 1; i <= 3; i++) {
    if (remaining >= 2) {
      const guests = remaining >= 3 ? 3 : 2
      const rate = getRate('Standard Room', guests)

      allocation.push({
        name: `Standard Room ${i}`,
        guests,
        rate,
      })

      remaining -= guests
    }
  }

  // ---------- HANDLE SINGLE LEFTOVER ----------
  if (remaining === 1 && allocation.length > 0) {
    const lastRoom = allocation[allocation.length - 1]

    // Try to rebalance from previous room
    if (lastRoom.guests > 2) {
      lastRoom.guests -= 1

      const isDuplex = lastRoom.name.includes('Duplex')
      const roomType = isDuplex
        ? 'Duplex Structure'
        : 'Standard Room'

      lastRoom.rate = getRate(roomType, lastRoom.guests)

      const rate = getRate('Standard Room', 2)

      allocation.push({
        name: `Standard Room ${allocation.length + 1}`,
        guests: 2,
        rate,
      })

      remaining = 0
    }
  }

  // ---------- FINAL TOTAL ----------
  total = allocation.reduce(
    (sum, room) => sum + room.guests * room.rate,
    0
  )

  return { allocation, total }
}





  // -----------------------------------
  // MANUAL MODE
  // -----------------------------------
  const calculateManual = (): {
    allocation: AllocationItem[]
    total: number
    totalGuests: number
  } => {
    const allocation: AllocationItem[] = []
    let total = 0
    let totalGuests = 0

    const roomKeys: RoomKey[] = ['std1', 'std2', 'std3', 'dup1', 'dup2']

    roomKeys.forEach((key) => {
      const guests = manualRooms[key]
      if (guests > 0) {
        const isDuplex = key.startsWith('dup')
        const roomType = isDuplex
          ? 'Duplex Structure'
          : 'Standard Room'

        const rate = getRate(roomType, guests)

        const name =
          key === 'std1'
            ? 'Standard Room 1'
            : key === 'std2'
            ? 'Standard Room 2'
            : key === 'std3'
            ? 'Standard Room 3'
            : key === 'dup1'
            ? 'Duplex 1'
            : 'Duplex 2'

        allocation.push({ name, guests, rate })

        total += guests * rate
        totalGuests += guests
      }
    })

    return { allocation, total, totalGuests }
  }

  const auto = calculateAuto()
  const manual = calculateManual()

  const result = mode === 'auto' ? auto : manual
  const totalGuestsUsed =
    mode === 'auto' ? groupSize : manual.totalGuests

  const totalRevenue = result.total * nights

  // -----------------------------------
  // UI
  // -----------------------------------
  return (
    <div className="text-stone-900">

      <h3 className="font-serif text-3xl mb-8 flex items-center gap-3">
        <Calculator className="w-7 h-7" />
        Advanced Revenue Calculator
      </h3>

      {/* Mode Toggle */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setMode('auto')}
          className={`px-5 py-2.5 rounded-lg font-medium transition-colors ${
            mode === 'auto'
              ? 'bg-stone-900 text-white'
              : 'bg-stone-200 hover:bg-stone-300'
          }`}
        >
          Auto Allocation
        </button>

        <button
          onClick={() => setMode('manual')}
          className={`px-5 py-2.5 rounded-lg font-medium transition-colors ${
            mode === 'manual'
              ? 'bg-stone-900 text-white'
              : 'bg-stone-200 hover:bg-stone-300'
          }`}
        >
          Manual Allocation
        </button>
      </div>

      {/* Configuration */}
      <div className="bg-stone-100 border border-stone-400 rounded-2xl p-6 mb-10">
        <h4 className="font-semibold mb-6 text-lg">
          Booking Configuration
        </h4>

        <div className="grid md:grid-cols-3 gap-6">

          <div>
            <label className="block text-sm font-medium mb-2">
              Season
            </label>
            <select
              value={season}
              onChange={(e) => setSeason(e.target.value as SeasonType)}
              className="border border-stone-400 bg-white p-3 rounded-lg w-full"
            >
              <option value="peak">Peak Season</option>
              <option value="off">Off Season</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Number of Nights
            </label>
            <input
              type="number"
              value={nights}
              min={1}
              onChange={(e) => setNights(Number(e.target.value))}
              className="border border-stone-400 bg-white p-3 rounded-lg w-full"
            />
          </div>

          {mode === 'auto' && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Group Size
              </label>
              <input
                type="number"
                value={groupSize}
                min={1}
                max={21}
                onChange={(e) => setGroupSize(Number(e.target.value))}
                className="border border-stone-400 bg-white p-3 rounded-lg w-full"
              />
            </div>
          )}

        </div>
      </div>

      {/* Manual Room Inputs */}
      {mode === 'manual' && (
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {(['std1','std2','std3','dup1','dup2'] as RoomKey[]).map((room) => (
            <div key={room}>
              <label className="block text-sm mb-2 font-medium">
                {room.startsWith('std')
                  ? `Standard Room ${room.slice(-1)}`
                  : `Duplex ${room.slice(-1)}`}
              </label>
              <input
                type="number"
                min={0}
                max={room.startsWith('dup') ? 6 : 3}
                value={manualRooms[room]}
                onChange={(e) =>
                  setManualRooms({
                    ...manualRooms,
                    [room]: Number(e.target.value),
                  })
                }
                className="border border-stone-400 bg-white p-3 rounded-lg w-full"
              />
            </div>
          ))}
        </div>
      )}

      {/* Allocation Summary */}
      <div className="bg-white border-2 border-stone-400 rounded-2xl p-6 shadow-md">
        <h4 className="font-semibold text-lg mb-5">
          Room Allocation Summary
        </h4>

        {result.allocation.map((room, index) => (
          <div
            key={index}
            className="flex justify-between py-3 border-b border-stone-300"
          >
            <span>
              {room.name} – {room.guests} Guest(s)
            </span>
            <span className="font-medium">
              ₹ {(room.guests * room.rate).toLocaleString()}
            </span>
          </div>
        ))}

        <div className="flex justify-between mt-6 pt-5 border-t-2 border-stone-900 font-bold text-xl">
          <span>Total Guests: {totalGuestsUsed}</span>
          <span>
            ₹ {totalRevenue.toLocaleString()}
            <span className="text-sm font-medium ml-2 text-stone-700">
              ({nights} Night{nights > 1 ? 's' : ''})
            </span>
          </span>
        </div>
      </div>

      {/* Financial Breakdown */}
      {totalGuestsUsed > 0 && result.allocation.length > 0 && (
        <div className="mt-8 bg-stone-100 border border-stone-400 rounded-2xl p-6">
          <h4 className="font-semibold text-lg mb-6">
            Detailed Financial Breakdown
          </h4>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Total Revenue (Per Night)</span>
                <span>₹ {result.total.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span>Total Revenue ({nights} Night{nights > 1 ? 's' : ''})</span>
                <span>₹ {totalRevenue.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span>Total Guests</span>
                <span>{totalGuestsUsed}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Average MAP / Person</span>
                <span>
                  ₹ {(result.total / totalGuestsUsed).toFixed(0)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Rooms Used</span>
                <span>{result.allocation.length}</span>
              </div>

              <div className="flex justify-between">
                <span>Average Revenue / Room</span>
                <span>
                  ₹ {(result.total / result.allocation.length).toFixed(0)}
                </span>
              </div>
            </div>

          </div>

          <div className="mt-6 pt-5 border-t border-stone-400 text-center text-sm text-stone-700">
            MAP = Room + Breakfast + Dinner (Per Person Pricing Model)
          </div>
        </div>
      )}
{/* Room-wise MAP Breakdown */}
<div className="mt-8 bg-white border border-stone-400 rounded-2xl p-6">
  <h4 className="font-semibold text-lg mb-6">
    Room-wise MAP Breakdown
  </h4>

  <div className="space-y-5">
    {result.allocation.map((room, index) => {
      const roomTotal = room.guests * room.rate

      return (
        <div
          key={index}
          className="border-b border-stone-300 pb-4"
        >
          <div className="flex justify-between font-medium text-stone-900">
            <span>{room.name}</span>
            <span>₹ {roomTotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-sm text-stone-700 mt-2">
            <span>Guests</span>
            <span>{room.guests}</span>
          </div>

          <div className="flex justify-between text-sm text-stone-700">
            <span>MAP / Person</span>
            <span>₹ {room.rate.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-sm text-stone-700">
            <span>Total Room Revenue (Per Night)</span>
            <span>₹ {roomTotal.toLocaleString()}</span>
          </div>
        </div>
      )
    })}
  </div>
</div>

    </div>
  )
}
