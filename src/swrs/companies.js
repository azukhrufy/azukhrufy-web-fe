import companiesService from "@/services/companiesService";
import { createSWRHook } from "./_factory";

export const useGetCompanies = createSWRHook({
  key: "use-companies",
  fetcher: companiesService.getListCompanies,
});
