// ui-components/src/index.tsx

// Re-export all your components here
export { default as Button } from "./components/atoms/Button";
export { default as TextView } from "./components/atoms/TextView";
export { default as Input } from "./components/atoms/TextInput";
export { default as CheckBox } from "./components/atoms/Checkbox";
export { default as Switch } from "./components/atoms/Switch";
export { default as Badge, Chip, Tag } from "./components/atoms/Badge";
export { default as RadioGroup } from "./components/atoms/RadioGroup";
export { default as Form } from "./components/molecules/Form";
export { default as Grid } from "./components/molecules/Grid";
export { GridItem } from "./components/molecules/Grid";
export { Breadcrumb, BreadcrumbItem } from "./components/molecules/Breadcrumb";
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "./components/molecules/Tabs";
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./components/molecules/Accordion";
export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "./components/molecules/ButtonGroup";
export { Stepper, StepperStep } from "./components/molecules/Stepper";
export {
  default as FileUpload,
  Dropzone,
  validateFilename,
  detectFileKindFromBuffer,
  validateFileSecurity,
  validateFilesSecurity,
  parseAcceptString,
} from "./components/molecules/FileUpload";
export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./components/molecules/Popover";
export { default as Icon } from "./components/atoms/Icon";
export { default as TextArea } from "./components/atoms/TextArea";
export { default as ProgressBar } from "./components/atoms/ProgressBar";
export { default as GradientText } from "./components/atoms/GradientText";
export { default as ToolTip } from "./components/atoms/ToolTip";
export {
  default as Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "./components/molecules/Card";
export { default as Avtar } from "./components/atoms/Avatar";
export { default as DatePicker } from "./components/atoms/DatePicker";
export { default as Calendar } from "./components/molecules/Calendar";
export { default as OtpBox } from "./components/atoms/OtpBox";
export { default as Divider } from "./components/atoms/Divider";
export { default as Select } from "./components/atoms/Select";
export { Combobox } from "./components/molecules/Combobox";
export { default as Modal } from "./components/molecules/Modal";
export { default as AlertDialog } from "./components/molecules/AlertDialog";
export {
  default as Table,
  TableRoot,
  TableCaption,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
} from "./components/molecules/Table";
export { default as AppSidebar } from "./components/molecules/AppSidebar";
export { default as DashboardShell, AppShell } from "./components/molecules/DashboardShell/DashboardShell";
export { default as AppTopbar } from "./components/molecules/AppTopbar";
export { default as Hyperlink } from "./components/atoms/Hyperlink"
export { default as InputSearch } from "./components/atoms/TextInputSearch"

// Charts (native SVG, no external libs)
export {
  LineChart,
  BarChart,
  PieChart,
  AreaChart,
  ChartTooltip,
} from "./components/charts";

// Optionally export prop types
export type { ButtonProps } from "./components/atoms/Button/Button.types";
export type { FormProps } from "./components/molecules/Form";
export type { BreadcrumbProps, BreadcrumbItemProps, BreadcrumbSeparator } from "./components/molecules/Breadcrumb/Breadcrumb.types";
export type { FileUploadProps, FileUploadSize, DropzoneProps } from "./components/molecules/FileUpload/FileUpload.types";
export type { DetectedKind, FileUploadSecurityOptions } from "./components/molecules/FileUpload";
export type {
  PopoverProps,
  PopoverTriggerProps,
  PopoverContentProps,
  DropdownMenuItemProps,
  PopoverPlacement,
} from "./components/molecules/Popover";
export type {
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
  TabsContextValue,
  TabsOrientation,
  TabsVariant,
  TabsSize,
  TabsListLayout,
  TabsActivationMode,
  TabsContentAnimation,
  TabsTriggerLayout,
  TabsTriggerAlign,
} from "./components/molecules/Tabs/Tabs.types";
export type {
  StepperAppearance,
  StepperProps,
  StepperStepProps,
  StepperContextValue,
  StepperSize,
  StepperTrackMode,
} from "./components/molecules/Stepper/Stepper.types";
export type {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
  AccordionContextValue,
  AccordionType,
  AccordionVariant,
  AccordionMotion,
} from "./components/molecules/Accordion/Accordion.types";
export type {
  ButtonGroupProps,
  ButtonGroupSeparatorProps,
  ButtonGroupTextProps,
  ButtonGroupContextValue,
  ButtonGroupOrientation,
} from "./components/molecules/ButtonGroup/ButtonGroup.types";
export type { GridProps, GridItemProps } from "./components/molecules/Grid";
export type {
  CardProps,
  CardVariantName,
  CardSize,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardActionProps,
  CardContentProps,
  CardFooterProps,
} from "./components/molecules/Card";
export type { IconProps, IconSource } from "./components/atoms/Icon";
export type { TextAreaProps } from "./components/atoms/TextArea/TextArea.types";
export type { GradientTextProps } from "./components/atoms/GradientText/GradientText.types";
export type { CheckboxProps } from "./components/atoms/Checkbox/Checkbox.types";
export type { SwitchProps, SwitchSize } from "./components/atoms/Switch/Switch.types";
export type {
  BadgeProps,
  BadgeVariant,
  BadgeTone,
  BadgeShape,
  BadgeSize,
  ChipProps,
  TagProps,
} from "./components/atoms/Badge/Badge.types";
export type { RadioButtonProps } from "./components/atoms/RadioGroup/RadioGroup.types";
export type { TextViewProps } from "./components/atoms/TextView/TextView.types";
export type { TextInputProps as InputProps } from "./components/atoms/TextInput/TextInput.types";
export type { TooltipIconProps } from "./components/atoms/ToolTip/TooltipIcon.types";
export type { AvatarProps } from "./components/atoms/Avatar/Avatar.types";
export type { DatePickerProps } from "./components/atoms/DatePicker/DatePicker.types";
export type { TextInputSearchProps as InputSearchProps } from "./components/atoms/TextInputSearch";
export type {
  CalendarProps,
  CalendarAnimation,
  CalendarTheme,
  CalendarSize,
  CalendarElevation,
  CalendarVariant,
  CalendarCaptionLayout,
} from "./components/molecules/Calendar/Calendar.types";
export type { SelectProps, SelectOptionGroup } from "./components/atoms/Select/Select.types";
export type { ComboboxProps, ComboboxOption, ComboboxGroup } from "./components/molecules/Combobox/Combobox.types";
export type {
  TableColumn,
  TableProps,
  TableSearchProps,
  TableLayout,
  TableVariant,
  TableTheme,
  TableRootProps,
  TableCaptionProps,
  TableHeaderProps,
  TableBodyProps,
  TableFooterProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
} from "./components/molecules/Table";
export type { DashboardShellProps, AppShellProps } from "./components/molecules/DashboardShell/DashboardShell";
export type {
  AppSidebarProps,
  AppSidebarNavItem,
  AppSidebarSection,
  AppSidebarTier,
  AppSidebarSectionGrouping,
  AppSidebarHeader,
  AppSidebarUser,
  AppSidebarFooterAction,
  AppSidebarTrailingPreset,
  AppSidebarTokens,
  AppSidebarClassNames,
  AppSidebarFooterLayout,
} from "./components/molecules/AppSidebar/AppSidebar.types";
export type {
  AppTopbarProps,
  AppTopbarTheme,
  AppTopbarSearchConfig,
  AppTopbarAction,
  AppTopbarProfile,
  AppTopbarTokens,
  AppTopbarClassNames,
  AppTopbarMenuItem,
} from "./components/molecules/AppTopbar/AppTopbar.types";
export { mergeSidebarTokensStyle } from "./components/molecules/AppSidebar/AppSidebar.chrome";
export {
  readAppSidebarPersist,
  writeAppSidebarPersist,
} from "./components/molecules/AppSidebar/AppSidebar.persist";
export type { AppSidebarPersistPayload } from "./components/molecules/AppSidebar/AppSidebar.persist";
export { mergeTopbarTokensStyle } from "./components/molecules/AppTopbar/AppTopbar.chrome";
export type { ModalProps } from "./components/molecules/Modal";
export type { AlertDialogProps, AlertDialogVariant } from "./components/molecules/AlertDialog";
export type { ProgressBarProps } from "./components/atoms/ProgressBar/ProgresBar.types";
export type { HyperlinkProps } from "./components/atoms/Hyperlink/Hyperlink.types";
export type { OtpBoxProps, OtpBoxVariant, OtpBoxSize } from "./components/atoms/OtpBox";
export type {
  LineChartProps,
  BarChartProps,
  PieChartProps,
  PieChartDataPoint,
  AreaChartProps,
  ChartDataPoint,
  ChartDataSeries,
  ChartLayoutProps,
  ChartTheme,
  ChartTooltipItem,
  ChartTooltipProps,
} from "./components/charts";


