
function adicionar_funcoes_no_evento_fechar(classe_btn_fechar, funcao_evento_fechar) {
    let btns_fechar = document.querySelectorAll(`.${classe_btn_fechar}`)
    for (let i = 0; i < btns_fechar.length; i++)
        btns_fechar[i].addEventListener('click', funcao_evento_fechar)
}

document.addEventListener("DOMContentLoaded", () => {
    criar_inputs_notas()
    adicionar_btns_materias()

    document.querySelector("#qnt-notas").addEventListener("input", corrigir_e_adicionar_inputs_notas)

    adicionar_funcoes_no_evento_fechar('fechar-modal-materia', restaurar_modal_materia)
    document.querySelector("#salvar-materia").addEventListener("click", analisar_e_salvar_inputs_materia)

    document.querySelector("#btn-config-token").addEventListener("click", carregar_input_token)
    adicionar_funcoes_no_evento_fechar('fechar-modal-token', restaurar_modal_token)
    document.querySelector("#salvar-token").addEventListener("click", analisar_e_salvar_input_token)

    adicionar_funcoes_no_evento_fechar('fechar-modal-json', restaurar_modal_JSON)
    document.querySelector("#salvar-json").addEventListener("click", salvar_JSON_materia)

    document.querySelector("#copiar-json").addEventListener("click", copiar_JSON_materias)
})