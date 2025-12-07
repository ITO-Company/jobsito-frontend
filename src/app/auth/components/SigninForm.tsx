import { useSignin } from "@/hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function SigninForm() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"job_seeker" | "company">("job_seeker");
  const { form, onSubmit } = useSignin(role);
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const handleSubmitSuccess = async (data: any) => {
    try {
      await onSubmit(data);
      if (role === "company") {
        navigate("/company/dashboard");
      } else {
        navigate("/jobseeker/dashboard");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Iniciar Sesión</CardTitle>
          <CardDescription className="text-slate-400">Accede a tu cuenta</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(handleSubmitSuccess)} className="space-y-6">
              <div className="space-y-2">
                <FormLabel className="text-white">Tipo de Cuenta</FormLabel>
                <Select value={role} onValueChange={(value: any) => setRole(value)}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="job_seeker">Buscador de Empleos</SelectItem>
                    <SelectItem value="company">Empresa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="tu@email.com"
                        type="email"
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Tu contraseña"
                        type="password"
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>

              <div className="space-y-3 pt-2">
                <p className="text-sm text-center text-slate-300">
                  ¿No tienes cuenta?{" "}
                  <a href="/auth/signup" className="text-blue-400 underline hover:text-blue-300">
                    Crea una
                  </a>
                </p>
                <div className="border-t border-slate-600 pt-3">
                  <p className="text-xs text-center text-slate-400 mb-2">¿Eres pasante?</p>
                  <Button
                    type="button"
                    onClick={() => window.location.href = "/auth/intern-signin"}
                    variant="outline"
                    className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Acceder como Pasante
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
