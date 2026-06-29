/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Utilizador,
  Especie,
  Animal,
  Nascimento,
  Mortalidade,
  HistoricoSanitario,
  ConteudoWeb,
  EspecieWeb,
  MensagemWeb,
  ConsecutividadeAlerta,
  SexoAnimal,
} from '../types';
import {
  INITIAL_UTILIZADORES,
  INITIAL_ESPECIES,
  INITIAL_ANIMAIS,
  INITIAL_NASCIMENTOS,
  INITIAL_MORTALIDADES,
  INITIAL_HISTORICO_SANITARIO,
  INITIAL_CONTEUDO_WEB,
  INITIAL_ESPECIES_WEB,
  INITIAL_MENSAGENS_WEB,
} from '../data/initialData';

interface FarmContextType {
  utilizadores: Utilizador[];
  especies: Especie[];
  animais: Animal[];
  nascimentos: Nascimento[];
  mortalidades: Mortalidade[];
  historicoSanitario: HistoricoSanitario[];
  conteudoWeb: ConteudoWeb[];
  especiesWeb: EspecieWeb[];
  mensagensWeb: MensagemWeb[];
  currentUser: Utilizador | null;
  
  // Actions
  login: (username: string, passwordHash: string) => boolean;
  logout: () => void;
  registrarAnimal: (animal: Omit<Animal, 'id'>) => { success: boolean; message: string; animal?: Animal };
  editarAnimal: (animal: Animal) => { success: boolean; message: string };
  registrarNascimento: (nascimento: Omit<Nascimento, 'id'>, raca: string, nome: string, peso: number) => { success: boolean; message: string };
  registrarMortalidade: (mortalidade: Omit<Mortalidade, 'id'>) => { success: boolean; message: string };
  registrarHistoricoSanitario: (evento: Omit<HistoricoSanitario, 'id'>) => void;
  
  // CMS Actions
  criarNoticia: (conteudo: Omit<ConteudoWeb, 'id' | 'tipo' | 'dataPub'>) => void;
  editarNoticia: (id: number, conteudo: Partial<ConteudoWeb>) => void;
  excluirNoticia: (id: number) => void;
  salvarEspecieWeb: (especieWeb: EspecieWeb) => void;
  marcarMensagemComoLida: (id: number) => void;
  registrarMensagemWeb: (mensagem: Omit<MensagemWeb, 'id' | 'dataRecebido' | 'lida'>) => void;

  // Genealogy Utilities
  getAncestorsWithDistance: (animalId: number) => Map<number, number>;
  analisarParentesco: (idMacho: number, idFemea: number) => ConsecutividadeAlerta;
  indentificarAlertasConsanguinidade: () => ConsecutividadeAlerta[];
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export const FarmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from local storage or fallback to dynamic initial presets
  const [utilizadores, setUtilizadores] = useState<Utilizador[]>(() => {
    const saved = localStorage.getItem('mhm_utilizadores');
    return saved ? JSON.parse(saved) : INITIAL_UTILIZADORES;
  });

  const [especies, setEspecies] = useState<Especie[]>(() => {
    const saved = localStorage.getItem('mhm_especies');
    return saved ? JSON.parse(saved) : INITIAL_ESPECIES;
  });

  const [animais, setAnimais] = useState<Animal[]>(() => {
    const saved = localStorage.getItem('mhm_animais');
    return saved ? JSON.parse(saved) : INITIAL_ANIMAIS;
  });

  const [nascimentos, setNascimentos] = useState<Nascimento[]>(() => {
    const saved = localStorage.getItem('mhm_nascimentos');
    return saved ? JSON.parse(saved) : INITIAL_NASCIMENTOS;
  });

  const [mortalidades, setMortalidades] = useState<Mortalidade[]>(() => {
    const saved = localStorage.getItem('mhm_mortalidades');
    return saved ? JSON.parse(saved) : INITIAL_MORTALIDADES;
  });

  const [historicoSanitario, setHistoricoSanitario] = useState<HistoricoSanitario[]>(() => {
    const saved = localStorage.getItem('mhm_historico_sanitario');
    return saved ? JSON.parse(saved) : INITIAL_HISTORICO_SANITARIO;
  });

  const [conteudoWeb, setConteudoWeb] = useState<ConteudoWeb[]>(() => {
    const saved = localStorage.getItem('mhm_conteudo_web');
    return saved ? JSON.parse(saved) : INITIAL_CONTEUDO_WEB;
  });

  const [especiesWeb, setEspeciesWeb] = useState<EspecieWeb[]>(() => {
    const saved = localStorage.getItem('mhm_especies_web');
    return saved ? JSON.parse(saved) : INITIAL_ESPECIES_WEB;
  });

  const [mensagensWeb, setMensagensWeb] = useState<MensagemWeb[]>(() => {
    const saved = localStorage.getItem('mhm_mensagens_web');
    return saved ? JSON.parse(saved) : INITIAL_MENSAGENS_WEB;
  });

  const [currentUser, setCurrentUser] = useState<Utilizador | null>(() => {
    const saved = localStorage.getItem('mhm_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Sync to LS
  useEffect(() => {
    localStorage.setItem('mhm_utilizadores', JSON.stringify(utilizadores));
  }, [utilizadores]);

  useEffect(() => {
    localStorage.setItem('mhm_especies', JSON.stringify(especies));
  }, [especies]);

  useEffect(() => {
    localStorage.setItem('mhm_animais', JSON.stringify(animais));
  }, [animais]);

  useEffect(() => {
    localStorage.setItem('mhm_nascimentos', JSON.stringify(nascimentos));
  }, [nascimentos]);

  useEffect(() => {
    localStorage.setItem('mhm_mortalidades', JSON.stringify(mortalidades));
  }, [mortalidades]);

  useEffect(() => {
    localStorage.setItem('mhm_historico_sanitario', JSON.stringify(historicoSanitario));
  }, [historicoSanitario]);

  useEffect(() => {
    localStorage.setItem('mhm_conteudo_web', JSON.stringify(conteudoWeb));
  }, [conteudoWeb]);

  useEffect(() => {
    localStorage.setItem('mhm_especies_web', JSON.stringify(especiesWeb));
  }, [especiesWeb]);

  useEffect(() => {
    localStorage.setItem('mhm_mensagens_web', JSON.stringify(mensagensWeb));
  }, [mensagensWeb]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('mhm_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('mhm_current_user');
    }
  }, [currentUser]);

  // Auth Action
  const login = (username: string, passwordHash: string): boolean => {
    const user = utilizadores.find(
      (u) => u.username.toLowerCase() === username.toLowerCase() && u.passwordHash === passwordHash
    );
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // 3.3 Lógica de Genealogia — Rastreio de Ancestrais
  const getAncestorsWithDistance = (animalId: number): Map<number, number> => {
    const visited = new Map<number, number>();
    
    const recurse = (currentId: number, currentDistance: number) => {
      const animal = animais.find((a) => a.id === currentId);
      if (!animal) return;

      if (animal.idPai) {
        const prevDist = visited.get(animal.idPai);
        if (prevDist === undefined || currentDistance + 1 < prevDist) {
          visited.set(animal.idPai, currentDistance + 1);
          recurse(animal.idPai, currentDistance + 1);
        }
      }
      if (animal.idMae) {
        const prevDist = visited.get(animal.idMae);
        if (prevDist === undefined || currentDistance + 1 < prevDist) {
          visited.set(animal.idMae, currentDistance + 1);
          recurse(animal.idMae, currentDistance + 1);
        }
      }
    };

    recurse(animalId, 0);
    return visited;
  };

  // Pure validation check on the fly
  const analisarParentesco = (idMacho: number, idFemea: number): ConsecutividadeAlerta => {
    const macho = animais.find((a) => a.id === idMacho);
    const femea = animais.find((a) => a.id === idFemea);

    // Initial defensive checks
    if (!macho || !femea) {
      return {
        animalA: macho || {} as Animal,
        animalB: femea || {} as Animal,
        grau: 999,
        relevancia: 'SEGURO',
        descricao: 'Dados do animal incompletos ou não encontrados.',
      };
    }

    if (macho.idEspecie !== femea.idEspecie) {
      return {
        animalA: macho,
        animalB: femea,
        grau: 999,
        relevancia: 'SEGURO',
        descricao: 'Animais de espécies distintas. Não há risco de parentesco, embora o cruzamento seja incompatível de forma biológica.',
      };
    }

    // Check Case A: Direct parent-child
    if (femea.idPai === macho.id) {
      return {
        animalA: macho,
        animalB: femea,
        grau: 1,
        relevancia: 'PROIBIDO_DIRECTO',
        descricao: `Bloqueio Total: Parentesco de 1º Grau Directo. O macho [${macho.nome}] é o PAI da fêmea [${femea.nome}]. Cruzamento estritamente proibido.`,
      };
    }
    if (macho.idMae === femea.id) {
      return {
        animalA: macho,
        animalB: femea,
        grau: 1,
        relevancia: 'PROIBIDO_DIRECTO',
        descricao: `Bloqueio Total: Parentesco de 1º Grau Directo. A fêmea [${femea.nome}] é a MÃE do macho [${macho.nome}]. Cruzamento estritamente proibido.`,
      };
    }

    // Check Case B: Full siblings (share same father and same mother)
    if (
      macho.idPai !== null &&
      macho.idPai === femea.idPai &&
      macho.idMae !== null &&
      macho.idMae === femea.idMae
    ) {
      return {
        animalA: macho,
        animalB: femea,
        grau: 1,
        relevancia: 'PROIBIDO_COLATERAL',
        descricao: `Bloqueio Total: Irmãos de Pai e Mãe (1º Grau Colateral). Partilham os mesmos genitores (${
          animais.find((a) => a.id === macho.idPai)?.nome || 'Pai'
        } e ${animais.find((a) => a.id === macho.idMae)?.nome || 'Mãe'}). Cruzamento proibido para preservar a espécie.`,
      };
    }

    // Check Case C: Half siblings (share one parent)
    const shareFather = macho.idPai !== null && macho.idPai === femea.idPai;
    const shareMother = macho.idMae !== null && macho.idMae === femea.idMae;
    if (shareFather || shareMother) {
      const parentName = shareFather
        ? animais.find((a) => a.id === macho.idPai)?.nome || 'Pai Comum'
        : animais.find((a) => a.id === macho.idMae)?.nome || 'Mãe Comum';
      return {
        animalA: macho,
        animalB: femea,
        grau: 1,
        relevancia: 'PROIBIDO_COLATERAL',
        descricao: `Bloqueio Total: Meios-Irmãos (1º Grau Colateral Parcial). Partilham o mesmo progenitor [${parentName}]. Cruzamento não recomendado e bloqueado regulamentarmente na fazenda.`,
      };
    }

    // Query recursive lineages
    const machoAncestors = getAncestorsWithDistance(macho.id);
    const femeaAncestors = getAncestorsWithDistance(femea.id);

    // If one is an ancestor of the other
    if (machoAncestors.has(femea.id)) {
      const dist = machoAncestors.get(femea.id)!;
      if (dist === 2) {
        return {
          animalA: macho,
          animalB: femea,
          grau: 2,
          relevancia: 'ALERTA_RECOMENDADO',
          descricao: `Alerta Vermelho: Relação Directa de 2º Grau (Avó × Neto). A fêmea [${femea.nome}] é a avó do macho [${macho.nome}]. Evitar este acasalamento.`,
        };
      }
      return {
        animalA: macho,
        animalB: femea,
        grau: dist,
        relevancia: 'ALERTA_MODERADO',
        descricao: `Alerta Laranja: Relação Directa de ${dist}º Grau (Ancestralidade Directa). A fêmea [${femea.nome}] é bisavó ou superior do macho [${macho.nome}]. Risco de consanguinidade presente.`,
      };
    }

    if (femeaAncestors.has(macho.id)) {
      const dist = femeaAncestors.get(macho.id)!;
      if (dist === 2) {
        return {
          animalA: macho,
          animalB: femea,
          grau: 2,
          relevancia: 'ALERTA_RECOMENDADO',
          descricao: `Alerta Vermelho: Relação Directa de 2º Grau (Avô × Neta). O macho [${macho.nome}] é o avô da fêmea [${femea.nome}]. Cruzamento Altamente Contraindicado.`,
        };
      }
      return {
        animalA: macho,
        animalB: femea,
        grau: dist,
        relevancia: 'ALERTA_MODERADO',
        descricao: `Alerta Laranja: Relação Directa de ${dist}º Grau (Ancestralidade Directa). O macho [${macho.nome}] é bisavô ou superior da fêmea [${femea.nome}]. Risco cumulativo.`,
      };
    }

    // Intersection of common ancestors
    let nearestCommon: { id: number; distSum: number; dMacho: number; dFemea: number } | null = null;

    machoAncestors.forEach((dM, ancId) => {
      if (femeaAncestors.has(ancId)) {
        const dF = femeaAncestors.get(ancId)!;
        const totalDist = dM + dF;
        if (!nearestCommon || totalDist < nearestCommon.distSum) {
          nearestCommon = { id: ancId, distSum: totalDist, dMacho: dM, dFemea: dF };
        }
      }
    });

    if (nearestCommon) {
      const nc: any = nearestCommon;
      const ancestral = animais.find((a) => a.id === nc.id);
      const ancestralNome = ancestral ? ancestral.nome : `ID ${nc.id}`;
      
      // da+db values mapping
      // 3: Uncle-niece/Aunt-nephew
      if (nc.distSum === 3) {
        return {
          animalA: macho,
          animalB: femea,
          grau: 3,
          relevancia: 'ALERTA_RECOMENDADO',
          ancestralComum: ancestralNome,
          descricao: `Alerta Vermelho: Grau de Parentesco Colateral Elevado (Tio x Sobrinha ou equivalente). Partilham o ancestral directo [${ancestralNome}] em 1º/2º grau. Risco de enfermidade recessiva nos recém-nascidos.`,
        };
      }
      // 4: First cousins
      if (nc.distSum === 4) {
        return {
          animalA: macho,
          animalB: femea,
          grau: 4,
          relevancia: 'ALERTA_MODERADO',
          ancestralComum: ancestralNome,
          descricao: `Alerta Laranja: Primos em Primeiro Grau (Grau 4 de parentesco colateral). Têm [${ancestralNome}] como avô comum. Cruzamento requer monitoramento acrescido.`,
        };
      }

      return {
        animalA: macho,
        animalB: femea,
        grau: nc.distSum,
        relevancia: 'ALERTA_MODERADO',
        ancestralComum: ancestralNome,
        descricao: `Alerta Amarelo: Descendente de ancestral comum [${ancestralNome}] no ${nc.distSum}º grau relativo. Há pequena percentagem consanguínea (${(Math.pow(0.5, nc.distSum) * 100).toFixed(2)}% de coeficiente aproximado). Siga orientações de maneio.`,
      };
    }

    return {
      animalA: macho,
      animalB: femea,
      grau: 0,
      relevancia: 'SEGURO',
      descricao: `Cruzamento Seguro: Não foram encontrados ancestrais comuns rastreáveis na base de dados da MHMFarms. Variabilidade genética excelente.`,
    };
  };

  // Auto-scanning all potential active mating pairs in the herd that pose high incest risks (Dashboard widget details)
  const indentificarAlertasConsanguinidade = (): ConsecutividadeAlerta[] => {
    const alerts: ConsecutividadeAlerta[] = [];
    const activeMales = animais.filter((a) => a.sexo === 'M' && a.estado !== 'FALECIDO');
    const activeFemales = animais.filter((a) => a.sexo === 'F' && a.estado !== 'FALECIDO');

    activeMales.forEach((m) => {
      activeFemales.forEach((f) => {
        if (m.idEspecie === f.idEspecie) {
          const res = analisarParentesco(m.id, f.id);
          if (res.relevancia !== 'SEGURO') {
            // Keep relevant alerts to prevent clutter (only close relationships: direct, colateral, or direct 2nd degree)
            if (['PROIBIDO_DIRECTO', 'PROIBIDO_COLATERAL', 'ALERTA_RECOMENDADO'].includes(res.relevancia)) {
              alerts.push(res);
            }
          }
        }
      });
    });

    // Uniquify or limit to top 8 to stay fast and avoid duplication
    return alerts.slice(0, 8);
  };

  // Actions
  // RN01 - RN06 Validation of Animal registrations
  const registrarAnimal = (newAnimalData: Omit<Animal, 'id'>): { success: boolean; message: string; animal?: Animal } => {
    // Validate RN02: Sex
    if (!['M', 'F'].includes(newAnimalData.sexo)) {
      return { success: false, message: 'Regra de Negócio (RN02): Sexo do animal é inválido. Apenas Macho (M) ou Fêmea (F) é admitido.' };
    }

    // Validate RN04: Birthdate not in future
    const nasc = new Date(newAnimalData.dataNasc);
    const hoje = new Date();
    if (nasc > hoje) {
      return { success: false, message: 'Regra de Negócio (RN04): A data de nascimento do animal não pode ser uma data futura.' };
    }

    // Validate RN03: Progenitors (Both must exist, have right species and sex)
    if (newAnimalData.idPai) {
      const pai = animais.find((a) => a.id === newAnimalData.idPai);
      if (!pai) return { success: false, message: 'O pai selecionado não existe na base de dados.' };
      if (pai.estado === 'FALECIDO') return { success: false, message: 'O pai selecionado já faleceu e não pode ser designado pai de um novo registo extemporâneo.' };
      if (pai.sexo !== 'M') return { success: false, message: 'Regra de Negócio (RN03): O pai selecionado tem de ser do sexo Macho (M).' };
      if (pai.idEspecie !== newAnimalData.idEspecie) {
        return { success: false, message: 'Regra de Negócio (RN03): O pai selecionado tem de pertencer à mesma espécie do criado.' };
      }
    }

    if (newAnimalData.idMae) {
      const mae = animais.find((a) => a.id === newAnimalData.idMae);
      if (!mae) return { success: false, message: 'A mãe selecionada não existe na base de dados.' };
      if (mae.estado === 'FALECIDO') return { success: false, message: 'A mãe selecionada já faleceu e não pode parir um novo registo.' };
      if (mae.sexo !== 'F') return { success: false, message: 'Regra de Negócio (RN03): A mãe selecionada tem de ser do sexo Fêmea (F).' };
      if (mae.idEspecie !== newAnimalData.idEspecie) {
        return { success: false, message: 'Regra de Negócio (RN03): A mãe selecionada tem de pertencer à mesma espécie do criado.' };
      }
    }

    // Evaluate Consanguinity of parents before confirming
    if (newAnimalData.idPai && newAnimalData.idMae) {
      const parentesco = analisarParentesco(newAnimalData.idPai, newAnimalData.idMae);
      if (parentesco.relevancia === 'PROIBIDO_DIRECTO' || parentesco.relevancia === 'PROIBIDO_COLATERAL') {
        return {
          success: false,
          message: `Cruzamento Bloqueado (RN03): Risco parental estrito! Os pais indicados têm relação de parentesco proibida (${parentesco.relevancia}). Detalhes: ${parentesco.descricao}`,
        };
      }
    }

    // Assign new unique sequential index
    const nextId = animais.length > 0 ? Math.max(...animais.map((a) => a.id)) + 1 : 1;
    const finalAnimal: Animal = {
      ...newAnimalData,
      id: nextId,
    };

    setAnimais((prev) => [...prev, finalAnimal]);
    return { success: true, message: 'Animal registado com sucesso!', animal: finalAnimal };
  };

  const editarAnimal = (updated: Animal): { success: boolean; message: string } => {
    // Validate RN02
    if (!['M', 'F'].includes(updated.sexo)) {
      return { success: false, message: 'Sexo do animal inválido.' };
    }
    // Validate RN04
    if (new Date(updated.dataNasc) > new Date()) {
      return { success: false, message: 'A data de nascimento não pode ser futura.' };
    }

    // Validate loop (cannot set parents as themselves)
    if (updated.id === updated.idPai || updated.id === updated.idMae) {
      return { success: false, message: 'Erro de Genealogia: O animal não pode ser progenitor de si próprio.' };
    }

    setAnimais((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
    return { success: true, message: 'Ficha do animal atualizada com sucesso!' };
  };

  const registrarNascimento = (
    nascData: Omit<Nascimento, 'id'>, 
    raca: string, 
    nome: string, 
    peso: number
  ): { success: boolean; message: string } => {
    const mae = animais.find((a) => a.id === nascData.idMae);
    const pai = animais.find((a) => a.id === nascData.idPai);

    if (!mae || !pai) {
      return { success: false, message: 'Erro: Pai ou mãe não identificados.' };
    }

    // Create the "cria" animal profile first
    const registrResult = registrarAnimal({
      nome,
      sexo: Math.random() > 0.5 ? 'M' : 'F', // randomly select if not informed or let operator choose
      raca,
      dataNasc: nascData.dataNasc,
      peso,
      estado: 'ACTIVO',
      idEspecie: mae.idEspecie,
      idPai: pai.id,
      idMae: mae.id,
    });

    if (!registrResult.success || !registrResult.animal) {
      return { success: false, message: registrResult.message };
    }

    const nextNascId = nascimentos.length > 0 ? Math.max(...nascimentos.map((n) => n.id)) + 1 : 1;
    const newNasc: Nascimento = {
      ...nascData,
      id: nextNascId,
      idCria: registrResult.animal.id,
    };

    setNascimentos((prev) => [...prev, newNasc]);
    
    // Auto insert an initial wellness treat to health logs for the cria
    registrarHistoricoSanitario({
      idAnimal: registrResult.animal.id,
      dataEvento: nascData.dataNasc,
      tipo: 'TRATAMENTO',
      descricao: `Acompanhamento pós-parto e verificação morfológica inicial da cria. Peso: ${peso}kg.`,
      veterinario: currentUser?.nome || 'Equipe Veterinária',
    });

    return { success: true, message: `Evento de nascimento registado! Cria [${nome}] inserida e associada.` };
  };

  const registrarMortalidade = (mortalidadeData: Omit<Mortalidade, 'id'>): { success: boolean; message: string } => {
    const animal = animais.find((a) => a.id === mortalidadeData.idAnimal);
    if (!animal) {
      return { success: false, message: 'Animal não encontrado.' };
    }

    const nextMortId = mortalidades.length > 0 ? Math.max(...mortalidades.map((m) => m.id)) + 1 : 1;
    const newMort: Mortalidade = {
      ...mortalidadeData,
      id: nextMortId,
    };

    // Update state of mortality entries
    setMortalidades((prev) => [...prev, newMort]);

    // Update parent animal status to FALECIDO (Excludes from active lists- RN06)
    setAnimais((prev) =>
      prev.map((a) => (a.id === mortalidadeData.idAnimal ? { ...a, estado: 'FALECIDO' } : a))
    );

    // Auto-insert a medical closure in the sanitary log
    registrarHistoricoSanitario({
      idAnimal: mortalidadeData.idAnimal,
      dataEvento: mortalidadeData.dataMorte,
      tipo: 'DOENCA',
      descricao: `ÓBITO REGISTADO. Causa: ${mortalidadeData.causa}. Obs: ${mortalidadeData.observacoes}`,
      veterinario: currentUser?.nome || 'Equipe Veterinária'
    });

    return { success: true, message: `Historial de óbito arquivado! Estado do animal [${animal.nome}] alterado para FALECIDO.` };
  };

  const registrarHistoricoSanitario = (evento: Omit<HistoricoSanitario, 'id'>) => {
    const nextHistId = historicoSanitario.length > 0 ? Math.max(...historicoSanitario.map((h) => h.id)) + 1 : 1;
    const finalEvento: HistoricoSanitario = {
      ...evento,
      id: nextHistId,
    };
    setHistoricoSanitario((prev) => [finalEvento, ...prev]);
  };

  // CMS management
  const criarNoticia = (conteudo: Omit<ConteudoWeb, 'id' | 'tipo' | 'dataPub'>) => {
    const nextContId = conteudoWeb.length > 0 ? Math.max(...conteudoWeb.map((c) => c.id)) + 1 : 1;
    const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const newCont: ConteudoWeb = {
      ...conteudo,
      id: nextContId,
      tipo: 'NOTICIA',
      dataPub: dateStr,
    };
    setConteudoWeb((prev) => [newCont, ...prev]);
  };

  const editarNoticia = (id: number, updatedFields: Partial<ConteudoWeb>) => {
    setConteudoWeb((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedFields } : c))
    );
  };

  const excluirNoticia = (id: number) => {
    setConteudoWeb((prev) => prev.filter((c) => c.id !== id));
  };

  const salvarEspecieWeb = (updatedEspecieWeb: EspecieWeb) => {
    setEspeciesWeb((prev) => {
      const exists = prev.some((ew) => ew.idEspecie === updatedEspecieWeb.idEspecie);
      if (exists) {
        return prev.map((ew) => (ew.idEspecie === updatedEspecieWeb.idEspecie ? updatedEspecieWeb : ew));
      } else {
        const nextId = prev.length > 0 ? Math.max(...prev.map((ew) => ew.id)) + 1 : 1;
        return [...prev, { ...updatedEspecieWeb, id: nextId }];
      }
    });
  };

  const marcarMensagemComoLida = (id: number) => {
    setMensagensWeb((prev) =>
      prev.map((m) => (m.id === id ? { ...m, lida: true } : m))
    );
  };

  const registrarMensagemWeb = (mensagem: Omit<MensagemWeb, 'id' | 'dataRecebido' | 'lida'>) => {
    const nextId = mensagensWeb.length > 0 ? Math.max(...mensagensWeb.map((m) => m.id)) + 1 : 1;
    const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const newMsg: MensagemWeb = {
      ...mensagem,
      id: nextId,
      dataRecebido: dateStr,
      lida: false,
    };
    setMensagensWeb((prev) => [newMsg, ...prev]);
  };

  return (
    <FarmContext.Provider
      value={{
        utilizadores,
        especies,
        animais,
        nascimentos,
        mortalidades,
        historicoSanitario,
        conteudoWeb,
        especiesWeb,
        mensagensWeb,
        currentUser,
        login,
        logout,
        registrarAnimal,
        editarAnimal,
        registrarNascimento,
        registrarMortalidade,
        registrarHistoricoSanitario,
        criarNoticia,
        editarNoticia,
        excluirNoticia,
        salvarEspecieWeb,
        marcarMensagemComoLida,
        registrarMensagemWeb,
        getAncestorsWithDistance,
        analisarParentesco,
        indentificarAlertasConsanguinidade,
      }}
    >
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = () => {
  const context = useContext(FarmContext);
  if (context === undefined) {
    throw new Error('useFarm deve ser usado dentro de um FarmProvider');
  }
  return context;
};
