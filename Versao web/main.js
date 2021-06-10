
document.addEventListener("DOMContentLoaded", () => {
    // Carregar alguns componentes iniciais
    criar_inputs_notas()
    adicionar_btns_materias()

    // Configurar input de "qnt_notas": corrigirá o valor do input e mostrará os inputs de notas dependendo desse input.
    document.querySelector("#qnt-notas").addEventListener("input", () => {
        let input_qnt_notas = document.querySelector("#qnt-notas")
        input_qnt_notas.value = retornar_valor_corrigido_input_qnt_notas(input_qnt_notas.value)
        mostrar_inputs_notas((input_qnt_notas.value) ? (input_qnt_notas.value) : (0))
    })

    // Configurações do modal de matérias
    adicionar_funcoes_no_evento_fechar('fechar-modal-materia', restaurar_modal_materia)
    document.querySelector("#salvar-materia").addEventListener("click", analisar_e_salvar_inputs_materia)

    // Configurações do modal de token
    document.querySelector("#btn-config-token").addEventListener("click", carregar_input_token)
    adicionar_funcoes_no_evento_fechar('fechar-modal-token', restaurar_modal_token)
    document.querySelector("#salvar-token").addEventListener("click", analisar_e_salvar_input_token)

    // Configurações do modal de configurações JSON
    adicionar_funcoes_no_evento_fechar('fechar-modal-json', restaurar_modal_JSON)
    document.querySelector("#salvar-json").addEventListener("click", salvar_JSON_materia)

    // Configurações do botão de copiar JSON matérias
    document.querySelector("#copiar-json").addEventListener("click", copiar_JSON_materias)
})


function adicionar_funcoes_no_evento_fechar(classe_btn_fechar, funcao_evento_fechar) {
    // Adiciona funções nos botões de fechar (que possuem a classe do primeiro argumento) quando clicados.
    let btns_fechar = document.querySelectorAll(`.${classe_btn_fechar}`)
    for (let i = 0; i < btns_fechar.length; i++)
        btns_fechar[i].addEventListener('click', funcao_evento_fechar)
}
