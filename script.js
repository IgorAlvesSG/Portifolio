function trocarPagina(idAlvo) {
    // 1. Pega todas as seções da página
    const secoes = document.querySelectorAll('.secao-conteudo'); // Corrigido para 'document'
    
    // 2. Esconde todas elas
    secoes.forEach(secao => {
        secao.style.display = 'none';
    });
    
    // 3. Mostra apenas a que você clicou (Tudo isso AGORA ESTÁ DENTRO DA FUNÇÃO)
    const alvo = document.getElementById(idAlvo);
    if (alvo) {
        alvo.style.display = 'flex'; 
        alvo.style.flexDirection = 'column';
    }
}