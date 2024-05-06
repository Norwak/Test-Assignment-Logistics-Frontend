import { Container } from "@gravity-ui/uikit";
import CarriersAdminTable from "../components/tables/CarriersAdminTable";

export default function AdminCarriersPage() {
  return (
    <section className="gravity-table" id="gravity-table">
      <Container maxWidth='l'>
        <div className="gravity-table__inner">
          <CarriersAdminTable />
        </div>
      </Container>
    </section>
  );
}