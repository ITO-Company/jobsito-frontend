import { useSignup } from "@/hooks/useAuth";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function SignupForm() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"job_seeker" | "company">("job_seeker");
  const { form, onSubmit } = useSignup(role);
  const { error: authError } = useAuth();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const handleSubmitSuccess = async (data: any) => {
    try {
      await onSubmit(data);
      const dashboardPath = role === "job_seeker" ? "/jobseeker/dashboard" : "/company/dashboard";
      navigate(dashboardPath);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Crear Cuenta</CardTitle>
          <CardDescription className="text-slate-400">Regístrate para comenzar</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(handleSubmitSuccess)} className="space-y-6">
              {authError && (
                <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-2 rounded-md text-sm">
                  {authError}
                </div>
              )}
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Nombre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Tu nombre"
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
                        placeholder="Contraseña segura"
                        type="password"
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
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Confirmar Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Confirma tu contraseña"
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
                {isSubmitting ? "Creando cuenta..." : "Crear Cuenta"}
              </Button>

              <p className="text-sm text-center text-slate-300">
                ¿Ya tienes cuenta?{" "}
                <a href="/auth/signin" className="text-blue-400 underline hover:text-blue-300">
                  Inicia sesión
                </a>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
