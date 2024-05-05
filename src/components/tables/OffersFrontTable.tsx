import { Table } from "@gravity-ui/uikit";

export default function OffersFrontTable() {
  type Item = {id: number, date: string, notes?: string | null, client: {name: string}, carrier: {name: string, phone?: string | null, atiId?: number | null}};

  const columns = [
    {id: 'id', name: 'Номер заявки'},
    {id: 'date', name: 'Дата'},
    {id: 'client.name', name: 'Клиент'},
    {id: 'carrier.name', name: 'Перевозчик'},
    {id: 'carrier.phone', name: 'Телефон'},
    {id: 'notes', name: 'Комментарии'},
    {id: 'status', name: 'Статус'},
    {id: 'carrier.atiId', name: 'Ссылка на ATI'},
  ];

  const data: Item[] = [
    {id: 1, date: '2024-12-12 12:12:12', notes: 'Привезти утром', client: {name: 'Ozon'}, carrier: {name: 'Деловые линии', phone: '+7 (343) 000-00-00', atiId: 12345}},
    {id: 2, date: '2024-09-09 09:09:09', notes: null, client: {name: 'Ozon'}, carrier: {name: 'Деловые линии', phone: null, atiId: null}},
  ];

  return (
    // @ts-ignore
    <Table data={data} columns={columns} />
  );
}