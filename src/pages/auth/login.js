import { useAuth } from "@/contexts/AuthContext";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Card,
  Center,
  Container,
  Flex,
  Icon,
  IconButton,
  InputRightElement,
  Text,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import PageMeta from "@/components/PageMeta";
import { useForm } from "react-hook-form";
import { RHFFormProvider, RHFInput } from "@/components/hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import userValidator from "@/validators/userValidator";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import useAfterSubmitAuth from "@/hooks/useAfterSubmitAuth";

/**
 * Login component for the Azukhrufy Web Apps by Azukhrufy.
 *
 * This component handles the user login functionality, including form validation,
 * submission, and displaying appropriate success or error messages.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered login page component.
 *
 * @remarks
 * This component uses various hooks and components from external libraries:
 * - `useAuth` for authentication context.
 * - `useToast` for displaying toast notifications.
 * - `useBoolean` for managing boolean state.
 * - `useForm` from `react-hook-form` for form handling.
 * - `yupResolver` from `@hookform/resolvers/yup` for form validation.
 * - `useAfterSubmitAuth` for actions after form submission.
 */
const Login = () => {
  const { login } = useAuth();

  const toast = useToast();

  const [isShowPassword, handleIsShowPasswordChange] = useBoolean();

  // form handler
  const methods = useForm({
    mode: "onBlur",
    resolver: yupResolver(userValidator.login),
    defaultValues: { email: "", password: "" },
  });

  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const handleLogin = handleSubmit(async (values) => {
    try {
      await login(values.email, values.password);
      toast({
        title: "Login berhasil!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log("error", error);
      toast({
        title: "Gagal Login",
        description:
          error?.response?.data?.message ??
          "Terjadi kesalahan, silahkan coba lagi",
        status: "error",
        duration: 5000,
        isClosable: true,
      });

      setError("afterSubmit", {
        ...error,
        message:
          error?.response?.data?.message ??
          "Terjadi kesalahan, silahkan coba lagi",
      });
    }
  });

  // action after login
  useAfterSubmitAuth(isSubmitSuccessful);

  return (
    <>
      <PageMeta title="Login" />
      <Box background="purple.100">
        <Container>
          <Center h="100vh">
            <RHFFormProvider methods={methods} onSubmit={handleLogin}>
              <Card variant="glassOutlined" w={{ sm: "80vw", lg: "48ch" }}>
                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  p={4}
                  gap={3}
                >
                  <Text fontSize="2xl" fontWeight="semibold" color="purple.500">
                    Azukhrufy Web
                  </Text>
                  <Text
                    fontSize="sm"
                    mt={-4}
                    mb={8}
                    fontWeight="semibold"
                    color="purple.500"
                  >
                    by Azukhrufy
                  </Text>
                  <RHFInput
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                  <RHFInput
                    label="Password"
                    name="password"
                    type={isShowPassword ? "text" : "password"}
                    rightElement={
                      <InputRightElement>
                        <IconButton
                          variant="ghost"
                          colorScheme="gray"
                          aria-label="Tampilkan password"
                          icon={
                            <Icon as={isShowPassword ? HiEyeSlash : HiEye} />
                          }
                          onClick={handleIsShowPasswordChange.toggle}
                        />
                      </InputRightElement>
                    }
                    placeholder="Password"
                  />
                  <Button
                    type="submit"
                    colorScheme="green"
                    isLoading={isSubmitting}
                  >
                    Login
                  </Button>

                  {errors?.afterSubmit && (
                    <Alert status="error">
                      <AlertIcon />

                      <AlertDescription>
                        {errors?.afterSubmit?.message}
                      </AlertDescription>
                    </Alert>
                  )}
                </Flex>
              </Card>
            </RHFFormProvider>
          </Center>
        </Container>
      </Box>
    </>
  );
};

export default Login;
