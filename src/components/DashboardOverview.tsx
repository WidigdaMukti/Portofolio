"use client"

import { useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts"
import { Minus, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

// Data analitik dummy tetap diimport untuk chart
import { analyticsData, type AnalyticsRange } from "@/lib/data-analitik"

const chartConfig = {
    visitors: { label: "Visitors", color: "#10b981" },
} satisfies ChartConfig

interface DashboardOverviewProps {
    stats: {
        blog: { total: number; growth: number; likes: number; shares: number };
        porto: { total: number; growth: number; likes: number; shares: number };
        totalLikes: number;
        totalShares: number;
    }
}

export function DashboardOverview({ stats }: DashboardOverviewProps) {
    const [range, setRange] = useState<AnalyticsRange>("3m")

    return (
        <div className="flex flex-col gap-6 w-full min-w-0">
            {/* GRID 4 KOLOM STATS */}
            <div className="grid gap-4 md:grid-cols-4">
                
                {/* Card Blog */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between px-6 pt-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Jumlah Blog</CardTitle>
                        <div className={cn(
                            "flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
                            stats.blog.growth > 0 ? "text-emerald-500 border-emerald-200 bg-emerald-50" : "text-muted-foreground"
                        )}>
                            {stats.blog.growth > 0 ? <Plus className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                            {stats.blog.growth}
                        </div>
                    </CardHeader>
                    <CardContent className="px-6 pb-2">
                        <div className="text-4xl font-bold tracking-tight leading-none mt-1">{stats.blog.total}</div>
                    </CardContent>
                </Card>

                {/* Card Portofolio */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between px-6 pt-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Jumlah Portofolio</CardTitle>
                        <div className={cn(
                            "flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
                            stats.porto.growth > 0 ? "text-emerald-500 border-emerald-200 bg-emerald-50" : "text-muted-foreground"
                        )}>
                            {stats.porto.growth > 0 ? <Plus className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                            {stats.porto.growth}
                        </div>
                    </CardHeader>
                    <CardContent className="px-6 pb-2">
                        <div className="text-4xl font-bold tracking-tight leading-none mt-1">{stats.porto.total}</div>
                    </CardContent>
                </Card>

                {/* Card Total Share (Format Chip: Blog [x] | Porto [y]) */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between px-6 pt-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Share</CardTitle>
                        <div className="rounded-full border px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground whitespace-nowrap">
                            Blog {stats.blog.shares} | Porto {stats.porto.shares}
                        </div>
                    </CardHeader>
                    <CardContent className="px-6 pb-2">
                        <div className="text-4xl font-bold tracking-tight leading-none mt-1">{stats.totalShares}</div>
                    </CardContent>
                </Card>

                {/* Card Total Like (Format Chip: Blog [x] | Porto [y]) */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between px-6 pt-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Like</CardTitle>
                        <div className="rounded-full border px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground whitespace-nowrap">
                            Blog {stats.blog.likes} | Porto {stats.porto.likes}
                        </div>
                    </CardHeader>
                    <CardContent className="px-6 pb-2">
                        <div className="text-4xl font-bold tracking-tight leading-none mt-1">{stats.totalLikes}</div>
                    </CardContent>
                </Card>
            </div>

            {/* GRAFIK ANALYTICS (REVERTED TO ORIGINAL TABS) */}
            <Card className="min-w-0">
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-2 gap-4">
                    <div className="space-y-1">
                        <CardTitle className="text-xl font-bold">Total Visitors</CardTitle>
                        <CardDescription className="text-sm">
                            Menampilkan data kunjungan untuk {range === "3m" ? "3 bulan" : range === "30d" ? "30 hari" : "7 hari"} terakhir.
                        </CardDescription>
                    </div>
                    {/* Filter Buttons (BALIK KE KODE ASLI LO) */}
                    <div className="flex overflow-hidden rounded-md border bg-muted/50 p-1 self-start sm:self-center">
                        {(["3m", "30d", "7d"] as const).map((r) => (
                            <button 
                                key={r}
                                onClick={() => setRange(r)} 
                                className={cn(
                                    "px-3 py-1 text-xs font-medium rounded-sm transition-all",
                                    range === r ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {r === "3m" ? "3 Months" : r === "30d" ? "30 Days" : "7 Days"}
                            </button>
                        ))}
                    </div>
                </CardHeader>
                <CardContent className="px-6 pb-2">
                    <ChartContainer config={chartConfig} className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={analyticsData[range]} margin={{ left: 12, right: 12, top: 10 }}>
                                <defs>
                                    <linearGradient id="fillVisitors" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--color-visitors)" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="var(--color-visitors)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted" />
                                <XAxis 
                                    dataKey="label" 
                                    tickLine={false} 
                                    axisLine={false} 
                                    tickMargin={8}
                                    tickFormatter={(value) => value.slice(0, 3)} 
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Area 
                                    type="monotone" 
                                    dataKey="Visitor" 
                                    stroke="var(--color-visitors)" 
                                    strokeWidth={2.5} 
                                    fillOpacity={1}
                                    fill="url(#fillVisitors)"
                                    dot={false} 
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}