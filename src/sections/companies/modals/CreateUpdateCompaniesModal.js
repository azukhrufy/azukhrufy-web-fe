import CustomModal, { CustomModalContainer } from "@/components/CustomModal";
import { RHFFormProvider, RHFInput, RHFTextarea } from "@/components/hook-form";
import useDateTimeHelper from "@/hooks/useDateTimeHelper";
import companiesService from "@/services/companiesService";
import companiesValidators from "@/validators/companiesValidators";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Flex, useToast } from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

/**
 * Format a date to the `yyyy-MM-dd` value of `<input type="date"/>`.
 * Date-only inputs are parsed as local time (see yup's date cast), so local date
 * parts are used to preserve the exact calendar date picked by the user.
 *
 * @param {Date} date - Date object to format
 * @returns {string} Date string in `yyyy-MM-dd` format
 */
function toDateInputValue(date) {
  const yyyy = `${date.getFullYear()}`.padStart(4, "0");
  const mm = `${date.getMonth() + 1}`.padStart(2, "0");
  const dd = `${date.getDate()}`.padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Map the validated form values into the payload accepted by the API.
 *
 * Only fields known by the backend model are sent (`name`, `role`, `description`,
 * `startDate`, `endDate`). Empty optional values are sent as `undefined` so they are
 * omitted from the request body, because the API validation rejects empty strings
 * and `null` for these fields. Dates are sent as `yyyy-MM-dd` (input value format).
 *
 * @param {Object} values - Form values after yup validation
 * @returns {Object} Payload for create/update company API
 */
function buildPayload(values) {
  return {
    name: values.name,
    role: values.role || undefined,
    description: values.description || undefined,
    startDate: values.startDate ? toDateInputValue(values.startDate) : undefined,
    endDate: values.endDate ? toDateInputValue(values.endDate) : undefined,
  };
}

/**
 * Modal component for creating or updating company information.
 *
 * @param {Object} props - The component props
 * @param {boolean} props.openState - Controls whether the modal is open or closed
 * @param {Function} props.onClose - Callback function to handle modal close event
 * @param {Object|null} props.currentData - Current company data for editing, null when creating new company
 * @param {Function} props.mutate - SWR mutate function to refresh the companies list after submit
 * @returns {JSX.Element} The rendered modal component
 */
export default function CreateUpdateCompaniesModal({
  openState,
  onClose,
  currentData,
  mutate,
}) {
  const toast = useToast();
  const dateTimeHelper = useDateTimeHelper();
  const defaultValues = useMemo(() => {
    return {
      name: currentData?.name || "",
      role: currentData?.role || "",
      description: currentData?.description || "",
      startDate: dateTimeHelper.client.toDateInput(currentData?.startDate) || "",
      endDate: dateTimeHelper.client.toDateInput(currentData?.endDate) || "",
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentData]);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(companiesValidators.createUpdateCompanies),
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
    const payload = buildPayload(values);
    if (currentData) {
      try {
        await companiesService.updateCompany(currentData.id, payload);
        mutate();
        toast({
          title: "Company updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        handleClose();
      } catch (error) {
        toast({
          title: "Failed to update company",
          description: error?.message || "An error occurred",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      try {
        await companiesService.createCompany(payload);
        mutate();
        toast({
          title: "Company created successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        handleClose();
      } catch (error) {
        toast({
          title: "Failed to create company",
          description: error?.message || "An error occurred",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
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
      onClose={handleClose}
      modalTitle={currentData ? "Edit Company" : "Create Company"}
      modalFooterProps={{
        display: "none",
      }}
    >
      <RHFFormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <CustomModalContainer>
          <Flex flexDirection="column" gap={3}>
            <RHFInput name="name" label="Company Name" isRequired />
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
