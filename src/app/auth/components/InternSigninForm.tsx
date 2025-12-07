import { useState } from "react"
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useInternshipStore } from "@/stores/internship.store"
import axiosInstance from "@/lib/axios"

const internSigninSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Contraseña debe tener al menos 6 caracteres"),
  internship_id: z.string().min(1, "ID de pasantía es requerido"),
})

type InternSigninValues = z.infer<typeof internSigninSchema>

export function InternSigninForm() {
  const navigate = useNavigate()
  const setInternshipId = useInternshipStore((state) => state.setInternshipId)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<InternSigninValues>({
    resolver: zodResolver(internSigninSchema),
    defaultValues: {
      email: "",
      password: "",
      internship_id: "",
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const onSubmit = async (data: InternSigninValues) => {
    setError(null)
    try {
      const response = await axiosInstance.post("/job-seekers/intern-signin", data)
      const { token } = response.data

      // Guardar token con la clave estándar
      localStorage.setItem("auth-token", token)
      
      // Guardar internship_id en Zustand
      setInternshipId(data.internship_id)

      // Redirigir a pasantía (sin exponer el ID en la ruta)
      navigate(`/intern/internships/detail`)
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Error al iniciar sesión"
      setError(errorMessage)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Iniciar Sesión - Pasante</CardTitle>
          <CardDescription className="text-slate-400">Accede a tu pasantía</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-900/20 border border-red-700 rounded text-red-200 text-sm">
                  {error}
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

              <FormField
                control={form.control}
                name="internship_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">ID de Pasantía</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="UUID de la pasantía"
                        type="text"
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
                {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión como Pasante"}
              </Button>

              <div className="text-center text-sm text-slate-400">
                <a href="/auth" className="text-blue-400 hover:text-blue-300">
                  Volver al login estándar
                </a>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
