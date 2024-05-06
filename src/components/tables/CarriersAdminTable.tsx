import { Table, withTableActions, withTableSorting } from "@gravity-ui/uikit";
import { Link, json, redirect, useLoaderData, useNavigate, useSubmit } from "react-router-dom";
import { Carrier } from "../../types/Carrier.type";

export default function CarriersAdminTable() {
  const submit = useSubmit();
  const navigate = useNavigate();
  const carriers = useLoaderData() as Carrier[];

  const columns = [
    {id: 'id', name: 'Номер перевозчика', meta: {sort: true}},
    {id: 'name', name: 'Название', meta: {sort: true}},
    {id: 'phone', name: 'Телефон', meta: {sort: true}},
    {id: 'atiId', name: 'Ссылка на ATI'},
  ];

  const getRowActions = () => {
    return [
      {
        text: 'Изменить',
        handler: (item: Carrier) => {
          navigate(`/admin/carriers/${item.id}/edit/`);
        },
      },
      {
        text: 'Удалить',
        handler: (item: Carrier) => {
          const confirmed = confirm(`Точно удалить строку номер ${item.id}?`);
          if (confirmed) {
            submit({id: item.id}, {method: 'DELETE', encType: 'application/json', action: '/admin/carriers/'});
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
          <Link to="/admin/carriers/new/">Новый перевозчик</Link>
          <div>Поиск по таблице через Ctrl+F</div>
          <div>Всего {carriers.length} строк{[2,3,4].includes(carriers.length % 10) ? 'и' : ''}</div>
        </div>
      </div>
      <div className="gravity-table__itself mt10">
        {/* @ts-ignore */}
        <MyTable2 data={carriers} columns={columns} getRowActions={getRowActions} />
      </div>
    </>
  );
}


export async function carriersLoader() {
  try {
    const response = await fetch('http://localhost:3000/carriers');
    return await response.json();
  } catch (error) {
    throw json({message: 'Не получилось скачать данные таблицы.'}, {status: 500});
  }
}


export async function deleteCarrierAction({request}: {request: Request}) {
  if (request.method === 'DELETE') {
    try {
      const data = await request.json();
      await fetch('http://localhost:3000/carriers/'+data.id, {method: 'DELETE'});
    } catch (error) {
      throw json({message: 'Не получилось удалить строку'}, {status: 500});
    }
  }

  return redirect('/admin/carriers/');
}