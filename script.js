// --- 1. TROCAR DE PÁGINA ---
// FIX: Home precisa de flex-direction: row (split screen com terminal)
//      As outras seções usam column (layout vertical normal)
function trocarPagina(idAlvo) {
    const secoes = document.querySelectorAll('.secao-conteudo');

    secoes.forEach(secao => {
        secao.style.display = 'none';
    });

    const alvo = document.getElementById(idAlvo);
    if (!alvo) return;

    alvo.style.display = 'flex';
    alvo.style.flexDirection = idAlvo === 'home' ? 'row' : 'column';
}


// --- 2. TERMINAL INTERATIVO ---
const terminalInput  = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');
const terminalBody   = document.getElementById('terminal-body');

const comandos = {
    help: () => [
        'Comandos disponíveis:',
        '  <span class="comando-destaque">sobre</span>     → Minhas habilidades',
        '  <span class="comando-destaque">contato</span>   → Como me encontrar',
        '  <span class="comando-destaque">skills</span>    → Tecnologias que uso',
        '  <span class="comando-destaque">clear</span>     → Limpar o terminal',
    ],
    sobre: () => [
        'Estudante de Análise e Desenvolvimento de Sistemas (ADS).',
        'Apaixonado por Linux, automação e interfaces bonitas.',
    ],
    skills: () => [
        'Linguagens:  Python · Java · C / C++',
        'Web:         HTML · CSS · JavaScript',
        'Ambiente:    Pop!_OS · Git · VS Code',
    ],
    contato: () => {
        setTimeout(() => trocarPagina('contato'), 600);
        return ['Abrindo a seção de contato...'];
    },
    clear: () => {
        terminalOutput.innerHTML = '';
        return null; // sem output adicional
    },
};

function escreverNoTerminal(texto, tipo = 'output') {
    const p = document.createElement('p');
    p.innerHTML = texto;
    if (tipo === 'cmd') p.style.color = '#9ece6a';
    terminalOutput.appendChild(p);
    // Rola para o final automaticamente
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

if (terminalInput) {
    terminalInput.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter') return;

        const cmd = terminalInput.value.trim().toLowerCase();
        terminalInput.value = '';

        if (!cmd) return;

        // Mostra o comando digitado
        escreverNoTerminal(`<span class="prompt">igor@pop-os:~$</span> ${cmd}`, 'cmd');

        if (cmd in comandos) {
            const linhas = comandos[cmd]();
            if (linhas) {
                linhas.forEach(linha => escreverNoTerminal(linha));
            }
        } else {
            escreverNoTerminal(`bash: ${cmd}: comando não encontrado. Digite <span class="comando-destaque">help</span>.`);
        }
    });
}


// --- 3. FORMULÁRIO DE CONTATO (AJAX) ---
const formContato = document.getElementById('form-contato');

if (formContato) {
    formContato.addEventListener('submit', function (event) {
        event.preventDefault();

        const form   = event.target;
        const btn    = document.getElementById('btn-enviar');
        const status = document.getElementById('status-envio');

        btn.innerText = 'Enviando...';
        btn.disabled  = true;

        fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                status.innerText       = 'Mensagem enviada com sucesso! 🚀';
                status.style.color     = '#a29bfe';
                status.style.display   = 'block';
                form.reset();
            } else {
                status.innerText       = 'Ops! Ocorreu um erro ao enviar.';
                status.style.color     = '#ff7675';
                status.style.display   = 'block';
            }
        })
        .catch(() => {
            status.innerText     = 'Erro de conexão. Tente novamente.';
            status.style.color   = '#ff7675';
            status.style.display = 'block';
        })
        .finally(() => {
            btn.innerText = 'Enviar Mensagem';
            btn.disabled  = false;

            setTimeout(() => {
                status.style.display = 'none';
            }, 5000);
        });
    });
}