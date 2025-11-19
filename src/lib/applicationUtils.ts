/**
 * Determina el estado de una aplicación comparando created_at y updated_at
 * - Si created_at === updated_at → "pending"
 * - Si created_at !== updated_at y is_accepted es true → "accepted"
 * - Si created_at !== updated_at y is_accepted es false → "rejected"
 */
export function getApplicationStatus(
  application: any
): 'pending' | 'accepted' | 'rejected' {
  const createdAt = new Date(application.created_at).getTime()
  const updatedAt = new Date(application.updated_at).getTime()

  if (createdAt === updatedAt) {
    return 'pending'
  }

  return application.is_accepted ? 'accepted' : 'rejected'
}

/**
 * Retorna la clase CSS y el texto para el badge de estado
 */
export function getStatusBadge(status: 'pending' | 'accepted' | 'rejected') {
  const badges = {
    pending: {
      className: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100',
      label: 'Pendiente',
    },
    accepted: {
      className: 'bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100',
      label: 'Aceptada',
    },
    rejected: {
      className: 'bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100',
      label: 'Rechazada',
    },
  }

  return badges[status]
}
