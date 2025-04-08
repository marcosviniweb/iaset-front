export interface Dependent {
  id: number;
  name: string;
  birthDate: string; // Pode ser Date se for manipulado como objeto Date
  relationship: string;
  cpf: string;
  certidaoNascimentoOuRGCPF: null;
  comprovanteCasamentoOuUniao: null;
  createdAt: string;
  status: boolean;
  updatedAt: string;
  user?: { id: number; name: string };
  userId?: number;
  }