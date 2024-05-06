import { Table, withTableActions, withTableSorting } from "@gravity-ui/uikit";
import { json, redirect, useLoaderData, useSubmit } from "react-router-dom";
import { padZeros } from "../../utility/functions";
import parse from 'html-react-parser';


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


export default function OffersAdminTable() {
  const submit = useSubmit();
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

  const getRowActions = () => {
    return [
      {
        text: 'Edit',
        handler: () => {},
      },
      {
        text: 'Remove',
        handler: (item: Item) => {
          const confirmed = confirm(`Точно удалить строку номер ${item.id}?`);
          if (confirmed) {
            submit({id: item.id}, {method: 'DELETE', encType: 'application/json', action: '/admin/'});
          }
        },
        theme: 'danger',
      },
    ];
  };

  const MyTable = withTableActions(Table);
  const MyTable2 = withTableSorting(MyTable);

  return (
    <>
      <div className="plr10">
        <div className="gravity-table__header flex-csb gap15">
          <div>Поиск по таблице через Ctrl+F</div>
          <div>Всего {offers.length} строк{[2,3,4].includes(offers.length % 10) ? 'и' : ''}</div>
        </div>
      </div>
      <div className="gravity-table__itself mt10">
        {/* @ts-ignore */}
        <MyTable2 data={offers} columns={columns} getRowActions={getRowActions} />
      </div>
    </>
  );
}


export async function deleteOfferAction({request}: {request: Request}) {
  if (request.method === 'DELETE') {
    const id = await request.json();
    // const response = await fetch();
  }

  return redirect('/admin/');
}