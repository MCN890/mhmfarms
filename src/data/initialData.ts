/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Especie, Animal, Utilizador, ConteudoWeb, EspecieWeb, MensagemWeb } from '../types';

export const INITIAL_UTILIZADORES: Utilizador[] = [
  {
    id: 1,
    nome: 'Dr. Alzira Chivambo',
    username: 'admin',
    passwordHash: 'admin123', // simulation
    perfil: 'ADMIN',
    email: 'ngulelemilson43@gmail.com',
  },
  {
    id: 2,
    nome: 'Eng. Mateus Munguambe',
    username: 'gestor',
    passwordHash: 'gestor123',
    perfil: 'GESTOR',
  },
  {
    id: 3,
    nome: 'Sérgio Tembe',
    username: 'operador',
    passwordHash: 'operador123',
    perfil: 'OPERADOR',
  },
];

export const INITIAL_ESPECIES: Especie[] = [
  { id: 1, nome: 'Girafa do Sul', descricao: 'Grandes mamíferos ruminantes nativos de África, caracterizados pelo pescoço extremamente longo.' },
  { id: 2, nome: 'Leão Africano', descricao: 'Grande felino carnívoro africano, conhecido pela sua juba majestosa e estrutura social de alcateia.' },
  { id: 3, nome: 'Camelo Árabe', descricao: 'Ruminante com uma única bossa, adaptado a ambientes áridos e secos, de alta resistência.' },
  { id: 4, nome: 'Avestruz Africana', descricao: 'A maior ave não voadora do mundo, ágil e de pernas longas, muito adaptada ao calor.' },
  { id: 5, nome: 'Órix-de-gala-branca', descricao: 'Elegante antílope africano com chifres longos e rectos, símbolo de resistência desértica.' },
  { id: 6, nome: 'Gazela de Thomson', descricao: 'Uma das gazelas mais conhecidas, velozes e ágeis, com uma distinta faixa preta lateral.' }
];

export const INITIAL_ANIMAIS: Animal[] = [
  // --- GIRAFA FAMILY (Generations 1, 2, 3) ---
  {
    id: 1,
    nome: 'Melman Senior',
    sexo: 'M',
    raca: 'Angolana',
    dataNasc: '2012-05-10',
    peso: 1200,
    estado: 'ACTIVO',
    idEspecie: 1,
    idPai: null,
    idMae: null,
  },
  {
    id: 2,
    nome: 'Cleo Mãe',
    sexo: 'F',
    raca: 'Angolana',
    dataNasc: '2013-09-18',
    peso: 850,
    estado: 'ACTIVO',
    idEspecie: 1,
    idPai: null,
    idMae: null,
  },
  {
    id: 3,
    nome: 'Melman Junior',
    sexo: 'M',
    raca: 'Angolana',
    dataNasc: '2018-04-12',
    peso: 980,
    estado: 'ACTIVO',
    idEspecie: 1,
    idPai: 1, // Melman Sr
    idMae: 2, // Cleo
  },
  {
    id: 4,
    nome: 'Zelda',
    sexo: 'F',
    raca: 'Masai',
    dataNasc: '2019-11-22',
    peso: 790,
    estado: 'ACTIVO',
    idEspecie: 1,
    idPai: null,
    idMae: null,
  },
  {
    id: 5,
    nome: 'Sara Cria',
    sexo: 'F',
    raca: 'Cruzada (Angolana/Masai)',
    dataNasc: '2023-01-15',
    peso: 220,
    estado: 'ACTIVO',
    idEspecie: 1,
    idPai: 3, // Melman Jr
    idMae: 4, // Zelda
  },
  {
    id: 6,
    nome: 'Toby Cria',
    sexo: 'M',
    raca: 'Cruzada (Angolana/Masai)',
    dataNasc: '2024-03-05',
    peso: 180,
    estado: 'ACTIVO',
    idEspecie: 1,
    idPai: 3, // Melman Jr
    idMae: 4, // Zelda
  },

  // --- LEÃO FAMILY ---
  {
    id: 7,
    nome: 'Simba',
    sexo: 'M',
    raca: 'Kruger',
    dataNasc: '2015-08-01',
    peso: 190,
    estado: 'ACTIVO',
    idEspecie: 2,
    idPai: null,
    idMae: null,
  },
  {
    id: 8,
    nome: 'Nala',
    sexo: 'F',
    raca: 'Kruger',
    dataNasc: '2016-11-12',
    peso: 130,
    estado: 'ACTIVO',
    idEspecie: 2,
    idPai: null,
    idMae: null,
  },
  {
    id: 9,
    nome: 'Kion Filho',
    sexo: 'M',
    raca: 'Kruger',
    dataNasc: '2020-05-18',
    peso: 175,
    estado: 'ACTIVO',
    idEspecie: 2,
    idPai: 7, // Simba
    idMae: 8, // Nala
  },
  {
    id: 10,
    nome: 'Kiara Filha',
    sexo: 'F',
    raca: 'Kruger',
    dataNasc: '2021-07-23',
    peso: 125,
    estado: 'QUARENTENA',
    idEspecie: 2,
    idPai: 7, // Simba
    idMae: 8, // Nala
  },
  {
    id: 11,
    nome: 'Mufasa II',
    sexo: 'M',
    raca: 'Kruger',
    dataNasc: '2025-01-10',
    peso: 45,
    estado: 'ACTIVO',
    idEspecie: 2,
    idPai: 9, // Kion
    idMae: 10, // Kiara (brother/sister crossing - incestuous!)
  },

  // --- OUTROS ANIMAIS ---
  {
    id: 12,
    nome: 'Zazu Avestruz',
    sexo: 'M',
    raca: 'Pescoço Azul',
    dataNasc: '2021-10-05',
    peso: 115,
    estado: 'ACTIVO',
    idEspecie: 4,
    idPai: null,
    idMae: null,
  },
  {
    id: 13,
    nome: 'Lola Avestruz',
    sexo: 'F',
    raca: 'Pescoço Azul',
    dataNasc: '2022-02-14',
    peso: 105,
    estado: 'ACTIVO',
    idEspecie: 4,
    idPai: null,
    idMae: null,
  },
  {
    id: 14,
    nome: 'Kiko Camelo',
    sexo: 'M',
    raca: 'Dromedário Árabe',
    dataNasc: '2018-06-30',
    peso: 520,
    estado: 'ACTIVO',
    idEspecie: 3,
    idPai: null,
    idMae: null,
  },
  {
    id: 15,
    nome: 'Kika Camela',
    sexo: 'F',
    raca: 'Dromedário Árabe',
    dataNasc: '2019-12-01',
    peso: 480,
    estado: 'FALECIDO',
    idEspecie: 3,
    idPai: null,
    idMae: null,
  },
  {
    id: 16,
    nome: 'Órix Rei',
    sexo: 'M',
    raca: 'Sahel',
    dataNasc: '2020-03-24',
    peso: 210,
    estado: 'ACTIVO',
    idEspecie: 5,
    idPai: null,
    idMae: null,
  },
];

export const INITIAL_NASCIMENTOS = [
  {
    id: 1,
    dataNasc: '2018-04-12',
    idMae: 2,
    idPai: 1,
    idCria: 3,
    observacoes: 'Parto natural sem complicações. A cria levantou-se após 45 minutos.',
  },
  {
    id: 2,
    dataNasc: '2023-01-15',
    idMae: 4,
    idPai: 3,
    idCria: 5,
    observacoes: 'Mãe primípara. Cria saudável, amamentação iniciada nas primeiras horas.',
  },
  {
    id: 3,
    dataNasc: '2024-03-05',
    idMae: 4,
    idPai: 3,
    idCria: 6,
    observacoes: 'Parto normal sob supervisão veterinária na ala sul da fazenda.',
  },
  {
    id: 4,
    dataNasc: '2025-01-10',
    idMae: 10,
    idPai: 9,
    idCria: 11,
    observacoes: 'Cruzamento não planeado entre irmãos. Cria sob observação genética próxima.',
  },
];

export const INITIAL_MORTALIDADES = [
  {
    id: 1,
    idAnimal: 15,
    dataMorte: '2025-08-22',
    causa: 'Infecção respiratória bacteriana aguda (Pneumonia)',
    observacoes: 'Animal apresentou febre e dispneia severa. Tratamento intensivo com antibióticos de largo espectro sem sucesso.',
  },
];

export const INITIAL_HISTORICO_SANITARIO = [
  {
    id: 1,
    idAnimal: 5,
    dataEvento: '2023-02-15',
    tipo: 'VACINA' as const,
    descricao: 'Primeira dose da vacina contra Carbúnculo Sintomático e Hemicéptico.',
    veterinario: 'Dr. Alzira Chivambo',
  },
  {
    id: 2,
    idAnimal: 10,
    dataEvento: '2026-05-10',
    tipo: 'DOENCA' as const,
    descricao: 'Sinais de claudicação da pata anterior esquerda e letargia. Colocada em quarentena de isolamento.',
    veterinario: 'Dra. Alzira Chivambo',
  },
  {
    id: 3,
    idAnimal: 10,
    dataEvento: '2026-05-12',
    tipo: 'TRATAMENTO' as const,
    descricao: 'Administração de anti-inflamatório injectável e curativo plantar preventivo.',
    veterinario: 'Dr. Alzira Chivambo',
  },
  {
    id: 4,
    idAnimal: 3,
    dataEvento: '2025-11-04',
    tipo: 'VACINA' as const,
    descricao: 'Reforço vacinal anual contra a Raiva e desparasitação interna regular.',
    veterinario: 'Dr. Alzira Chivambo',
  },
  {
    id: 5,
    idAnimal: 11,
    dataEvento: '2025-02-01',
    tipo: 'TRATAMENTO' as const,
    descricao: 'Avaliação clínica neonatal. Administrado suplemento de ferro e vitaminas para recém-nascido.',
    veterinario: 'Dr. Alzira Chivambo',
  },
];

export const INITIAL_CONTEUDO_WEB: ConteudoWeb[] = [
  {
    id: 1,
    tipo: 'PAGINA',
    titulo: 'Missão e Visão',
    corpo: 'A MHMFarms é uma fazenda dedicada à conservação, criação responsável e fomento de espécies animais em Moçambique. Combinamos rigor técnico, paixão pela natureza e tecnologia integrada para assegurar a melhor rastreabilidade genética e elevados padrões veterinários.',
    imagemUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=1000',
    dataPub: '2026-01-01 10:00:00',
    publicado: true,
  },
  {
    id: 2,
    tipo: 'SERVICO',
    titulo: 'Venda de Reprodutores Seleccionados',
    corpo: 'Disponibilizamos reprodutores registados e avaliados visualmente e geneticamente, acompanhados por relatório clínico completo, historial vacinal e ficha de árvore genealógica certificada contra consanguinidade. Garantia de saúde e pureza de linhagem.',
    imagemUrl: 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?auto=format&fit=crop&q=80&w=1000',
    dataPub: '2026-01-02 12:00:00',
    publicado: true,
  },
  {
    id: 3,
    tipo: 'SERVICO',
    titulo: 'Consultoria Agro-Pecuária e Maneio',
    corpo: 'Apoio técnico especializado para novas fazendas em Moçambique, cobrindo planeamento de pastagens, desenho de infraestruturas de maneio animal, programas profilácticos de sanidade animal e optimização de genealogias reprodutivas.',
    imagemUrl: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&q=80&w=1000',
    dataPub: '2026-01-03 14:00:00',
    publicado: true,
  },
  {
    id: 4,
    tipo: 'NOTICIA',
    titulo: 'Novos Investimentos e Tecnologia de Ponta na Fazenda',
    corpo: 'A MHMFarms apresenta com orgulho a implementação do seu novo sistema integrado de gestão "MHMfarmsGest". A partir de agora, toda a nossa árvore genealógica de animais será gerida digitalmente de forma a erradicar cruzamentos consanguíneos e elevar a transparência dos nossos registos biológicos e de saúde pública.',
    imagemUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1000',
    dataPub: '2026-05-24 09:15:00',
    publicado: true,
  },
  {
    id: 5,
    tipo: 'NOTICIA',
    titulo: 'Nascimento Histórico de uma Girafa na Fazenda',
    corpo: 'Celebrámos este mês o nascimento de uma linda cria de Girafa do Sul ("Toby Cria"), filho de Melman Junior e Zelda. O rastreio genealógico prévio garantiu um cruzamento 100% seguro de consanguinidade. A cria encontra-se de excelente saúde e já corre no parque de adaptação sob a supervisão clínica da nossa equipa veterenária.',
    imagemUrl: 'https://images.unsplash.com/photo-1501333400479-787517438505?auto=format&fit=crop&q=80&w=1000',
    dataPub: '2026-06-01 10:30:00',
    publicado: true,
  },
  {
    id: 6,
    tipo: 'NOTICIA',
    titulo: 'Campanha de Vacinação Sazonal Concluída com Sucesso',
    corpo: 'A equipa clínica da MHMFarms concluiu com êxito a campanha de vacinação anual que cobriu 100% do efectivo activo da fazenda. Foram administradas doses contra o Carbúnculo Sintomático, Raiva, Clostridiose e Febre Aftosa. Todos os registos foram digitalizados no sistema MHMfarmsGest para garantir rastreabilidade sanitária de cada animal. A próxima campanha está agendada para o primeiro trimestre de 2027.',
    imagemUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=1000',
    dataPub: '2026-06-10 08:00:00',
    publicado: true,
  },
  {
    id: 7,
    tipo: 'NOTICIA',
    titulo: 'Visita de Delegação da Faculdade de Veterinária da UEM',
    corpo: 'Recebemos com orgulho uma delegação de 28 estudantes e 3 professores da Faculdade de Veterinária da Universidade Eduardo Mondlane. A visita incluiu uma demonstração ao vivo do sistema de rastreio genealógico digital, a observação da rotina de maneio das girafas e a análise prática de fichas sanitárias. A directora do departamento, Dra. Fátima Muianga, elogiou o modelo integrado de gestão e manifestou interesse em estabelecer um protocolo de parceria científica com a MHMFarms.',
    imagemUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1000',
    dataPub: '2026-06-18 14:00:00',
    publicado: true,
  },
  {
    id: 8,
    tipo: 'NOTICIA',
    titulo: 'MHMFarms Abre Programa de Eco-Turismo de Fim-de-Semana',
    corpo: 'A partir de Julho de 2026, a MHMFarms abre as suas portas ao público em regime de eco-turismo controlado aos fins-de-semana. Os visitantes poderão participar em safaris guiados ao nascer do sol, sessões de fotografia de vida selvagem, visitas às instalações veterinárias e jantares temáticos no Boma Sunset Lodge. As reservas estão limitadas a 12 visitantes por sessão para garantir o mínimo impacto ambiental. As inscrições estão abertas através do formulário de contacto.',
    imagemUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1000',
    dataPub: '2026-06-22 09:00:00',
    publicado: true,
  },
];

export const INITIAL_ESPECIES_WEB: EspecieWeb[] = [
  {
    id: 1,
    idEspecie: 1,
    descricaoPublica: 'As nossas girafas são mantidas em vastos parques que reproduzem savanas arborizadas. Fomentamos a linhagem de Girafas Angolanas de elevada elegância e temperamento dócil.',
    imagemUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=600',
    visivel: true,
  },
  {
    id: 2,
    idEspecie: 2,
    descricaoPublica: 'Os leões em nosso santuário vivem em grandes recintos cercados que garantem a segurança pública de acordo com directivas internacionais, mantendo a majestade da raça Kruger.',
    imagemUrl: 'https://images.unsplash.com/photo-1614027164847-1b2809eb7b9b?auto=format&fit=crop&q=80&w=600',
    visivel: true,
  },
  {
    id: 3,
    idEspecie: 3,
    descricaoPublica: 'Camelo Dromedário Árabe ideal para tração, carga e adaptação extrema em regiões áridas do sul e centro do país, selecionados sob rigorosa robustez músculo-esquelética.',
    imagemUrl: 'https://images.unsplash.com/photo-1557223562-6c770482188e?auto=format&fit=crop&q=80&w=600',
    visivel: true,
  },
  {
    id: 4,
    idEspecie: 4,
    descricaoPublica: 'Avestruzes de alta postura, ideais para fomento agro-pecuário de carne de alto valor proteico e baixo teor em gordura, e comercialização de plumas decorativas de alta qualidade.',
    imagemUrl: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&q=80&w=600',
    visivel: true,
  },
  {
    id: 5,
    idEspecie: 5,
    descricaoPublica: 'O Órix-de-gala-branca é um dos tesouros mais raros do nosso parque. Participamos activamente no esforço internacional de catalogação e cruzamentos controlados.',
    imagemUrl: 'https://images.unsplash.com/photo-1484406566174-9da000fda645?auto=format&fit=crop&q=80&w=600',
    visivel: true,
  },
  {
    id: 6,
    idEspecie: 6,
    descricaoPublica: 'A Gazela de Thomson é uma das mais rápidas e elegantes da savana africana, conhecida pela sua distinta faixa preta e movimentos ágeis que desafiam predadores.',
    imagemUrl: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&q=80&w=600',
    visivel: true,
  },
];

export const INITIAL_MENSAGENS_WEB: MensagemWeb[] = [
  {
    id: 1,
    nome: 'Carlos Meneses',
    email: 'carlos.meneses@eco-safaris.co.mz',
    assunto: 'Pedido de Orçamento - Reprodutores de Órix',
    mensagem: 'Prezada equipa da MHMFarms, estamos a expandir o nosso parque de eco-turismo florestal em Maputo e gostávamos de saber se têm reprodutores de Órix-de-gala-branca e se nos podem enviar dados genealógicos para garantir que não temos consanguinidade com os nossos machos existentes.',
    dataRecebido: '2026-05-28 15:40:00',
    lida: false,
  },
  {
    id: 2,
    nome: 'Maria Noémia Silveira',
    email: 'silveira.noemia@edu.ac.mz',
    assunto: 'Visita de Estudo de Alunos da Faculdade de Veterinária',
    mensagem: 'Gostaríamos de agendar uma visita guiada com 25 alunos do 4º ano do curso de Medicina Veterinária no dia 18 de Junho para compreenderem como funciona a vossa profilaxia sanitária e o vosso algoritmo de prevenção de inbreeding.',
    dataRecebido: '2026-06-01 11:20:00',
    lida: true,
  },
];
