'use client';

import { Control, ControllerRenderProps, FieldValues, Path, useForm } from 'react-hook-form';
import { InlineDatePicker } from '@/ui/components/core/InlineDatePicker';
import { AddTaskSchema, AddTaskType } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateTask } from '@/lib/actions';
import { ReactNode } from 'react';

interface BaseProps {
  renderLabel?: ReactNode;
}

interface FormModeProps<T extends FieldValues> extends BaseProps {
  name: Path<T>;
  control: Control<T>;
}

interface InlineModeProps extends BaseProps {
  name: Path<AddTaskType>;
  data: Date | null;
  taskId: string;
}

type InlineDatePickerProps<T extends FieldValues> = FormModeProps<T> | InlineModeProps;

export default function TaskDatePickerLabel<T extends FieldValues>(
  props: InlineDatePickerProps<T>
) {
  const isFormMode = 'control' in props && 'name' in props;
  return isFormMode ? <InlineDatePicker {...props} /> : <DatePickerController {...props} />;
}

function DatePickerController({ name, data, taskId, renderLabel }: InlineModeProps) {
  const singleSchema = AddTaskSchema.pick({ [name]: true } as { T: boolean });

  const { control, trigger } = useForm({
    resolver: zodResolver(singleSchema),
    defaultValues: { [name]: data },
    mode: 'onChange',
  });

  const handleInlineSave = async (
    newVal: Date | null,
    field: ControllerRenderProps<AddTaskType, Path<AddTaskType>>
  ) => {
    if (newVal === field.value) {
      return {
        ok: true,
      };
    }
    return await updateTask(taskId, { [name]: newVal });
  };

  return (
    <InlineDatePicker
      name={name}
      control={control}
      trigger={trigger}
      customOnSelect={handleInlineSave}
      renderLabel={renderLabel}
      shortcut="D"
    />
  );
}
