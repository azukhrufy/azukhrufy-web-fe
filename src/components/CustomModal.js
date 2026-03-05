// react
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { createContext, useCallback, useContext, useState } from "react";

/**
 * @typedef CustomModalContext
 * @property {string[]} pendingAction - The list of pending actions.
 * @property {(key: string) => void} addPendingAction - Add a pending action to the list.
 * @property {(key: string) => void} removePendingAction - Remove a pending action from the list.
 * @property {() => void} clearPendingAction - Clear all pending actions.
 */

/**
 * @type {React.Context<CustomModalContext>}
 */
const CustomModalContext = createContext({
  pendingAction: [],
});

/**
 * @returns {CustomModalContext}
 */
export function useCustomModalContext() {
  return useContext(CustomModalContext);
}

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @returns {JSX.Element}
 */
function CustomModalContextProvider({ children }) {
  const [pendingAction, setPendingAction] = useState([]);

  const addPendingAction = useCallback((key) => {
    setPendingAction((prev) => {
      // avoid duplicate action
      if (prev.includes(key)) return prev;

      return [...prev, key];
    });
  }, []);

  const removePendingAction = useCallback((key) => {
    setPendingAction((prev) => prev.filter((item) => item !== key));
  }, []);

  const clearPendingAction = useCallback(() => {
    setPendingAction([]);
  }, []);

  return (
    <CustomModalContext.Provider
      value={{
        pendingAction,
        addPendingAction,
        removePendingAction,
        clearPendingAction,
      }}
    >
      {children}
    </CustomModalContext.Provider>
  );
}

// ----------------------------------------------------------------------

/**
 * @typedef {Object} CustomModalProps
 * @property {boolean} openState
 * @property {() => void} onClose
 * @property {React.ReactNode} [modalTitle]
 * @property {Omit<import('@chakra-ui/react').modalProps, 'children' | 'isOpen' | 'onClose'>} [modalProps]
 * @property {Omit<import('@chakra-ui/react').ModalHeaderProps, 'children'>} [modalHeaderProps]
 * @property {React.ReactNode} [modalHeaderContent]
 * @property {Omit<import('@chakra-ui/react').ModalBodyProps, 'children'>} [modalBodyProps]
 * @property {React.ReactNode} children
 * @property {Omit<import('@chakra-ui/react').ModalFooterProps, 'children'>} [modalFooterProps]
 * @property {React.ReactNode | (footerCloseButton: React.ReactNode) => React.ReactNode} [modalFooterContent] also accept render function with footerCloseButton as argument
 * @property {boolean} [isShowFooterCloseButton] - Show close button in footer, ignored if drawerFooterContent is provided
 * @property {string}  [footerCloseButtonText]
 * @property {Omit<import('@chakra-ui/react').ButtonProps, 'children' | 'onClick'>} [footerCloseButtonProps]
 * @returns {JSX.Element}
 */

/**
 * @param {CustomModalProps} props
 */
export default function CustomModal(props) {
  return (
    <CustomModalContextProvider>
      <CustomModalComponent {...props} />
    </CustomModalContextProvider>
  );
}

/**
 * Since modal does not set gutter and padding, in case we need to wrap the modal content with padding
 * Use this component, to make sure it's consistent between each modal implementation
 * @param {import('@chakra-ui/react').BoxProps} props
 */
export function CustomModalContainer({ children, ...props }) {
  return (
    <Box
      p={4}
      _notLast={{
        borderBottom: "1px solid",
        borderColor: "gray.200",
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

// ----------------------------------------------------------------------
// DO NOT DIRECTLY EXPORT COMPONENT BELOW, SINCE IT DEPENDS ON CONTEXT
// AND WE LINK THE CONTEXT IN WRAPPER COMPONENT ABOVE

/**
 * Actual rendered component for CustomModal.
 * @param {CustomModalProps} props
 */

function CustomModalComponent({
  openState,
  onClose,
  modalTitle,
  customModalTitle,
  modalProps,
  modalHeaderProps,
  modalHeaderContent,
  modalBodyProps,
  children,
  modalFooterProps,
  modalFooterContent,
  isShowFooterCloseButton = true,
  footerCloseButtonText = "Tutup",
  footerCloseButtonProps,
}) {
  const { pendingAction } = useCustomModalContext();

  const handleClose = () => {
    // prevent closing drawer if there is pending action
    if (pendingAction.length > 0) return;

    onClose();
  };

  // modal is considered open if openState is true or there is a pending action
  const appliedIsOpen = openState || pendingAction.length > 0;

  // footer close button
  const footerCloseButton = (
    <Button
      colorScheme="expRed"
      {...footerCloseButtonProps}
      onClick={handleClose}
    >
      {footerCloseButtonText}
    </Button>
  );

  return (
    <CustomModalContextProvider>
      <Modal
        size="xl"
        blockScrollOnMount
        {...modalProps}
        isOpen={appliedIsOpen}
        onClose={handleClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader p={0} {...modalHeaderProps}>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              w="100%"
              borderBottom="1px solid"
              borderColor="gray.200"
              p={4}
            >
              {modalTitle && (
                <Text fontSize="md" fontWeight="semibold">
                  {modalTitle}
                </Text>
              )}

              {customModalTitle}

              <ModalCloseButton position="static" />
            </Flex>

            {modalHeaderContent}
          </ModalHeader>

          <ModalBody position="relative" p={0} {...modalBodyProps}>
            {children}
          </ModalBody>

          <ModalFooter
            p={4}
            borderTop="1px solid"
            borderColor="gray.200"
            {...modalFooterProps}
          >
            {modalFooterContent != null
              ? typeof drawerFooterContent === "function"
                ? // drawer footer content is a render function, pass footerCloseButton as argument to it
                  modalFooterContent(footerCloseButton)
                : // drawer footer content is a normal react node, display it
                  modalFooterContent
              : // drawer footer content is not provided, show default close button if configured
                isShowFooterCloseButton && footerCloseButton}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </CustomModalContextProvider>
  );
}
