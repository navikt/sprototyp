'use client'

import { useState, FormEvent, ReactElement } from 'react'
import { Button } from '@navikt/ds-react'

interface Arbeidsforhold {
    id: number
    type: 'arbeidstaker' | 'næringsdrivende' | 'frilanser'
    orgnummer: string
}

export default function Page(): ReactElement {
    const [arbeidssituasjon, setArbeidssituasjon] = useState<'arbeidstaker' | 'næringsdrivende' | 'frilanser'>(
        'arbeidstaker',
    )
    const [orgnummer, setOrgnummer] = useState<string>('')
    const [arbeidsforhold, setArbeidsforhold] = useState<Arbeidsforhold[]>([])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const nyttArbeidsforhold: Arbeidsforhold = {
            id: Date.now(),
            type: arbeidssituasjon,
            orgnummer: arbeidssituasjon === 'arbeidstaker' ? orgnummer : '',
        }

        setArbeidsforhold([...arbeidsforhold, nyttArbeidsforhold])
        setArbeidssituasjon('arbeidstaker')
        setOrgnummer('')
    }

    const handleRemove = (id: number) => {
        setArbeidsforhold(arbeidsforhold.filter((item) => item.id !== id))
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Legg til arbeidsforhold</h1>
            <form onSubmit={handleSubmit} className="mb-6">
                <div className="mb-4">
                    <label className="block mb-2">Arbeidssituasjon</label>
                    <select
                        value={arbeidssituasjon}
                        onChange={(e) =>
                            setArbeidssituasjon(e.target.value as 'arbeidstaker' | 'næringsdrivende' | 'frilanser')
                        }
                        className="border rounded p-2 w-full"
                    >
                        <option value="arbeidstaker">Arbeidstaker</option>
                        <option value="næringsdrivende">Næringsdrivende</option>
                        <option value="frilanser">Frilanser</option>
                    </select>
                </div>
                {arbeidssituasjon === 'arbeidstaker' && (
                    <div className="mb-4">
                        <label className="block mb-2">Orgnummer</label>
                        <input
                            type="text"
                            value={orgnummer}
                            onChange={(e) => setOrgnummer(e.target.value)}
                            className="border rounded p-2 w-full"
                        />
                    </div>
                )}
                <Button type="submit" size="small" variant="secondary-neutral">
                    Legg til
                </Button>
            </form>

            <h2 className="text-xl font-bold mb-2">Liste over arbeidsforhold</h2>
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="py-2 border">Arbeidssituasjon</th>
                        <th className="py-2 border">Orgnummer</th>
                        <th className="py-2 border">Handling</th>
                    </tr>
                </thead>
                <tbody>
                    {arbeidsforhold.map((item) => (
                        <tr key={item.id}>
                            <td className="py-2 border text-center">{item.type}</td>
                            <td className="py-2 border text-center">{item.orgnummer}</td>
                            <td className="py-2 border text-center">
                                <button
                                    onClick={() => handleRemove(item.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Fjern
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
