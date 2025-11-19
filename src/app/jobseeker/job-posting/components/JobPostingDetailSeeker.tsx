import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useJobPostingDetail } from '@/hooks/useJobPosting'
import { useApplicationCreate } from '@/hooks/useApplication'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export function JobPostingDetailSeeker() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { jobPosting, isLoading, error, fetchJobPosting } = useJobPostingDetail()
    const { createApplication, isSubmitting, error: appError } = useApplicationCreate()
    const [showApplicationForm, setShowApplicationForm] = useState(false)
    const [formData, setFormData] = useState({
        cover_letter: '',
        proposed_salary: '',
    })

    useEffect(() => {
        if (id) {
            fetchJobPosting(id)
        }
    }, [id])

    const handleApply = async () => {
        if (!id || !formData.cover_letter || !formData.proposed_salary) {
            return
        }

        try {
            await createApplication({
                job_posting_id: id,
                cover_letter: formData.cover_letter,
                proposed_salary: formData.proposed_salary,
            })
            setShowApplicationForm(false)
            setFormData({ cover_letter: '', proposed_salary: '' })
            navigate('/jobseeker/applications')
        } catch (error) {
            console.error('Error al postular:', error)
        }
    }

    if (isLoading) {
        return <div>Cargando...</div>
    }

    if (error || !jobPosting) {
        return <div className="text-destructive">{error || 'No se encontró la oferta'}</div>
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">{jobPosting.title}</h2>
                    <p className="text-muted-foreground">{jobPosting.location}</p>
                </div>
                <div className="flex gap-2">
                    <Button onClick={() => navigate('/jobseeker/job-posting')} variant="outline">
                        Volver
                    </Button>
                    <Button onClick={() => setShowApplicationForm(true)}>Postular</Button>
                </div>
            </div>

            {showApplicationForm && (
                <Card>
                    <CardContent className="pt-6 space-y-4">
                        <h3 className="font-semibold">Postular a la Oferta</h3>

                        {appError && <div className="p-2 border border-destructive rounded text-sm text-destructive">{appError}</div>}

                        <div>
                            <Label htmlFor="proposed_salary">Salario Propuesto</Label>
                            <Input
                                id="proposed_salary"
                                type="number"
                                placeholder="Tu salario esperado"
                                value={formData.proposed_salary}
                                onChange={(e) => setFormData({ ...formData, proposed_salary: e.target.value })}
                            />
                        </div>

                        <div>
                            <Label htmlFor="cover_letter">Carta de Presentación</Label>
                            <Textarea
                                id="cover_letter"
                                placeholder="Cuéntanos por qué eres el candidato ideal para esta posición..."
                                value={formData.cover_letter}
                                onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })}
                                rows={4}
                            />
                        </div>

                        <div className="flex gap-2 justify-end">
                            <Button variant="outline" onClick={() => setShowApplicationForm(false)}>
                                Cancelar
                            </Button>
                            <Button onClick={handleApply} disabled={isSubmitting}>
                                {isSubmitting ? 'Postulando...' : 'Postular'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardContent className="pt-6 space-y-4">
                    <div>
                        <h3 className="font-semibold mb-2">Descripción</h3>
                        <p className="text-sm">{jobPosting.description}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Requisitos</h3>
                        <p className="text-sm">{jobPosting.requirement}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-semibold">Rango Salarial</p>
                            <p className="text-sm">
                                ${jobPosting.salary_min} - ${jobPosting.salary_max}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm font-semibold">Tipo de Trabajo</p>
                            <p className="text-sm">{jobPosting.work_type}</p>
                        </div>

                        <div>
                            <p className="text-sm font-semibold">Nivel de Experiencia</p>
                            <p className="text-sm">{jobPosting.experience_level}</p>
                        </div>

                        <div>
                            <p className="text-sm font-semibold">Tipo de Contrato</p>
                            <p className="text-sm">{jobPosting.contract_type}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Beneficios</h3>
                        <p className="text-sm">{jobPosting.benefit}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-semibold">¿Remoto?</p>
                            <p className="text-sm">{jobPosting.is_remote === 'true' ? 'Sí' : 'No'}</p>
                        </div>

                        <div>
                            <p className="text-sm font-semibold">¿Híbrido?</p>
                            <p className="text-sm">{jobPosting.is_hibrid === 'true' ? 'Sí' : 'No'}</p>
                        </div>
                    </div>

                    {jobPosting.tags && jobPosting.tags.length > 0 && (
                        <div>
                            <h3 className="font-semibold mb-2">Habilidades Requeridas</h3>
                            <div className="flex flex-wrap gap-2">
                                {jobPosting.tags.map((tag: any) => (
                                    <span
                                        key={tag.id}
                                        className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100 px-2 py-1 rounded"
                                    >
                                        {tag.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
