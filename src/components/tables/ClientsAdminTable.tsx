import { Table, withTableActions, withTableSorting } from "@gravity-ui/uikit";
import { Client } from "../../types/Client.type";

export default function ClientsAdminTable() {
  const columns = [
    {id: 'id', name: 'Номер клиента', meta: {sort: true}},
    {id: 'name', name: 'Имя', meta: {sort: true}},
  ];

  const data: Client[] = [
    {id: 1, name: 'Ozon'},
    {id: 2, name: 'Wildberries'},
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
  const MyTable2 = withTableSorting(MyTable);

  return (
    // @ts-ignore
    <MyTable2 data={data} columns={columns} getRowActions={getRowActions} />
  );
}