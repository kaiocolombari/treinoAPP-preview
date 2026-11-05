import React, { useState } from "react";
import { useAvaliacao } from "../context/avaliacaoContext";
import type { Avaliacao } from "../types/avaliacao";
import navTool from "../components/navTool";

interface AlunoPainel {
    id: string;
    nome: string;
    dados: Avaliacao;
    criadoEm: string;
}

const CHAVE_ALUNOS = "painel_alunos";
const CHAVE_ALUNO_SELECIONADO = "aluno_selecionado_id";

export default function SalvarTEMP() {

    const {
        avaliacao,
        limparAvaliacao,
    } = useAvaliacao();

    const [mensagem, setMensagem] =
        useState("");

    function salvarAlteracoes() {

        try {

            const alunoSelecionadoId =
                localStorage.getItem(
                    CHAVE_ALUNO_SELECIONADO
                );

            if (!alunoSelecionadoId) {

                setMensagem(
                    "Nenhum aluno foi selecionado."
                );

                setTimeout(() => {
                    setMensagem("");
                }, 3000);

                return;
            }


            const dadosSalvos =
                localStorage.getItem(
                    CHAVE_ALUNOS
                );

            if (!dadosSalvos) {

                setMensagem(
                    "Nenhum aluno cadastrado."
                );

                setTimeout(() => {
                    setMensagem("");
                }, 3000);

                return;
            }


            const alunos:
                AlunoPainel[] =
                JSON.parse(dadosSalvos);


            const alunoExiste =
                alunos.some(
                    aluno =>
                        aluno.id ===
                        alunoSelecionadoId
                );


            if (!alunoExiste) {

                setMensagem(
                    "Aluno selecionado não foi encontrado."
                );

                setTimeout(() => {
                    setMensagem("");
                }, 3000);

                return;
            }


            const alunosAtualizados =
                alunos.map(aluno => {

                    if (
                        aluno.id !==
                        alunoSelecionadoId
                    ) {
                        return aluno;
                    }


                    return {
                        ...aluno,

                        nome:
                            avaliacao.aluno.nomeCompleto ||
                            aluno.nome,

                        dados:
                            avaliacao,
                    };

                });


            localStorage.setItem(
                CHAVE_ALUNOS,
                JSON.stringify(
                    alunosAtualizados
                )
            );

            localStorage.setItem(
                "avaliacao_temp",
                JSON.stringify(
                    avaliacao
                )
            );


            setMensagem(
                "Alterações salvas com sucesso!"
            );


            setTimeout(() => {
                setMensagem("");
            }, 3000);


            console.log(
                "Aluno atualizado:",
                alunoSelecionadoId
            );

        } catch (error) {

            console.error(
                "Erro ao salvar alterações:",
                error
            );

            setMensagem(
                "Erro ao salvar as alterações."
            );

        }

    }

    function limparDados() {

        const confirmar =
            window.confirm(
                "Tem certeza que deseja apagar todos os dados da avaliação?"
            );

        if (!confirmar) {
            return;
        }


        limparAvaliacao();


        setMensagem(
            "Todos os dados foram apagados."
        );


        setTimeout(() => {
            setMensagem("");
        }, 3000);
    }


    return (
        <div className="min-h-screen bg-gray-100 px-4 py-10">

            <div className="mx-auto max-w-4xl">

                <div className="mb-8">

                    <p className="mb-2 text-sm font-medium text-blue-600">
                        FINALIZAÇÃO
                    </p>

                    <h1 className="text-3xl font-bold text-gray-900">
                        Salvar avaliação
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Salve todas as alterações realizadas
                        na avaliação do aluno.
                    </p>

                </div>

                <div className="mb-6 flex items-start gap-4 rounded-xl border border-blue-200 bg-blue-50 p-5">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-xl">
                        💾
                    </div>

                    <div>

                        <h2 className="font-semibold text-blue-900">
                            Salvamento automático ativado
                        </h2>

                        <p className="mt-1 text-sm leading-6 text-blue-700">
                            As alterações realizadas são
                            mantidas automaticamente no
                            estado atual da avaliação.
                            Use o botão abaixo para salvar
                            definitivamente essas alterações
                            no aluno selecionado.
                        </p>

                    </div>

                </div>

                <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">

                    <h2 className="text-xl font-semibold text-gray-900">
                        Salvar alterações
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Todas as informações alteradas nesta
                        avaliação serão associadas ao aluno atual.
                    </p>

                    <button
                        onClick={salvarAlteracoes}
                        className="group mt-8 w-full rounded-xl border border-blue-200 bg-white p-6 text-left transition hover:cursor-pointer hover:border-blue-400 hover:bg-blue-50 hover:shadow-sm"
                    >

                        <div className="flex items-center gap-4">

                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-2xl transition group-hover:bg-blue-200">
                                💾
                            </div>

                            <div>

                                <h3 className="font-semibold text-gray-900">
                                    Salvar alterações
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    Atualizar os dados do aluno selecionado
                                </p>

                            </div>

                        </div>

                    </button>

                    <div className="my-8 border-t border-gray-100" />

                    <div className="rounded-xl bg-gray-50 p-5">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm font-medium text-gray-700">
                                    Estado atual
                                </p>

                                <p className="mt-1 text-xs text-gray-400">
                                    As alterações atuais estão armazenadas
                                    temporariamente neste navegador.
                                </p>

                            </div>

                            <div className="flex items-center gap-2">

                                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

                                <span className="text-sm font-medium text-green-600">
                                    Salvo
                                </span>

                            </div>

                        </div>

                    </div>

                    <div className="mt-6 flex justify-end">

                        <button
                            onClick={limparDados}
                            className="rounded-lg px-4 py-2 text-sm font-medium text-red-500 transition hover:cursor-pointer hover:bg-red-50 hover:text-red-600"
                        >
                            Limpar todos os dados
                        </button>

                    </div>

                </div>


                {mensagem && (

                    <div className="mt-5 rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm font-medium text-gray-700 shadow-sm">
                        {mensagem}
                    </div>

                )}

                {navTool()}

            </div>

        </div>
    );
}