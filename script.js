// --- 1. FUNÇÃO DE TROCAR DE PÁGINA ---
function trocarPagina(idAlvo) {
    const secoes = document.querySelectorAll('.secao-conteudo');
    
    secoes.forEach(secao => {
        secao.style.display = 'none';
    });
    
    const alvo = document.getElementById(idAlvo);
    if (alvo) {
        alvo.style.display = 'flex'; 
        alvo.style.flexDirection = 'column';
    }
}

// --- 2. FUNÇÃO INVISÍVEL DO FORMULÁRIO DE CONTATO ---
const formContato = document.getElementById('form-contato');

if (formContato) {
    formContato.addEventListener('submit', function(event) {
        // ESSA É A LINHA MÁGICA QUE IMPEDE A TELA BRANCA
        event.preventDefault(); 
        
        const form = event.target;
        const btn = document.getElementById('btn-enviar');
        const status = document.getElementById('status-envio');
        
        // Botão carregando
        btn.innerText = 'Enviando...';
        btn.disabled = true;
        
        // Envio silencioso (AJAX)
        fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                status.innerText = "Mensagem enviada com sucesso! 🚀";
                status.style.color = "#a29bfe";
                status.style.display = "block";
                form.reset(); // Apaga o que foi digitado
            } else {
                status.innerText = "Ops! Ocorreu um erro ao enviar.";
                status.style.color = "#ff7675";
                status.style.display = "block";
            }
        }).catch(error => {
            status.innerText = "Erro de conexão. Tente novamente.";
            status.style.color = "#ff7675";
            status.style.display = "block";
        }).finally(() => {
            // Volta o botão ao normal
            btn.innerText = 'Enviar Mensagem';
            btn.disabled = false;
            
            // Apaga a mensagem de sucesso depois de 5 segundos
            setTimeout(() => {
                status.style.display = "none";
            }, 5000);
        });
    });
}