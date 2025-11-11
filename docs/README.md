# Insert Title

[![GitHub license](https://img.shields.io/github/license/clcmo/web?style=for-the-badge)](https://github.com/clcmo/web)
[![GitHub stars](https://img.shields.io/github/stars/clcmo/web?style=for-the-badge)](https://github.com/clcmo/web/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/clcmo/web?style=for-the-badge)](https://github.com/clcmo/web/network)
[![GitHub issues](https://img.shields.io/github/issues/clcmo/web?style=for-the-badge)](https://github.com/clcmo/web/issues)
[![GitHub donate](https://img.shields.io/github/sponsors/clcmo?color=pink&style=for-the-badge)](https://github.com/sponsors/clcmo)

# 🐦 SabIA - Assistente Inteligente de Estudos

Um chatbot educacional que busca e apresenta conteúdos do seu blog de forma inteligente e interativa.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Firebase](https://img.shields.io/badge/Firebase-Functions-orange.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)

## 🎯 Funcionalidades

✅ **Busca Inteligente de Conteúdos**
- Busca por relevância nos posts do blog
- Ranking automático dos melhores resultados
- Sugestões de categorias relacionadas

✅ **Interface Conversacional**
- Chat intuitivo e responsivo
- Efeito de digitação
- Indicador de processamento
- Suporte a comandos especiais

✅ **Segurança**
- Sem chaves expostas no frontend
- Cloud Functions para operações sensíveis
- Firestore Rules configuradas

✅ **Performance**
- Cache de conteúdos (5 minutos)
- Otimização de requisições
- Carregamento rápido

## 🏗️ Arquitetura

```
┌─────────────┐
│   Frontend  │ (public/)
│  (HTML/JS)  │
└──────┬──────┘
       │
       │ HTTP Requests
       ▼
┌─────────────────────┐
│  Cloud Functions    │
├─────────────────────┤
│ /api  → Conteúdos   │ ← RSS Feed (Blog)
│ /chat → Firestore   │ ← Firebase DB
└─────────────────────┘
```

### Módulos

- **`app.js`** - Orquestrador principal
- **`model.js`** - Comunicação com backend (segura)
- **`sabiaAPI.js`** - Cliente HTTP para API de conteúdos
- **`config.js`** - Configurações centralizadas
- **`chatUI.js`** - Interface do usuário
- **`chatManager.js`** - Lógica de negócio

## 🚀 Início Rápido

### 1. Clone os repositórios

```bash
# Repositório principal (frontend)
git clone https://github.com/clcmo/sabia.git

# Repositório da API (backend)
git clone https://github.com/clcmo/sabia-api.git
```

### 2. Instale dependências

```bash
cd sabia-api
npm install

cd ../sabia
npm install
```

### 3. Configure o Firebase

```bash
firebase init
```

Selecione: Functions, Hosting, Firestore

### 4. Deploy

```bash
# Deploy das Cloud Functions
firebase deploy --only functions

# Deploy do frontend
firebase deploy --only hosting
```

### 5. Configure URLs

Atualize `public/js/modules/api/config.js` com as URLs obtidas no deploy:

```javascript
export const API_CONFIG = {
  BASE_URL: 'https://sua-url.cloudfunctions.net/api',
  CHAT_API_URL: 'https://sua-url.cloudfunctions.net/chat',
};
```

📖 **[Guia de Instalação Completo](GUIA_INSTALACAO.md)**

## 📡 API Endpoints

### API de Conteúdos (`/api`)

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/conteudos` | GET | Lista todos os posts |
| `/conteudos/:id` | GET | Busca post específico |
| `/buscar?q=termo` | GET | Busca por palavra-chave |
| `/buscar-relevante?q=termo` | GET | Busca com ranking |
| `/categorias` | GET | Lista categorias |
| `/categorias/:nome` | GET | Posts por categoria |
| `/estatisticas` | GET | Estatísticas gerais |

### API de Chat (`/chat`)

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/save` | POST | Salva mensagem |
| `/history` | GET | Obtém histórico |
| `/delete` | DELETE | Deleta histórico |

## 💬 Comandos do Chat

- **`/help`** - Mostra ajuda
- **`/categorias`** - Lista categorias disponíveis
- **`/limpar`** - Limpa o chat

Ou simplesmente faça perguntas naturais:
- "Me explique sobre React Hooks"
- "Como usar useState?"
- "Quero aprender TypeScript"

## 🔐 Segurança

### ✅ O que fizemos:

1. **Chaves no Backend**: Firebase config apenas nas Cloud Functions
2. **Firestore Rules**: Acesso controlado via autenticação
3. **CORS Configurado**: Apenas origens permitidas
4. **Validação de Input**: Sanitização de mensagens
5. **Rate Limiting**: Proteção contra abuso (via Firebase)

### ⚠️ Importante:

- **NUNCA** commite `firebase-config.js`
- Use `.gitignore` adequadamente
- Configure Firestore Rules no console
- Monitore logs das Functions regularmente

```bash
# Ver logs
firebase functions:log
```

## 📊 Estrutura do Projeto

```
sabia/
├── public/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── app.js
│       ├── model.js
│       └── modules/
│           ├── api/
│           │   ├── config.js
│           │   └── sabiaAPI.js
│           └── chat/
│               ├── chatManager.js
│               └── chatUI.js
├── functions/
│   ├── index.js          # APIs (conteúdo + chat)
│   └── package.json
├── .gitignore           # IMPORTANTE!
├── firebase.json
└── README.md
```

## 🧪 Testes

```bash
# Testar API de conteúdos
curl https://sua-url.cloudfunctions.net/api/categorias

# Testar API de chat
curl https://sua-url.cloudfunctions.net/chat

# Emuladores locais
firebase emulators:start
```

## 📈 Performance

- ⚡ Cache de RSS feed: 1 hora
- ⚡ Cache de busca: 5 minutos
- ⚡ Lazy loading de mensagens
- ⚡ Debounce em requisições

## 🎨 Customização

### Mudar cores

Edite `public/css/style.css`:

```css
:root {
  --primary-color: #4a90e2;
  --secondary-color: #f39c12;
  --user-bg: #4a90e2;
  --bot-bg: #f0f0f0;
}
```

### Mudar mensagens do bot

Edite `public/js/modules/api/config.js`:

```javascript
export const CHAT_CONFIG = {
  MESSAGES: {
    WELCOME: 'Sua mensagem personalizada!',
    // ...
  }
};
```

## 🐛 Troubleshooting

### Erro: "Cannot read property 'value' of null"
- Verifique se os IDs no HTML correspondem ao JS

### Erro: CORS Policy
- Configure CORS nas Cloud Functions
- Verifique whitelist de domínios

### Cache não atualiza
- Use `sabiaAPI.clearCache()`
- Ou aguarde expiração (5 min)

### Functions com erro 500
- Veja logs: `firebase functions:log`
- Verifique formato do RSS feed

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit: `git commit -m 'Adiciona nova funcionalidade'`
4. Push: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

## 📝 Roadmap

- [ ] Autenticação de usuários
- [ ] Histórico personalizado por usuário
- [ ] Integração com GPT para respostas contextuais
- [ ] Busca vetorial (embeddings)
- [ ] Modo offline
- [ ] App mobile (React Native)
- [ ] Analytics de conversas

## 📄 Licença

MIT License - veja [LICENSE](LICENSE)

## 👨‍💻 Autor

**Seu Nome**
- GitHub: [@clcmo](https://github.com/clcmo)
- Blog: [apprendendo.blog](https://apprendendo.blog)

## 🙏 Agradecimentos

- Firebase por hospedar a aplicação
- Comunidade open source
- Usuários que testaram o SabIA

---

⭐ Se este projeto te ajudou, deixe uma estrela!

📧 Dúvidas? Abra uma [issue](https://github.com/clcmo/sabia/issues)