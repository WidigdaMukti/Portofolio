import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // --- MFA STATE ---
  const [showMFA, setShowMFA] = useState(false);
  const [mfaAnswer, setMfaAnswer] = useState("");
  const [tempSession, setTempSession] = useState<{ access_token: string, refresh_token: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Auth ke Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session) {
        // Hentikan proses redirect, simpan sesi sementara & munculkan dialog rahasia!
        setTempSession(data.session);
        setShowMFA(true);
      }
    } catch (error: any) {
      console.error("Auth Error:", error.message);
      alert("Gagal Login: " + (error.message === "Invalid login credentials" ? "Email atau Password salah!" : error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyMFA = async () => {
    // NAMA HEWAN PELIHARAAN (Lowercase untuk mempermudah pengecekan)
    const SECRET_ANSWER = "koci"; // <-- GANTI DENGAN NAMA HEWAN ASLI KAMU!

    if (mfaAnswer.trim().toLowerCase() !== SECRET_ANSWER) {
      alert("Jawaban salah! Percobaan login dibatalkan.");
      await supabase.auth.signOut(); // Tendang langsung supaya bersih
      setShowMFA(false);
      setTempSession(null);
      return;
    }

    if (tempSession) {
      // JIKA BENAR: Lanjut proses set cookie dan redirect
      const { access_token, refresh_token } = tempSession;
      
      document.cookie = `sb-access-token=${access_token}; path=/; max-age=3600; SameSite=Lax; sec`;
      document.cookie = `sb-refresh-token=${refresh_token}; path=/; max-age=604800; SameSite=Lax`;

      window.location.href = "/admin";
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Login Admin</CardTitle>
        <CardDescription>
          Masukkan credentials untuk masuk ke dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </CardContent>

      <AlertDialog open={showMFA} onOpenChange={setShowMFA}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-bold text-xl">Guest What?</AlertDialogTitle>
            <AlertDialogDescription>
              jika anda adalah saya maka anda tahu jawabanya
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Label htmlFor="mfaAnswer">Apa nama hewan peliharaan pertamaku?</Label>
            <Input 
              id="mfaAnswer" 
              className="mt-2" 
              placeholder="Cluenya adalah guk guk" 
              value={mfaAnswer} 
              onChange={(e) => setMfaAnswer(e.target.value)} 
              autoFocus
              onKeyDown={(e) => {
                if(e.key === 'Enter') handleVerifyMFA();
              }}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={async () => { await supabase.auth.signOut(); setShowMFA(false); }}>
              Batal
            </AlertDialogCancel>
            <Button onClick={handleVerifyMFA}>Verifikasi</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}