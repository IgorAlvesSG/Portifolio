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
        '  <span style="color: #555;">...e talvez alguns segredos perdidos por aí.</span>'
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
        return null; 
    },

    // =========================================
    // 🥚 EASTER EGGS (COMANDOS SECRETOS)
    // =========================================

    // 1. A piada clássica do Linux

    shikai: () => [
        'Desperte, Kyouka Suigetsu...',
        '<span style="color: #bb9af7;">"Desde quando você estava sob a impressão de que este era um portfólio comum?"</span> 🎭',
        '(O terminal parece levemente distorcido agora)'
    ],
    expelliarmus: () => {
        // Desfoca a tela por 3 segundos como se tivesse perdido a varinha/foco
        document.body.style.filter = 'blur(5px)';
        setTimeout(() => document.body.style.filter = 'none', 3000);
        return ['✨ <span style="color: #ffbd2e;">Expelliarmus!</span> Você desarmou o navegador por 3 segundos.'];
    },
    // --- Referência de Programador (ADS Mode) ---
    "hello world": () => [
        'print("Hello, World!")',
        'System.out.println("Hello, World!");',
        'std::cout << "Hello, World!";',
        'console.log("Hello, World!");',
        '<span class="comando-destaque">O começo de tudo.</span>'
    ],

    sudo: () => [
        '<span style="color: #ff5f56;">igor não está no arquivo sudoers. Este incidente será relatado.</span> 🐧'
    ],

    // 2. O sagrado Neofetch (com arte ASCII do Pop!_OS e dados da sua máquina)
    neofetch: () => [
        '<span style="color: #61b5ff; font-weight: bold;">      //////</span>       <span style="color: #9ece6a; font-weight: bold;">igor@pop-os</span>',
        '<span style="color: #61b5ff; font-weight: bold;">    ////////</span>       -----------',
        '<span style="color: #61b5ff; font-weight: bold;">  //////////</span>       <span class="comando-destaque">OS:</span> Pop!_OS 22.04 LTS',
        '<span style="color: #61b5ff; font-weight: bold;"> ///////////</span>       <span class="comando-destaque">Host:</span> Acer Aspire 4739-6864',
        '<span style="color: #61b5ff; font-weight: bold;">////////////</span>       <span class="comando-destaque">Kernel:</span> 6.0.0-linux',
        '<span style="color: #61b5ff; font-weight: bold;">////////////</span>       <span class="comando-destaque">Uptime:</span> 21 years',
        '<span style="color: #61b5ff; font-weight: bold;"> ///////////</span>       <span class="comando-destaque">Shell:</span> bash 5.1.16',
        '<span style="color: #61b5ff; font-weight: bold;">  //////////</span>       <span class="comando-destaque">Resolution:</span> 1920x1080',
        '<span style="color: #61b5ff; font-weight: bold;">    ////////</span>       <span class="comando-destaque">Terminal:</span> Web',
        '<span style="color: #61b5ff; font-weight: bold;">      //////</span>       '
    ],

    // 3. Liberação de Reiatsu
    bankai: () => {
        // Muda as cores temporariamente para um estilo "sanguinário"
        terminalBody.style.color = '#ff5f56';
        terminalInput.style.color = '#ff5f56';
        
        // Volta ao normal após 4 segundos
        setTimeout(() => {
            terminalBody.style.color = '';
            terminalInput.style.color = '';
        }, 4000);
        
        return ['<span style="font-size: 1.2rem; font-weight: bold; letter-spacing: 2px;">Tensa Zangetsu...</span> ⚔️ (A pressão espiritual do terminal aumentou drasticamente)'];
    },

    // 4. Um feitiço útil
    lumos: () => {
        // Pega o contêiner principal para "acender a luz"
        const container = document.querySelector('.terminal-container');
        if (container) container.style.background = '#e0e5ec'; // Fundo claro
        terminalBody.style.color = '#1a1b26'; // Letra escura
        terminalInput.style.color = '#1a1b26';
        
        setTimeout(() => {
            if (container) container.style.background = ''; // Reseta o fundo
            terminalBody.style.color = '';
            terminalInput.style.color = '';
        }, 5000);

        return ['✨ <span style="font-style: italic;">Lumos Maxima!</span> (O terminal ficará ofuscante por 5 segundos)'];
    }
    
    
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
        escreverNoTerminal(`<span class="prompt">igor@terminal-os:~$</span> ${cmd}`, 'cmd');

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
