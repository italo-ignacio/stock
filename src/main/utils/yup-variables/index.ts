import { messages } from '@domain/helpers';
import { yup } from '@infra/yup';
import type {
  AnyObject,
  AnySchema,
  BooleanSchema,
  DateSchema,
  Maybe,
  MixedSchema,
  NumberSchema,
  StringSchema
} from 'yup';
import type { messageTypeResponse } from '@domain/errors';

export const emailRequired = (field: messageTypeResponse): StringSchema =>
  yup
    .string()
    .email(JSON.stringify(messages.yup.emailSchema))
    .required(JSON.stringify(messages.yup.requiredSchema(field)));

export const emailNotRequired = (): StringSchema =>
  yup.string().email(JSON.stringify(messages.yup.emailSchema));

export const stringRequired = (field: messageTypeResponse): StringSchema =>
  yup
    .string()
    .trim()
    .required(JSON.stringify(messages.yup.requiredSchema(field)));

export const stringNotRequired = (): StringSchema<Maybe<string | undefined>> =>
  yup.string().trim().notRequired();

export const mixedRequired = (field: messageTypeResponse): MixedSchema =>
  yup.mixed().required(JSON.stringify(messages.yup.requiredSchema(field)));

export const booleanRequired = (field: messageTypeResponse): BooleanSchema =>
  yup.boolean().required(JSON.stringify(messages.yup.requiredSchema(field)));

export const booleanNotRequired = (): BooleanSchema<Maybe<boolean | undefined>> =>
  yup.boolean().notRequired();

export const mixedNotRequired = (field: messageTypeResponse): MixedSchema<Maybe<AnyObject>> =>
  yup
    .mixed()
    .required(JSON.stringify(messages.yup.requiredSchema(field)))
    .notRequired();

export const numberRequired = (field: messageTypeResponse): NumberSchema =>
  yup
    .number()
    .typeError(JSON.stringify(messages.yup.numberSchema(field)))
    .required(JSON.stringify(messages.yup.requiredSchema(field)));

export const numberNotRequired = (): NumberSchema<Maybe<number | undefined>> =>
  yup.number().notRequired();

export const dateRequired = (field: messageTypeResponse): DateSchema =>
  yup
    .date()
    .typeError(JSON.stringify(messages.yup.dateSchema))
    .required(JSON.stringify(messages.yup.requiredSchema(field)));

export const dateNotRequired = (): DateSchema<Maybe<Date | undefined>> =>
  yup.date().typeError(JSON.stringify(messages.yup.dateSchema)).notRequired();

export const arrayRequired = (data: AnySchema, field: messageTypeResponse): AnySchema =>
  yup
    .array()
    .of(data)
    .required(JSON.stringify(messages.yup.requiredSchema(field)));

export const arrayNotRequired = (data: AnySchema): AnySchema => yup.array().of(data);
