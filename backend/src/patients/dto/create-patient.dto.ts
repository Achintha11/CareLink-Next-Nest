import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsBoolean,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsDateString()
  @IsNotEmpty()
  birthDate: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsOptional()
  occupation?: string;

  @IsString()
  @IsNotEmpty()
  emergencyContactName: string;

  @IsString()
  @IsNotEmpty()
  emergencyContactNumber: string;

  @IsString()
  @IsOptional()
  primaryPhysician?: string;

  @IsString()
  @IsOptional()
  insuranceProvider?: string;

  @IsString()
  @IsOptional()
  insurancePolicyNumber?: string;

  @IsArray()
  @Type(() => String)
  @IsOptional()
  allergies: string;

  @IsArray()
  @Type(() => String)
  @IsOptional()
  currentMedication: string;

  @IsArray()
  @Type(() => String)
  @IsOptional()
  familyMedicalHistory: string;

  @IsArray()
  @Type(() => String)
  @IsOptional()
  pastMedicalHistory: string;

  @IsString()
  @IsNotEmpty()
  identificationType: string;

  @IsString()
  @IsNotEmpty()
  identificationNumber: string;

  @IsString()
  @IsNotEmpty()
  identificationDocumentId: string;

  @IsString()
  @IsNotEmpty()
  identificationDocumentUrl: string;

  @IsBoolean()
  @IsNotEmpty()
  privacyConsent: boolean;
}
