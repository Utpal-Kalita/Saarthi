"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { day: "Mon", mood: 4 },
  { day: "Tue", mood: 3 },
  { day: "Wed", mood: 5 },
  { day: "Thu", mood: 4 },
  { day: "Fri", mood: 6 },
  { day: "Sat", mood: 7 },
  { day: "Sun", mood: 5 },
]

const chartConfig = {
  mood: {
    label: "Mood Level",
    color: "hsl(var(--chart-1))",
  },
}

export function MoodChart() {
  return (
      <ChartContainer config={chartConfig} className="w-full h-full">
        <BarChart 
            accessibilityLayer 
            data={chartData}
            margin={{
                top: 20,
                right: 20,
                left: -20,
                bottom: 0,
            }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <YAxis
            domain={[0, 10]}
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            ticks={[0, 5, 10]}
            tickFormatter={(value) => {
                if (value === 10) return "😊";
                if (value === 5) return "😐";
                if (value === 0) return "😔";
                return "";
            }}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent 
                labelFormatter={(value, payload) => {
                    const moodValue = payload[0]?.payload?.mood;
                    return `Mood: ${moodValue}/10`;
                }}
                indicator="dot" 
            />}
          />
          <Bar dataKey="mood" fill="var(--color-mood)" radius={8} />
        </BarChart>
      </ChartContainer>
  )
}
