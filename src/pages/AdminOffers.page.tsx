import { Container } from "@gravity-ui/uikit";
import OffersAdminTable from "../components/tables/OffersAdminTable";

export default function AdminOffersPage() {
  return (
    <section className="gravity-table" id="gravity-table">
      <Container maxWidth='l'>
        <div className="gravity-table__inner">
          <OffersAdminTable />
        </div>
      </Container>
    </section>
  );
}