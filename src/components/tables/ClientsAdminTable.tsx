import { Table, withTableActions, withTableSorting } from "@gravity-ui/uikit";
import { Client } from "../../types/Client.type";
import { Link, json, redirect, useLoaderData, useNavigate, useSubmit } from "react-router-dom";

export default function ClientsAdminTable() {
  const submit = useSubmit();
  const navigate = useNavigate();
  const clients = useLoaderData() as Client[];

  const columns = [
    {id: 'id', name: 'Номер клиента', meta: {sort: true}},
    {id: 'name', name: 'Имя', meta: {sort: true}},
  ];

  const getRowActions = () => {
    return [
      {
        text: 'Изменить',
        handler: (item: Client) => {
          navigate(`/admin/clients/${item.id}/edit/`);
        },
      },
      {
        text: 'Удалить',
        handler: (item: Client) => {
          const confirmed = confirm(`Точно удалить строку номер ${item.id}?`);
          if (confirmed) {
            submit({id: item.id}, {method: 'DELETE', encType: 'application/json', action: '/admin/clients/'});
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
          <Link to="/admin/clients/new/">Новый клиент</Link>
          <div>Поиск по таблице через Ctrl+F</div>
          <div>Всего {clients.length} строк{[2,3,4].includes(clients.length % 10) ? 'и' : ''}</div>
        </div>
      </div>
      <div className="gravity-table__itself mt10">
        {/* @ts-ignore */}
        <MyTable2 data={clients} columns={columns} getRowActions={getRowActions} />
      </div>
    </>
  );
}


export async function clientsLoader() {
  try {
    const response = await fetch('http://localhost:3000/clients');
    return await response.json();
  } catch (error) {
    throw json({message: 'Не получилось скачать данные таблицы.'}, {status: 500});
  }
}


export async function deleteClientAction({request}: {request: Request}) {
  if (request.method === 'DELETE') {
    try {
      const data = await request.json();
      await fetch('http://localhost:3000/clients/'+data.id, {method: 'DELETE'});
    } catch (error) {
      throw json({message: 'Не получилось удалить строку'}, {status: 500});
    }
  }

  return redirect('/admin/clients/');
}