import { ValidationType } from "./TextInput.types";

export const defaultMaxLength: Record<ValidationType, number> = {
  none: 255,
  name: 50,
  email: 100,
  mobile: 15,
  businessPID: 10,
  businessAID: 12,
  businessTAN: 10,
  acknowledgementNumber: 20,
  businessPassport: 8,
  businessTIN: 20,
  alphanumeric: 500,
  numeric: 200,
  pincode: 6,
  custom: 255,
  headerSearch: 200,
  stdCode: 8,
  landline: 15,
  entityName: 255,
};