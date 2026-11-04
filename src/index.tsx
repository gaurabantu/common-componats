// ui-components/src/index.tsx

// Re-export all your components here
export { default as Button } from "./components/atoms/Button";
export { default as TextView } from "./components/atoms/TextView";
export { default as Input } from "./components/atoms/TextInput";
export { default as CheckBox } from "./components/atoms/Checkbox";
export { default as Switch } from "./components/atoms/Switch";
export { default as ToggleButton } from "./components/atoms/ToggleButton";
export { default as ToggleGroup } from "./components/molecules/ToggleGroup";
export { default as Slider } from "./components/atoms/Slider";
export { default as ColorPicker, DEFAULT_COLOR_PICKER_PALETTE, normalizeHex } from "./components/molecules/ColorPicker";
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
  useFilePicker,
} from "./components/molecules/FileUpload";
export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  PopoverAnchor,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Listbox,
  ListboxOption,
} from "./components/molecules/Popover";
export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuGroup,
  computeContextMenuPosition,
} from "./components/molecules/ContextMenu";
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
export {
  default as EmptyState,
  ErrorState,
  OfflineBanner,
  FeedbackState,
  NoDataAnimation,
  NoSearchResultsAnimation,
  ErrorAnimation,
  OfflineAnimation,
  SuccessAnimation,
  InfoAnimation,
  FEEDBACK_ANIMATIONS,
} from "./components/molecules/FeedbackStates";
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
export { default as IconBox } from "./components/atoms/IconBox";
export { List, ListItem } from "./components/molecules/List";
export { default as StatCard } from "./components/molecules/StatCard";
export { default as CodeBlock } from "./components/molecules/CodeBlock";
export { default as Alert } from "./components/molecules/Alert";
export { default as Toast, ToastProvider, useToast } from "./components/molecules/Toast";
export { default as Drawer, Sheet } from "./components/molecules/Drawer";
export { default as Spinner } from "./components/atoms/Spinner";
export { default as LoadingOverlay } from "./components/molecules/LoadingOverlay";
export { default as Skeleton, SkeletonGroup } from "./components/atoms/Skeleton";
export { default as Pagination, getPaginationRange, getPageCount, getItemRange } from "./components/molecules/Pagination";
export { Tooltip } from "./components/molecules/Tooltip";
export { FormField, useFormField } from "./components/molecules/FormField";
export { PageHeader } from "./components/molecules/PageHeader";
export { default as FilterBar } from "./components/molecules/FilterBar";
export { default as DataTable, toCsv, escapeCsvCell } from "./components/molecules/DataTable";
export { default as SegmentedControl, SEGMENTED_CONTROL_DEFAULTS, SEGMENTED_CONTROL_SIZES } from "./components/molecules/SegmentedControl";
export { default as Wizard, WIZARD_DEFAULTS } from "./components/molecules/Wizard";
export { default as Kbd, formatShortcut, toAriaKeyShortcuts, detectIsMac } from "./components/atoms/Kbd";
export { default as CommandPalette } from "./components/molecules/CommandPalette";
export { default as NumberInput, parseLocaleNumber, formatLocaleNumber } from "./components/atoms/NumberInput";
export { default as DateRangePicker, DEFAULT_RANGE_PRESETS, createDefaultRangePresets } from "./components/molecules/DateRangePicker";

// Charts (native SVG, no external libs)
export {
  LineChart,
  BarChart,
  PieChart,
  AreaChart,
  ComposedChart,
  pieLabelNamePercent,
  ChartTooltip,
} from "./components/charts";

// Optionally export prop types
export type { ButtonProps } from "./components/atoms/Button/Button.types";
export type { ButtonElement } from "./components/atoms/Button";
export type { FormProps } from "./components/molecules/Form";
export type { BreadcrumbProps, BreadcrumbItemProps, BreadcrumbSeparator } from "./components/molecules/Breadcrumb/Breadcrumb.types";
export type { FileUploadProps, FileUploadSize, FileUploadVariant, DropzoneProps } from "./components/molecules/FileUpload/FileUpload.types";
export type { UseFilePickerOptions, UseFilePickerResult, FilePickerInputProps } from "./components/molecules/FileUpload/useFilePicker";
export type { DetectedKind, FileUploadSecurityOptions } from "./components/molecules/FileUpload";
export type {
  PopoverProps,
  PopoverTriggerProps,
  PopoverContentProps,
  DropdownMenuItemProps,
  PopoverPlacement,
  PopoverAnchorProps,
  DropdownMenuCheckboxItemProps,
  DropdownMenuRadioGroupProps,
  DropdownMenuRadioItemProps,
  DropdownMenuGroupProps,
  DropdownMenuLabelProps,
  DropdownMenuSeparatorProps,
  ListboxProps,
  ListboxOptionProps,
} from "./components/molecules/Popover";
export type {
  ContextMenuProps,
  ContextMenuTriggerProps,
  ContextMenuContentProps,
  ContextMenuPosition,
} from "./components/molecules/ContextMenu";
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
  AccordionDensity,
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
export type { CheckboxProps, CheckboxNativeProps } from "./components/atoms/Checkbox/Checkbox.types";
export type { SwitchProps, SwitchSize, SwitchNativeProps } from "./components/atoms/Switch/Switch.types";
export type { ToggleButtonProps, ToggleButtonSize, ToggleButtonVariant } from "./components/atoms/ToggleButton";
export type { ToggleGroupProps, ToggleGroupSingleProps, ToggleGroupMultipleProps, ToggleGroupItem } from "./components/molecules/ToggleGroup";
export type { SliderProps, SliderSingleProps, SliderRangeProps, SliderSize } from "./components/atoms/Slider";
export type { ColorPickerProps, ColorPickerSwatch, ColorPickerSwatchSize } from "./components/molecules/ColorPicker";
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
export type {
  TextInputSearchProps as InputSearchProps,
  SearchButtonDisplay,
  SearchActionButtonProps,
} from "./components/atoms/TextInputSearch";
export type {
  CalendarProps,
  CalendarAnimation,
  CalendarTheme,
  CalendarSize,
  CalendarElevation,
  CalendarVariant,
  CalendarCaptionLayout,
} from "./components/molecules/Calendar/Calendar.types";
export type { SelectProps, SelectOptionGroup, SelectSize } from "./components/atoms/Select/Select.types";
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
  TableHeadCasing,
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
export type {
  EmptyStateProps,
  ErrorStateProps,
  OfflineBannerProps,
  FeedbackStateProps,
  FeedbackStateVariant,
  FeedbackVisualTone,
  FeedbackSize,
  FeedbackAnimationName,
} from "./components/molecules/FeedbackStates";
export type { ModalProps, ModalSize, ModalAnimation, ModalScrollBehavior, ModalAutoFocusEvent, ModalRootProps, BeforeCloseGuard } from "./components/molecules/Modal";
export type { LoadingOverlayProps, LoadingOverlayBackdrop } from "./components/molecules/LoadingOverlay";
export type { DrawerProps, DrawerSide, DrawerSize, SheetProps } from "./components/molecules/Drawer";
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
  ComposedChartProps,
  ComposedChartSeries,
  ComposedSeriesType,
  BarChartOrientation,
  PieLabelInfo,
  CartesianAxisProps,
  ChartYAxisSide,
  ChartValueFormatter,
  ChartXTickFormatter,
  ChartLabelFormatter,
  ChartDataPoint,
  ChartDataSeries,
  ChartLayoutProps,
  ChartTheme,
  ChartTooltipItem,
  ChartTooltipProps,
} from "./components/charts";
export type { IconBoxProps, IconBoxTone, IconBoxSize, IconBoxShape } from "./components/atoms/IconBox";
export type { ListProps, ListItemProps, ListSize } from "./components/molecules/List";
export type { StatCardProps, StatDelta, StatTrend } from "./components/molecules/StatCard";
export type { CodeBlockProps, CodeBlockTone } from "./components/molecules/CodeBlock";
export type { AlertProps, AlertVariant, AlertAppearance, AlertLive } from "./components/molecules/Alert";
export type { ToastProps, ToastOptions, ToastAction, ToastPosition, ToastVariant, ToastProviderProps, ToastContextValue } from "./components/molecules/Toast";
export type { SpinnerProps, SpinnerSize, SpinnerTone } from "./components/atoms/Spinner";
export type { SkeletonProps, SkeletonGroupProps, SkeletonShape, SkeletonDimension } from "./components/atoms/Skeleton";
export type { PaginationProps, PaginationSize, PaginationRange, PaginationItem, PaginationLabels } from "./components/molecules/Pagination";
export type { CheckboxSize } from "./components/atoms/Checkbox/Checkbox.types";
export type { TooltipProps, TooltipSide, TooltipAlign, TooltipVariant } from "./components/molecules/Tooltip";
export type { FormFieldProps, FormFieldLayout, FormFieldCounter, FormFieldContextValue } from "./components/molecules/FormField";
export type { PageHeaderProps, PageHeaderAction, PageHeaderTitleAs } from "./components/molecules/PageHeader";
export type { FilterBarProps, FilterBarFilter, FilterBarFilterType, FilterBarFilterValue, FilterBarOption, FilterBarValue, FilterBarLabels } from "./components/molecules/FilterBar";
export type { DataTableProps, DataTableColumn, DataTableRow, DataTableServerPagination, DataTableSort, DataTableSortDirection, DataTableBulkAction, DataTableBulkActionHelpers, DataTableError, DataTableExportOptions, DataTableFilterBarProps, DataTableLabels } from "./components/molecules/DataTable";
export type { SegmentedControlProps, SegmentedControlOption, SegmentedControlSize } from "./components/molecules/SegmentedControl";
export type { WizardProps, WizardStep, WizardValidationResult, WizardHeadingLevel } from "./components/molecules/Wizard";
export type { KbdProps, KbdSize, KbdPlatform, KbdKeyLabel } from "./components/atoms/Kbd";
export type { CommandPaletteProps, CommandGroup, CommandItem, CommandSearchContext } from "./components/molecules/CommandPalette";
export type { NumberInputProps, NumberInputSize } from "./components/atoms/NumberInput";
export type { DateRange, CompleteDateRange, DateRangePreset, DateRangePickerProps, DateRangeWeekStart } from "./components/molecules/DateRangePicker";
