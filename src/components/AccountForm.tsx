"use client"

import * as React from "react"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner" 
import { 
    IconDeviceFloppy, IconPhoto, IconMail, IconLoader2,
    IconEye, IconEyeOff // <--- Tambahkan Icon ini
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AccountFormProps {
    user: {
        id: string;
        name: string;
        email: string;
        avatar: string;
    }
}

export function AccountForm({ user }: AccountFormProps) {
    const [name, setName] = React.useState(user.name)
    const [avatarUrl, setAvatarUrl] = React.useState(user.avatar ? `${user.avatar}?t=${Date.now()}` : "")
    const [isLoading, setIsLoading] = React.useState(false)
    
    const [pendingFile, setPendingFile] = React.useState<File | null>(null)
    const fileInputRef = React.useRef<HTMLInputElement>(null)
    
    // State untuk kontrol visibilitas password
    const [showOldPassword, setShowOldPassword] = React.useState(false)
    const [showNewPassword, setShowNewPassword] = React.useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)

    const [oldPassword, setOldPassword] = React.useState("")
    const [newPassword, setNewPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")

    const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setPendingFile(file);
        const localPreview = URL.createObjectURL(file);
        setAvatarUrl(localPreview);
    };

    const handleSave = async () => {
        setIsLoading(true);
        const saveTask = async () => {
            let finalAvatarUrl = user.avatar;

            if (newPassword) {
                if (newPassword !== confirmPassword) throw new Error("Konfirmasi password tidak cocok!");
                if (!oldPassword) throw new Error("Masukkan password lama untuk verifikasi.");

                const { error: authError } = await supabase.auth.signInWithPassword({
                    email: user.email,
                    password: oldPassword,
                });
                if (authError) throw new Error("Password lama salah!");
            }

            if (pendingFile) {
                if (user.avatar) {
                    try {
                        const oldFileName = user.avatar.split('/').pop()?.split('?')[0];
                        if (oldFileName) await supabase.storage.from('avatars').remove([oldFileName]);
                    } catch (e) { console.error(e) }
                }

                const fileExt = pendingFile.name.split('.').pop();
                const fileName = `${user.id}-${Date.now()}.${fileExt}`;
                const { error: uploadError } = await supabase.storage.from('avatars').upload(fileName, pendingFile);
                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(fileName);
                finalAvatarUrl = publicUrl;
            }

            const { error: updateError } = await supabase.auth.updateUser({
                password: newPassword || undefined,
                data: { full_name: name, avatar_url: finalAvatarUrl }
            });

            if (updateError) throw updateError;

            setOldPassword(""); setNewPassword(""); setConfirmPassword("");
            setPendingFile(null);
            setTimeout(() => window.location.reload(), 1500);
            return { name };
        };

        toast.promise(saveTask(), {
            loading: 'Sedang menyimpan perubahan...',
            success: 'Profil kamu berhasil diperbarui!',
            error: (err) => `${err.message}`,
        });
        setIsLoading(false);
    }

    return (
        <div className="space-y-8 w-full">
            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Pengaturan Akun</h1>
                    <p className="text-muted-foreground text-sm">Kelola informasi profil dan keamanan akun kamu</p>
                </div>
                <Button onClick={handleSave} disabled={isLoading} className="gap-2 px-8 bg-primary h-9">
                    {isLoading ? <IconLoader2 className="h-4 w-4 animate-spin" /> : <IconDeviceFloppy className="h-4 w-4" />}
                    Simpan Perubahan
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
                <div className="lg:col-span-2 space-y-6">
                    {/* INFORMASI PROFIL */}
                    <Card className="py-0">
                        <CardContent className="p-6 space-y-5">
                            <div className="flex items-center gap-2 pb-2 border-b"><h2 className="font-bold text-lg">Informasi Profil</h2></div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nama Lengkap</Label>
                                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="h-9" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Alamat Email</Label>
                                    <div className="relative">
                                        <IconMail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input id="email" value={user.email} disabled className="h-9 pl-9 bg-muted/50" />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* KEAMANAN AKUN DENGAN SHOW/HIDE */}
                    <Card className="py-0">
                        <CardContent className="p-6 space-y-5">
                            <div className="flex items-center gap-2 pb-2 border-b"><h2 className="font-bold text-lg">Keamanan Akun</h2></div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="old_password">Password Lama</Label>
                                    <div className="relative">
                                        <Input 
                                            id="old_password" 
                                            type={showOldPassword ? "text" : "password"} 
                                            value={oldPassword} 
                                            onChange={(e) => setOldPassword(e.target.value)} 
                                            className="h-9 pr-10" 
                                        />
                                        <button 
                                            type="button"
                                            onClick={() => setShowOldPassword(!showOldPassword)}
                                            className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                                        >
                                            {showOldPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="new_password">Password Baru</Label>
                                        <div className="relative">
                                            <Input 
                                                id="new_password" 
                                                type={showNewPassword ? "text" : "password"} 
                                                value={newPassword} 
                                                onChange={(e) => setNewPassword(e.target.value)} 
                                                className="h-9 pr-10" 
                                            />
                                            <button 
                                                type="button"
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                                className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                                            >
                                                {showNewPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirm_password">Konfirmasi Password Baru</Label>
                                        <div className="relative">
                                            <Input 
                                                id="confirm_password" 
                                                type={showConfirmPassword ? "text" : "password"} 
                                                value={confirmPassword} 
                                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                                className="h-9 pr-10" 
                                            />
                                            <button 
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                                            >
                                                {showConfirmPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* AVATAR */}
                <div className="space-y-6">
                    <Card className="py-0">
                        <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileSelection} />
                            <div className="group relative cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                <Avatar className="h-32 w-32 border-4 border-background shadow-xl overflow-hidden">
                                    <AvatarImage src={avatarUrl} className="object-cover" />
                                    <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                                        {name.substring(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                    <IconPhoto className="text-white h-8 w-8" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-bold">{name}</h3>
                                <p className="text-sm text-muted-foreground">Admin Access</p>
                            </div>
                            <p className="text-[12px] text-muted-foreground leading-tight px-4">Pilih foto, lalu klik simpan untuk mengunggah.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}