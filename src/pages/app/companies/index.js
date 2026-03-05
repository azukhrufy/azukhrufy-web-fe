import CustomPopover from "@/components/CustomPopover";
import TextWithSoftBreaks from "@/components/TextWithSoftBreaks";
import AuthGuards from "@/guards/AuthGuards";
import useDateTimeHelper from "@/hooks/useDateTimeHelper";
import DashboardLayout from "@/layouts/DashboardLayout";
import CreateUpdateCompaniesModal from "@/sections/companies/modals/CreateUpdateCompaniesModal";
import DeleteCompaniesModal from "@/sections/companies/modals/DeleteCompaniesModal";
import { useGetCompanies } from "@/swrs/companies";
import {
  Box,
  Button,
  Flex,
  Grid,
  IconButton,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";

CompaniesPage.getLayout = function getLayout(page) {
  return (
    <AuthGuards>
      <DashboardLayout>{page}</DashboardLayout>
    </AuthGuards>
  );
};

export default function CompaniesPage() {
  const [keyword, setKeyword] = useState("");
  const { data: listCompanies, mutate: mutateCompanies } = useGetCompanies({
    ...(keyword?.length > 0 && { search: keyword }),
    order: "desc",
    orderBy: "startDate",
  });
  const dateTimeHelper = useDateTimeHelper();

  const handleUpdateCompany = useDisclosure();
  const handleCreateCompany = useDisclosure();
  const handleDeleteCompany = useDisclosure();
  const [selectedData, setSelectedData] = useState(null);
  return (
    <Box>
      <Head>
        <title>Companies | Azukhrufy Web</title>
        <meta name="description" content="Ananda Zukhruf Personal Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid templateColumns="1fr max-content" gridGap={4} alignItems="center">
        <Input
          placeholder="Search companies..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button colorScheme="purple" onClick={handleCreateCompany.onOpen}>
          Perusahaan Baru
        </Button>
      </Grid>
      <Flex flexDirection="column" gap={3} mt={4}>
        {listCompanies?.map((company) => (
          <Box
            key={company?.id}
            border="1px solid"
            borderColor="gray.200"
            p={4}
            rounded="lg"
            cursor='pointer'
            _hover={{
              background: 'gray.50'
            }}
          >
            <Flex flexDirection="row" justifyContent="space-between">
              <Flex flexDirection="column" gap={1}>
                <Text fontWeight="bold" fontSize="1.2rem">
                  {company?.name}
                </Text>
                <Text fontSize="0.875rem" color="gray.500">
                  {dateTimeHelper.client.formatDate(company?.startDate)} -{" "}
                  {company?.endDate
                    ? dateTimeHelper.client.formatDate(company?.endDate)
                    : "Sekarang"}
                  , {company?.role}
                </Text>
                <TextWithSoftBreaks>{company?.description}</TextWithSoftBreaks>
              </Flex>
              <CustomPopover
                placement="start"
                content={(onClose) => {
                  return (
                    <Box>
                      <Button
                        variant="ghost"
                        colorScheme="gray"
                        w="100%"
                        justifyContent="flex-start"
                        onClick={() => {
                          setSelectedData(company);
                          handleUpdateCompany.onOpen();
                          onClose();
                        }}
                        fontWeight="normal"
                        size="sm"
                      >
                        Edit Company
                      </Button>
                      <Button
                        variant="ghost"
                        colorScheme="red"
                        w="100%"
                        justifyContent="flex-start"
                        onClick={() => {
                          setSelectedData(company);
                          handleDeleteCompany.onOpen();
                          onClose();
                        }}
                        fontWeight="normal"
                        size="sm"
                      >
                        Delete Company
                      </Button>
                    </Box>
                  );
                }}
              >
                <IconButton
                  variant="ghost"
                  colorScheme="gray"
                  aria-label="Company options"
                  icon={<SlOptionsVertical />}
                />
              </CustomPopover>
            </Flex>
          </Box>
        ))}
      </Flex>

      <CreateUpdateCompaniesModal
        openState={handleUpdateCompany.isOpen}
        onClose={handleUpdateCompany.onClose}
        mutate={mutateCompanies}
        currentData={selectedData}
      />
      <CreateUpdateCompaniesModal
        openState={handleCreateCompany.isOpen}
        onClose={handleCreateCompany.onClose}
        mutate={mutateCompanies}
      />
      <DeleteCompaniesModal
        openState={handleDeleteCompany.isOpen}
        onClose={handleDeleteCompany.onClose}
        mutate={mutateCompanies}
        data={selectedData}
      />
    </Box>
  );
}
