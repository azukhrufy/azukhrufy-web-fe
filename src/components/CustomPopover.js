import {
  Box,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";

/**
 * SBBPopover component renders a popover with customizable content, header, footer, and dimensions.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The trigger element for the popover.
 * @param {function} props.content - A function that returns the content of the popover.
 * @param {React.ReactNode} [props.header] - The header content of the popover.
 * @param {React.ReactNode} [props.footer] - The footer content of the popover.
 * @param {string|number} [props.width] - The width of the popover.
 * @param {string|number} [props.heigth] - The height of the popover.
 * @param {boolean} [props.matchWidth] - Whether the popover should match the width of the trigger element.
 * @param {string} [props.direction="ltr"] - The text direction of the popover.
 * @param {string} [props.placement="bottom"] - The placement of the popover.
 * @param {Object} [props.props] - Additional properties to pass to the PopoverContent component.
 *
 * @returns {JSX.Element} The rendered SBBPopover component.
 */
export default function CustomPopover({
  children,
  content,
  header,
  footer,
  width,
  heigth,
  matchWidth,
  direction = "ltr",
  placement = "bottom",
  ...props
}) {
  // popover handler
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Popover
      matchWidth={matchWidth}
      zIndex={20}
      // placement='auto'
      flip={false}
      style={{ zIndex: 20 }}
      isOpen={isOpen}
      onClose={onClose}
      direction={direction}
      placement={placement}
    >
      <PopoverTrigger>
        <Box
          onClick={(e) => {
            e.preventDefault();
            !isOpen ? onOpen() : onClose();
          }}
        >
          {children}
        </Box>
      </PopoverTrigger>
      {/* <Portal> */}
      <PopoverContent
        width={width ?? "fit-content"}
        height={isOpen ? heigth ?? "fit-content" : "0px"}
        {...props}
        zIndex={20}
      >
        {header && <PopoverHeader>{header}</PopoverHeader>}

        <PopoverBody maxHeight={heigth ?? "240px"} overflow="scroll">
          {content?.(onClose)}
        </PopoverBody>
        {footer && <PopoverFooter>{footer}</PopoverFooter>}
      </PopoverContent>
      {/* </Portal> */}
    </Popover>
  );
}
