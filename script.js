function trocarPagina(idAlvo){
    const secoes = decodeURIComponent.querySelectorAll('.secao-conteudo');
    secoes.forEach(secao => {
        secao.style.display = 'none';

    })
};
const alvo = document.getElementById(idAlvo);
if (alvo) {
    alvo.style.display = 'flex'; 
    alvo.style.flexDirection = 'column';

}