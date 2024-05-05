import { Table, withTableSorting } from "@gravity-ui/uikit";
import { json, useLoaderData } from "react-router-dom";
import { padZeros } from "../../utility/functions";
import parse from 'html-react-parser';

export default function OffersFrontTable() {
  type Item = {
    id: number,
    date: string,
    humanDate?: string,
    notes?: string | null,
    status: number,
    humanStatus?: string,
    client: {
      name: string
    },
    carrier: {
      name: string,
      phone?: string | null,
      atiId?: number | null,
      atiLink?: any | string | null
    }
  };

  const offers = useLoaderData() as Item[];

  const columns = [
    {id: 'id', name: 'Номер заявки', meta: {sort: true}},
    {id: 'humanDate', name: 'Дата', meta: {sort: true}},
    {id: 'client.name', name: 'Клиент', meta: {sort: true}},
    {id: 'carrier.name', name: 'Перевозчик', meta: {sort: true}},
    {id: 'carrier.phone', name: 'Телефон', meta: {sort: true}},
    {id: 'notes', name: 'Комментарии'},
    {id: 'humanStatus', name: 'Статус', meta: {sort: true}},
    {id: 'carrier.atiLink', name: 'Ссылка на ATI'},
  ];

  for (const offer of offers) {
    const date = new Date(offer.date);
    const days = padZeros(date.getDate());
    const month = padZeros(date.getMonth()+1);
    const year = date.getFullYear();
    const hours = padZeros(date.getUTCHours());
    const minutes = padZeros(date.getMinutes());
    offer.humanDate = `${days}.${month}.${year} ${hours}:${minutes}`;

    switch (offer.status) {
      case 0:
        offer.humanStatus = 'Новый';
        break;
      case 1:
        offer.humanStatus = 'В работе';
        break;
      case 2:
        offer.humanStatus = 'Завершено';
        break;
    }

    if (offer.carrier && offer.carrier.atiId) {
      offer.carrier.atiLink = parse(`<a href="https://ati.su/firms/${offer.carrier.atiId}/info" target="_blank">Перейти</a>`);
    }
  }

  // const data: Item[] = [
  //   {id: 1, date: '2024-12-12 12:12:12', notes: 'Привезти утром', client: {name: 'Ozon'}, carrier: {name: 'Деловые линии', phone: '+7 (343) 000-00-00', atiId: 12345}},
  //   {id: 2, date: '2024-09-09 09:09:09', notes: null, client: {name: 'Ozon'}, carrier: {name: 'Деловые линии', phone: null, atiId: null}},
  // ];

  const MyTable = withTableSorting(Table);

  return (
    <>
      <div className="plr10">
        <div className="gravity-table__header flex-csb gap15">
          <div>Поиск по таблице через Ctrl+F</div>
          <div>Всего {offers.length} строк{[2,3,4].includes(offers.length % 10) ? 'и' : ''}</div>
        </div>
      </div>
      <div className="gravity-table__itself mt10">
        <MyTable data={offers} columns={columns} />
      </div>
    </>
  );
}


export async function offersLoader() {
  try {
    const response = await fetch('http://localhost:3000/offers/search');
    return await response.json();
  } catch (error) {
    throw json({message: 'Не получилось скачать данные таблицы.'}, {status: 500});
  }
}