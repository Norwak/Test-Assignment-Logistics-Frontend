import { Container } from "@gravity-ui/uikit";
import ClientsAdminTable from "../components/tables/ClientsAdminTable";

export default function AdminClientsPage() {
  return (
    <section className="gravity-table" id="gravity-table">
      <Container maxWidth='l'>
        <div className="gravity-table__inner">
          <ClientsAdminTable />
        </div>
      </Container>
    </section>
  );
}