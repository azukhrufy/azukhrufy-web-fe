import CustomModal, { CustomModalContainer } from "@/components/CustomModal";
import { RHFFormProvider, RHFInput, RHFTextarea } from "@/components/hook-form";
import companiesService from "@/services/companiesService";
import { Button, Flex, useToast } from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

/**
 * Modal component for creating or updating company information.
 *
 * @param {Object} props - The component props
 * @param {boolean} props.openState - Controls whether the modal is open or closed
 * @param {Function} props.onClose - Callback function to handle modal close event
 * @param {Object|null} props.currentData - Current company data for editing, null when creating new company
 * @returns {JSX.Element} The rendered modal component
 */
export default function CreateUpdateCompaniesModal({
  openState,
  onClose,
  currentData,
  mutate
}) {
  console.log("currentData", currentData);
  const toast = useToast();
  const defaultValues = useMemo(() => {
    return {
      name: currentData?.name || "",
      role: currentData?.role || "",
      description: currentData?.description || "",
      startDate: currentData?.startDate || "",
      endDate: currentData?.endDate || "",
      projects: currentData?.projects || [],
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentData]);

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (values) => {
    console.log("values", values);
    if (currentData) {
      try {
        await companiesService.updateCompany(currentData.id, values);
        mutate();
        toast({
          title: "Company updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        console.log("Company updated successfully");
        handleClose();
      } catch (error) {
        toast({
          title: "Failed to update company",
          description: error?.message || "An error occurred",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        console.error("Error updating company:", error);
      }
    } else {
      try {
        await companiesService.createCompany(values);
        toast({
          title: "Company created successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        console.log("Company created successfully");
        handleClose();
      } catch (error) {
        toast({
          title: "Failed to create company",
          description: error?.message || "An error occurred",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        console.error("Error creating company:", error);
      }
    }
  };

  useEffect(() => {
    reset(defaultValues);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);
  return (
    <CustomModal
      openState={openState}
      onClose={onClose}
      modalTitle={currentData ? "Edit Company" : "Create Company"}
      modalFooterProps={{
        display: "none",
      }}
    >
      <RHFFormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <CustomModalContainer>
          <Flex flexDirection="column" gap={3}>
            <RHFInput name="name" label="Company Name" />
            <RHFInput name="role" label="Role" />
            <RHFTextarea name="description" label="Description" />
            <RHFInput name="startDate" label="Start Date" type="date" />
            <RHFInput name="endDate" label="End Date" type="date" />
          </Flex>
        </CustomModalContainer>
        <CustomModalContainer>
          <Flex justifyContent="flex-end" gap={3}>
            <Button type="submit" isLoading={isSubmitting} colorScheme="purple">
              Simpan
            </Button>
            <Button onClick={handleClose} colorScheme="gray" variant="outline">
              Batal
            </Button>
          </Flex>
        </CustomModalContainer>
      </RHFFormProvider>
      {/* Modal content goes here */}
    </CustomModal>
  );
}
