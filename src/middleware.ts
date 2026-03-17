import { defineMiddleware } from "astro:middleware";
import { supabase } from "./lib/supabase";

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies, redirect } = context;

  // 1. Ambil token dari cookie
  const accessToken = cookies.get("sb-access-token")?.value;
  const refreshToken = cookies.get("sb-refresh-token")?.value;

  const isProtectedRoute = url.pathname.startsWith("/admin");
  const isAuthPage = url.pathname === "/login";

  // 2. LOGIKA PROTEKSI ADMIN
  if (isProtectedRoute) {
    // Jika tidak ada token sama sekali
    if (!accessToken) {
      return redirect("/login");
    }

    // VERIFIKASI TOKEN (Server-Side Security)
    // Kita cek ke Supabase: "Eh, token ini beneran sah nggak?"
    const { data, error } = await supabase.auth.getUser(accessToken);

    if (error || !data.user) {
      console.error("Middleware: Token invalid atau expired");
      // Hapus cookie yang basi
      cookies.delete("sb-access-token", { path: "/" });
      cookies.delete("sb-refresh-token", { path: "/" });
      return redirect("/login");
    }
    
    // Simpan data user ke locals supaya bisa dipakai di semua halaman .astro
    context.locals.user = data.user;
  }

  // 3. LOGIKA ANTI-BACK (Jika sudah login, jangan kasih masuk ke halaman login)
  if (isAuthPage && accessToken) {
    const { data } = await supabase.auth.getUser(accessToken);
    if (data.user) {
      return redirect("/admin");
    }
  }

  return next();
});