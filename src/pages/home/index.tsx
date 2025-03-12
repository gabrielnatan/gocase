import { format } from "date-fns";
import { AppCard } from "@/components/app-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetActiveCampaigns,
  useGetAllCampaigns,
  useGetArchivedCampaigns,
  useGetCanceledCampaigns,
  useGetCompletedCampaigns,
} from "@/service/campaign";

export const Home = () => {
  const { data: actived } = useGetActiveCampaigns();
  const { data: archived } = useGetArchivedCampaigns();
  const { data: canceled } = useGetCanceledCampaigns();
  const { data: completed } = useGetCompletedCampaigns();
  const { data: all } = useGetAllCampaigns();

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex gap-5 items-center justify-between">
        <AppCard
          title="Campanhas Ativas"
          value={actived ? actived?.length : 0}
        />
        <AppCard
          title="Campanhas Canceladas"
          value={canceled ? canceled?.length : 0}
        />
        <AppCard
          title="Campanhas Arquivadas"
          value={archived ? archived?.length : 0}
        />
        <AppCard
          title="Campanhas em Finalizadas"
          value={completed ? completed?.length : 0}
        />
      </div>

      <Table className="border relative rounded-sm bg-white flex-1 max-h-[70vh] overflow-auto">
        <TableHeader className="sticky -top-[0.2px] bg-white">
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Publicação</TableHead>
            <TableHead>Entrega</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {all?.map((el) => {
            console.log(el);
            return (
              <TableRow>
                <TableCell className="font-medium">{el.name}</TableCell>
                <TableCell>
                  {format(new Date(el.dates.publicacao), "dd/MM/yyyy")}
                </TableCell>
                <TableCell>
                  {format(new Date(el.dates.entrega), "dd/MM/yyyy")}
                </TableCell>
                <TableCell className="text-right">{el.status}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
