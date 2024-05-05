import { Table } from "@gravity-ui/uikit";
import { useLoaderData } from "react-router-dom";
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
    {id: 'id', name: 'Номер заявки'},
    {id: 'humanDate', name: 'Дата'},
    {id: 'client.name', name: 'Клиент'},
    {id: 'carrier.name', name: 'Перевозчик'},
    {id: 'carrier.phone', name: 'Телефон'},
    {id: 'notes', name: 'Комментарии'},
    {id: 'status', name: 'Статус'},
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

  return (
    <Table data={offers} columns={columns} />
  );
}


export async function offersLoader() {
  const response = await fetch('http://localhost:3000/offers/search');
  return await response.json();
}