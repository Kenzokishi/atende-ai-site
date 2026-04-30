const phone = '5569984454566';
const whatsappMessage = encodeURIComponent(
  'Olá Pedro, vi o site do Atende AI e quero entender como funcionaria para o meu negócio.'
);
const whatsappUrl = `https://wa.me/${phone}?text=${whatsappMessage}`;

const segments = [
  {
    title: 'Clínicas e consultórios',
    text: 'Pré-triagem, agendamento e confirmação sem deixar o paciente sem resposta.',
  },
  {
    title: 'Barbearias e salões',
    text: 'Agenda cheia com lembrete automático e fila de espera organizada.',
  },
  {
    title: 'Lojas e e-commerce local',
    text: 'Tira dúvida de produto, consulta estoque e fecha pedido pelo WhatsApp.',
  },
  {
    title: 'Serviços com orçamento',
    text: 'Coleta o briefing, qualifica o lead e entrega pronto pro time fechar.',
  },
];

const benefits = [
  {
    icon: '01',
    title: 'Atendimento que não some',
    text: 'O cliente recebe uma resposta inicial organizada, mesmo fora do horário, sem aquela sensação de mensagem jogada no vazio.',
  },
  {
    icon: '02',
    title: 'Lead separado do curioso',
    text: 'A conversa já coleta nome, necessidade, urgência e melhor horário antes de chamar uma pessoa do time.',
  },
  {
    icon: '03',
    title: 'Tom de voz sob medida',
    text: 'Nada de robô genérico. O roteiro é escrito com as palavras, serviços, preços e limites reais da empresa.',
  },
  {
    icon: '04',
    title: 'Repasse para humano',
    text: 'Quando a conversa pede negociação, reclamação ou fechamento, o atendente recebe o contexto pronto para continuar.',
  },
];

const steps = [
  {
    title: 'Diagnóstico',
    text: 'Mapeio o atendimento atual e as perguntas que mais tomam tempo do seu time.',
  },
  {
    title: 'Roteiro',
    text: 'Crio o script de conversa, com regras claras para o bot não inventar informação.',
  },
  {
    title: 'Configuração',
    text: 'Configuro o WhatsApp, mensagens, horário comercial e alertas para atendimento humano.',
  },
  {
    title: 'Entrega',
    text: 'Entrego testado, com ajustes finos para parecer atendimento de verdade.',
  },
];

const metrics = [
  ['24/7', 'primeiro contato sempre disponível'],
  ['10x', 'menos mensagens repetidas no time'],
  ['1 painel', 'leads e histórico centralizados'],
];

const faq = [
  {
    q: 'Substitui meu atendente humano?',
    a: 'Não. A ideia é tirar do seu time o trabalho repetitivo e entregar a conversa pronta — com contexto, dados e intenção — para a pessoa fechar a venda.',
  },
  {
    q: 'Em quanto tempo fica no ar?',
    a: 'Em geral, de 5 a 10 dias úteis para implantação completa, dependendo da complexidade do roteiro e da quantidade de produtos ou serviços.',
  },
  {
    q: 'Funciona no meu WhatsApp atual?',
    a: 'Sim. Trabalho com WhatsApp Business e API oficial. Avalio o seu cenário e indico o melhor caminho sem perder o número.',
  },
  {
    q: 'E se o bot errar uma resposta?',
    a: 'O roteiro é fechado: quando a pergunta sai do escopo, ele encaminha pro humano. Você fica no controle e os ajustes são feitos com base nas conversas reais.',
  },
];

export default function Home() {
  return (
    <main>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>

      <header className="hero-section" id="top">
        <div className="hero-bg" aria-hidden="true">
          <div className="orb orb-a" />
          <div className="orb orb-b" />
          <div className="orb orb-c" />
        </div>

        <nav className="navbar" aria-label="Navegação principal">
          <a className="brand" href="#top" aria-label="Atende AI">
            <span className="brand-mark">A</span>
            <span className="brand-text">
              Atende <em>AI</em>
            </span>
          </a>
          <div className="nav-links">
            <a href="#como-funciona">Como funciona</a>
            <a href="#nicho">Nichos</a>
            <a href="#beneficios">Benefícios</a>
            <a href="#faq">Dúvidas</a>
          </div>
          <a className="nav-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
            <span className="dot" /> Falar agora
          </a>
        </nav>

        <div className="hero-grid" id="conteudo">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="dot" /> Atendimento por IA no WhatsApp
            </span>
            <h1>
              Um atendente digital com <em>cara de equipe</em> bem treinada.
            </h1>
            <p className="lede">
              Transforme mensagens soltas em conversas organizadas. Respostas rápidas,
              captação de leads qualificados e repasse pronto para humano quando a
              venda precisa de toque pessoal.
            </p>
            <div className="hero-actions">
              <a className="primary-btn" href={whatsappUrl} target="_blank" rel="noreferrer">
                Quero ver no meu negócio
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a className="secondary-btn" href="#como-funciona">Ver como funciona</a>
            </div>
            <ul className="trust-row" aria-label="Diferenciais principais">
              <li>Sem texto engessado</li>
              <li>Configuração por nicho</li>
              <li>Pronto para revenda</li>
            </ul>
          </div>

          <aside className="phone-card" aria-label="Prévia de conversa no WhatsApp">
            <div className="phone-glow" aria-hidden="true" />
            <div className="phone-top">
              <div className="phone-id">
                <div className="avatar">A</div>
                <div>
                  <strong>Atende AI</strong>
                  <small>
                    <span className="status-dot" /> online agora
                  </small>
                </div>
              </div>
              <span className="time">12:42</span>
            </div>
            <div className="chat-window">
              <div className="bubble client">Oi, vocês atendem hoje?</div>
              <div className="bubble bot">
                Atendemos sim! Me fala rapidinho: você quer agendar, pedir orçamento
                ou tirar uma dúvida?
              </div>
              <div className="bubble client">Queria orçamento.</div>
              <div className="bubble bot">
                Perfeito. Vou te pedir 3 informações e já deixo tudo pronto pro
                Pedro Kenzo continuar com você.
              </div>
              <div className="typing" aria-label="digitando">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div className="phone-footer">
              <span className="tag">
                <span className="status-dot" /> lead identificado
              </span>
              <span className="tag">humano avisado</span>
            </div>
          </aside>
        </div>
      </header>

      <section className="metric-strip" aria-label="Resultados esperados">
        {metrics.map(([value, label]) => (
          <div key={label} className="metric">
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="section" id="nicho">
        <div className="section-heading">
          <span className="eyebrow">Nicho</span>
          <h2>
            Pensado para quem <em>vende e agenda</em> pelo WhatsApp.
          </h2>
          <p>
            O Atende AI é uma solução premium para empresas que recebem mensagens
            todo dia, mas perdem venda por demora, falta de padrão ou perguntas
            repetidas.
          </p>
        </div>
        <div className="segments-grid">
          {segments.map((item) => (
            <article key={item.title} className="segment-card">
              <div className="segment-card-head">
                <span className="segment-bullet" aria-hidden="true" />
                <h3>{item.title}</h3>
              </div>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="como-funciona">
        <div className="dark-panel">
          <div className="section-heading left">
            <span className="eyebrow gold">Como funciona</span>
            <h2>
              Não é só instalar um bot. É <em>desenhar um atendimento</em> que
              faz sentido.
            </h2>
          </div>
          <ol className="steps-grid">
            {steps.map((step, index) => (
              <li key={step.title} className="step-card">
                <span className="step-index">{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" id="beneficios">
        <div className="section-heading">
          <span className="eyebrow">Benefícios</span>
          <h2>
            Mais resposta, mais organização e <em>menos atendimento perdido</em>.
          </h2>
        </div>
        <div className="benefits-grid">
          {benefits.map((benefit) => (
            <article key={benefit.title} className="benefit-card">
              <span className="benefit-num">{benefit.icon}</span>
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="offer-card">
          <div className="offer-copy">
            <span className="eyebrow">Modelo comercial</span>
            <h2>
              Implantação + mensalidade,
              <em> serviço recorrente.</em>
            </h2>
            <p>
              Configuração inicial, melhoria contínua do roteiro, monitoramento das
              conversas e suporte para ajustar o tom conforme o negócio cresce.
            </p>
            <ul className="offer-list">
              <li>Roteiro escrito sob medida para o seu negócio</li>
              <li>Integração com WhatsApp Business ou API oficial</li>
              <li>Painel para acompanhar leads e conversas</li>
              <li>Ajustes mensais com base nas conversas reais</li>
            </ul>
          </div>
          <div className="price-note">
            <span>a partir de</span>
            <strong>
              R$ <em>497</em>
            </strong>
            <small>setup ou mensalidade, conforme escopo</small>
            <a className="primary-btn small" href={whatsappUrl} target="_blank" rel="noreferrer">
              Pedir proposta
            </a>
          </div>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="section-heading">
          <span className="eyebrow">Dúvidas frequentes</span>
          <h2>O que costumam perguntar antes de fechar.</h2>
        </div>
        <div className="faq-grid">
          {faq.map((item) => (
            <details key={item.q} className="faq-item">
              <summary>
                <span>{item.q}</span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section contact-section" id="contato">
        <div className="contact-card">
          <span className="eyebrow gold">Vamos conversar</span>
          <h2>
            Transforme seu WhatsApp em um <em>canal que trabalha</em> melhor.
          </h2>
          <p>
            Fale com <strong>Pedro Kenzo</strong> e peça uma simulação para o seu
            nicho. A ideia é mostrar, na prática, como ficaria o primeiro
            atendimento do seu cliente.
          </p>
          <div className="contact-actions">
            <a className="primary-btn light" href={whatsappUrl} target="_blank" rel="noreferrer">
              Chamar Pedro Kenzo no WhatsApp
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <small>Ou ligue: (69) 98445-4566</small>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="brand small">
            <span className="brand-mark">A</span>
            <span className="brand-text">
              Atende <em>AI</em>
            </span>
          </div>
          <p>© {new Date().getFullYear()} Atende AI · Atendimento inteligente por Pedro Kenzo</p>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      </footer>

      <a
        className="floating-whatsapp"
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
      >
        <svg width="26" height="26" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
          <path d="M16 3C9 3 3.4 8.6 3.4 15.6c0 2.5.7 4.8 1.9 6.8L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.6-5.6 12.6-12.6S23 3 16 3Zm0 22.8c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-4.1 1.3 1.3-4-.3-.4a10.2 10.2 0 0 1-1.6-5.4c0-5.6 4.6-10.2 10.4-10.2 5.6 0 10.2 4.6 10.2 10.2 0 5.6-4.6 10.2-10.2 10.2Zm5.6-7.7c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.7-.8-2.8-1.5-3.9-3.4-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.8.4-.3.3-1.1 1.1-1.1 2.6 0 1.5 1.1 3 1.3 3.3.2.2 2.2 3.4 5.4 4.7 2 .8 2.7.9 3.7.7.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4 0-.1-.2-.2-.5-.4Z"/>
        </svg>
      </a>
    </main>
  );
}
