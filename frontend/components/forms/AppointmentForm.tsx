/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SelectItem } from "@/components/ui/select";
import { Doctors } from "@/constants";

import { getAppointmentSchema } from "@/lib/validation";

import "react-datepicker/dist/react-datepicker.css";

import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { Form } from "../ui/form";
import { FormFieldType } from "./PatientForm";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  createAppointment,
  updateAppointment,
} from "@/features/appointment/appointmentSlice";
import { formatDateTime } from "@/lib/utils";
import { sendSMSNotification } from "@/lib/actions/appointment.actions";
import { getSingleUser } from "@/features/user/userSlice";

export interface Appointment {
  id?: string;
  patient: string;
  schedule: Date;
  status: string;
  primaryPhysician: string;
  reason: string;
  note: string;
  userId: string;
  cancellationReason?: string | null;
}

export const AppointmentForm = ({
  userId,
  patientId,
  type = "create",
  appointment,
  setOpen,
}: {
  userId: string;
  patientId: string;
  type: "create" | "schedule" | "cancel";
  appointment: Appointment;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();

  dispatch(getSingleUser({ userId }));

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAppSelector((store) => store.user);

  const appWriteUserId = user?.appWriteUserId;

  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment?.primaryPhysician : "",
      schedule: appointment
        ? new Date(appointment?.schedule)
        : new Date(Date.now()),
      reason: appointment ? appointment.reason : "",
      note: appointment?.note || "",
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof AppointmentFormValidation>
  ) => {
    setIsLoading(true);
    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
    }
    try {
      if (type === "create" && patientId) {
        const appointment = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          status: status!,
          note: values.note!,
        };

        dispatch(createAppointment(appointment)).then((result) => {
          const { id } = result.payload;
          console.log(id);
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${id}`
          );
        });
      } else {
        const updatedAppointment = {
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          status: status,
          cancellationReason: values.cancellationReason,
        };

        dispatch(
          updateAppointment({
            appointmentId: appointment.id!,
            appointmentData: updatedAppointment,
          })
        ).then(() => {
          if (setOpen) {
            setOpen(false);
          }
          const smsMessage = `Greetings from CarePulse. ${
            type === "schedule"
              ? `Your appointment is confirmed for ${
                  formatDateTime(appointment.schedule!).dateTime
                } with Dr. ${appointment.primaryPhysician}`
              : `We regret to inform that your appointment for ${
                  formatDateTime(appointment.schedule!).dateTime
                } is cancelled. Reason:  ${appointment.cancellationReason}`
          }.`;

          sendSMSNotification(smsMessage, appWriteUserId);
        });
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
    default:
      buttonLabel = "Submit Appointment";
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        {type === "create" && (
          <section className="mb-12 space-y-4">
            <h1 className="header">New Appointment</h1>
            <p className="text-dark-700">
              Request a new appointment in 10 seconds.
            </p>
          </section>
        )}

        {type !== "cancel" && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a doctor"
            >
              {Doctors.map((doctor, i) => (
                <SelectItem key={doctor.name + i} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt="doctor"
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expected appointment date"
              showTimeSelect
              dateFormat="MM/dd/yyyy  -  h:mm aa"
            />

            <div
              className={`flex flex-col gap-6  ${
                type === "create" && "xl:flex-row"
              }`}
            >
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Appointment reason"
                placeholder="Annual montly check-up"
                disabled={type === "schedule"}
              />

              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Comments/notes"
                placeholder="Prefer afternoon appointments, if possible"
                disabled={type === "schedule"}
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Urgent meeting came up"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${
            type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
          } w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};
