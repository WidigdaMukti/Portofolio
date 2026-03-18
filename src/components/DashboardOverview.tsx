"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts"
import { Minus, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const chartConfig = {
    visitor: { label: "Visitors", color: "#10b981" },
} satisfies ChartConfig

interface DashboardOverviewProps {
    stats: {
        blog: { total: number; growth: number; likes: number; shares: number };
        porto: { total: number; growth: number; likes: number; shares: number };
        totalLikes: number;
        totalShares: number;
    };
    chartData: { label: string; visitor: number }[]; // visitor huruf kecil sesuai RPC
    currentRange: string;
}

export function DashboardOverview({ stats, chartData, currentRange }: DashboardOverviewProps) {

    // Logic ganti range via URL (Standard Astro SSR)
    const handleRangeChange = (range: string) => {
        const url = new URL(window.location.href);
        url.searchParams.set('range', range);
        window.location.href = url.toString();
    };

    return (
        <div className="flex flex-col gap-6 w-full min-w-0">
            {/* GRID STATS (Padding & Font disamakan dengan ContentForm) */}
            <div className="grid gap-4 md:grid-cols-4">
                {[
                    { title: "Jumlah Blog", value: stats.blog.total, growth: stats.blog.growth },
                    { title: "Jumlah Portofolio", value: stats.porto.total, growth: stats.porto.growth },
                    { title: "Total Share", value: stats.totalShares, sub: `Blog ${stats.blog.shares} | Porto ${stats.porto.shares}` },
                    { title: "Total Like", value: stats.totalLikes, sub: `Blog ${stats.blog.likes} | Porto ${stats.porto.likes}` },
                ].map((item, i) => (
                    <Card key={i} className="shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between px-6 py-4 pb-2">
                            <CardTitle className="text-sm font-semibold text-muted-foreground">{item.title}</CardTitle>
                            {item.growth !== undefined ? (
                                <div className={cn(
                                    "flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-medium",
                                    item.growth > 0 ? "text-emerald-500 border-emerald-200 bg-emerald-50" : "text-muted-foreground"
                                )}>
                                    {item.growth > 0 ? <Plus className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                                    {item.growth}
                                </div>
                            ) : (
                                <div className="rounded-full border px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                                    {item.sub}
                                </div>
                            )}
                        </CardHeader>
                        <CardContent className="px-6 pb-6">
                            <div className="text-4xl font-bold tracking-tight">{item.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* GRAFIK ANALYTICS */}
            <Card className="shadow-sm overflow-hidden">
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-6 gap-4">
                    <div className="space-y-1">
                        <CardTitle className="text-xl font-bold">Total Visitors</CardTitle>
                        <CardDescription className="text-sm">
                            Kunjungan {currentRange === "3m" ? "3 bulan" : currentRange === "30d" ? "30 hari" : "7 hari"} terakhir.
                        </CardDescription>
                    </div>

                    {/* Range Tabs */}
                    <div className="flex overflow-hidden rounded-md border bg-muted/50 p-1">
                        {(["3m", "30d", "7d"] as const).map((r) => (
                            <button
                                key={r}
                                onClick={() => handleRangeChange(r)}
                                className={cn(
                                    "px-3 py-1 text-xs font-semibold rounded-sm transition-all",
                                    currentRange === r ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {r === "3m" ? "3 Months" : r === "30d" ? "30 Days" : "7 Days"}
                            </button>
                        ))}
                    </div>
                </CardHeader>

                <CardContent className="px-6 pb-6">
                    <ChartContainer config={chartConfig} className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ left: 0, right: 0, top: 10 }}>
                                <defs>
                                    <linearGradient id="fillVisitors" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--color-visitor)" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="var(--color-visitor)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted" />
                                <XAxis
                                    dataKey="label"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={12}
                                    className="text-[11px] font-medium text-muted-foreground"
                                    interval={currentRange === "3m" ? 6 : currentRange === "30d" ? 2 : 0}
                                    minTickGap={24}
                                    tickFormatter={(value) => {
                                        return value;
                                    }}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Area
                                    type="monotone"
                                    dataKey="visitor"
                                    stroke="var(--color-visitor)"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#fillVisitors)"
                                    dot={{ r: 4, fill: "var(--color-visitor)", strokeWidth: 0 }}
                                    activeDot={{ r: 6, strokeWidth: 0 }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}