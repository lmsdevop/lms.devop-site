# lms.devop — portfólio

Landing page de portfólio de Lucas Mendonça: bilíngue (PT-BR/EN), com tema claro/escuro,
animações de scroll, command palette e projetos alimentados pela API do GitHub.

Construída com **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**
e **Motion**.

## Rodando localmente

```bash
npm install
npm run dev
```

O site sobe em [http://localhost:3000](http://localhost:3000).

Scripts disponíveis:

| Script              | O que faz                                  |
| ------------------- | ------------------------------------------ |
| `npm run dev`       | Servidor de desenvolvimento (Turbopack)    |
| `npm run build`     | Build de produção                          |
| `npm start`         | Serve o build de produção                  |
| `npm run lint`      | ESLint                                     |
| `npm run typecheck` | `tsc --noEmit`                             |

## Variáveis de ambiente

Todas são opcionais — o site funciona sem nenhuma delas. Copie `.env.example` para
`.env.local` e preencha o que for usar.

| Variável               | Para quê                                                                                     |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | URL canônica usada em metadata, sitemap e JSON-LD. Padrão: `https://lmsdevop.vercel.app`.    |
| `GITHUB_TOKEN`         | Token público (sem escopos) que eleva o rate limit da API do GitHub de 60 para 5.000 req/h.  |
| `RESEND_API_KEY`       | Habilita o envio de e-mail do formulário de contato via [Resend](https://resend.com).        |
| `CONTACT_FROM_EMAIL`   | Remetente verificado no Resend, ex.: `contato@seudominio.com`.                                |

Sem `RESEND_API_KEY`/`CONTACT_FROM_EMAIL`, a rota `/api/contact` responde `501` e o
formulário oferece automaticamente um link `mailto:` já preenchido — nada quebra.

## Personalizando o conteúdo

Todo o conteúdo mora em arquivos de dados tipados, sem CMS:

- `src/data/profile.ts` — nome, e-mail, redes, seções do menu e stack do marquee.
- `src/data/projects.ts` — curadoria dos repositórios: quais destacar, categoria,
  descrição própria e stack. Repositórios não listados ainda aparecem, com os dados
  crus do GitHub.
- `src/data/skills.ts` — categorias e níveis de proficiência.
- `src/data/timeline.ts` — formação, marcos e experiência.
- `src/data/testimonials.ts` — depoimentos (os atuais estão marcados como exemplo;
  troque por reais ou remova).
- `src/i18n/dictionaries/pt.ts` e `en.ts` — todos os textos. O `pt` é a fonte da
  verdade e o `en` é tipado contra ele, então esquecer uma tradução vira erro de tipo.

Para habilitar os botões de currículo, coloque o PDF em `public/` e aponte
`resumePath` em `src/data/profile.ts` para ele (ex.: `"/curriculo.pdf"`).

## Dados do GitHub

`src/lib/github.ts` busca perfil e repositórios com revalidação de 1 hora e mescla o
resultado com a curadoria de `src/data/projects.ts`. Se a API falhar ou estourar o
rate limit, a página cai para os projetos curados — o build nunca quebra por causa
disso.

## Deploy

Feito para a Vercel: importe o repositório, defina as variáveis de ambiente que quiser
e faça o deploy. `next build` gera as páginas estáticas, o sitemap, o `robots.txt`, o
favicon e a imagem de Open Graph.
