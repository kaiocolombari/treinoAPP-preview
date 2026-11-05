export interface ExercicioTreino {
    id?: string;

    exercicio: string;
    series: string;
    repeticoes: string;
    intervalo: string;
    carga: string;
    rirMax: string;
    observacoes: string;

    variacoes?: ExercicioTreino[];
}