import type { AppError } from '../interface/appError';

const CHAVE_ERROS = "app_errors";

export function registrarErro(erro: AppError) {
    try {
        const errosSalvos = localStorage.getItem(CHAVE_ERROS);

        const erros: AppError[] = errosSalvos
            ? JSON.parse(errosSalvos)
            : [];

        erros.push(erro);

        localStorage.setItem(
            CHAVE_ERROS,
            JSON.stringify(erros)
        );

    } catch (err) {
        console.error("Erro ao registrar erro:", err);
    }
}

export function buscarErros(): AppError[] {
    const errosSalvos = localStorage.getItem("app_errors");

    if (!errosSalvos) {
        return [];
    }

    return JSON.parse(errosSalvos);
}

export function limparErros() {
    localStorage.removeItem("app_errors");
}