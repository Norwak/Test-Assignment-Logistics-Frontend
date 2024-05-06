import { Table, withTableActions, withTableSorting } from "@gravity-ui/uikit";
import { Link, json, redirect, useLoaderData, useNavigate, useSubmit } from "react-router-dom";
import { padZeros } from "../../utility/functions";
import parse from 'html-react-parser';
import { Offer } from "../../types/Offer.type";
import { dateTimeParse } from "@gravity-ui/date-utils";


export default function OffersAdminTable() {
  const submit = useSubmit();
  const navigate = useNavigate();
  const offers = useLoaderData() as Offer[];

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
    offer.humanDate = dateTimeParse(offer.date)?.format('DD.MM.YYYY HH.mm');

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
        text: 'Изменить',
        handler: (item: Offer) => {
          navigate(`/admin/${item.id}/edit/`);
        },
      },
      {
        text: 'Удалить',
        handler: (item: Offer) => {
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
          <Link to="/admin/new/">Новая заявка</Link>
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
    try {
      const data = await request.json();
      await fetch('http://localhost:3000/offers/'+data.id, {method: 'DELETE'});
    } catch (error) {
      throw json({message: 'Не получилось удалить строку'}, {status: 500});
    }

  }

  return redirect('/admin/');
}