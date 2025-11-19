import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useJobPostingTags, useJobPostingDetail } from '@/hooks/useJobPosting'
import { useGlobalTagsStore } from '@/stores/globaltags.store'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function AssignTagsJobPosting() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { tags, isLoading } = useGlobalTagsStore()
  const { fetchGlobalTags, addTagToJobPosting, removeTagFromJobPosting, isSubmitting } = useJobPostingTags()
  const { jobPosting, fetchJobPosting } = useJobPostingDetail()

  useEffect(() => {
    if (id) {
      fetchJobPosting(id)
      fetchGlobalTags()
    }
  }, [id])

  const assignedTagIds = new Set(jobPosting?.tags?.map((tag: any) => tag.id) || [])

  const handleAddTag = async (tagId: string) => {
    if (id) {
      try {
        await addTagToJobPosting(id, tagId)
        await fetchJobPosting(id)
      } catch (error) {
        console.error('Error al agregar tag:', error)
      }
    }
  }

  const handleRemoveTag = async (tagId: string) => {
    if (id) {
      try {
        await removeTagFromJobPosting(id, tagId)
        await fetchJobPosting(id)
      } catch (error) {
        console.error('Error al remover tag:', error)
      }
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Asignar Habilidades a: {jobPosting?.title}</h2>
        <p className="text-muted-foreground">Agrega las habilidades requeridas para esta oferta</p>
      </div>

      {jobPosting?.tags && jobPosting.tags.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Habilidades Asignadas</h3>
          <div className="flex flex-wrap gap-2">
            {jobPosting.tags.map((tag: any) => (
              <div
                key={tag.id}
                className="bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 px-3 py-1 rounded-full text-sm font-medium"
              >
                {tag.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {isLoading ? (
        <p>Cargando habilidades...</p>
      ) : tags.length > 0 ? (
        <div className="space-y-4">
          {tags.map((tag) => {
            const isAssigned = assignedTagIds.has(tag.id)
            return (
              <Card key={tag.id} className={isAssigned ? 'border-green-500 bg-green-50 dark:bg-green-950' : ''}>
                <CardContent className="pt-6 flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-semibold">{tag.name}</p>
                    <p className="text-sm text-muted-foreground">{tag.category}</p>
                  </div>

                  {!isAssigned ? (
                    <Button
                      onClick={() => handleAddTag(tag.id)}
                      disabled={isSubmitting}
                      variant="default"
                      className="ml-4"
                    >
                      Agregar
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleRemoveTag(tag.id)}
                      disabled={isSubmitting}
                      variant="destructive"
                      className="ml-4"
                    >
                      Remover
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <p>No hay habilidades disponibles</p>
      )}

      <Button onClick={() => navigate(`/company/job-posting/${id}`)} variant="outline">
        Volver
      </Button>
    </div>
  )
}
