/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  Plus, 
  Search, 
  Trash2, 
  CheckCircle, 
  X, 
  User, 
  Lock, 
  LayoutDashboard, 
  FolderHeart, 
  Baby, 
  Skull, 
  Stethoscope, 
  Globe, 
  FileText, 
  MapPin, 
  Calendar, 
  Scale, 
  LogOut, 
  AlertTriangle, 
  ChevronRight, 
  ArrowLeft,
  Mail,
  Compass,
  Check,
  Printer,
  Sparkles,
  Award,
  BookOpen
} from 'lucide-react';
import { useFarm } from '../state/FarmContext';
import { Animal, Especie, PerfilUtilizador, TipoEventoSanitario } from '../types';

interface SpeciesCmsCardProps {
  esp: Especie;
  webDesc: any;
  onSave: (data: any) => void;
  animaisList: Animal[];
  getLocalSpecieStats: (id: number) => any;
  savedSpeciesIds: number[];
  setSavedSpeciesIds: React.Dispatch<React.SetStateAction<number[]>>;
}

const SpeciesCmsCard: React.FC<SpeciesCmsCardProps> = ({
  esp,
  webDesc,
  onSave,
  animaisList,
  getLocalSpecieStats,
  savedSpeciesIds,
  setSavedSpeciesIds
}) => {
  const [desc, setDesc] = useState(webDesc.descricaoPublica);
  const [imgUrl, setImgUrl] = useState(webDesc.imagemUrl);
  const [imgType, setImgType] = useState<'url' | 'device'>('url');
  const [visible, setVisible] = useState(webDesc.visivel);
  const [showSex, setShowSex] = useState(webDesc.verSexo ?? true);
  const [showPop, setShowPop] = useState(webDesc.verPopulacao ?? true);
  const [showQuar, setShowQuar] = useState(webDesc.verQuarentena ?? true);
  const [showAvgW, setShowAvgW] = useState(webDesc.verPesoMedio ?? true);

  const stats = getLocalSpecieStats(esp.id);
  const hasStats = showSex || showPop || showQuar || showAvgW;
  const isSaved = savedSpeciesIds.includes(esp.id);

  const handleSave = () => {
    onSave({
      id: webDesc.id,
      idEspecie: esp.id,
      descricaoPublica: desc,
      imagemUrl: imgUrl,
      visivel: visible,
      verSexo: showSex,
      verPopulacao: showPop,
      verQuarentena: showQuar,
      verPesoMedio: showAvgW
    });
    setSavedSpeciesIds(prev => [...prev, esp.id]);
    setTimeout(() => {
      setSavedSpeciesIds(prev => prev.filter(id => id !== esp.id));
    }, 2500);
  };

  return (
    <div className={`bg-white border text-xs text-[#2B1A0A] rounded-xl overflow-hidden shadow-xs border-gray-200 transition-all ${!visible && 'opacity-70 bg-gray-50'}`}>
      <div className="bg-[#F0E8D5] p-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h4 className="font-extrabold text-[#2B1A0A] text-sm uppercase">{esp.nome}</h4>
          <span className="text-[10px] text-[#7A5C38] font-mono">ID Espécie: #{esp.id}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[10px] text-gray-500 font-mono">Website:</span>
          <button
            onClick={() => setVisible(!visible)}
            className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[9px] cursor-pointer shadow-xs transition-all ${
              visible ? 'bg-amber-100 text-amber-800' : 'bg-gray-200 text-gray-500'
            }`}
          >
            {visible ? 'Visível' : 'Oculto'}
          </button>
        </div>
      </div>

      <div className="p-5 grid md:grid-cols-2 gap-6 items-start">
        {/* Editing Column */}
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold font-mono text-gray-500">Descrição Pública do Website</label>
            <textarea
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full bg-[#FAF5EC] border border-gray-200 rounded-md p-2 text-xs focus:ring-1 focus:ring-amber-600 focus:outline-hidden resize-none"
              placeholder="Escreva uma descrição atraente..."
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold font-mono text-gray-500">Origem da Imagem da Espécie</label>
            <div className="grid grid-cols-2 gap-2 bg-[#FAF5EC] p-1 rounded-lg border">
              <button
                type="button"
                onClick={() => setImgType('url')}
                className={`py-1 text-center font-bold text-[9px] rounded-md transition-all ${
                  imgType === 'url' ? 'bg-[#7A5C38] text-white shadow-xs' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Link da Internet (URL)
              </button>
              <button
                type="button"
                onClick={() => setImgType('device')}
                className={`py-1 text-center font-bold text-[9px] rounded-md transition-all ${
                  imgType === 'device' ? 'bg-[#7A5C38] text-white shadow-xs' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Carregar do Dispositivo
              </button>
            </div>
          </div>

          {imgType === 'url' ? (
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold font-mono text-gray-500">Imagem URL</label>
              <input
                type="text"
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
                className="w-full bg-[#FAF5EC] border border-gray-200 rounded-md py-1.5 px-3 text-xs focus:ring-1 focus:ring-amber-600 focus:outline-hidden"
                placeholder="https://images.unsplash.com/..."
              />
            </div>
          ) : (
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold font-mono text-gray-500">Carregar Imagem do Dispositivo</label>
              <div className="border border-dashed border-gray-200 rounded-lg p-3 bg-[#FAF5EC] hover:bg-gray-55/60 text-center relative transition-colors cursor-pointer group">
                <span className="block text-[10px] text-amber-600 font-semibold">
                  {imgUrl && imgUrl.startsWith('data:') ? '✅ Imagem carregada do dispositivo!' : 'Clique para carregar ficheiro'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files[0]) {
                      const reader = new FileReader();
                      reader.onload = (re) => {
                        if (re.target?.result) {
                          setImgUrl(re.target.result as string);
                        }
                      };
                      reader.readAsDataURL(files[0]);
                    }
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
              </div>
            </div>
          )}

          {/* Visibility Checkboxes */}
          <div className="space-y-2 bg-[#FAF5EC] p-4 rounded-lg border">
            <span className="block text-[9px] uppercase font-bold text-amber-600 font-mono tracking-wide mb-1">Métricas Visíveis no Website</span>
            
            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <label className="flex items-center space-x-2 cursor-pointer hover:text-gray-900 select-none">
                <input
                  type="checkbox"
                  checked={showPop}
                  onChange={(e) => setShowPop(e.target.checked)}
                  className="rounded border-gray-300 text-[#7A5C38] focus:ring-amber-600 w-3.5 h-3.5 cursor-pointer"
                />
                <span>Total Activos</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer hover:text-gray-900 select-none">
                <input
                  type="checkbox"
                  checked={showSex}
                  onChange={(e) => setShowSex(e.target.checked)}
                  className="rounded border-gray-300 text-[#7A5C38] focus:ring-amber-600 w-3.5 h-3.5 cursor-pointer"
                />
                <span>Distribuição de Sexo</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer hover:text-gray-900 select-none">
                <input
                  type="checkbox"
                  checked={showAvgW}
                  onChange={(e) => setShowAvgW(e.target.checked)}
                  className="rounded border-gray-300 text-[#7A5C38] focus:ring-amber-600 w-3.5 h-3.5 cursor-pointer"
                />
                <span>Peso Médio</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer hover:text-gray-900 select-none">
                <input
                  type="checkbox"
                  checked={showQuar}
                  onChange={(e) => setShowQuar(e.target.checked)}
                  className="rounded border-gray-300 text-[#7A5C38] focus:ring-amber-600 w-3.5 h-3.5 cursor-pointer"
                />
                <span>Em Quarentena</span>
              </label>
            </div>
          </div>

          <button
            onClick={handleSave}
            className={`w-full py-2 rounded-lg font-bold uppercase text-[10px] tracking-widest transition-all cursor-pointer shadow-xs ${
              isSaved 
                ? 'bg-emerald-600 text-white hover:bg-[#2B1A0A]' 
                : 'bg-[#2B1A0A] text-white hover:bg-[#7A5C38]'
            }`}
          >
            {isSaved ? '✓ Configuração Guardada!' : 'Guardar Alterações'}
          </button>
        </div>

        {/* Website Card Preview column */}
        <div className="space-y-2">
          <span className="block text-[9px] uppercase font-mono tracking-wider text-gray-400 font-bold border-b pb-1">Visualização do catálogo</span>
          
          <div className={`bg-white border border-[#FAF5EC] rounded-xl overflow-hidden shadow-xs flex flex-col justify-between group transition-all ${!visible && 'opacity-50 border-dashed bg-gray-50'}`}>
            <div className="h-32 overflow-hidden relative bg-gray-100 flex items-center justify-center">
              {imgUrl ? (
                <img 
                  src={imgUrl} 
                  alt="" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="text-gray-400 italic text-[10px]">Sem imagem de visualização</span>
              )}
              {showPop && (
                <div className="absolute top-2 right-2 bg-[#2B1A0A] text-[#FAF5EC] font-mono text-[9px] px-2 py-0.5 rounded-full font-bold">
                  {stats.total} Activos
                </div>
              )}
              {!visible && (
                <div className="absolute top-2 left-2 bg-rose-600/95 text-white font-mono text-[8px] px-1.5 py-0.5 rounded font-extrabold uppercase shadow-xs">
                  Oculto
                </div>
              )}
            </div>

            <div className="p-4 grow flex flex-col justify-between space-y-3">
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-[#2B1A0A]">{esp.nome}</h4>
                <p className="text-[10px] text-[#7A5C38] leading-relaxed line-clamp-2">
                  {desc || esp.descricao || 'Sem descrição definida para o Website.'}
                </p>
              </div>

              {hasStats && (
                <div className="bg-[#F0E8D5] p-2.5 rounded-lg text-[10px] font-mono space-y-1 text-[#2B1A0A]">
                  {showPop && (
                    <div className="flex justify-between border-b border-[#D9C9A8] pb-0.5">
                      <strong>População Activa:</strong>
                      <span className="font-bold">{stats.total}</span>
                    </div>
                  )}
                  {showSex && (
                    <div className="flex justify-between border-b border-[#D9C9A8] pb-0.5">
                      <strong>Distribuição Sexo:</strong>
                      <span>{stats.machos}M | {stats.femeas}F</span>
                    </div>
                  )}
                  {showAvgW && (
                    <div className="flex justify-between border-b border-[#D9C9A8] pb-0.5">
                      <strong>Peso Médio Activo:</strong>
                      <span>{stats.pesoMedio} Kg</span>
                    </div>
                  )}
                  {showQuar && (
                    <div className="flex justify-between font-medium">
                      <strong>Quarentena Preventiva:</strong>
                      <span className={stats.quarentena > 0 ? 'text-amber-700 font-bold' : 'text-[#2B1A0A]'}>
                        {stats.quarentena} animais
                      </span>
                    </div>
                  )}
                </div>
              )}

              <button disabled className="w-full text-center bg-[#FAF5EC] text-[#2B1A0A] py-1 rounded-lg text-[9px] font-semibold tracking-wider uppercase opacity-50 select-none">
                Pedir Informações da Espécie
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface AdminPortalProps {
  onVoltarAoSite: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onVoltarAoSite }) => {
  const {
    login,
    logout,
    currentUser,
    especies,
    animais,
    nascimentos,
    mortalidades,
    historicoSanitario,
    conteudoWeb,
    especiesWeb,
    mensagensWeb,
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
    analisarParentesco,
    indentificarAlertasConsanguinidade
  } = useFarm();

  // Authentication State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Panel Navigation
  const [activeTab, setActiveTab] = useState<'dashboard' | 'animais' | 'nascimentos' | 'mortalidade' | 'sanitario' | 'cms' | 'relatorios'>('dashboard');

  // Substate helper for selects and modals
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

  // Forms States - ADD ANIMAL
  const [showAddAnimalModal, setShowAddAnimalModal] = useState(false);
  const [newNome, setNewNome] = useState('');
  const [newSexo, setNewSexo] = useState<any>('M');
  const [newRaca, setNewRaca] = useState('');
  const [newDataNasc, setNewDataNasc] = useState('2025-01-01');
  const [newPeso, setNewPeso] = useState<number>(100);
  const [newEstado, setNewEstado] = useState<any>('ACTIVO');
  const [newIdEspecie, setNewIdEspecie] = useState<number>(1);
  const [newIdPai, setNewIdPai] = useState<string>('');
  const [newIdMae, setNewIdMae] = useState<string>('');
  const [formResultMessage, setFormResultMessage] = useState<{ success: boolean; text: string } | null>(null);

  // Forms States - BIRTH REGISTRY
  const [birthMae, setBirthMae] = useState<string>('');
  const [birthPai, setBirthPai] = useState<string>('');
  const [birthDate, setBirthDate] = useState('2026-06-01');
  const [birthNome, setBirthNome] = useState('');
  const [birthRaca, setBirthRaca] = useState('');
  const [birthPeso, setBirthPeso] = useState<number>(30);
  const [birthObs, setBirthObs] = useState('');
  const [birthCheckResult, setBirthCheckResult] = useState<any>(null);
  const [birthSubmitMsg, setBirthSubmitMsg] = useState<{ success: boolean; text: string } | null>(null);

  // Forms States - MORTALITY REGISTRY
  const [mortIdAnimal, setMortIdAnimal] = useState<string>('');
  const [mortDate, setMortDate] = useState('2026-06-01');
  const [mortCausa, setMortCausa] = useState('');
  const [mortObs, setMortObs] = useState('');
  const [mortSubmitMsg, setMortSubmitMsg] = useState<{ success: boolean; text: string } | null>(null);

  // Forms States - HEALTH REGISTRY
  const [sanIdAnimal, setSanIdAnimal] = useState<string>('');
  const [sanTipo, setSanTipo] = useState<TipoEventoSanitario>('VACINA');
  const [sanDate, setSanDate] = useState('2026-06-01');
  const [sanDesc, setSanDesc] = useState('');
  const [sanVet, setSanVet] = useState('');
  const [sanSubmitMsg, setSanSubmitMsg] = useState<string | null>(null);

  // CMS Blog edit states
  const [cmsTitle, setCmsTitle] = useState('');
  const [cmsBody, setCmsBody] = useState('');
  const [cmsImage, setCmsImage] = useState('');
  const [cmsSubmitMsg, setCmsSubmitMsg] = useState(false);
  const [cmsSubTab, setCmsSubTab] = useState<'noticias' | 'especies' | 'mensagens'>('noticias');
  const [cmsNewsImageType, setCmsNewsImageType] = useState<'url' | 'device'>('url');
  const [savedSpeciesIds, setSavedSpeciesIds] = useState<number[]>([]);

  // Report filter states
  const [reportSpecie, setReportSpecie] = useState<string>('ALL');
  const [reportType, setReportType] = useState<'INVENTARIO' | 'NATALIDADE' | 'MORTALIDADE' | 'SANITARIO'>('INVENTARIO');

  // Animal table filters
  const [filterQuery, setFilterQuery] = useState('');
  const [filterSpecie, setFilterSpecie] = useState<string>('ALL');
  const [filterEstado, setFilterEstado] = useState<string>('ALL');

  const getLocalSpecieStats = (id: number) => {
    const activeSpecClass = animais.filter(a => a.idEspecie === id && a.estado !== 'FALECIDO');
    const machos = activeSpecClass.filter(a => a.sexo === 'M').length;
    const femeas = activeSpecClass.filter(a => a.sexo === 'F').length;
    const quarentena = activeSpecClass.filter(a => a.estado === 'Quarentena' || a.estado === 'QUARENTENA').length;
    const totalPeso = activeSpecClass.reduce((sum, a) => sum + (a.peso || 0), 0);
    const pesoMedio = activeSpecClass.length > 0 ? (totalPeso / activeSpecClass.length).toFixed(1) : '0';
    return {
      total: activeSpecClass.length,
      machos,
      femeas,
      quarentena,
      pesoMedio
    };
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!username || !password) return;

    const ok = login(username, password);
    if (!ok) {
      setLoginError('Credenciais incorretas ou sem perfil ativo para este ambiente.');
    }
  };

  const handleCreateAnimal = (e: React.FormEvent) => {
    e.preventDefault();
    setFormResultMessage(null);

    const res = registrarAnimal({
      nome: newNome || 'Sem Nome',
      sexo: newSexo,
      raca: newRaca || 'Comum / Local',
      dataNasc: newDataNasc,
      peso: Number(newPeso),
      estado: newEstado,
      idEspecie: Number(newIdEspecie),
      idPai: newIdPai ? Number(newIdPai) : null,
      idMae: newIdMae ? Number(newIdMae) : null,
    });

    setFormResultMessage({ success: res.success, text: res.message });

    if (res.success) {
      // clear fields on success
      setNewNome('');
      setNewRaca('');
      setNewIdPai('');
      setNewIdMae('');
      setTimeout(() => {
        setShowAddAnimalModal(false);
        setFormResultMessage(null);
      }, 2000);
    }
  };

  const handleBirthMatingCheck = () => {
    if (!birthMae || !birthPai) {
      setBirthCheckResult(null);
      return;
    }
    const res = analisarParentesco(Number(birthPai), Number(birthMae));
    setBirthCheckResult(res);
  };

  const handleSubmitBirth = (e: React.FormEvent) => {
    e.preventDefault();
    setBirthSubmitMsg(null);

    if (!birthMae || !birthPai || !birthNome) return;

    const res = registrarNascimento(
      {
        dataNasc: birthDate,
        idMae: Number(birthMae),
        idPai: Number(birthPai),
        idCria: 0, // Assigned inside Context
        observacoes: birthObs || 'Nascimento registado por formulário administrativo MHMfarmsGest.',
      },
      birthRaca || 'Linhagem Direta',
      birthNome,
      Number(birthPeso)
    );

    setBirthSubmitMsg({ success: res.success, text: res.message });

    if (res.success) {
      setBirthNome('');
      setBirthRaca('');
      setBirthMae('');
      setBirthPai('');
      setBirthCheckResult(null);
    }
  };

  const handleSubmitMortality = (e: React.FormEvent) => {
    e.preventDefault();
    setMortSubmitMsg(null);

    if (!mortIdAnimal || !mortCausa) return;

    const res = registrarMortalidade({
      idAnimal: Number(mortIdAnimal),
      dataMorte: mortDate,
      causa: mortCausa,
      observacoes: mortObs || 'Registo arquivado via Portal MHMfarmsGest.',
    });

    setMortSubmitMsg({ success: res.success, text: res.message });

    if (res.success) {
      setMortIdAnimal('');
      setMortCausa('');
      setMortObs('');
    }
  };

  const handleSubmitSanitario = (e: React.FormEvent) => {
    e.preventDefault();
    setSanSubmitMsg(null);

    if (!sanIdAnimal || !sanDesc || !sanVet) return;

    registrarHistoricoSanitario({
      idAnimal: Number(sanIdAnimal),
      tipo: sanTipo,
      dataEvento: sanDate,
      descricao: sanDesc,
      veterinario: sanVet,
    });

    setSanSubmitMsg('Evento clínico guardado com sucesso no prontuário!');
    setSanDesc('');
    setTimeout(() => {
      setSanSubmitMsg(null);
    }, 4000);
  };

  const handleCreateCmsNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmsTitle || !cmsBody) return;

    criarNoticia({
      titulo: cmsTitle,
      corpo: cmsBody,
      imagemUrl: cmsImage || 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=600',
      publicado: true,
    });

    setCmsTitle('');
    setCmsBody('');
    setCmsImage('');
    setCmsSubmitMsg(true);
    setTimeout(() => setCmsSubmitMsg(false), 4000);
  };

  // 100% Client-side filtered animals
  const filteredAnimals = animais.filter((anim) => {
    const matchesSearch = anim.nome.toLowerCase().includes(filterQuery.toLowerCase()) || 
                          anim.raca.toLowerCase().includes(filterQuery.toLowerCase()) ||
                          `A-0${anim.id}`.includes(filterQuery);
    const matchesSpecie = filterSpecie === 'ALL' || anim.idEspecie === Number(filterSpecie);
    const matchesEstado = filterEstado === 'ALL' || anim.estado === filterEstado;
    return matchesSearch && matchesSpecie && matchesEstado;
  });

  const activeHerds = animais.filter((a) => a.estado !== 'FALECIDO');
  const inQuarentena = animais.filter((a) => a.estado === 'QUARENTENA');

  const consanguinidadeAlerts = indentificarAlertasConsanguinidade();

  // Printable report generator filter
  const generatedReportData = () => {
    const baseSpecFilter = (item: any) => {
      const animKey = item.idAnimal || item.id || item.idCria;
      const anim = animais.find(a => a.id === animKey);
      if (!anim) return false;
      return reportSpecie === 'ALL' || anim.idEspecie === Number(reportSpecie);
    };

    switch (reportType) {
      case 'INVENTARIO':
        return animais.filter((anim) => reportSpecie === 'ALL' || anim.idEspecie === Number(reportSpecie));
      case 'NATALIDADE':
        return nascimentos.filter(n => {
          const cria = animais.find(a => a.id === n.idCria);
          return cria && (reportSpecie === 'ALL' || cria.idEspecie === Number(reportSpecie));
        });
      case 'MORTALIDADE':
        return mortalidades.filter(baseSpecFilter);
      case 'SANITARIO':
        return historicoSanitario.filter(baseSpecFilter);
      default:
        return [];
    }
  };

  // Rendering individual components for recursive nodes
  const renderPedigreeNode = (label: string, animalId: number | null) => {
    if (!animalId) {
      return (
        <div className="bg-[#FAF5EC] border border-[#D9C9A8] p-3 rounded-lg text-center font-mono text-[10px] text-gray-400">
          <span className="block font-semibold uppercase">{label}</span>
          <span>Registo Ausente</span>
        </div>
      );
    }

    const linked = animais.find(a => a.id === animalId);
    if (!linked) return null;

    return (
      <div 
        onClick={() => setSelectedAnimal(linked)}
        className="bg-white border hover:border-[#C47B1C] border-[#F0E8D5] p-3 rounded-lg text-center cursor-pointer transition-all shadow-xs shrink-0"
      >
        <span className="block text-[8px] text-amber-600 font-mono tracking-wider font-semibold uppercase">{label}</span>
        <strong className="block text-xs text-[#2B1A0A] truncate max-w-32">{linked.nome}</strong>
        <span className="text-[10px] text-gray-400 font-mono">ID: A-0{linked.id} [{linked.raca}]</span>
      </div>
    );
  };

  // Return to public app if not logged in
  if (!currentUser) {
    return (
      <div id="login-container" className="min-h-screen bg-[#F0E8D5] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
        
        {/* Ecological leafy blobs background */}
        <div className="absolute top-10 left-10 w-44 h-44 bg-[#C47B1C]/5 rounded-full filter blur-xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#7A5C38]/5 rounded-full filter blur-xl" />

        <div className="w-full max-w-sm bg-white rounded-2xl border border-[#D9C9A8] p-8 shadow-md relative z-10 space-y-6">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-[#2B1A0A] tracking-tight">MHMfarmsGest</h2>
            <p className="text-xs text-[#7A5C38] font-medium uppercase tracking-widest font-mono">Controlo Interno & CMS</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div id="login-error" className="bg-rose-50 text-rose-700 text-xs p-3 rounded border border-rose-100 flex items-start space-x-1">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-[#7A5C38] uppercase font-bold tracking-wider">Nome de Utilizador</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <User className="w-4 h-4" />
                </span>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: admin / gestor"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#FAF5EC] border border-[#FAF5EC] rounded-lg py-2 pl-9 pr-3 text-xs focus:ring-1 focus:ring-amber-600 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-[#7A5C38] uppercase font-bold tracking-wider">Palavra-Passe</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input 
                  type="password" 
                  required
                  placeholder="Ex: admin123 / gestor123"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#FAF5EC] border border-[#FAF5EC] rounded-lg py-2 pl-9 pr-3 text-xs focus:ring-1 focus:ring-amber-600 focus:outline-hidden"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#7A5C38] hover:bg-[#C47B1C] text-white py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
            >
              Iniciar Sessão Operacional
            </button>
          </form>

          {/* Prompt guide helper */}
          <div className="bg-[#F0E8D5] p-3 rounded-lg text-[10px] font-mono text-gray-500 text-center space-y-1">
            <span className="block font-bold">Credenciais de Teste:</span>
            <div className="flex justify-around">
              <span>admin / admin123</span>
              <span>gestor / gestor123</span>
            </div>
          </div>

          <button 
            onClick={onVoltarAoSite}
            className="w-full text-center text-xs font-semibold text-amber-600 hover:text-[#7A5C38] transition-colors py-1 cursor-pointer flex items-center justify-center space-x-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> <span>Voltar ao Website Oficial</span>
          </button>
        </div>
      </div>
    );
  }

  // LOGGED IN USER ADMIN SYSTEM VIEW
  return (
    <div id="admin-workspace-root" className="min-h-screen bg-[#FAF5EC] text-[#2B1A0A] font-sans antialiased flex flex-row">
      
      {/* SIDEBAR NAVIGATION PANEL */}
      <aside id="admin-sidebar" className="w-64 bg-[#2B1A0A] text-[#FAF5EC] flex flex-col justify-between shrink-0 border-r border-[#7A5C38]">
        
        {/* Upper User Badge */}
        <div className="p-5 border-b border-[#7A5C38]/60 space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#C47B1C] flex items-center justify-center font-black">M</div>
            <div>
              <h3 className="text-sm font-bold tracking-tight">MHMFarms</h3>
              <p className="text-[9px] text-[#F0E8D5] uppercase tracking-widest font-mono">MHMfarmsGest v1.4</p>
            </div>
          </div>

          {/* Profile Card details */}
          <div className="bg-[#7A5C38]/40 p-3 rounded-md border border-[#7A5C38] space-y-1.5 select-none">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-bold tracking-wide text-[#F0E8D5] truncate max-w-36">{currentUser.nome}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[8px] bg-[#C47B1C] text-white font-mono px-1.5 py-0.5 rounded uppercase font-semibold">
                {currentUser.perfil}
              </span>
              <span className="text-[8px] text-[#FAF5EC]/60 font-mono">Sessão Activa</span>
            </div>
          </div>
        </div>

        {/* Sidebar Nav buttons */}
        <nav className="grow py-4 px-3 space-y-1 overflow-y-auto">
          {[
            { id: 'dashboard', label: 'Painel Principal', ic: LayoutDashboard },
            { id: 'animais', label: 'Gestão de Animais', ic: FolderHeart },
            { id: 'nascimentos', label: 'Registar Nascimento', ic: Baby },
            { id: 'mortalidade', label: 'Controlo de Óbitos', ic: Skull },
            { id: 'sanitario', label: 'Historial Sanitário', ic: Stethoscope },
            { id: 'cms', label: 'Painel CMS Web', ic: Globe },
            { id: 'relatorios', label: 'Certificação & PDF', ic: FileText }
          ].map((item) => {
            const Icon = item.ic;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  setSelectedAnimal(null);
                }}
                className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                  activeTab === item.id 
                    ? 'bg-[#C47B1C] text-white font-semibold shadow-xs' 
                    : 'text-[#F0E8D5] hover:bg-[#7A5C38]/40 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" /> <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Lower utilities list */}
        <div className="p-4 border-t border-[#7A5C38]/60 space-y-2">
          <button 
            onClick={onVoltarAoSite}
            className="w-full flex items-center justify-center space-x-1.5 py-1.5 text-[10px] font-bold text-[#F0E8D5] hover:text-white bg-[#7A5C38]/60 hover:bg-[#7A5C38] border-0 rounded cursor-pointer transition-colors"
          >
            <Compass className="w-3.5 h-3.5" /> <span>Visualizar Website</span>
          </button>
          
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center space-x-1.5 py-1.5 text-[10px] font-bold text-rose-300 hover:text-rose-100 bg-rose-950/40 hover:bg-rose-900 border-0 rounded cursor-pointer transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> <span>Terminar Sessão</span>
          </button>
        </div>
      </aside>

      {/* CORE WORKSPACE CONTENT AND SWITCHER */}
      <main id="admin-workspace-canvas" className="grow flex flex-col overflow-y-auto px-6 sm:px-10 py-8 space-y-8 select-text">
        
        {/* Top welcome status layout */}
        <div id="workspace-top-banner" className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 pb-4 border-b border-gray-200">
          <div>
            <span className="text-[10px] text-[#7A5C38] font-mono tracking-wider font-semibold uppercase">Módulo de Controlo</span>
            <h2 className="text-2xl font-bold tracking-tight text-[#2B1A0A] uppercase">
              {activeTab === 'dashboard' && 'Painel Operacional'}
              {activeTab === 'animais' && 'Inventário de Animais'}
              {activeTab === 'nascimentos' && 'Registar Parto / Nascimento'}
              {activeTab === 'mortalidade' && 'Registo de Falecimentos'}
              {activeTab === 'sanitario' && 'Maneio & Profilaxia'}
              {activeTab === 'cms' && 'Gestor de Conteúdos CMS'}
              {activeTab === 'relatorios' && 'Relatórios e Geração de PDF'}
            </h2>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-500 bg-[#FAF5EC] px-3 py-1.5 rounded-md font-medium font-mono select-none">
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            <span>2026-06-02 (Dados Oficiais)</span>
          </div>
        </div>

        {/* WORKSPACE ELEMENT SWITCHER */}
        <div id="sub-page-canvas" className="grow flex flex-col">
          
          {/* 1. DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div id="sub-panel-dashboard" className="space-y-8 flex flex-col">
              
              {/* Counter boxes */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono tracking-wider uppercase text-gray-400 font-bold">Reserva Animais</span>
                    <h3 className="text-2xl font-black text-[#2B1A0A]">{activeHerds.length}</h3>
                    <p className="text-[10px] text-emerald-600">Espécimes activos</p>
                  </div>
                  <FolderHeart className="w-8 h-8 text-amber-600 opacity-30" />
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono tracking-wider uppercase text-gray-400 font-bold">Total Espécies</span>
                    <h3 className="text-2xl font-black text-[#2B1A0A]">{especies.length}</h3>
                    <p className="text-[10px] text-emerald-600">Em monitoramento</p>
                  </div>
                  <Compass className="w-8 h-8 text-amber-600 opacity-30" />
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono tracking-wider uppercase text-gray-400 font-bold">Partos no Semestre</span>
                    <h3 className="text-2xl font-black text-[#2B1A0A]">{nascimentos.length}</h3>
                    <p className="text-[10px] text-amber-600 font-semibold">Criação automatizada</p>
                  </div>
                  <Baby className="w-8 h-8 text-amber-600 opacity-30" />
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono tracking-wider uppercase text-gray-400 font-bold">Taxa de Baixas</span>
                    <h3 className="text-2xl font-black text-rose-700">{mortalidades.length}</h3>
                    <p className="text-[10px] text-rose-600 font-medium">Óbitos arquivados</p>
                  </div>
                  <Skull className="w-8 h-8 text-rose-600 opacity-25" />
                </div>
              </div>

              {/* Warnings and Alerts row */}
              <div className="grid lg:grid-cols-12 gap-6 items-start">
                
                {/* Consanguinity genetic alerts panel */}
                <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-4">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                    <div>
                      <h4 className="font-bold text-[#2B1A0A] text-sm uppercase tracking-wide">Prevenção Inteligente de Inbreeding</h4>
                      <p className="text-[10px] text-gray-400">Verificação automática de pares activos com alto risco de anomalias consanguíneas.</p>
                    </div>
                  </div>

                  <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                    {consanguinidadeAlerts.map((al, idx) => (
                      <div key={idx} className="bg-[#FAF5EC] p-3 rounded-lg border border-[#FAF5EC] flex flex-col space-y-1">
                        <div className="flex justify-between items-center">
                          <strong className="text-xs text-[#2B1A0A] uppercase">
                            Macho [A-0{al.animalA.id}] {al.animalA.nome} × Fêmea [A-0{al.animalB.id}] {al.animalB.nome}
                          </strong>
                          <span className={`text-[8px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                            al.relevancia.includes('PROIBIDO') 
                              ? 'bg-rose-100 text-rose-800' 
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {al.relevancia === 'PROIBIDO_DIRECTO' && 'PROIBIDO DIRECTO'}
                            {al.relevancia === 'PROIBIDO_COLATERAL' && 'INCÊSTUOSO'}
                            {al.relevancia === 'ALERTA_RECOMENDADO' && 'ALERTA CRÍTICO'}
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-500 leading-normal">{al.descricao}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Species distribution progress bars */}
                <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-4">
                  <h4 className="font-bold text-[#2B1A0A] text-sm uppercase tracking-wide">Carga Demográfica / Espécie</h4>
                  
                  <div className="space-y-3">
                    {especies.map((esp) => {
                      const count = animais.filter(a => a.idEspecie === esp.id && a.estado !== 'FALECIDO').length;
                      const pct = Math.min((count / activeHerds.length) * 100, 100) || 0;
                      return (
                        <div key={esp.id} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-semibold text-gray-600">{esp.nome}</span>
                            <span className="font-mono text-[10px] font-bold text-[#7A5C38]">{count} animais activos</span>
                          </div>
                          <div className="w-full bg-[#FAF5EC] h-2 rounded-full overflow-hidden">
                            <div className="bg-[#C47B1C] h-full rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Status notifications lists */}
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Isolation or Critical sanitaries */}
                <div className="bg-[#FAF5EC] p-5 rounded-xl border border-gray-200 space-y-3">
                  <h4 className="font-bold text-xs text-[#2B1A0A] flex items-center space-x-1 uppercase tracking-wide">
                    <Stethoscope className="w-4 h-4 text-emerald-700" />
                    <span>Observação Sanitária Prioritária</span>
                  </h4>
                  {inQuarentena.length > 0 ? (
                    inQuarentena.map((q) => (
                      <div key={q.id} className="p-2.5 rounded bg-amber-50 border border-amber-200 flex justify-between items-center text-xs">
                        <div>
                          <strong>{q.nome} ({q.raca})</strong>
                          <span className="block text-[10px] text-gray-500 font-mono">Quarentena Preventiva • ID A-0{q.id}</span>
                        </div>
                        <button 
                          onClick={() => setSelectedAnimal(q)}
                          className="bg-amber-100 pl-2 pr-1.5 py-0.5 rounded text-[10px]"
                        >Ver prontuário</button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-xs text-gray-400">Excelente desempenho sanitário! Nenhum animal em isolamento.</div>
                  )}
                </div>

                {/* Recent entries */}
                <div className="bg-[#FAF5EC] p-5 rounded-xl border border-gray-200 space-y-3">
                  <h4 className="font-bold text-xs text-[#2B1A0A] flex items-center space-x-1 uppercase tracking-wide">
                    <Baby className="w-4 h-4 text-emerald-700" />
                    <span>Últimos Inventários Registados</span>
                  </h4>
                  <div className="space-y-1.5">
                    {animais.slice(-4).reverse().map((anim) => (
                      <div key={anim.id} className="p-2 bg-white rounded border border-[#FAF5EC] flex justify-between items-center text-xs">
                        <div>
                          <strong>A-0{anim.id} — {anim.nome}</strong>
                          <p className="text-[9px] text-amber-600 font-semibold">{anim.raca} | Peso: {anim.peso}kg</p>
                        </div>
                        <span className={`text-[8px] px-1.5 py-0.5 rounded font-mono ${
                          anim.estado === 'ACTIVO' ? 'bg-emerald-50 text-amber-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {anim.estado}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 2. GESTÃO DE ANIMAIS (CRUD + PEDIGREE TREE) */}
          {activeTab === 'animais' && (
            <div id="sub-panel-animais" className="space-y-6">
              
              {/* Filters upper bar */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 items-center justify-between">
                <div className="flex w-full sm:w-auto items-center space-x-2">
                  <div className="relative grow sm:w-64">
                    <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-gray-400">
                      <Search className="w-3.5 h-3.5" />
                    </span>
                    <input 
                      type="text" 
                      placeholder="Pesquisar por ID, Nome, Raça..."
                      value={filterQuery}
                      onChange={(e) => setFilterQuery(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-lg py-1.5 pl-8 pr-3 text-xs focus:ring-1 focus:ring-amber-600 focus:outline-hidden"
                    />
                  </div>
                  
                  <select
                    value={filterSpecie}
                    onChange={(e) => setFilterSpecie(e.target.value)}
                    className="bg-white border border-gray-200 rounded-lg py-1.5 px-2 text-xs focus:ring-1 focus:ring-amber-600"
                  >
                    <option value="ALL">Todas Espécies</option>
                    {especies.map(e => <option key={e.id} value={e.id}>{e.nome}</option>)}
                  </select>

                  <select
                    value={filterEstado}
                    onChange={(e) => setFilterEstado(e.target.value)}
                    className="bg-white border border-gray-200 rounded-lg py-1.5 px-2 text-xs focus:ring-1 focus:ring-amber-600"
                  >
                    <option value="ALL">Todos Estados</option>
                    <option value="ACTIVO">Activos</option>
                    <option value="QUARENTENA">Quarentena</option>
                    <option value="FALECIDO">Falecido (Óbitos)</option>
                  </select>
                </div>

                <button 
                  onClick={() => setShowAddAnimalModal(true)}
                  className="w-full sm:w-auto flex items-center justify-center space-x-1.5 bg-[#7A5C38] hover:bg-[#C47B1C] text-white px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4" /> <span>Registar Novo Animal</span>
                </button>
              </div>

              {/* ADD ANIMAL MODAL POPUP */}
              {showAddAnimalModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
                  <div className="bg-white rounded-xl border border-[#D9C9A8] p-7 max-w-lg w-full space-y-4 shadow-xl">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <h4 className="font-extrabold text-[#2B1A0A] text-sm uppercase">Novo Registo Animal (RN04 / RN03)</h4>
                      <button onClick={() => setShowAddAnimalModal(false)} className="text-gray-400 hover:text-gray-700">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleCreateAnimal} className="space-y-4">
                      {formResultMessage && (
                        <div className={`p-3 rounded text-xs border ${
                          formResultMessage.success ? 'bg-emerald-50 text-amber-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'
                        }`}>
                          {formResultMessage.text}
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold font-mono text-gray-500">Nome Oficial</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Ex: Melman II"
                            value={newNome}
                            onChange={(e) => setNewNome(e.target.value)}
                            className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-xs focus:ring-1 focus:ring-amber-600 focus:outline-hidden"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold font-mono text-gray-500">Espécie Associada (RN05)</label>
                          <select 
                            value={newIdEspecie}
                            onChange={(e) => {
                              setNewIdEspecie(Number(e.target.value));
                              setNewIdPai('');
                              setNewIdMae('');
                            }}
                            className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-xs focus:ring-1 focus:ring-amber-600"
                          >
                            {especies.map(e => <option key={e.id} value={e.id}>{e.nome}</option>)}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold font-mono text-gray-500">Raça / Subespécie</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Ex: Kruger / Angolana"
                            value={newRaca}
                            onChange={(e) => setNewRaca(e.target.value)}
                            className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-xs focus:ring-1 focus:ring-amber-600 focus:outline-hidden"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold font-mono text-gray-500">Sexo Biológico (RN02)</label>
                          <select 
                            value={newSexo}
                            onChange={(e) => setNewSexo(e.target.value as any)}
                            className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-xs focus:ring-1 focus:ring-amber-600"
                          >
                            <option value="M">Macho</option>
                            <option value="F">Fêmea</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-1 col-span-2">
                          <label className="text-[10px] uppercase font-bold font-mono text-gray-500">Nascimento (RN04 - Sem Futuro)</label>
                          <input 
                            type="date" 
                            required
                            value={newDataNasc}
                            onChange={(e) => setNewDataNasc(e.target.value)}
                            className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-xs focus:ring-1 focus:ring-amber-600"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold font-mono text-gray-500">Peso (Kg)</label>
                          <input 
                            type="number" 
                            required
                            min={1}
                            value={newPeso}
                            onChange={(e) => setNewPeso(Number(e.target.value))}
                            className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-xs focus:ring-1 focus:ring-amber-600"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold font-mono text-gray-500">Estado de Admissão (RN06)</label>
                        <select 
                          value={newEstado}
                          onChange={(e) => setNewEstado(e.target.value as any)}
                          className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-xs"
                        >
                          <option value="ACTIVO">Activo</option>
                          <option value="QUARENTENA">Quarentena / Isolamento</option>
                        </select>
                      </div>

                      {/* Optional pedigree selection */}
                      <div className="bg-[#F0E8D5] p-3.5 rounded-lg border border-[#D9C9A8] space-y-3">
                        <span className="block text-[10px] uppercase font-bold font-mono text-amber-600">Genealogia Opcional (Mesma Espécie)</span>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <label className="block text-[9px] text-gray-500">Pai Macho Activo (RN03)</label>
                            <select 
                              value={newIdPai}
                              onChange={(e) => setNewIdPai(e.target.value)}
                              className="w-full border border-gray-300 rounded-md bg-white p-1 text-[11px]"
                            >
                              <option value="">Nenhum Pai Catalogado</option>
                              {animais
                                .filter(a => a.idEspecie === Number(newIdEspecie) && a.sexo === 'M' && a.estado !== 'FALECIDO')
                                .map(pai => <option key={pai.id} value={pai.id}>{pai.nome} [ID:{pai.id}]</option>)
                              }
                            </select>
                          </div>
                          <div>
                            <label className="block text-[9px] text-gray-500">Mãe Fêmea Activa (RN03)</label>
                            <select 
                              value={newIdMae}
                              onChange={(e) => setNewIdMae(e.target.value)}
                              className="w-full border border-gray-300 rounded-md bg-white p-1 text-[11px]"
                            >
                              <option value="">Nenhuma Mãe Catalogada</option>
                              {animais
                                .filter(a => a.idEspecie === Number(newIdEspecie) && a.sexo === 'F' && a.estado !== 'FALECIDO')
                                .map(mae => <option key={mae.id} value={mae.id}>{mae.nome} [ID:{mae.id}]</option>)
                              }
                            </select>
                          </div>
                        </div>
                      </div>

                      <button 
                        type="submit"
                        className="w-full bg-[#2B1A0A] hover:bg-[#7A5C38] text-white py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors"
                      >
                        Submeter Registo Biológico
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* Main tabulated ledger */}
              <div className="bg-white border rounded-xl overflow-hidden shadow-xs relative">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F0E8D5] text-[10px] text-gray-500 font-mono uppercase border-b border-gray-200">
                      <th className="p-3">Código ID</th>
                      <th className="p-3">Nome</th>
                      <th className="p-3">Espécie</th>
                      <th className="p-3">Raça / Subespécie</th>
                      <th className="p-3">Sexo</th>
                      <th className="p-3">Peso</th>
                      <th className="p-3">Data Nasc.</th>
                      <th className="p-3">Estado</th>
                      <th className="p-3 text-right">Acções</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs text-[#2B1A0A]">
                    {filteredAnimals.map((anim) => {
                      const esp = especies.find(e => e.id === anim.idEspecie);
                      return (
                        <tr 
                          key={anim.id} 
                          className="hover:bg-gray-50/70 transition-all cursor-pointer"
                          onClick={() => setSelectedAnimal(anim)}
                        >
                          <td className="p-3 font-mono text-amber-600 font-semibold">A-0{anim.id}</td>
                          <td className="p-3 font-semibold">{anim.nome}</td>
                          <td className="p-3">{esp ? esp.nome : 'Exótico'}</td>
                          <td className="p-3 italic">{anim.raca}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full font-bold select-none text-[10px] ${
                              anim.sexo === 'M' ? 'bg-[#F0E8D5] text-[#2B1A0A]' : 'bg-rose-100 text-rose-850'
                            }`}>
                              {anim.sexo === 'M' ? 'Macho' : 'Fêmea'}
                            </span>
                          </td>
                          <td className="p-3 font-mono">{anim.peso} Kg</td>
                          <td className="p-3 font-mono">{anim.dataNasc}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded font-bold font-mono text-[9px] ${
                              anim.estado === 'ACTIVO' && 'bg-amber-100 text-amber-800'
                            } ${
                              anim.estado === 'QUARENTENA' && 'bg-amber-100 text-amber-800'
                            } ${
                              anim.estado === 'FALECIDO' && 'bg-rose-100 text-rose-800'
                            }`}>
                              {anim.estado}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedAnimal(anim);
                              }}
                              className="bg-[#FAF5EC] hover:bg-[#7A5C38] hover:text-[#FAF5EC] transition-all px-2.5 py-1 rounded text-[10px] font-semibold uppercase tracking-wider"
                            >
                              Ver Ficha Genealógica
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {filteredAnimals.length === 0 && (
                  <div className="p-8 text-center text-xs text-gray-400">Nenhum animal cadastrado com estes filtros combinados (M02).</div>
                )}
              </div>

              {/* CARD DIALOG: GENEALOGY INTERACTIVE PEDIGREE TREE + SANITARY LIST */}
              {selectedAnimal && (
                <div className="fixed inset-0 z-45 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl border border-gray-200 p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl relative"
                  >
                    <button 
                      onClick={() => setSelectedAnimal(null)} 
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-100 p-1.5 rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    {/* Animal core details */}
                    <div className="flex flex-col sm:flex-row justify-between items-start border-b pb-4 border-gray-250 space-y-2 sm:space-y-0">
                      <div>
                        <span className="text-[10px] text-amber-600 font-mono tracking-wider font-semibold uppercase">Ficha Clínica & Genealógica Certificada</span>
                        <h4 className="text-xl font-extrabold text-[#2B1A0A] flex items-center space-x-2">
                          <span>{selectedAnimal.nome}</span> 
                          <span className="text-xs font-mono font-normal text-gray-400">[Código A-0{selectedAnimal.id}]</span>
                        </h4>
                        <p className="text-xs text-gray-500 italic">Raça e Linhagem: {selectedAnimal.raca} | Peso actual: {selectedAnimal.peso}Kg</p>
                      </div>
                      <div className="flex space-x-2">
                        {/* State Toggle for ADMIN or GESTOR */}
                        {['ADMIN', 'GESTOR'].includes(currentUser.perfil) && selectedAnimal.estado !== 'FALECIDO' && (
                          <div className="text-xs flex items-center bg-gray-100 p-1 rounded-md border text-gray-600">
                            <span className="mr-1.5 font-bold">Estado:</span>
                            <select
                              value={selectedAnimal.estado}
                              onChange={(e) => {
                                const updated: Animal = { ...selectedAnimal, estado: e.target.value as any };
                                const ok = editarAnimal(updated);
                                if (ok.success) setSelectedAnimal(updated);
                              }}
                              className="bg-white text-[11px] py-0.5 rounded"
                            >
                              <option value="ACTIVO">Activo</option>
                              <option value="QUARENTENA">Quarentena / Isolamento</option>
                            </select>
                          </div>
                        )}
                        <span className={`px-3 py-1.5 rounded font-mono font-bold text-xs ${
                          selectedAnimal.estado === 'ACTIVO' ? 'bg-amber-100 text-amber-800' : 'bg-amber-100 text-[#2B1A0A]'
                        }`}>
                          {selectedAnimal.estado}
                        </span>
                      </div>
                    </div>

                    {/* INTERACTIVE PEDIGREE FLOW CHART TREE */}
                    <div className="bg-[#F0E8D5] p-5 rounded-xl border border-[#D9C9A8] space-y-4">
                      <div className="flex items-center space-x-2 border-b border-[#D9C9A8] pb-2">
                        <Award className="w-5 h-5 text-[#7A5C38] shrink-0" />
                        <div>
                          <h5 className="font-extrabold text-xs text-[#2B1A0A] uppercase tracking-wide">Árvore Genealógica (Rastreamento Recursivo de Linhagem)</h5>
                          <p className="text-[9px] text-[#7A5C38]">Consulte pais e avós com base no auto-relacionamento da tabela.</p>
                        </div>
                      </div>

                      {/* Display Hierarchical tree structures using grid lines */}
                      <div className="space-y-6">
                        
                        {/* Selected Child row in Center */}
                        <div className="flex justify-center">
                          <div className="bg-[#7A5C38] text-[#FAF5EC] p-3 rounded-lg text-center shadow-xs min-w-44 select-none">
                            <span className="block text-[8px] text-[#D4A027] tracking-wider font-semibold font-mono uppercase">Animal Focado</span>
                            <strong className="block text-xs uppercase">{selectedAnimal.nome}</strong>
                            <span className="block text-[8px] font-mono text-gray-300">ID: A-0{selectedAnimal.id} • {selectedAnimal.sexo === 'M' ? 'Macho' : 'Fêmea'}</span>
                          </div>
                        </div>

                        {/* Connecting branch visual indicators */}
                        <div className="flex justify-center items-center h-2 select-none">
                          <div className="border-[#7A5C38]/40 border-t-2 border-x-2 h-full w-1/2" />
                        </div>

                        {/* Parents Generation Row */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col items-center">
                            {renderPedigreeNode('PAI (Macho)', selectedAnimal.idPai)}
                            
                            {/* Connecting Father Branch to Grandparents */}
                            {selectedAnimal.idPai && (
                              <div className="flex flex-col items-center w-full mt-2">
                                <div className="border-[#7A5C38]/40 border-t-2 border-x-2 h-2 w-1/2" />
                                <div className="grid grid-cols-2 gap-2 w-full max-w-64 mt-1">
                                  {renderPedigreeNode('Pai Paternal', animais.find(a => a.id === selectedAnimal.idPai)?.idPai || null)}
                                  {renderPedigreeNode('Mãe Paternal', animais.find(a => a.id === selectedAnimal.idPai)?.idMae || null)}
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex flex-col items-center">
                            {renderPedigreeNode('MÃE (Fêmea)', selectedAnimal.idMae)}

                            {/* Connecting Mother Branch to Grandparents */}
                            {selectedAnimal.idMae && (
                              <div className="flex flex-col items-center w-full mt-2">
                                <div className="border-[#7A5C38]/40 border-t-2 border-x-2 h-2 w-1/2" />
                                <div className="grid grid-cols-2 gap-2 w-full max-w-64 mt-1">
                                  {renderPedigreeNode('Pai Maternal', animais.find(a => a.id === selectedAnimal.idMae)?.idPai || null)}
                                  {renderPedigreeNode('Mãe Maternal', animais.find(a => a.id === selectedAnimal.idMae)?.idMae || null)}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* HEALTH CLINICAL PRONTUARY LOG */}
                    <div className="space-y-3">
                      <h5 className="font-extrabold text-xs text-[#2B1A0A] uppercase flex items-center space-x-1.5 border-b pb-1">
                        <Stethoscope className="w-4 h-4 text-amber-600" />
                        <span>Historial Clínico, Profilaxia & Sanidade Veterinária</span>
                      </h5>

                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {historicoSanitario.filter(h => h.idAnimal === selectedAnimal.id).map((h) => (
                          <div key={h.id} className="p-3 bg-[#FAF5EC] rounded-lg border border-gray-150 text-xs">
                            <div className="flex justify-between font-mono text-[9px] text-gray-400 pb-1 border-b border-gray-100">
                              <span className="font-bold flex items-center space-x-1">
                                <span>[EVENTO CLINICO A-0{h.id}]</span>
                                <span className={`px-1.5 rounded text-[8px] uppercase font-bold text-white ${
                                  h.tipo === 'VACINA' && 'bg-emerald-600'
                                } ${
                                  h.tipo === 'TRATAMENTO' && 'bg-sky-600'
                                } ${
                                  h.tipo === 'DOENCA' && 'bg-amber-600'
                                }`}>
                                  {h.tipo}
                                </span>
                              </span>
                              <span>Data: {h.dataEvento}</span>
                            </div>
                            <p className="mt-1.5 text-gray-700 leading-normal">{h.descricao}</p>
                            <span className="block text-[10px] text-amber-600 mt-1 pr-2 text-right">Dr/Dra Responsável: <strong>{h.veterinario}</strong></span>
                          </div>
                        ))}
                        {historicoSanitario.filter(h => h.idAnimal === selectedAnimal.id).length === 0 && (
                          <div className="p-4 rounded-lg bg-gray-50 text-center text-xs text-gray-405 font-mono">Sem eventos médicos históricos guardados para este animal.</div>
                        )}
                      </div>
                    </div>

                  </motion.div>
                </div>
              )}

            </div>
          )}

          {/* 3. REGISTAR NASCIMENTO (COMPATIBILITY ENGINE) */}
          {activeTab === 'nascimentos' && (
            <div id="sub-panel-nascimentos" className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Form card */}
              <div className="lg:col-span-7 bg-white border p-6 rounded-xl shadow-xs space-y-4">
                <h4 className="font-extrabold text-[#2B1A0A] text-sm uppercase border-b pb-2">Registo Evento Duplo (Animal + Parição)</h4>
                
                <form onSubmit={handleSubmitBirth} className="space-y-4">
                  {birthSubmitMsg && (
                    <div className={`p-4 rounded-lg text-xs border ${
                      birthSubmitMsg.success ? 'bg-emerald-50 text-amber-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'
                    }`}>
                      {birthSubmitMsg.text}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold font-mono text-gray-500">Mãe Portadora (Fêmeas Activas)</label>
                      <select
                        required
                        value={birthMae}
                        onChange={(e) => {
                          setBirthMae(e.target.value);
                          setBirthCheckResult(null);
                        }}
                        className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-xs focus:ring-1 focus:ring-amber-600"
                      >
                        <option value="">Seleccione a Mãe...</option>
                        {animais
                          .filter(a => a.sexo === 'F' && a.estado !== 'FALECIDO')
                          .map(mae => (
                            <option key={mae.id} value={mae.id}>
                              A-0{mae.id} — {mae.nome} [{especies.find(e=>e.id===mae.idEspecie)?.nome}]
                            </option>
                          ))
                        }
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold font-mono text-gray-500">Pai Reprodutor (Machos Activos)</label>
                      <select
                        required
                        value={birthPai}
                        onChange={(e) => {
                          setBirthPai(e.target.value);
                          setBirthCheckResult(null);
                        }}
                        className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-xs focus:ring-1 focus:ring-amber-600"
                      >
                        <option value="">Seleccione o Pai...</option>
                        {animais
                          .filter(a => a.sexo === 'M' && a.estado !== 'FALECIDO')
                          .map(pai => (
                            <option key={pai.id} value={pai.id}>
                              A-0{pai.id} — {pai.nome} [{especies.find(e=>e.id===pai.idEspecie)?.nome}]
                            </option>
                          ))
                        }
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleBirthMatingCheck}
                      disabled={!birthPai || !birthMae}
                      className="bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white font-semibold text-xs px-4 py-1.5 rounded cursor-pointer transition-colors"
                    >
                      Verificar Compatibilidade / Incesto
                    </button>
                  </div>

                  {/* Dynamic consanguinity report */}
                  {birthCheckResult && (
                    <div className={`p-4 rounded-xl border text-xs space-y-2 ${
                      birthCheckResult.relevancia.includes('PROIBIDO') 
                        ? 'bg-rose-50 border-rose-200 text-rose-800'
                        : birthCheckResult.relevancia === 'SEGURO'
                          ? 'bg-emerald-50 border-emerald-200 text-amber-800'
                          : 'bg-amber-50 border-amber-200 text-amber-800'
                    }`}>
                      <h5 className="font-extrabold flex items-center space-x-1 select-none">
                        <AlertTriangle className="w-4 h-4" />
                        <span>RELATÓRIO DE PARENTESCO BIO-INTELIGENTE</span>
                      </h5>
                      <p>{birthCheckResult.descricao}</p>
                    </div>
                  )}

                  {/* Disable fields if inbreeding is blocked */}
                  <fieldset 
                    disabled={!birthCheckResult || birthCheckResult.relevancia.includes('PROIBIDO')}
                    className="space-y-4 border-t pt-4 border-gray-150 disabled:opacity-50"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold font-mono text-gray-500">Nome Proposto da Cria</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Ex: Sara Cria"
                          value={birthNome}
                          onChange={(e) => setBirthNome(e.target.value)}
                          className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-xs focus:ring-1 focus:ring-amber-600 focus:outline-hidden"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold font-mono text-gray-500">Raça a Estipular</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Ex: Cruzado ou Pura"
                          value={birthRaca}
                          onChange={(e) => setBirthRaca(e.target.value)}
                          className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-xs focus:ring-1 focus:ring-amber-600 focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold font-mono text-gray-500">Data do Parto / Natalidade</label>
                        <input 
                          type="date" 
                          required
                          value={birthDate}
                          onChange={(e) => setBirthDate(e.target.value)}
                          className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-xs focus:ring-1 focus:ring-amber-600"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold font-mono text-gray-500">Peso Neonatal (Kg)</label>
                        <input 
                          type="number" 
                          required
                          min={1}
                          value={birthPeso}
                          onChange={(e) => setBirthPeso(Number(e.target.value))}
                          className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-xs focus:ring-1 focus:ring-amber-600"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold font-mono text-gray-500">Observações Veterinárias Neonatais</label>
                      <textarea 
                        rows={3}
                        placeholder="Aspecto do parto, primeiras reacções da cria..."
                        value={birthObs}
                        onChange={(e) => setBirthObs(e.target.value)}
                        className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-xs resize-none"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-[#2B1A0A] hover:bg-[#7A5C38] text-white py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase flex items-center justify-center space-x-1"
                    >
                      <span>Efectivar Nascimento (RN01)</span>
                    </button>
                  </fieldset>
                </form>
              </div>

              {/* Informative side criteria panel */}
              <div className="lg:col-span-5 bg-[#F0E8D5] p-6 rounded-xl border border-[#D9C9A8] space-y-4">
                <h4 className="font-extrabold text-[#2B1A0A] text-xs uppercase flex items-center space-x-1 tracking-wide select-none">
                  <BookOpen className="w-4 h-4 text-amber-600" /> <span>Legenda MHMfarmsGest</span>
                </h4>
                <p className="text-[11px] text-[#7A5C38] leading-relaxed">
                  Para efetuar um nascimento, seleccione a mãe fêmea e o pai macho. O sistema efectuará correlações biológicas recursivas no banco de dados da própria fazenda:
                </p>
                
                <div className="space-y-2 text-xs">
                  <div className="bg-white p-2.5 rounded border border-gray-250">
                    <strong className="block text-[#2B1A0A] font-mono text-[10px]">RN03: Progenitores Válidos</strong>
                    <p className="text-[10px] text-gray-500">Pai e mãe devem pertencer à mesma espécie biológica e estar em estado operacional ACTIVO.</p>
                  </div>
                  <div className="bg-white p-2.5 rounded border border-gray-250">
                    <strong className="block text-rose-800 font-mono text-[10px]">Bloqueio de 1º Grau Directo</strong>
                    <p className="text-[10px] text-gray-500">Cruzamentos como Pai x Filha ou Mãe x Filho são estritamente impedidos por esta aplicação.</p>
                  </div>
                  <div className="bg-white p-2.5 rounded border border-gray-250">
                    <strong className="block text-amber-800 font-mono text-[10px]">Alerta Recomendado (2º Grau)</strong>
                    <p className="text-[10px] text-gray-505">Parentescos como Avô x Neta geram alertas graves e recomendação expressa de interrupção biológica.</p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* 4. CONTROLO SEGURO DE ÓBITOS */}
          {activeTab === 'mortalidade' && (
            <div id="sub-panel-mortalidade" className="grid lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-7 bg-white border p-6 rounded-xl shadow-xs space-y-4">
                <h4 className="font-extrabold text-[#2B1A0A] text-sm uppercase border-b pb-2">Registar Baixa no Inventário Activo (RN06)</h4>
                
                <form onSubmit={handleSubmitMortality} className="space-y-4">
                  {mortSubmitMsg && (
                    <div className={`p-4 rounded-lg text-xs border ${
                      mortSubmitMsg.success ? 'bg-emerald-50 text-amber-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'
                    }`}>
                      {mortSubmitMsg.text}
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold font-mono text-gray-500">Animal Obsculado</label>
                    <select
                      required
                      value={mortIdAnimal}
                      onChange={(e) => setMortIdAnimal(e.target.value)}
                      className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-xs focus:ring-1 focus:ring-amber-600"
                    >
                      <option value="">Seleccione o Animal...</option>
                      {animais
                        .filter(a => a.estado !== 'FALECIDO')
                        .map(anim => (
                          <option key={anim.id} value={anim.id}>
                            A-0{anim.id} — {anim.nome} [{especies.find(e=>e.id===anim.idEspecie)?.nome}]
                          </option>
                        ))
                      }
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1 col-span-2">
                      <label className="text-[10px] uppercase font-bold font-mono text-gray-500">Causa Principal do Óbito</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Ex: Pneumonia bacteriana / Trauma acidental"
                        value={mortCausa}
                        onChange={(e) => setMortCausa(e.target.value)}
                        className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-xs focus:ring-1 focus:ring-amber-600 focus:outline-hidden"
                      />
                    </div>
                    <div className="space-y-1 col-span-2">
                      <label className="text-[10px] uppercase font-bold font-mono text-gray-500">Data do Óbito (Não Futura)</label>
                      <input 
                        type="date" 
                        required
                        value={mortDate}
                        onChange={(e) => setMortDate(e.target.value)}
                        className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-xs focus:ring-1 focus:ring-amber-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold font-mono text-gray-500">Observações de Autópsia / Laudo</label>
                    <textarea 
                      rows={3}
                      placeholder="Descreva detalhes ou diagnósticos médicos finais..."
                      value={mortObs}
                      onChange={(e) => setMortObs(e.target.value)}
                      className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-xs resize-none"
                    />
                  </div>

                  {/* Disable button if not admin/gestor */}
                  <button 
                    type="submit"
                    disabled={currentUser.perfil === 'OPERADOR'}
                    className="w-full bg-rose-950 hover:bg-rose-900 text-white py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase flex items-center justify-center space-x-1 disabled:opacity-40 select-none"
                  >
                    <span>Declarar Morte e Excluir de Reprodutores</span>
                  </button>
                  {currentUser.perfil === 'OPERADOR' && (
                    <span className="block text-[10px] text-rose-700 italic select-none">Apenas Administradores e Gestores têm licenciamento para declarar óbitos de animais.</span>
                  )}
                </form>
              </div>

              {/* Mortality log ledger */}
              <div className="lg:col-span-5 bg-[#FAF5EC] p-5 border rounded-xl space-y-4">
                <h4 className="font-extrabold text-[#2B1A0A] text-xs uppercase flex items-center space-x-1 tracking-wide">
                  <span>Arquivo Histórico de Óbitos</span>
                </h4>

                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {mortalidades.map((m) => {
                    const linked = animais.find(a => a.id === m.idAnimal);
                    return (
                      <div key={m.id} className="p-3 bg-white rounded border border-gray-200 text-xs text-[#2B1A0A]">
                        <div className="flex justify-between font-mono text-[9px] text-gray-400 border-b pb-1">
                          <strong>ID ÓBITO: M-0{m.id}</strong>
                          <span>{m.dataMorte}</span>
                        </div>
                        <p className="mt-1">Anim: <strong>{linked ? linked.nome : 'Excluido'}</strong> | ID A-0{m.idAnimal}</p>
                        <p className="text-rose-700 font-semibold text-[10px] mt-0.5">Causa: {m.causa}</p>
                        <p className="text-[10px] text-gray-500 italic mt-1 font-mono">{m.observacoes}</p>
                      </div>
                    );
                  })}
                  {mortalidades.length === 0 && (
                    <div className="p-4 text-center text-xs text-gray-400 font-mono">Sem registos históricos de mortalidade.</div>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* 5. HISTORIAL SANITÁRIO (VACCINES PANEL) */}
          {activeTab === 'sanitario' && (
            <div id="sub-panel-sanitario" className="grid lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-6 bg-white border p-6 rounded-xl shadow-xs space-y-4">
                <h4 className="font-extrabold text-[#2B1A0A] text-sm uppercase border-b pb-2">Registar Evento Clínico</h4>
                
                <form onSubmit={handleSubmitSanitario} className="space-y-4">
                  {sanSubmitMsg && (
                    <div className="bg-emerald-50 text-amber-800 text-xs p-3 rounded border border-emerald-200">
                      {sanSubmitMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold font-mono text-gray-500">Animal Seleccionado</label>
                      <select
                        required
                        value={sanIdAnimal}
                        onChange={(e) => setSanIdAnimal(e.target.value)}
                        className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-xs focus:ring-1 focus:ring-amber-600"
                      >
                        <option value="">Seleccione...</option>
                        {animais
                          .filter(a => a.estado !== 'FALECIDO')
                          .map(anim => (
                            <option key={anim.id} value={anim.id}>
                              A-0{anim.id} — {anim.nome}
                            </option>
                          ))
                        }
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold font-mono text-gray-500">Tipo de Intervenção</label>
                      <select
                        value={sanTipo}
                        onChange={(e) => setSanTipo(e.target.value as any)}
                        className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-xs focus:ring-1 focus:ring-amber-600"
                      >
                        <option value="VACINA">Vacinação Preventiva</option>
                        <option value="TRATAMENTO">Tratamento Médico / Medicamento</option>
                        <option value="DOENCA">Diagnóstico de Doença</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold font-mono text-gray-500">Data do Evento</label>
                      <input 
                        type="date" 
                        required
                        value={sanDate}
                        onChange={(e) => setSanDate(e.target.value)}
                        className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-xs focus:ring-1 focus:ring-amber-600"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold font-mono text-gray-500">Veterinário Clínico</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Nome do Médico"
                        value={sanVet}
                        onChange={(e) => setSanVet(e.target.value)}
                        className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-xs focus:ring-1 focus:ring-amber-600 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold font-mono text-gray-500">Descrição / Fármaco Utilizado</label>
                    <textarea 
                      rows={3}
                      required
                      placeholder="Ex: Dose 2cc da vacina contra carbúnculo. Reação estável."
                      value={sanDesc}
                      onChange={(e) => setSanDesc(e.target.value)}
                      className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-xs resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#7A5C38] hover:bg-[#C47B1C] text-white py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase flex items-center justify-center space-x-1"
                  >
                    Guardar Ficha Clínica (RF12)
                  </button>
                </form>
              </div>

              {/* Complete sanitary history query panel */}
              <div className="lg:col-span-6 bg-[#FAF5EC] p-5 border rounded-xl space-y-4">
                <h4 className="font-extrabold text-[#2B1A0A] text-xs uppercase flex items-center space-x-1.5 tracking-wide">
                  <Stethoscope className="w-4 h-4 text-amber-600" /> <span>Legenda e Historial Clínico Geral</span>
                </h4>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {historicoSanitario.slice(0, 10).map((h) => {
                    const linked = animais.find(a => a.id === h.idAnimal);
                    return (
                      <div key={h.id} className="p-3 bg-white hover:bg-gray-50/50 rounded border border-gray-150 text-xs">
                        <div className="flex justify-between font-mono text-[9px] text-gray-400 border-b pb-1">
                          <strong>EVENTO S-0{h.id} — {h.tipo}</strong>
                          <span>{h.dataEvento}</span>
                        </div>
                        <p className="mt-1">Pacinete: <strong>{linked ? linked.nome : 'ID '+h.idAnimal}</strong> [A-0{h.idAnimal}]</p>
                        <p className="text-gray-600 mt-1">{h.descricao}</p>
                        <span className="block text-right text-[10px] text-amber-600 mt-1 font-semibold">Vet: {h.veterinario}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* 6. PAINEL CMS WEB (NEWS, DESCRIPTION, EMAILS INBOX) */}
          {activeTab === 'cms' && (
            <div id="sub-panel-cms" className="space-y-6 flex flex-col">
              
              {/* CMS Navigation Tabs */}
              <div className="flex overflow-x-auto space-x-2 border-b border-gray-200 pb-px">
                <button
                  type="button"
                  onClick={() => setCmsSubTab('noticias')}
                  className={`py-3 px-5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center space-x-2 whitespace-nowrap ${
                    cmsSubTab === 'noticias'
                      ? 'border-[#7A5C38] text-[#2B1A0A]'
                      : 'border-transparent text-gray-400 hover:text-gray-700'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>📰 Notícias e Artigos</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCmsSubTab('especies')}
                  className={`py-3 px-5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center space-x-2 whitespace-nowrap ${
                    cmsSubTab === 'especies'
                      ? 'border-[#7A5C38] text-[#2B1A0A]'
                      : 'border-transparent text-gray-400 hover:text-gray-700'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>🦒 Catálogo de Espécies</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCmsSubTab('mensagens')}
                  className={`py-3 px-5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center space-x-2 whitespace-nowrap ${
                    cmsSubTab === 'mensagens'
                      ? 'border-[#7A5C38] text-[#2B1A0A]'
                      : 'border-transparent text-gray-400 hover:text-gray-700'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>✉️ Portal de Mensagens</span>
                  {mensagensWeb.filter(m => !m.lida).length > 0 && (
                    <span className="bg-rose-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full inline-block animate-pulse">
                      {mensagensWeb.filter(m => !m.lida).length}
                    </span>
                  )}
                </button>
              </div>

              {/* Subtab 1: News Dynamic Editor */}
              {cmsSubTab === 'noticias' && (
                <div className="grid lg:grid-cols-12 gap-8 items-start">
                  
                  {/* News form */}
                  <div className="lg:col-span-7 bg-white border p-6 rounded-xl shadow-xs space-y-5">
                    <div className="border-b pb-2">
                      <h4 className="font-extrabold text-[#2B1A0A] text-sm uppercase">Criar Nova Notícia Web (RF17)</h4>
                      <p className="text-gray-500 text-[11px] mt-1 text-xs">Adicione artigos, anúncios ou actualizações administrativas que serão listadas no website público.</p>
                    </div>
                    
                    <form onSubmit={handleCreateCmsNews} className="space-y-4">
                      {cmsSubmitMsg && (
                        <div className="bg-emerald-50 text-amber-800 text-xs p-3 rounded border border-emerald-250 font-medium">
                          🎉 Artigo publicado no Website com sucesso! Visível instantaneamente para potenciais compradores e o público em geral.
                        </div>
                      )}

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold font-mono text-amber-600">Título do Artigo <span className="text-rose-500">*</span></label>
                        <input 
                          type="text" 
                          required
                          placeholder="Ex: Ampliação de instalações..."
                          value={cmsTitle}
                          onChange={(e) => setCmsTitle(e.target.value)}
                          className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-xs focus:ring-1 focus:ring-amber-600 focus:outline-hidden"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold font-mono text-amber-600">Origem da Imagem da Notícia</label>
                        <div className="grid grid-cols-2 gap-2 bg-[#FAF5EC] p-1 rounded-lg border">
                          <button
                            type="button"
                            onClick={() => setCmsNewsImageType('url')}
                            className={`py-1 text-center font-bold text-[10px] rounded-md transition-all cursor-pointer ${
                              cmsNewsImageType === 'url' ? 'bg-[#7A5C38] text-white shadow-xs' : 'text-gray-500 hover:text-gray-900'
                            }`}
                          >
                            Link da Internet (URL)
                          </button>
                          <button
                            type="button"
                            onClick={() => setCmsNewsImageType('device')}
                            className={`py-1 text-center font-bold text-[10px] rounded-md transition-all cursor-pointer ${
                              cmsNewsImageType === 'device' ? 'bg-[#7A5C38] text-white shadow-xs' : 'text-gray-500 hover:text-gray-900'
                            }`}
                          >
                            Carregar do Dispositivo (PC)
                          </button>
                        </div>
                      </div>

                      {cmsNewsImageType === 'url' ? (
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold font-mono text-gray-500">Imagem Ilustrativa URL</label>
                          <input 
                            type="url" 
                            placeholder="https://images.unsplash.com/photo-..."
                            value={cmsImage}
                            onChange={(e) => setCmsImage(e.target.value)}
                            className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-xs focus:ring-1 focus:ring-amber-600 focus:outline-hidden"
                          />
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold font-mono text-gray-500">Ficheiro do Dispositivo</label>
                          <div className="border border-dashed border-gray-200 rounded-lg p-3 bg-[#FAF5EC] hover:bg-gray-55/60 text-center relative transition-colors cursor-pointer group">
                            <span className="block text-[10px] text-amber-600 font-semibold">
                              {cmsImage && cmsImage.startsWith('data:') ? '✅ Imagem carregada do dispositivo!' : 'Clique para selecionar ficheiro local'}
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const files = e.target.files;
                                if (files && files[0]) {
                                  const reader = new FileReader();
                                  reader.onload = (re) => {
                                    if (re.target?.result) {
                                      setCmsImage(re.target.result as string);
                                    }
                                  };
                                  reader.readAsDataURL(files[0]);
                                }
                              }}
                              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                            />
                          </div>
                        </div>
                      )}

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold font-mono text-amber-600">Corpo Textual do Artigo <span className="text-rose-500">*</span></label>
                        <textarea 
                          rows={6}
                          required
                          placeholder="Escreva sobre novidades, visitas, feiras comerciais ou maneio sanitário..."
                          value={cmsBody}
                          onChange={(e) => setCmsBody(e.target.value)}
                          className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-xs resize-none focus:ring-1 focus:ring-amber-600"
                        />
                      </div>

                      <button 
                        type="submit"
                        className="w-full bg-[#2B1A0A] hover:bg-[#7A5C38] text-[#FAF5EC] py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Publicar Notícia no Website Público
                      </button>
                    </form>
                  </div>

                  {/* News Live Preview */}
                  <div className="lg:col-span-5 bg-[#F0E8D5] border p-6 rounded-xl space-y-4">
                    <div>
                      <h5 className="text-[10px] uppercase font-extrabold tracking-wider text-amber-600 font-mono border-b border-[#D9C9A8] pb-1">
                        Visualização de Pré-Publicação
                      </h5>
                      <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">Visualização em tempo real de como será apresentado no carrossel de notícias integrado do portal principal.</p>
                    </div>

                    <article className="bg-[#FAF5EC] border border-gray-150 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="h-44 overflow-hidden bg-gray-200 flex items-center justify-center relative">
                          {cmsImage ? (
                            <img 
                              src={cmsImage} 
                              alt="" 
                              className="w-full h-full object-cover" 
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="text-center p-3 text-gray-400 italic">
                              <span className="block text-2xl">📰</span>
                              <span className="text-[10px] block mt-1">Sem Imagem Seleccionada</span>
                            </div>
                          )}
                          <div className="absolute top-2 left-2 bg-[#2B1A0A] text-white font-mono text-[8px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
                            Pré-Visualização
                          </div>
                        </div>

                        <div className="p-5 space-y-2">
                          <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono uppercase font-bold">
                            <span>Artigo da Fazenda</span>
                            <span>{new Date().toISOString().substring(0, 10)}</span>
                          </div>
                          
                          <h4 className="font-bold text-sm text-[#2B1A0A] leading-snug line-clamp-2">
                            {cmsTitle || 'Título Provisório da Notícia'}
                          </h4>
                          
                          <p className="text-[11px] text-gray-550 leading-relaxed line-clamp-3">
                            {cmsBody || 'O corpo textual introduzido acima irá aparecer em detalhe aqui. Escreva sobre as novidades da fazenda MHMFarms.'}
                          </p>
                        </div>
                      </div>

                      <div className="p-5 pt-0">
                        <button disabled className="text-[10px] font-extrabold text-[#7A5C38] inline-flex items-center opacity-60 select-none">
                          Mais informações sobre esta notícia <ChevronRight className="w-3 h-3 ml-0.5" />
                        </button>
                      </div>
                    </article>

                    <div className="bg-amber-50 border border-amber-200/50 p-3 rounded-lg text-[10px] text-amber-800 space-y-1">
                      <strong>Dica de design:</strong>
                      <p>Para melhor resultado visual, tente carregar imagens em formato paisagem (16:9 ou similar) e limite o título a 2 linhas curtas.</p>
                    </div>
                  </div>

                </div>
              )}

              {/* Subtab 2: Species list description editing */}
              {cmsSubTab === 'especies' && (
                <div className="space-y-6">
                  <div className="bg-white border p-6 rounded-xl">
                    <h3 className="font-extrabold text-[#2B1A0A] text-md uppercase">Layouts e Descrições de Espécies no Website</h3>
                    <p className="text-gray-500 text-xs mt-1">Configure o catálogo público do website: defina descrições atraentes, carregue fotos, regule a visibilidade da espécie no site e escolha individualmente as métricas de controlo biológico que deseja partilhar no portal público.</p>
                  </div>

                  <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 pb-2">
                    {especies.map((esp) => {
                      const webDesc = especiesWeb.find(ew => ew.idEspecie === esp.id) || {
                        id: 0,
                        idEspecie: esp.id,
                        descricaoPublica: esp.descricao,
                        imagemUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=400',
                        visivel: true,
                        verSexo: true,
                        verPopulacao: true,
                        verQuarentena: true,
                        verPesoMedio: true
                      };

                      return (
                        <SpeciesCmsCard
                          key={esp.id}
                          esp={esp}
                          webDesc={webDesc}
                          onSave={salvarEspecieWeb}
                          animaisList={animais}
                          getLocalSpecieStats={getLocalSpecieStats}
                          savedSpeciesIds={savedSpeciesIds}
                          setSavedSpeciesIds={setSavedSpeciesIds}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Subtab 3: Contact Messages inbox list */}
              {cmsSubTab === 'mensagens' && (
                <div className="bg-[#FAF5EC] p-6 border rounded-xl space-y-4">
                  <div className="border-b pb-2">
                    <h4 className="font-extrabold text-[#2B1A0A] text-xs uppercase flex items-center space-x-1.5 tracking-wide">
                      <Mail className="w-4 h-4 text-amber-600" />
                      <span>Mensagens dos Visitantes e Negócios</span>
                    </h4>
                    <p className="text-gray-500 text-[11px] mt-0.5 leading-snug">As mensagens abaixo são preenchidas por potenciais clientes interessados no catálogo através do formulário público de contacto do website.</p>
                  </div>

                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                    {mensagensWeb.length === 0 ? (
                      <div className="text-center py-12 text-[#7A5C38] italic text-xs">
                        Nenhuma mensagem recebida até ao momento.
                      </div>
                    ) : (
                      mensagensWeb.map((msg) => (
                        <div 
                          key={msg.id} 
                          className={`p-4 rounded-xl border text-xs space-y-2.5 transition-all shadow-2xs ${
                            msg.lida 
                              ? 'bg-white border-gray-150 text-[#2B1A0A]' 
                              : 'bg-emerald-50/50 border-emerald-250 text-[#2B1A0A]'
                          }`}
                        >
                          <div className="flex justify-between items-center text-[10px] text-amber-600 font-mono border-b pb-1 font-bold">
                            <span>De: <strong className="text-[#2B1A0A]">{msg.nome}</strong> ({msg.email})</span>
                            <span>{msg.dataRecebido.substring(0, 16)}</span>
                          </div>
                          
                          <div className="space-y-1">
                            <h5 className="font-extrabold text-xs text-[#2B1A0A]">Assunto: {msg.assunto}</h5>
                            <p className="text-gray-650 leading-relaxed text-[11px] bg-white/70 p-3 rounded-lg border border-gray-100">{msg.mensagem}</p>
                          </div>
                          
                          <div className="flex justify-between items-center pt-1 select-none">
                            <span className={`text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold ${
                              msg.lida 
                                ? 'bg-gray-100 text-gray-400' 
                                : 'bg-[#F0E8D5] text-[#7A5C38]'
                            }`}>
                              {msg.lida ? 'Mensagem Lida' : 'Nova Mensagem'}
                            </span>
                            {!msg.lida && (
                              <button 
                                onClick={() => marcarMensagemComoLida(msg.id)}
                                className="bg-[#2B1A0A] font-bold hover:bg-[#7A5C38] text-white text-[9px] uppercase tracking-wider py-1 px-3 rounded-md cursor-pointer transition-colors"
                              >
                                Marcar como Lido
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* 7. RELATÓRIOS E COMPILADOR PDF */}
          {activeTab === 'relatorios' && (
            <div id="sub-panel-relatorios" className="space-y-6">
              
              {/* Dynamic selector criteria */}
              <div className="bg-[#F0E8D5] p-5 rounded-xl border border-[#D9C9A8] flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 items-end text-xs">
                <div className="space-y-1 w-full sm:w-auto">
                  <label className="text-[10px] uppercase font-bold font-mono text-gray-500">Seleccionar Relatório (RF13)</label>
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value as any)}
                    className="w-full sm:w-48 bg-white border border-gray-200 rounded py-1.5 px-3"
                  >
                    <option value="INVENTARIO">Inventário Activo Geral</option>
                    <option value="NATALIDADE">Relatório de Partos / Natalidade</option>
                    <option value="MORTALIDADE">Relatório de Baixas por Óbito</option>
                    <option value="SANITARIO">Prontuário de Maneio Generalizado</option>
                  </select>
                </div>

                <div className="space-y-1 w-full sm:w-auto">
                  <label className="text-[10px] uppercase font-bold font-mono text-gray-500">Filtro de Espécie</label>
                  <select
                    value={reportSpecie}
                    onChange={(e) => setReportSpecie(e.target.value)}
                    className="w-full sm:w-48 bg-white border border-gray-200 rounded py-1.5 px-3"
                  >
                    <option value="ALL">Todas Espécies</option>
                    {especies.map(e => <option key={e.id} value={e.id}>{e.nome}</option>)}
                  </select>
                </div>

                <button
                  onClick={() => window.print()}
                  className="bg-[#7A5C38] hover:bg-[#C47B1C] text-white font-bold px-4 py-2 rounded flex items-center space-x-1 border-0 cursor-pointer"
                >
                  <Printer className="w-4 h-4" /> <span>Exportar / Imprimir</span>
                </button>
              </div>

              {/* PRINTABLE HIGH-FIDELITY SUMMARY CERTIFICATE CARD */}
              <div id="printable-area" className="bg-white border rounded-xl p-8 shadow-xs border-gray-200 space-y-6 max-w-4xl mx-auto border-t-8 border-t-[#7A5C38]">
                
                {/* Certificate layout header */}
                <div className="flex justify-between items-center pb-4 border-b">
                  <div className="space-y-1">
                    <h1 className="text-xl font-bold text-[#2B1A0A] tracking-wider font-mono">MHMFarms — Relatório Técnico</h1>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Emitido em 2026 • Manhiça, Moçambique</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-[#7A5C38] block">SISTEMA INTEGRADO MHMfarmsGest</span>
                    <span className="text-[9px] text-amber-600 font-semibold bg-[#C47B1C]/10 px-2 py-0.5 rounded uppercase">{reportType}</span>
                  </div>
                </div>

                {/* Subtitle details */}
                <div className="grid grid-cols-2 gap-4 text-xs font-mono select-none">
                  <div className="bg-[#FAF5EC] p-3 rounded">
                    <span className="block text-gray-400 text-[10px]">OPERADOR RESPONSÁVEL:</span>
                    <strong>{currentUser.nome} ({currentUser.perfil})</strong>
                  </div>
                  <div className="bg-[#FAF5EC] p-3 rounded text-right">
                    <span className="block text-gray-400 text-[10px]">TOTAL DE REGISTOS NESTA PREVIEW:</span>
                    <strong>{generatedReportData().length} registos compilados</strong>
                  </div>
                </div>

                {/* Table results list */}
                <div className="overflow-x-auto">
                  {reportType === 'INVENTARIO' && (
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-gray-50 text-gray-400 uppercase text-[9px] font-mono border-b">
                          <th className="p-2">Reg ID</th>
                          <th className="p-2">Nome</th>
                          <th className="p-2">Espécie</th>
                          <th className="p-2">Raça</th>
                          <th className="p-2">Sexo</th>
                          <th className="p-2">Peso</th>
                          <th className="p-2">Estado</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y text-gray-600">
                        {generatedReportData().map((rec: any) => (
                          <tr key={rec.id} className="hover:bg-gray-50/40">
                            <td className="p-2 font-mono">A-0{rec.id}</td>
                            <td className="p-2 font-bold">{rec.nome}</td>
                            <td className="p-2">{especies.find(e=>e.id===rec.idEspecie)?.nome}</td>
                            <td className="p-2">{rec.raca}</td>
                            <td className="p-2">{rec.sexo === 'M' ? 'Macho' : 'Fêmea'}</td>
                            <td className="p-2 font-mono">{rec.peso}kg</td>
                            <td className="p-2">{rec.estado}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                  {reportType === 'NATALIDADE' && (
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-gray-50 text-gray-400 uppercase text-[9px] font-mono border-b">
                          <th className="p-2">Nasc ID</th>
                          <th className="p-2">Data Parto</th>
                          <th className="p-2">Cria Registada</th>
                          <th className="p-2">Mãe [F]</th>
                          <th className="p-2">Pai [M]</th>
                          <th className="p-2">Observações Neonatais</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y text-gray-600">
                        {generatedReportData().map((rec: any) => (
                          <tr key={rec.id} className="hover:bg-gray-50/40">
                            <td className="p-2 font-mono">N-0{rec.id}</td>
                            <td className="p-2 font-mono">{rec.dataNasc}</td>
                            <td className="p-2 font-bold">{animais.find(a=>a.id===rec.idCria)?.nome || 'Nome Cria'} [ID: A-0{rec.idCria}]</td>
                            <td className="p-2">{animais.find(a=>a.id===rec.idMae)?.nome}</td>
                            <td className="p-2">{animais.find(a=>a.id===rec.idPai)?.nome}</td>
                            <td className="p-2 italic max-w-xs truncate">{rec.observacoes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                  {reportType === 'MORTALIDADE' && (
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-gray-50 text-gray-400 uppercase text-[9px] font-mono border-b">
                          <th className="p-2">Morte ID</th>
                          <th className="p-2">Data Óbito</th>
                          <th className="p-2">Nome Animal</th>
                          <th className="p-2 text-rose-700">Causa Principal</th>
                          <th className="p-2">Laudo Clínico</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y text-gray-600">
                        {generatedReportData().map((rec: any) => (
                          <tr key={rec.id} className="hover:bg-gray-50/40">
                            <td className="p-2 font-mono">M-0{rec.id}</td>
                            <td className="p-2 font-mono">{rec.dataMorte}</td>
                            <td className="p-2 font-bold">{animais.find(a=>a.id===rec.idAnimal)?.nome} [ID: A-0{rec.idAnimal}]</td>
                            <td className="p-2 text-rose-700 font-semibold">{rec.causa}</td>
                            <td className="p-2 italic max-w-xs truncate">{rec.observacoes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                  {reportType === 'SANITARIO' && (
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-gray-50 text-gray-400 uppercase text-[9px] font-mono border-b">
                          <th className="p-2">Clínico ID</th>
                          <th className="p-2">Data Evento</th>
                          <th className="p-2">Nome Paciente</th>
                          <th className="p-2">Intervenção</th>
                          <th className="p-2">Fármaco / Prontuário</th>
                          <th className="p-2">Médico Responsável</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y text-gray-600">
                        {generatedReportData().map((rec: any) => (
                          <tr key={rec.id} className="hover:bg-gray-50/40">
                            <td className="p-2 font-mono">S-0{rec.id}</td>
                            <td className="p-2 font-mono">{rec.dataEvento}</td>
                            <td className="p-2 font-bold">{animais.find(a=>a.id===rec.idAnimal)?.nome} [ID: A-0{rec.idAnimal}]</td>
                            <td className="p-2"><span className="bg-amber-100 text-[#2B1A0A] px-2 py-0.5 rounded scale-90">{rec.tipo}</span></td>
                            <td className="p-2 italic max-w-xs truncate">{rec.descricao}</td>
                            <td className="p-2 font-semibold text-[#7A5C38]">{rec.veterinario}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                  {generatedReportData().length === 0 && (
                    <div className="p-8 text-center text-xs text-gray-400 font-mono">Nenhum registo disponível para os critérios de espécie associados (M02).</div>
                  )}
                </div>

                <div className="pt-10 border-t border-dashed mt-12 flex justify-between select-none">
                  <div>
                    <span className="block text-[8px] text-gray-400">CARIMBO DIGITAL VETERINÁRIO</span>
                    <strong className="block text-[10px] text-amber-600">MHMFarms Moçambique • Registos Seguros</strong>
                  </div>
                  <div className="text-center w-40 border-t border-gray-400 pt-1 text-[9px]">
                    Assinatura do Gestor Responsável
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

      </main>

    </div>
  );
};
