export type Offer = {
  id: number,
  date: string,
  humanDate?: string,
  notes?: string | null,
  status: number,
  humanStatus?: string,
  client: {
    id: number;
    name: string
  },
  carrier: {
    id: number;
    name: string,
    phone?: string | null,
    atiId?: number | null,
    atiLink?: any | string | null
  }
};