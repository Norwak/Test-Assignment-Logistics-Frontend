import { Table, withTableActions } from "@gravity-ui/uikit";

export default function CarriersAdminTable() {
  type Item = {id: number, name: string, phone?: string | null, atiId?: number | null};

  const columns = [
    {id: 'id', name: 'Номер перевозчика'},
    {id: 'name', name: 'Название'},
    {id: 'phone', name: 'Телефон'},
    {id: 'atiId', name: 'Ссылка на ATI'},
  ];

  const data: Item[] = [
    {id: 1, name: 'Деловые линии', phone: '+7 (343) 000-00-00', atiId: 12345},
    {id: 2, name: 'Деловые линии', phone: null, atiId: null},
  ];

  const getRowActions = () => {
    return [
      {
        text: 'Print',
        handler: () => {},
      },
      {
        text: 'Remove',
        handler: () => {},
        theme: 'danger',
      },
    ];
  };

  const MyTable = withTableActions(Table);

  return (
    // @ts-ignore
    <MyTable data={data} columns={columns} getRowActions={getRowActions} />
  );
}