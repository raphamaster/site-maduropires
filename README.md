# Maduro / Pires Advocacia — Site Institucional

Site institucional premium para o escritório **Maduro / Pires Advocacia**, desenvolvido com HTML5, CSS3 e JavaScript puro.

## Estrutura do projeto

```
site-maduropires/
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos completos (design system, componentes, responsivo)
├── js/
│   └── main.js         # Interações, animações, formulário
├── assets/
│   └── favicon.svg     # Ícone do site
└── README.md
```

## Como executar

### Opção 1 — Abrir direto no navegador
Abra o arquivo `index.html` diretamente no navegador (duplo clique ou `Ctrl+O`).

### Opção 2 — Servidor local (recomendado para desenvolvimento)

Com **Node.js** instalado:
```bash
npx serve .
```

Com **Python 3**:
```bash
python3 -m http.server 3000
```

Com **VS Code**: instale a extensão *Live Server* e clique em *Go Live*.

## Tecnologias

- **HTML5** semântico com Schema.org e Open Graph
- **CSS3** com design system via custom properties
- **JavaScript** vanilla (sem dependências externas)
- **Google Fonts**: Playfair Display, Cormorant Garamond, Inter
- **Web APIs**: IntersectionObserver, requestAnimationFrame

## Seções

| Seção | Descrição |
|-------|-----------|
| Hero | Tela inicial impactante com CTA para WhatsApp |
| Sobre | Apresentação do escritório com contadores animados |
| Citação | Banner com frase jurídica elegante |
| Áreas | Cards das 5 especialidades com hover premium |
| Advogados | Cards com contato direto dos sócios |
| Credibilidade | Diferenciais do escritório |
| Contato | Formulário integrado ao WhatsApp + informações |
| Footer | Links e dados do escritório |

## Personalização

### Cores (em `css/style.css` — seção `:root`)
```css
--gold:       #c9a84c;   /* Dourado principal */
--gold-light: #e0c06b;   /* Dourado claro (hover) */
--gold-dark:  #a07830;   /* Dourado escuro */
--black:      #0a0a0a;   /* Fundo principal */
```

### Contatos (em `index.html`)
- Substituir `+5516997225518` pelo número real do Dr. Maduro
- Substituir `+5516982173702` pelo número real do Dr. Fabio Pires

### Endereço
Localizar "Ribeirão Preto — SP" no `index.html` e atualizar com o endereço completo.

### Fotos dos advogados
Substituir os elementos `.avatar-initials` por tags `<img>` com fotos reais:
```html
<img src="assets/foto-maduro.jpg" alt="Dr. Maduro" class="avatar-photo" />
```
E adicionar em `css/style.css`:
```css
.avatar-photo { width: 72px; height: 72px; border-radius: 50%; object-fit: cover; }
```

## Deploy

Para publicar online, basta hospedar os arquivos em qualquer serviço de hospedagem estática:

- **Netlify**: arrastar a pasta para [netlify.com/drop](https://app.netlify.com/drop)
- **Vercel**: `npx vercel`
- **GitHub Pages**: habilitar em Settings > Pages
- **Hostinger / KingHost**: enviar via FTP

## Advogados

| Nome | OAB | Telefone |
|------|-----|----------|
| Dr. Maduro | OAB/SP 60.543 | (16) 99722-5518 |
| Dr. Fabio Pires | OAB/SP 517.730 | (16) 98217-3702 |
