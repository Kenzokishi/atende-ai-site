'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const phone = '5569984454566';
const whatsappMessage = encodeURIComponent(
  'Olá Pedro, vi o site do Atende AI e quero entender como funcionaria para o meu negócio.'
);
const whatsappUrl = `https://wa.me/${phone}?text=${whatsappMessage}`;

// Cenários de chat que ciclam no preview
const chatScenarios = [
  {
    name: 'Clínica',
    bubbles: [
      { from: 'client', text: 'Oi, vocês fazem limpeza de pele?' },
      { from: 'bot', text: 'Fazemos sim! 💆‍♀️ Posso te oferecer dois horários: amanhã às 14h ou na quinta às 10h. Qual prefere?' },
      { from: 'client', text: 'Quinta às 10h fica ótimo.' },
      { from: 'bot', text: 'Perfeito! Pra confirmar, me passa seu nome completo e eu já agendo no sistema.' },
    ],
  },
  {
    name: 'Barbearia',
    bubbles: [
      { from: 'client', text: 'Tô passando aí em 30 min, dá pra cortar?' },
      { from: 'bot', text: 'Tem horário sim! 💈 Quer agendar com qual barbeiro: João, Lucas ou indiferente?' },
      { from: 'client', text: 'Indiferente.' },
      { from: 'bot', text: 'Agendei pro João às 19h30. Te mando lembrete 10 min antes!' },
    ],
  },
  {
    name: 'Loja',
    bubbles: [
      { from: 'client', text: 'Qual o preço do tênis branco que tá no story?' },
      { from: 'bot', text: 'É o Modelo Vega Branco, R$ 289 ou 3x sem juros. 👟 Quer ver o estoque por número?' },
      { from: 'client', text: 'Tem 41?' },
      { from: 'bot', text: 'Tem! Posso reservar pra você passar amanhã ou já gerar o pix?' },
    ],
  },
  {
    name: 'Serviço',
    bubbles: [
      { from: 'client', text: 'Preciso de orçamento pra reforma de banheiro.' },
      { from: 'bot', text: 'Bora! Pra te dar um valor justo, preciso de 3 infos: tamanho aproximado, cidade e prazo. ✏️' },
      { from: 'client', text: '6m², em Porto Velho, pra mês que vem.' },
      { from: 'bot', text: 'Show. Já passei pro Pedro que vai te mandar o orçamento detalhado em até 2h.' },
    ],
  },
];

// Loop de perguntas reais que rolam no marquee
const marqueeQuestions = [
  '“Vocês atendem hoje?”',
  '“Quanto custa?”',
  '“Tem horário pra amanhã?”',
  '“Aceita pix?”',
  '“Demora quanto?”',
  '“Vocês entregam?”',
  '“Tem desconto à vista?”',
  '“Posso parcelar?”',
  '“Funciona no domingo?”',
  '“Faz orçamento?”',
];

const benefits = [
  {
    icon: '💬',
    title: 'Resposta na hora',
    text: 'Ninguém fica no vácuo. O cliente recebe o primeiro contato em segundos, mesmo às 23h de domingo.',
  },
  {
    icon: '🎯',
    title: 'Lead já qualificado',
    text: 'A conversa coleta nome, necessidade, urgência e melhor horário antes de chamar o time.',
  },
  {
    icon: '🎨',
    title: 'Tom de voz sob medida',
    text: 'Nada de robô genérico. Roteiro escrito com as palavras, serviços e limites do seu negócio.',
  },
  {
    icon: '🤝',
    title: 'Repasse pra humano',
    text: 'Quando a conversa pede toque pessoal, o atendente recebe o contexto pronto pra continuar.',
  },
  {
    icon: '📊',
    title: 'Painel centralizado',
    text: 'Histórico de conversas, leads e métricas em um só lugar — sem planilha avulsa.',
  },
  {
    icon: '🛡️',
    title: 'Sem alucinação',
    text: 'Roteiro fechado: quando a pergunta sai do escopo, encaminha pro humano. Você fica no controle.',
  },
];

const setupSteps = [
  {
    title: 'Diagnóstico',
    text: 'Mapeio o atendimento atual, levanto as 20 perguntas que mais aparecem e identifico onde o time perde tempo.',
    chip: 'Dia 1',
  },
  {
    title: 'Roteiro & treino',
    text: 'Crio o script da conversa com regras claras pro bot não inventar nada — preços, prazos, FAQ, fluxos de venda.',
    chip: 'Dia 2-5',
  },
  {
    title: 'Configuração técnica',
    text: 'Conecto ao WhatsApp, configuro horários, alertas pra humano e teste em ambiente seguro com você.',
    chip: 'Dia 6-8',
  },
  {
    title: 'Entrega & ajustes',
    text: 'Vai pro ar, monitoro as primeiras conversas reais e ajusto o tom até ficar redondo.',
    chip: 'Dia 9-10',
  },
];

const faq = [
  {
    q: 'O bot vai substituir meu atendente?',
    a: 'Não. A ideia é tirar do seu time o trabalho repetitivo (responder horário, preço, endereço, etc.) e entregar a conversa pronta — com contexto e dados — pra pessoa fechar a venda.',
  },
  {
    q: 'Em quanto tempo fica no ar?',
    a: 'Em geral, 5 a 10 dias úteis pra implantação completa. Depende da complexidade do seu negócio e quantos serviços/produtos precisamos roteirizar.',
  },
  {
    q: 'Funciona no meu WhatsApp atual?',
    a: 'Sim. Trabalho com WhatsApp Business e API oficial. Avalio seu cenário e indico o melhor caminho — geralmente sem precisar mudar o número.',
  },
  {
    q: 'E se o bot errar uma resposta?',
    a: 'Roteiro é fechado. Quando a pergunta sai do escopo, ele encaminha pro humano automaticamente. Os ajustes são feitos toda semana com base nas conversas reais.',
  },
  {
    q: 'Quanto custa?',
    a: 'A partir de R$ 497 (setup ou mensalidade, conforme escopo). Depois de uma conversa rápida pra entender seu negócio, monto uma proposta sob medida.',
  },
  {
    q: 'Preciso entender de tecnologia?',
    a: 'Não precisa. Você só precisa saber como atende seus clientes hoje. O resto eu cuido — desde a configuração técnica até os ajustes mensais.',
  },
];

// ─── Componentes auxiliares ────────────────────────────────────────────

function Reveal({ children, delay = 0, as: Tag = 'div', className = '', ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function CountUp({ to, suffix = '', duration = 1400 }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const start = performance.now();
          const animate = (t) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(to * eased));
            if (p < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          io.disconnect();
        }
      });
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to, duration]);
  return (
    <span ref={ref}>
      {n.toLocaleString('pt-BR')}
      {suffix}
    </span>
  );
}

function ChatPlayground() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [shown, setShown] = useState(0);
  const scenario = chatScenarios[scenarioIdx];

  useEffect(() => {
    setShown(0);
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= scenario.bubbles.length) {
        clearInterval(interval);
        setTimeout(() => {
          setScenarioIdx((s) => (s + 1) % chatScenarios.length);
        }, 2600);
      }
    }, 1100);
    return () => clearInterval(interval);
  }, [scenarioIdx, scenario.bubbles.length]);

  return (
    <div className="playground">
      <div className="playground-tabs">
        {chatScenarios.map((s, idx) => (
          <button
            key={s.name}
            onClick={() => setScenarioIdx(idx)}
            className={`playground-tab ${scenarioIdx === idx ? 'active' : ''}`}
          >
            {s.name}
          </button>
        ))}
      </div>
      <div className="phone-card playground-phone">
        <div className="phone-glow" aria-hidden="true" />
        <div className="phone-top">
          <div className="phone-id">
            <div className="avatar">A</div>
            <div>
              <strong>Atende AI · {scenario.name}</strong>
              <small>
                <span className="status-dot" /> online agora
              </small>
            </div>
          </div>
          <span className="time">12:42</span>
        </div>
        <div className="chat-window">
          {scenario.bubbles.slice(0, shown).map((b, idx) => (
            <div key={`${scenarioIdx}-${idx}`} className={`bubble ${b.from}`}>
              {b.text}
            </div>
          ))}
          {shown < scenario.bubbles.length && (
            <div
              className={`typing ${
                scenario.bubbles[shown]?.from === 'client' ? 'client' : 'bot'
              }`}
              aria-label="digitando"
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </div>
        <div className="phone-footer">
          <span className="tag">
            <span className="status-dot" /> lead identificado
          </span>
          <span className="tag">humano avisado</span>
        </div>
      </div>
    </div>
  );
}

function RoiCalculator() {
  const [messages, setMessages] = useState(120);
  const [ticket, setTicket] = useState(180);
  const [conversion, setConversion] = useState(8);

  const result = useMemo(() => {
    // Suposição: bot recupera 35% dos leads que hoje você perde por demora
    const leadsRecovered = messages * 30 * (conversion / 100) * 0.35;
    const extraRevenue = leadsRecovered * ticket;
    const hoursSaved = (messages * 30 * 1.2) / 60;
    return {
      revenue: Math.round(extraRevenue),
      leads: Math.round(leadsRecovered),
      hours: Math.round(hoursSaved),
    };
  }, [messages, ticket, conversion]);

  return (
    <div className="calc">
      <div className="calc-inputs">
        <label>
          <span className="calc-label">
            Mensagens recebidas no WhatsApp por dia
          </span>
          <div className="calc-row">
            <input
              type="range"
              min="20"
              max="500"
              step="10"
              value={messages}
              onChange={(e) => setMessages(+e.target.value)}
            />
            <output className="calc-output">{messages}</output>
          </div>
        </label>
        <label>
          <span className="calc-label">Ticket médio (R$)</span>
          <div className="calc-row">
            <input
              type="range"
              min="50"
              max="1500"
              step="10"
              value={ticket}
              onChange={(e) => setTicket(+e.target.value)}
            />
            <output className="calc-output">R$ {ticket}</output>
          </div>
        </label>
        <label>
          <span className="calc-label">Taxa de conversão atual (%)</span>
          <div className="calc-row">
            <input
              type="range"
              min="2"
              max="30"
              step="1"
              value={conversion}
              onChange={(e) => setConversion(+e.target.value)}
            />
            <output className="calc-output">{conversion}%</output>
          </div>
        </label>
      </div>
      <div className="calc-result">
        <div className="calc-card">
          <span>Receita extra estimada / mês</span>
          <strong>
            R$ {result.revenue.toLocaleString('pt-BR')}
          </strong>
          <small>baseado em recuperação de leads que somem por demora</small>
        </div>
        <div className="calc-mini">
          <div>
            <strong>+{result.leads}</strong>
            <span>leads/mês recuperados</span>
          </div>
          <div>
            <strong>{result.hours}h</strong>
            <span>economizadas do time</span>
          </div>
        </div>
        <a className="primary-btn small" href={whatsappUrl} target="_blank" rel="noreferrer">
          Quero esse resultado no meu negócio
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}

// ─── Página ────────────────────────────────────────────

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <nav className={`navbar ${scrolled ? 'is-scrolled' : ''}`} aria-label="Navegação principal">
        <div className="navbar-inner">
          <a className="brand" href="#top" aria-label="Atende AI">
            <span className="brand-mark">A</span>
            <span className="brand-text">
              Atende <em>AI</em>
            </span>
          </a>
          <div className="nav-links">
            <a href="#playground">Playground</a>
            <a href="#beneficios">Benefícios</a>
            <a href="#calculadora">Calculadora</a>
            <a href="#setup">Como funciona</a>
            <a href="#faq">Dúvidas</a>
          </div>
          <a className="nav-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
            <span className="dot" /> Falar agora
          </a>
        </div>
      </nav>

      <header className="hero" id="top">
        <div className="hero-bg" aria-hidden="true">
          <div className="grid-bg" />
          <div className="orb orb-a" />
          <div className="orb orb-b" />
          <div className="orb orb-c" />
        </div>

        <div className="hero-grid" id="conteudo">
          <Reveal className="hero-copy">
            <span className="badge">
              <span className="dot" /> IA pra WhatsApp · feita à mão pro seu negócio
            </span>
            <h1>
              Seu WhatsApp <em>vendendo no automático</em>, com toque humano.
            </h1>
            <p className="lede">
              Atendente digital com IA que conhece o seu negócio, responde em
              segundos, qualifica o lead e chama o time só na hora de fechar a
              venda.
            </p>
            <div className="hero-actions">
              <a className="primary-btn" href={whatsappUrl} target="_blank" rel="noreferrer">
                Começar agora
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a className="ghost-btn" href="#playground">
                Ver demonstração
              </a>
            </div>
            <p className="microcopy">Sem cartão · Setup em até 10 dias úteis · Cancela quando quiser</p>
          </Reveal>

          <Reveal delay={120} className="hero-visual">
            <div className="phone-card hero-phone">
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
                <div className="bubble client" style={{ animationDelay: '.2s' }}>
                  Oi, vocês atendem hoje?
                </div>
                <div className="bubble bot" style={{ animationDelay: '.7s' }}>
                  Atendemos sim! 👋 Me fala rapidinho: você quer agendar, pedir
                  orçamento ou tirar uma dúvida?
                </div>
                <div className="bubble client" style={{ animationDelay: '1.4s' }}>
                  Queria orçamento.
                </div>
                <div className="bubble bot" style={{ animationDelay: '1.9s' }}>
                  Perfeito. Vou te pedir 3 infos rapidinhas e já deixo tudo pronto
                  pro Pedro continuar com você.
                </div>
                <div
                  className="typing client"
                  style={{ animationDelay: '2.6s', opacity: 0, animation: 'fadeIn .4s 2.6s forwards' }}
                  aria-label="digitando"
                >
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
            </div>
            <div className="badge-floating top">
              <span className="badge-floating-num">+47</span>
              <span>leads no piloto automático</span>
            </div>
            <div className="badge-floating bottom">
              <span className="badge-floating-num">2.3s</span>
              <span>tempo médio de resposta</span>
            </div>
          </Reveal>
        </div>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...marqueeQuestions, ...marqueeQuestions].map((q, i) => (
              <span className="marquee-item" key={i}>
                {q}
                <span className="marquee-dot">●</span>
              </span>
            ))}
          </div>
        </div>
      </header>

      <section className="stats-strip">
        <Reveal as="div" className="stats-inner">
          <div className="stat">
            <strong>
              <CountUp to={24} />/<CountUp to={7} />
            </strong>
            <span>primeiro contato sempre disponível</span>
          </div>
          <div className="stat">
            <strong>
              <CountUp to={92} suffix="%" />
            </strong>
            <span>de respostas resolvidas sem humano</span>
          </div>
          <div className="stat">
            <strong>
              <CountUp to={10} />x
            </strong>
            <span>menos mensagens repetidas no time</span>
          </div>
          <div className="stat">
            <strong>
              <CountUp to={2} />s
            </strong>
            <span>tempo médio até o primeiro retorno</span>
          </div>
        </Reveal>
      </section>

      <section className="section section-problem">
        <Reveal className="problem-grid">
          <div className="problem-copy">
            <span className="eyebrow">O problema é real</span>
            <h2>
              Mensagem que <em>fica sem resposta</em> é venda que vai pro concorrente.
            </h2>
            <p>
              Pequeno negócio perde dinheiro todo dia por motivo bobo: cliente
              manda mensagem, ninguém responde rápido, ele esquece. Atender bem é
              caro, atender mal é mais caro ainda.
            </p>
            <ul className="check-list">
              <li>Mensagem chegando às 22h, ninguém vê até o dia seguinte</li>
              <li>Time gastando 40% do dia explicando preço e horário</li>
              <li>Lead bom misturado com curioso e enrolão</li>
              <li>Cliente perguntando 3x a mesma coisa em conversas diferentes</li>
            </ul>
          </div>
          <div className="problem-visual">
            <div className="missed-card delay-0">
              <small>22:14 · não respondida</small>
              <p>“Vocês têm horário pra amanhã?”</p>
              <span className="missed-tag">⚠ perdida</span>
            </div>
            <div className="missed-card delay-1">
              <small>23:02 · não respondida</small>
              <p>“Quanto fica reforma de 6m²?”</p>
              <span className="missed-tag">⚠ perdida</span>
            </div>
            <div className="missed-card delay-2">
              <small>02:48 · não respondida</small>
              <p>“Aceita pix? Quero fechar agora.”</p>
              <span className="missed-tag">⚠ perdida</span>
            </div>
            <div className="missed-card answered">
              <small>22:14 · respondida em 2s</small>
              <p>“Vocês têm horário pra amanhã?”</p>
              <span className="answered-tag">✓ Atende AI</span>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section" id="playground">
        <Reveal className="section-heading">
          <span className="eyebrow">Veja na prática</span>
          <h2>
            Conversas reais, em <em>4 cenários</em> diferentes.
          </h2>
          <p>
            Cada negócio tem um jeito de atender. Clica nas abas e veja como a
            mesma IA muda de tom — clínica fala diferente de barbearia, que fala
            diferente de loja.
          </p>
        </Reveal>
        <Reveal>
          <ChatPlayground />
        </Reveal>
      </section>

      <section className="section" id="beneficios">
        <Reveal className="section-heading">
          <span className="eyebrow">Por que funciona</span>
          <h2>
            Mais resposta, mais organização, <em>menos atendimento perdido</em>.
          </h2>
        </Reveal>
        <div className="benefits-grid">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 60} className="benefit-card">
              <span className="benefit-icon">{b.icon}</span>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section" id="calculadora">
        <div className="calc-wrap">
          <Reveal className="section-heading left">
            <span className="eyebrow gold">Calculadora de impacto</span>
            <h2>
              Quanto você <em>deixa na mesa</em> hoje?
            </h2>
            <p>
              Estimativa rápida do que dá pra recuperar com primeiro contato 24/7
              e leads qualificados antes de chegar no seu time.
            </p>
          </Reveal>
          <Reveal>
            <RoiCalculator />
          </Reveal>
        </div>
      </section>

      <section className="section" id="setup">
        <div className="dark-panel">
          <Reveal className="section-heading left">
            <span className="eyebrow gold">Como funciona</span>
            <h2>
              Em <em>10 dias úteis</em>, seu WhatsApp vira um canal que vende.
            </h2>
          </Reveal>
          <ol className="steps-list">
            {setupSteps.map((step, idx) => (
              <Reveal as="li" key={step.title} delay={idx * 80} className="step-row">
                <div className="step-num">{String(idx + 1).padStart(2, '0')}</div>
                <div className="step-body">
                  <div className="step-head">
                    <h3>{step.title}</h3>
                    <span className="step-chip">{step.chip}</span>
                  </div>
                  <p>{step.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <Reveal className="offer-card">
          <div className="offer-copy">
            <span className="eyebrow">Modelo comercial</span>
            <h2>
              Implantação + mensalidade,
              <em> serviço recorrente.</em>
            </h2>
            <p>
              Configuração inicial, melhoria contínua do roteiro, monitoramento das
              conversas e suporte pra ajustar o tom conforme o negócio cresce.
            </p>
            <ul className="offer-list">
              <li>Roteiro escrito sob medida pro seu negócio</li>
              <li>Integração com WhatsApp Business ou API oficial</li>
              <li>Painel pra acompanhar leads e conversas</li>
              <li>Ajustes mensais com base nas conversas reais</li>
              <li>Suporte direto comigo (Pedro), sem fila</li>
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
            <small className="micro">resposta em até 2h em horário comercial</small>
          </div>
        </Reveal>
      </section>

      <section className="section" id="faq">
        <Reveal className="section-heading">
          <span className="eyebrow">FAQ</span>
          <h2>O que costumam perguntar antes de fechar.</h2>
        </Reveal>
        <div className="faq-grid">
          {faq.map((item, i) => (
            <Reveal key={item.q} delay={i * 40}>
              <details className="faq-item">
                <summary>
                  <span>{item.q}</span>
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <p>{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section contact-section" id="contato">
        <Reveal className="contact-card">
          <span className="eyebrow gold">Vamos conversar</span>
          <h2>
            Transforme seu WhatsApp em <em>um canal que trabalha</em> melhor.
          </h2>
          <p>
            Fale com <strong>Pedro Kenzo</strong> e peça uma simulação pro seu
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
        </Reveal>
      </section>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-col footer-brand">
            <div className="brand">
              <span className="brand-mark">A</span>
              <span className="brand-text">
                Atende <em>AI</em>
              </span>
            </div>
            <p>
              Atendimento por IA no WhatsApp, treinado à mão pro seu negócio.
              Por Pedro Kenzo.
            </p>
          </div>
          <div className="footer-col">
            <h4>Produto</h4>
            <a href="#playground">Playground</a>
            <a href="#beneficios">Benefícios</a>
            <a href="#calculadora">Calculadora</a>
            <a href="#setup">Como funciona</a>
          </div>
          <div className="footer-col">
            <h4>Contato</h4>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a>
            <a href="tel:+5569984454566">(69) 98445-4566</a>
            <a href="mailto:pedrokishi@gmail.com">pedrokishi@gmail.com</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Atende AI · Todos os direitos reservados</span>
          <span>Feito em Porto Velho, Brasil 🇧🇷</span>
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
          <path d="M16 3C9 3 3.4 8.6 3.4 15.6c0 2.5.7 4.8 1.9 6.8L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.6-5.6 12.6-12.6S23 3 16 3Zm0 22.8c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-4.1 1.3 1.3-4-.3-.4a10.2 10.2 0 0 1-1.6-5.4c0-5.6 4.6-10.2 10.4-10.2 5.6 0 10.2 4.6 10.2 10.2 0 5.6-4.6 10.2-10.2 10.2Zm5.6-7.7c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.7-.8-2.8-1.5-3.9-3.4-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.8.4-.3.3-1.1 1.1-1.1 2.6 0 1.5 1.1 3 1.3 3.3.2.2 2.2 3.4 5.4 4.7 2 .8 2.7.9 3.7.7.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4 0-.1-.2-.2-.5-.4Z" />
        </svg>
      </a>
    </main>
  );
}
