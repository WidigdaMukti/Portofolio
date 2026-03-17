"use client"

import * as React from "react"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef, type VisibilityState, type SortingState } from "@tanstack/react-table"
import { IconChevronLeft, IconChevronRight, IconDots, IconLayoutColumns, IconPlus, IconSearch, IconArrowsSort, IconArrowUp, IconArrowDown } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { type ContentData, type ContentType } from "@/lib/types"

// Import AlertDialog Shadcn
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

interface ContentTableProps {
    type: ContentType;
    initialData: ContentData[];
}

export function ContentTable({ type, initialData = [] }: ContentTableProps) {
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [globalFilter, setGlobalFilter] = React.useState("")
    const isBlog = type === 'blog';
    const tableName = isBlog ? "blogs" : "portofolios";
    const path = isBlog ? "blog" : "portofolio";

    const handleDeleteRow = async (id: string, title: string) => {
        const deleteAction = async () => {
            const { error } = await supabase.from(tableName).delete().eq('id', id);
            if (error) throw error;
            return new Promise((res) => setTimeout(() => { window.location.reload(); res(true); }, 1500));
        };
        toast.promise(deleteAction(), {
            loading: `Menghapus ${type}...`,
            success: `"${title}" berhasil dihapus!`,
            error: (err) => `Gagal: ${err.message}`
        });
    };

    const columns: ColumnDef<ContentData>[] = [
        { accessorKey: "thumbnail", header: "Thumbnail", cell: ({ row }) => (<div className="relative h-10 w-16 overflow-hidden rounded-md border bg-muted"><img src={row.original.thumbnail || "https://placehold.co/600x400?text=No+Image"} alt="" className="h-full w-full object-cover" /></div>)},
        { accessorKey: "title", header: "Judul", cell: ({ row }) => (<div className="max-w-[200px] lg:max-w-[300px] truncate font-semibold text-foreground" title={row.original.title}>{row.original.title}</div>)},
        { accessorKey: "status", header: "Status", cell: ({ row }) => (<Badge variant={row.original.status === "Published" ? "default" : "outline"}>{row.original.status}</Badge>)},
        { accessorKey: "views", header: "Views", cell: ({ row }) => <span className="text-muted-foreground font-medium">{row.original.views || 0}</span>},
        { accessorKey: "likes", header: "Likes", cell: ({ row }) => <span className="text-muted-foreground font-medium">{row.original.likes || 0}</span>},
        { accessorKey: "shares", header: "Shares", cell: ({ row }) => <span className="text-muted-foreground font-medium">{row.original.shares || 0}</span>},
        { accessorKey: "date", header: ({ column }) => (<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="-ml-4 h-8 gap-2 font-bold text-foreground">{column.getIsSorted() === "asc" ? <IconArrowUp className="h-4 w-4 text-primary" /> : <IconArrowDown className="h-4 w-4 text-primary" />} Tanggal</Button>), cell: ({ row }) => <span className="text-muted-foreground whitespace-nowrap">{row.original.date}</span>},
        { id: "actions", cell: ({ row }) => (
            <AlertDialog>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><IconDots className="h-4 w-4" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => window.location.href = `/admin/${path}/${row.original.slug}`}>Edit</DropdownMenuItem>
                        <AlertDialogTrigger asChild><DropdownMenuItem className="text-destructive">Hapus</DropdownMenuItem></AlertDialogTrigger>
                    </DropdownMenuContent>
                </DropdownMenu>
                <AlertDialogContent>
                    <AlertDialogHeader><AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle><AlertDialogDescription>Kamu yakin ingin menghapus <strong>{row.original.title}</strong>? Data ini akan hilang selamanya.</AlertDialogDescription></AlertDialogHeader>
                    <AlertDialogFooter><AlertDialogCancel>Batal</AlertDialogCancel><AlertDialogAction onClick={() => handleDeleteRow(row.original.id, row.original.title)} className="bg-destructive hover:bg-destructive/90 text-white">Ya, Hapus</AlertDialogAction></AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        )},
    ]

    const table = useReactTable({ data: initialData, columns, onSortingChange: setSorting, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel(), getSortedRowModel: getSortedRowModel(), getFilteredRowModel: getFilteredRowModel(), onColumnVisibilityChange: setColumnVisibility, onGlobalFilterChange: setGlobalFilter, state: { columnVisibility, sorting, globalFilter }})

    return (
        <div className="w-full space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6"><div><h1 className="text-3xl font-bold tracking-tight text-foreground">Manage {isBlog ? "Blog" : "Portofolio"}</h1><p className="text-muted-foreground text-sm">Lihat dan kelola semua {type} kamu di sini</p></div></div>
            <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 h-9">
                    <div className="relative hidden lg:block h-full"><IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /><Input placeholder={`Cari ${type}...`} value={globalFilter ?? ""} onChange={(e) => setGlobalFilter(e.target.value)} className="h-9 w-[200px] pl-8 lg:w-[300px] bg-background" /></div>
                    <div className="flex items-center gap-2 h-full">
                        <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline" size="sm" className="h-9 gap-2"><IconLayoutColumns className="h-4 w-4" /><span className="hidden sm:inline">Columns</span></Button></DropdownMenuTrigger>
                            <DropdownMenuContent align="end">{table.getAllColumns().filter((col) => col.getCanHide()).map((col) => (<DropdownMenuCheckboxItem key={col.id} className="capitalize" checked={col.getIsVisible()} onCheckedChange={(val) => col.toggleVisibility(!!val)}>{col.id}</DropdownMenuCheckboxItem>))}</DropdownMenuContent>
                        </DropdownMenu>
                        <Button size="sm" className="h-9 gap-2 px-4 shadow-sm" onClick={() => window.location.href = `/admin/${path}/add`}><IconPlus className="h-4 w-4" /><span className="hidden sm:inline font-medium text-xs">Tambah Baru</span></Button>
                    </div>
                </div>
                <div className="rounded-xl border bg-card shadow-sm overflow-hidden"><div className="overflow-x-auto"><Table><TableHeader className="bg-muted/30">{table.getHeaderGroups().map((hg) => (<TableRow key={hg.id}>{hg.headers.map((h, i) => (<TableHead key={h.id} className={`py-3 font-bold text-foreground ${i === 0 ? "pl-6" : ""} ${i === hg.headers.length - 1 ? "pr-6" : ""}`}>{flexRender(h.column.columnDef.header, h.getContext())}</TableHead>))}</TableRow>))}</TableHeader>
                    <TableBody>{table.getRowModel().rows?.length ? table.getRowModel().rows.map((row) => (<TableRow key={row.id} className="hover:bg-muted/30 transition-colors">{row.getVisibleCells().map((cell, i) => (<TableCell key={cell.id} className={`py-4 ${i === 0 ? "pl-6" : ""} ${i === row.getVisibleCells().length - 1 ? "pr-6" : ""}`}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>))}</TableRow>)) : <TableRow><TableCell colSpan={columns.length} className="h-32 text-center text-muted-foreground italic">Belum ada data.</TableCell></TableRow>}</TableBody></Table></div></div>
                <div className="flex items-center justify-between px-2 pt-2"><div className="flex-1 text-sm text-muted-foreground font-medium hidden md:block">Total {table.getFilteredRowModel().rows.length} data.</div>
                    <div className="flex items-center space-x-6 lg:space-x-8"><div className="flex items-center space-x-2"><Label className="text-sm font-medium">Rows</Label><Select value={`${table.getState().pagination.pageSize}`} onValueChange={(val) => table.setPageSize(Number(val))}><SelectTrigger className="h-8 w-[70px]"><SelectValue placeholder={table.getState().pagination.pageSize} /></SelectTrigger><SelectContent side="top">{[10, 20, 30].map((s) => (<SelectItem key={s} value={`${s}`}>{s}</SelectItem>))}</SelectContent></Select></div>
                        <div className="flex items-center space-x-2"><Button variant="outline" className="h-8 w-8 p-0" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}><IconChevronLeft className="h-4 w-4" /></Button><Button variant="outline" className="h-8 w-8 p-0" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}><IconChevronRight className="h-4 w-4" /></Button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}