export type Order = 'asc' | 'desc'

export interface IOptions {
  [key: string]: string
}


export interface ClientData {
  id: number
  numeroDocumento: string
  tipoDocumento: string
  nome: string
  logradouro: string
  numero: string
  bairro: string
  cidade: string
  uf: string
}



export interface DriverData {
  id: number
  nome: string
  numeroHabilitacao: string
  catergoriaHabilitacao: string
  vencimentoHabilitacao: string
}

export interface DisplacementData {
  id: number
  kmInicial: number
  kmFinal: number
  inicioDeslocamento: string
  fimDeslocamento: string
  checkList: string
  motivo: string
  observacao: string
  idCondutor: number
  idVeiculo: number
  idCliente: number
}


export interface VehicleData {
  id: number
  placa: string
  marcaModelo: string
  anoFabricacao: number
  kmAtual: number
}


export interface IHeadCell {
  disablePadding: boolean
  id: keyof ClientData
  label: string
  numeric: boolean
}

export interface ContactsTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof ClientData
  ) => void
  order: Order
  orderBy: string
  rowCount: number
}
