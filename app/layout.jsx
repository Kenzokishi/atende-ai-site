import './globals.css';

export const metadata = {
  title: 'Atende AI — Atendimento inteligente no WhatsApp',
  description:
    'Atendente digital com IA para WhatsApp: respostas rápidas, captação de leads qualificados e repasse pronto para o seu time. Para clínicas, salões, lojas e serviços.',
  metadataBase: new URL('https://atende-ai-site-vercel.vercel.app'),
  openGraph: {
    title: 'Atende AI — Atendimento inteligente no WhatsApp',
    description:
      'Transforme mensagens soltas em conversas organizadas, com IA treinada para o seu negócio.',
    type: 'website',
    locale: 'pt_BR',
  },
};

export const viewport = {
  themeColor: '#12100d',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
