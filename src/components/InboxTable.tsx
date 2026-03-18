"use client"

import * as React from "react"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type VisibilityState,
    type SortingState
} from "@tanstack/react-table"
import {
    IconChevronLeft,
    IconChevronRight,
    IconDots,
    IconLayoutColumns,
    IconSearch,
    IconArrowUp,
    IconArrowDown,
    IconChevronDown,
    IconChevronRight as IconRight
} from "@tabler/icons-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function InboxTable({ initialData = [] }: { initialData: any[] }) {
    const [data, setData] = React.useState(initialData)
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [sorting, setSorting] = React.useState<SortingState>([{ id: 'created_at', desc: true }])
    const [globalFilter, setGlobalFilter] = React.useState("")
    const [expandedId, setExpandedId] = React.useState<string | null>(null)

    React.useEffect(() => {
        setData(initialData);
    }, [initialData]);

    const handleDeleteRow = async (id: string, name: string) => {
        const deleteTask = async () => {
            const { error } = await supabase.from('inbox').delete().eq('id', id);
            if (error) throw error;
            setData(prev => prev.filter(item => item.id !== id));
            if (expandedId === id) setExpandedId(null);
        };

        toast.promise(deleteTask(), {
            loading: `Menghapus pesan...`,
            success: `Pesan berhasil dihapus!`,
            error: (err) => `Gagal: ${err.message}`,
        });
    };

    const handleExpand = async (id: string, currentStatus: string) => {
        if (expandedId === id) {
            setExpandedId(null)
        } else {
            setExpandedId(id)
            if (currentStatus === 'new') {
                const { error } = await supabase.from('inbox').update({ status: 'read' }).eq('id', id);
                if (!error) {
                    setData(prev => prev.map(m => m.id === id ? { ...m, status: 'read' } : m));
                }
            }
        }
    }

    const columns: ColumnDef<any>[] = [
        {
            id: "expander",
            header: () => null,
            cell: ({ row }) => (
                <button
                    onClick={(e) => { e.stopPropagation(); handleExpand(row.original.id, row.original.status); }}
                    className="flex items-center justify-center w-6 h-6 hover:bg-muted rounded transition-colors"
                >
                    <IconRight size={14} className={cn("text-muted-foreground transition-transform", expandedId === row.original.id && "rotate-90")} />
                </button>
            ),
        },
        {
            accessorKey: "name",
            header: "Pengirim",
            cell: ({ row }) => (
                <div className="flex flex-col py-1">
                    <span className="font-semibold text-foreground">{row.original.name}</span>
                    <span className="text-xs text-muted-foreground font-normal">{row.original.email}</span>
                </div>
            )
        },
        {
            accessorKey: "category",
            header: "Kategori",
            cell: ({ row }) => <Badge variant="outline" className="font-medium">{row.original.category}</Badge>
        },
        {
            accessorKey: "created_at",
            header: ({ column }) => (
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Tanggal {column.getIsSorted() === "asc" ? <IconArrowUp size={14} /> : <IconArrowDown size={14} />}
                </div>
            ),
            cell: ({ row }) => <span className="text-muted-foreground text-[14px]">{format(new Date(row.original.created_at), "yyyy-MM-dd")}</span>
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => (
                <Badge
                    variant={row.original.status === "new" ? "default" : "outline"}
                    className={cn(
                        "font-medium border-none", // border-none biar warna hijaunya solid
                        row.original.status === "new"
                            ? "bg-green-500 hover:bg-green-600 text-white"
                            : "text-muted-foreground" // Warna "Dibaca" tetep kalem
                    )}
                >
                    {row.original.status === 'new' ? 'Baru' : 'Dibaca'}
                </Badge>
            )
        },
        {
            id: "actions",
            header: () => null,
            cell: ({ row }) => (
                <div className="text-right">
                    <AlertDialog>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><IconDots size={16} /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleExpand(row.original.id, row.original.status); }}>Lihat Pesan</DropdownMenuItem>
                                <AlertDialogTrigger asChild>
                                    <DropdownMenuItem className="text-destructive font-semibold" onClick={(e) => e.stopPropagation()}>Hapus</DropdownMenuItem>
                                </AlertDialogTrigger>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Hapus Pesan?</AlertDialogTitle>
                                <AlertDialogDescription>Tindakan ini tidak dapat dibatalkan.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction onClick={(e) => { e.stopPropagation(); handleDeleteRow(row.original.id, row.original.name); }} className="bg-destructive hover:bg-destructive/90 text-white">Ya, Hapus</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            )
        },
    ]

    const table = useReactTable({
        data, columns, onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(), getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility, onGlobalFilterChange: setGlobalFilter,
        state: { columnVisibility, sorting, globalFilter }
    })

    return (
        <div className="w-full space-y-4">
            <div className="flex items-center justify-between gap-2">
                <div className="relative w-full max-w-sm">
                    <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Cari pesan..." value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} className="h-9 pl-8 bg-background" />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="outline" size="sm" className="h-9 gap-2"><IconLayoutColumns className="h-4 w-4" /><span className="hidden sm:inline font-medium">Columns</span></Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table.getAllColumns().filter((col) => col.getCanHide()).map((col) => (
                            <DropdownMenuCheckboxItem key={col.id} className="capitalize" checked={col.getIsVisible()} onCheckedChange={(val) => col.toggleVisibility(!!val)}>{typeof col.columnDef.header === 'string' ? col.columnDef.header : col.id}</DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="rounded-md border bg-card shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/30">
                        {table.getHeaderGroups().map((hg) => (
                            <TableRow key={hg.id} className="hover:bg-transparent border-b">
                                {hg.headers.map((h, i) => (
                                    <TableHead key={h.id} className={cn("h-12 px-4 text-left align-middle text-sm font-semibold text-foreground", i === 0 && "pl-6", i === hg.headers.length - 1 && "pr-6 text-right")}>
                                        {flexRender(h.column.columnDef.header, h.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <React.Fragment key={row.id}>
                                    <TableRow className={cn("hover:bg-muted/30 transition-colors cursor-pointer border-b last:border-0", row.original.status === 'new' && "bg-primary/[0.01]")} onClick={() => handleExpand(row.original.id, row.original.status)}>
                                        {row.getVisibleCells().map((cell, i) => (
                                            <TableCell key={cell.id} className={cn("p-4 align-middle", i === 0 && "pl-6", i === row.getVisibleCells().length - 1 && "pr-6 text-right")}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                    {expandedId === row.original.id && (
                                        <TableRow className="bg-muted/5">
                                            <TableCell colSpan={columns.length} className="p-8 border-b">
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 animate-in fade-in slide-in-from-top-4 duration-300">
                                                    <div className="space-y-4">
                                                        <Label className="text-sm font-semibold text-primary">Contact Details</Label>
                                                        <div className="space-y-1 text-sm"><p><strong>Phone:</strong> {row.original.phone || "-"}</p><p><strong>Email:</strong> {row.original.email}</p></div>
                                                    </div>
                                                    <div className="md:col-span-2 space-y-4 text-left">
                                                        <Label className="text-sm font-semibold text-primary">Message Content</Label>
                                                        <div className="p-5 bg-background rounded-xl border italic text-sm leading-relaxed text-foreground/90 shadow-sm">"{row.original.message}"</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </React.Fragment>
                            ))
                        ) : (
                            <TableRow><TableCell colSpan={columns.length} className="h-40 text-center text-muted-foreground italic">Pesan tidak ditemukan.</TableCell></TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between px-2 pt-2 text-sm text-muted-foreground font-medium">
                <div>Total {table.getFilteredRowModel().rows.length} data pesan.</div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" className="h-8 w-8 p-0" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}><IconChevronLeft className="h-4 w-4" /></Button>
                    <Button variant="outline" className="h-8 w-8 p-0" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}><IconChevronRight className="h-4 w-4" /></Button>
                </div>
            </div>
        </div>
    )
}