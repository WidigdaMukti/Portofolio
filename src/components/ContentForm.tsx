"use client"

import * as React from "react"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { 
    IconChevronLeft, IconPhoto, IconDeviceFloppy, 
    IconRocket, IconPlus, IconTrash, IconCalendar, IconLoader2 
} from "@tabler/icons-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { type ContentData, type ContentType } from "@/lib/types"

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

interface ContentFormProps {
    type: ContentType;
    mode: 'add' | 'edit';
    initialData?: ContentData;
}

export function ContentForm({ type, mode, initialData }: ContentFormProps) {
    const isBlog = type === 'blog';
    const isEdit = mode === 'edit';
    const label = isBlog ? "Blog" : "Portofolio";
    const path = isBlog ? "blog" : "portofolio";
    const tableName = isBlog ? "blogs" : "portofolios";

    // --- STATES ---
    const [title, setTitle] = React.useState(initialData?.title || "")
    const [slug, setSlug] = React.useState(initialData?.slug || "")
    const [subtitle, setSubtitle] = React.useState(initialData?.subtitle || "")
    const [content, setContent] = React.useState(initialData?.content || "")
    const [category, setCategory] = React.useState(initialData?.category || "")
    const [status, setStatus] = React.useState<"Published" | "Draft">(initialData?.status as any || "Draft")
    const [date, setDate] = React.useState<Date>(initialData?.date ? new Date(initialData.date) : new Date())
    const [thumbnail, setThumbnail] = React.useState(initialData?.thumbnail || "")
    const [isLoading, setIsLoading] = React.useState(false)
    const [pendingFile, setPendingFile] = React.useState<File | null>(null)
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    // --- NEW STATES FOR CATEGORIES ---
    const [categories, setCategories] = React.useState<{id: string, name: string}[]>([])
    const [newCatName, setNewCatName] = React.useState("")

    // --- FETCH CATEGORIES FROM SUPABASE ---
    const fetchCategories = React.useCallback(async () => {
        const { data, error } = await supabase
            .from('categories')
            .select('id, name')
            .eq('type', type)
            .order('name', { ascending: true });
        
        if (error) {
            console.error("Error fetching categories:", error.message);
        } else {
            setCategories(data || []);
        }
    }, [type]);

    React.useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    // --- ADD NEW CATEGORY LOGIC ---
    const handleAddCategory = async () => {
        if (!newCatName.trim()) return toast.error("Nama kategori tidak boleh kosong");

        const addTask = async () => {
            const { data, error } = await supabase
                .from('categories')
                .insert([{ name: newCatName.trim(), type: type }])
                .select();

            if (error) throw error;
            
            await fetchCategories();
            setCategory(newCatName.trim()); // Langsung pilih kategori yang baru dibuat
            setNewCatName("");
        };

        toast.promise(addTask(), {
            loading: 'Menambah kategori...',
            success: `Kategori "${newCatName}" berhasil ditambahkan!`,
            error: (err) => `Gagal: ${err.message}`,
        });
    };

    const handleTitleChange = (val: string) => {
        setTitle(val);
        if (!isEdit) {
            setSlug(val.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''));
        }
    };

    const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPendingFile(file);
            setThumbnail(URL.createObjectURL(file));
        }
    };

    const handleDeleteFromForm = async () => {
        setIsLoading(true);
        const deleteTask = async () => {
            const { error } = await supabase.from(tableName).delete().eq('id', initialData?.id);
            if (error) throw error;
            return new Promise((res) => setTimeout(() => { window.location.href = `/admin/${path}`; res(true); }, 2000));
        };
        toast.promise(deleteTask(), {
            loading: `Menghapus ${label}...`,
            success: `${label} berhasil dihapus!`,
            error: (err) => `Gagal: ${err.message}`,
        });
        setIsLoading(false);
    };

    const handleStatusToggle = async () => {
        const newStatus = status === "Published" ? "Draft" : "Published";
        if (isEdit && initialData?.id) {
            setIsLoading(true);
            const task = async () => {
                const { error } = await supabase.from(tableName).update({ status: newStatus }).eq('id', initialData.id);
                if (error) throw error;
                return new Promise((res) => setTimeout(() => { window.location.href = `/admin/${path}`; res(true); }, 1500));
            };
            toast.promise(task(), {
                loading: `Mengubah status...`,
                success: `Status jadi ${newStatus}! Redirecting...`,
                error: (err) => `Gagal: ${err.message}`,
            });
            setIsLoading(false);
        } else {
            setStatus(newStatus);
            toast.info(`Status diatur ke ${newStatus}`);
        }
    };

    const handleSave = async () => {
        if (!title || !slug) return toast.error("Judul & Slug wajib diisi!");
        setIsLoading(true);
        const saveTask = async () => {
            let finalUrl = thumbnail;
            if (pendingFile) {
                const fileName = `${type}-${Date.now()}.${pendingFile.name.split('.').pop()}`;
                const { error: upError } = await supabase.storage.from('thumbnails').upload(fileName, pendingFile);
                if (upError) throw upError;
                const { data: { publicUrl } } = supabase.storage.from('thumbnails').getPublicUrl(fileName);
                finalUrl = publicUrl;
            }
            const payload = { ...(isEdit && { id: initialData?.id }), title, slug, subtitle, content, category, status, thumbnail: finalUrl, date: format(date, "yyyy-MM-dd") };
            const { error } = await supabase.from(tableName).upsert(payload);
            if (error) throw error;
            return new Promise((res) => setTimeout(() => { window.location.href = `/admin/${path}`; res(true); }, 1500));
        };
        toast.promise(saveTask(), { loading: `Menyimpan ${label}...`, success: `Berhasil disimpan!`, error: (err) => `Gagal: ${err.message}` });
        setIsLoading(false);
    };

    return (
        <div className="space-y-8 w-full">
            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">{isEdit ? `Edit ${label}` : `Buat ${label} Baru`}</h1>
                    <p className="text-muted-foreground text-sm">Kelola konten {type} kamu dengan mudah</p>
                </div>
                {isEdit && initialData && (
                    <div className="flex items-center">
                        <div className="flex flex-col pr-8"><span className="text-sm text-muted-foreground mb-1">Likes</span><span className="text-2xl font-bold tracking-tight text-foreground">{initialData.likes}</span></div>
                        <div className="h-10 w-px bg-border/60" /><div className="flex flex-col px-8"><span className="text-sm text-muted-foreground mb-1">Shares</span><span className="text-2xl font-bold tracking-tight text-foreground">{initialData.shares}</span></div>
                        <div className="h-10 w-px bg-border/60" /><div className="flex flex-col pl-8"><span className="text-sm text-muted-foreground mb-1">Views</span><span className="text-2xl font-bold tracking-tight text-foreground">{initialData.views}</span></div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="py-0 border-none shadow-sm">
                        <CardContent className="p-5 lg:p-6 space-y-5">
                            <div className="space-y-2"><Label className="text-sm font-semibold">Title</Label><Input value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder={`Judul ${type}...`} className="h-9 bg-background" /></div>
                            <div className="space-y-2"><Label className="text-sm font-semibold">Slug</Label><div className="flex items-center gap-2"><span className="text-xs text-muted-foreground bg-muted px-3 h-9 flex items-center rounded-md border border-input">domain.com/{path}/</span><Input value={slug} onChange={(e) => setSlug(e.target.value)} className="h-9 bg-background" /></div></div>
                            <div className="space-y-2"><Label className="text-sm font-semibold">Subtitle</Label><Input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="Subtitle singkat..." className="h-9 bg-background" /></div>
                            <div className="space-y-2"><Label className="text-sm font-semibold">Content Area</Label><Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Tulis konten..." className="min-h-[400px] bg-background resize-none p-4" /></div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="overflow-hidden py-0 border-none shadow-sm">
                        <CardContent className="p-6 space-y-3">
                            <Label className="text-sm font-semibold">Thumbnail</Label>
                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileSelection} />
                            <div onClick={() => fileInputRef.current?.click()} className="group relative border-2 border-dashed rounded-xl p-8 bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer min-h-[180px] overflow-hidden">
                                {thumbnail && <img src={thumbnail} className="absolute inset-0 w-full h-full object-cover" />}
                                <div className={cn("absolute inset-0 bg-black/60 flex flex-col items-center justify-center transition-all", thumbnail ? "opacity-0 group-hover:opacity-100" : "opacity-100")}><IconPhoto className="h-10 w-10 text-white mb-2" /><p className="text-xs text-white">Klik untuk ganti</p></div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* --- INTEGRASI CATEGORY DINAMIS (STRUKTUR ASLI) --- */}
                    <Card className="py-0 border-none shadow-sm">
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-2">
                                <Label className="text-sm font-semibold">Select Category</Label>
                                <div className="flex items-center gap-2">
                                    <Select value={category} onValueChange={setCategory}>
                                        <SelectTrigger className="flex-1 h-9 bg-background"><SelectValue placeholder="Pilih Kategori" /></SelectTrigger>
                                        <SelectContent>
                                            {categories.map((cat) => (
                                                <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    {/* MODAL TAMBAH KATEGORI (MENGGUNAKAN ALERTDIALOG KESUKAAN LO) */}
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="outline" size="icon" className="h-9 w-9 shrink-0 border-input hover:bg-muted"><IconPlus className="h-4 w-4" /></Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Tambah Kategori Baru</AlertDialogTitle>
                                                <AlertDialogDescription>Masukkan nama kategori baru untuk {label} kamu.</AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <div className="py-4">
                                                <Input 
                                                    value={newCatName} 
                                                    onChange={(e) => setNewCatName(e.target.value)} 
                                                    placeholder="Contoh: Branding, Web App, dsb." 
                                                />
                                            </div>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel onClick={() => setNewCatName("")}>Batal</AlertDialogCancel>
                                                <AlertDialogAction onClick={handleAddCategory}>Tambah</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>

                            <div className="space-y-3 flex flex-col">
                                <Label className="text-sm font-semibold">Select Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild><Button variant="outline" className="w-full justify-start text-left bg-background h-9"><IconCalendar className="mr-2 h-4 w-4" />{date ? format(date, "PPP") : <span>Pick a date</span>}</Button></PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={date} onSelect={(d) => d && setDate(d)} initialFocus /></PopoverContent>
                                </Popover>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* --- ACTION BUTTONS --- */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t">
                <Button variant="ghost" onClick={() => window.history.back()} className="h-9"><IconChevronLeft className="h-4 w-4 mr-2" />Batal Perubahan</Button>
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                    {isEdit && (
                        <AlertDialog>
                            <AlertDialogTrigger asChild><Button variant="outline" className="h-9 text-destructive border-destructive/20 hover:bg-destructive/10"><IconTrash className="h-4 w-4 mr-2" /> Hapus {label}</Button></AlertDialogTrigger>
                            <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Hapus {label}?</AlertDialogTitle><AlertDialogDescription>Tindakan ini tidak dapat dibatalkan.</AlertDialogDescription></AlertDialogHeader>
                            <AlertDialogFooter><AlertDialogCancel>Batal</AlertDialogCancel><AlertDialogAction onClick={handleDeleteFromForm} className="bg-destructive hover:bg-destructive/90 text-white">Ya, Hapus</AlertDialogAction></AlertDialogFooter></AlertDialogContent>
                        </AlertDialog>
                    )}
                    <Button variant="outline" className="text-primary border-primary/20 h-9" onClick={handleStatusToggle} disabled={isLoading}>{status === "Published" ? <><IconDeviceFloppy className="h-4 w-4 mr-2" /> Draft</> : <><IconRocket className="h-4 w-4 mr-2" /> Publish Sekarang</>}</Button>
                    <Button onClick={handleSave} disabled={isLoading} className="px-10 bg-primary h-9 font-semibold text-primary-foreground">{isLoading ? <IconLoader2 className="animate-spin" /> : <IconDeviceFloppy className="h-4 w-4 mr-2" />}{isEdit ? "Simpan Perubahan" : `Simpan ${label}`}</Button>
                </div>
            </div>
        </div>
    )
}