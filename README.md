# Atende AI — landing page

Landing page de um serviço meu: atendente com IA no WhatsApp para pequenos negócios que vendem, agendam ou fazem orçamento pelo celular. A página precisa convencer o dono do negócio em poucos segundos e levar a conversa para o WhatsApp.

**[Abrir o site](https://kenzokishi.github.io/atende-ai-site/)**

<img src="docs/desktop.jpg" alt="Primeira dobra da landing page do Atende AI no desktop" width="100%">

<p align="center"><img src="docs/mobile.jpg" alt="Landing page do Atende AI no celular" width="300"></p>

## O que tem na página

- **Playground de conversa**: cenários de atendimento em abas, com as mensagens aparecendo em sequência, como num chat de verdade.
- **Calculadora de retorno**: o visitante informa mensagens por mês, ticket médio e taxa de conversão e vê na hora quanto pode estar perdendo.
- Contadores animados, revelação das seções na rolagem, FAQ e botão flutuante de WhatsApp.
- Uma página só, gerada como estática no build: leve e fácil de hospedar.

## Stack

Next.js 14 (App Router), React 18 e CSS puro, sem biblioteca de UI.

## Rodar localmente

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # gera a versão estática na pasta out/
```

## Publicação

O site é exportado como estático (`output: 'export'`) e publicado no GitHub Pages pela branch `gh-pages`. Para gerar a versão com o caminho do Pages:

```bash
BASE_PATH=/atende-ai-site npm run build
```
