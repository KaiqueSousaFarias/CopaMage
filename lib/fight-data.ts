import athletesData from "@/data/athletes.json"
import fightsData from "@/data/fights.json"

export interface Athlete {
    id: string
    nome: string
    foto: string
    data_nascimento: string
    idade: number
    faixa: string
    equipe: {
        nome: string
        logo: string
    }
}

export interface Fight {
    id_luta: string
    categoria: string
    status_luta: string
    atleta_a_id: string
    atleta_b_id: string
}

export interface Event {
    id_evento: string
    nome_evento: string
    data_evento: string
    lutas: Fight[]
}

export interface FightData {
    eventos: Event[]
}

export interface EnrichedFight extends Omit<Fight, "atleta_a_id" | "atleta_b_id"> {
    atleta_a: Athlete
    atleta_b: Athlete
}

export function getAthleteById(id: string): Athlete | undefined {
    return athletesData.find((athlete) => athlete.id === id)
}

export function enrichFightsWithAthletes(fights: Fight[]): EnrichedFight[] {
    return fights.map((fight) => {
        const atleta_a = getAthleteById(fight.atleta_a_id)
        const atleta_b = getAthleteById(fight.atleta_b_id)

        if (!atleta_a || !atleta_b) {
            throw new Error(`Athlete not found for fight ${fight.id_luta}`)
        }

        return {
            ...fight,
            atleta_a,
            atleta_b,
        }
    })
}

export function getFightsWithAthletes(): Array<{
    id: string
    category: string
    status: string
    athlete1: {
        name: string
        team: string
        belt: string
    }
    athlete2: {
        name: string
        team: string
        belt: string
    }
}> {
    const allFights = fightData.eventos.flatMap((evento) => evento.lutas)
    const enrichedFights = enrichFightsWithAthletes(allFights)

    return enrichedFights.map((fight) => ({
        id: fight.id_luta,
        category: fight.categoria,
        status: fight.status_luta,
        athlete1: {
            name: fight.atleta_a.nome,
            team: fight.atleta_a.equipe.nome,
            belt: fight.atleta_a.faixa,
        },
        athlete2: {
            name: fight.atleta_b.nome,
            team: fight.atleta_b.equipe.nome,
            belt: fight.atleta_b.faixa,
        },
    }))
}

export const athletes: Athlete[] = athletesData
export const fightData: FightData = fightsData
