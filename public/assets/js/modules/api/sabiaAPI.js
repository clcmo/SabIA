// sabiaService.js - Serviço para integração com a API de conteúdos

const API_BASE_URL = "https://sua-funcao.cloudfunctions.net/api";

class SabiaService {
  constructor(apiUrl = API_BASE_URL) {
    this.apiUrl = apiUrl;
  }

  // Buscar todos os conteúdos
  async buscarTodosConteudos() {
    try {
      const response = await fetch(`${this.apiUrl}/conteudos`);
      if (!response.ok) throw new Error("Erro ao buscar conteúdos");
      return await response.json();
    } catch (error) {
      console.error("Erro:", error);
      throw error;
    }
  }

  // Buscar conteúdo específico por ID
  async buscarConteudoPorId(id) {
    try {
      const response = await fetch(`${this.apiUrl}/conteudos/${id}`);
      if (!response.ok) throw new Error("Conteúdo não encontrado");
      return await response.json();
    } catch (error) {
      console.error("Erro:", error);
      throw error;
    }
  }

  // Buscar por palavra-chave
  async buscarPorPalavraChave(termo) {
    try {
      const response = await fetch(
        `${this.apiUrl}/buscar?q=${encodeURIComponent(termo)}`
      );
      if (!response.ok) throw new Error("Erro na busca");
      return await response.json();
    } catch (error) {
      console.error("Erro:", error);
      throw error;
    }
  }

  // Buscar com relevância (melhor para chatbot)
  async buscarRelevante(termo) {
    try {
      const response = await fetch(
        `${this.apiUrl}/buscar-relevante?q=${encodeURIComponent(termo)}`
      );
      if (!response.ok) throw new Error("Erro na busca");
      return await response.json();
    } catch (error) {
      console.error("Erro:", error);
      throw error;
    }
  }

  // Buscar por categoria
  async buscarPorCategoria(categoria) {
    try {
      const response = await fetch(
        `${this.apiUrl}/categorias/${encodeURIComponent(categoria)}`
      );
      if (!response.ok) throw new Error("Erro ao buscar categoria");
      return await response.json();
    } catch (error) {
      console.error("Erro:", error);
      throw error;
    }
  }

  // Listar categorias disponíveis
  async listarCategorias() {
    try {
      const response = await fetch(`${this.apiUrl}/categorias`);
      if (!response.ok) throw new Error("Erro ao listar categorias");
      return await response.json();
    } catch (error) {
      console.error("Erro:", error);
      throw error;
    }
  }

  // Obter estatísticas
  async obterEstatisticas() {
    try {
      const response = await fetch(`${this.apiUrl}/estatisticas`);
      if (!response.ok) throw new Error("Erro ao obter estatísticas");
      return await response.json();
    } catch (error) {
      console.error("Erro:", error);
      throw error;
    }
  }

  // Processar pergunta do usuário e buscar conteúdo relevante
  async processarPergunta(pergunta) {
    try {
      // Extrai palavras-chave da pergunta
      const palavrasChave = this.extrairPalavrasChave(pergunta);
      
      // Busca conteúdos relevantes
      const resultado = await this.buscarRelevante(palavrasChave);
      
      if (resultado.total === 0) {
        return {
          encontrado: false,
          mensagem: "Não encontrei conteúdos relacionados à sua pergunta.",
          sugestao: "Tente reformular com outras palavras."
        };
      }

      // Retorna os conteúdos mais relevantes
      return {
        encontrado: true,
        total: resultado.total,
        conteudos: resultado.resultados.slice(0, 3), // Top 3
        mensagem: `Encontrei ${resultado.total} conteúdo(s) relacionado(s):`
      };
    } catch (error) {
      console.error("Erro ao processar pergunta:", error);
      return {
        encontrado: false,
        mensagem: "Desculpe, ocorreu um erro ao buscar informações.",
        erro: error.message
      };
    }
  }

  // Extrai palavras-chave relevantes da pergunta
  extrairPalavrasChave(texto) {
    // Remove palavras comuns (stop words)
    const stopWords = [
      "o", "a", "de", "da", "do", "em", "para", "com", "por", "sobre",
      "como", "qual", "quais", "quando", "onde", "porque", "me", "explique",
      "fale", "mostre", "quero", "preciso", "gostaria", "pode", "é", "são"
    ];

    return texto
      .toLowerCase()
      .replace(/[?!.,;]/g, "")
      .split(" ")
      .filter(palavra => palavra.length > 2 && !stopWords.includes(palavra))
      .join(" ");
  }

  // Formatar resposta do chatbot
  formatarResposta(resultado) {
    if (!resultado.encontrado) {
      return resultado.mensagem;
    }

    let resposta = `${resultado.mensagem}\n\n`;

    resultado.conteudos.forEach((conteudo, index) => {
      resposta += `${index + 1}. **${conteudo.titulo}**\n`;
      resposta += `   📅 ${new Date(conteudo.data).toLocaleDateString("pt-BR")}\n`;
      resposta += `   📝 ${conteudo.resumo.substring(0, 150)}...\n`;
      resposta += `   🔗 [Ler mais](${conteudo.link})\n\n`;
    });

    return resposta;
  }
}

// Exportar o serviço
export default SabiaService;

// Exemplo de uso no chatbot:
/*
import SabiaService from './sabiaService';

const sabia = new SabiaService('https://sua-url-da-api.com/api');

// Quando o usuário enviar uma mensagem
async function handleUserMessage(mensagem) {
  const resultado = await sabia.processarPergunta(mensagem);
  const resposta = sabia.formatarResposta(resultado);
  
  // Exibir resposta no chat
  exibirMensagem(resposta);
}

// Exemplo de busca específica
async function buscarSobreReact() {
  const resultado = await sabia.buscarRelevante("React hooks useState");
  console.log(resultado);
}

// Exemplo de listar categorias
async function mostrarCategorias() {
  const categorias = await sabia.listarCategorias();
  console.log(categorias);
}
*/