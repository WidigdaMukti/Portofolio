import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
        // 2. COOKIE SYNC (Krusial buat Middleware Astro)
        // Supabase simpan session di LocalStorage, tapi Middleware baca Cookie.
        // Kita copy tokennya ke cookie agar Server-Side Rendering (SSR) jalan.
        const { access_token, refresh_token } = data.session;
        
        // Simpan Access Token (Exp: 1 jam)
        document.cookie = `sb-access-token=${access_token}; path=/; max-age=3600; SameSite=Lax; sec`;
        // Simpan Refresh Token buat jaga-jaga (Exp: 1 minggu)
        document.cookie = `sb-refresh-token=${refresh_token}; path=/; max-age=604800; SameSite=Lax`;

        console.log("Login Berhasil! Mengalihkan ke Dashboard...");

        // 3. Redirect ke Admin
        setTimeout(() => {
          window.location.href = "/admin";
        }, 300);
      }
    } catch (error: any) {
      console.error("Auth Error:", error.message);
      alert("Gagal Login: " + (error.message === "Invalid login credentials" ? "Email atau Password salah!" : error.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login Admin</CardTitle>
        <CardDescription>
          Masukkan email akun Supabase kamu untuk masuk ke dashboard.
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
    </Card>
  );
}