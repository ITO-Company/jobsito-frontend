import { useSignup } from '@/hooks/useAuth'
import { useState } from 'react'

export function SignupForm() {
  const [role, setRole] = useState<'job_seeker' | 'company'>('job_seeker')
  const { form, onSubmit } = useSignup(role)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = form

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 border rounded">
      <h2 className="text-2xl font-bold mb-4">Crear Cuenta</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Tipo de Cuenta</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as 'job_seeker' | 'company')}
          className="w-full border rounded px-3 py-2"
        >
          <option value="job_seeker">Buscador de Empleos</option>
          <option value="company">Empresa</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Nombre</label>
        <input
          {...register('name')}
          type="text"
          className="w-full border rounded px-3 py-2"
        />
        {errors.name && <span className="text-red-600 text-sm">{errors.name.message}</span>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          {...register('email')}
          type="email"
          className="w-full border rounded px-3 py-2"
        />
        {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Contraseña</label>
        <input
          {...register('password')}
          type="password"
          className="w-full border rounded px-3 py-2"
        />
        {errors.password && <span className="text-red-600 text-sm">{errors.password.message}</span>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Confirmar Contraseña</label>
        <input
          {...register('confirm_password')}
          type="password"
          className="w-full border rounded px-3 py-2"
        />
        {errors.confirm_password && (
          <span className="text-red-600 text-sm">{errors.confirm_password.message}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Creando cuenta...' : 'Crear Cuenta'}
      </button>
    </form>
  )
}
