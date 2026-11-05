export interface AppError {
    codigo: string;
    tipo: string;
    titulo: string;
    mensagem: string;
    data: string;
    contexto?: string;
}