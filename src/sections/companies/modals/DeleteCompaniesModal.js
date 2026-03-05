import CustomModal, { CustomModalContainer } from "@/components/CustomModal";
import companiesService from "@/services/companiesService";
import { Button, Flex, useToast } from "@chakra-ui/react";
import { useState } from "react";

/**
 * A modal component for confirming and handling company deletion.
 *
 * @param {Object} props - The component props
 * @param {boolean} props.openState - Controls whether the modal is open or closed
 * @param {Function} props.onClose - Callback function to close the modal
 * @param {Object} props.data - Company data object containing id and name
 * @param {string} props.data.id - The unique identifier of the company to delete
 * @param {string} props.data.name - The name of the company to display in confirmation message
 * @returns {JSX.Element} A confirmation modal with delete and cancel actions
 *
 */
export default function DeleteCompaniesModal({
  openState,
  onClose,
  data,
  mutate,
}) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const handleDelete = async (companyId) => {
    setLoading(true);
    try {
      await companiesService.deleteCompany(companyId);
      mutate();
      toast({
        title: "Company deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      toast({
        title: "Error deleting company",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <CustomModal
      openState={openState}
      onClose={onClose}
      modalTitle="Delete Company"
      size="md"
      modalFooterProps={{
        display: "none",
      }}
    >
      <CustomModalContainer>
        Are you sure you want to delete the company "{data?.name}"?
      </CustomModalContainer>
      <CustomModalContainer>
        <Flex flexDirection="row" justifyContent="flex-end" gap={3}>
          <Button
            colorScheme="red"
            onClick={() => handleDelete(data.id)}
            isLoading={loading}
          >
            Delete
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            colorScheme="gray"
            isDisabled={loading}
          >
            Cancel
          </Button>
        </Flex>
      </CustomModalContainer>
    </CustomModal>
  );
}
