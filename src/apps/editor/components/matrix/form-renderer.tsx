import { ChevronRightIcon, XIcon } from '@primer/octicons-react';
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { HCol, Input, Row, VCol } from '@/aero';
import type { Field } from '@/editor/domain/matrix';

import { AddButtons } from './add-buttons';
import type { UseFieldsResult } from './use-fields';

type Props = {
  field: Field;
  path: string[];
  arrayChild?: boolean;
  onAddField: UseFieldsResult['onAddField'];
  onFieldUpdate: UseFieldsResult['onFieldUpdate'];
  onRemoveField: UseFieldsResult['onRemoveField'];
};

const StringPlaceholder: Record<Exclude<Field['as'], undefined>, string> = {
  number: 'Number value',
  boolean: 'Boolean value',
  string: 'String value',
};

export const FormRenderer: React.FC<Props> = ({
  arrayChild,
  field,
  path,
  onAddField,
  onFieldUpdate,
  onRemoveField,
}) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const depth = path.length;

  const { type } = field;

  if (type === 'string') {
    const { child, value, as } = field;
    const placeholder = StringPlaceholder[as ?? 'string'];

    return (
      <Row align="start" className={twMerge('w-full', depth > 0 && 'pl-4')}>
        <Input
          variant="plain"
          placeholder={!arrayChild ? 'String key' : placeholder}
          defaultValue={value}
          onBlur={onFieldUpdate(field.id, path)}
          icon={<XIcon className="text-muted-foreground" />}
          onIconClick={onRemoveField(field.id, path)}
          type={as === 'number' && arrayChild ? 'number' : 'string'}
        />
        {child !== undefined && !arrayChild ? (
          <>
            <span className="pt-1">:</span>
            <Input
              variant="plain"
              placeholder={placeholder}
              defaultValue={child}
              onBlur={onFieldUpdate(field.id, path, true)}
              type={as === 'number' ? 'number' : 'string'}
              multiline={as === 'string'}
            />
          </>
        ) : null}
      </Row>
    );
  }

  const { child, value } = field;
  const childPath = [...path, field.id];
  const objectPlaceholder = arrayChild
    ? 'Object is just decorative'
    : 'Object key';

  return (
    <VCol variant="md" className={twMerge('w-full', depth > 0 && 'pl-4')}>
      <HCol className="w-full">
        {child.length > 1 && (
          <button onClick={() => setCollapsed(!collapsed)} className="-ml-1">
            <ChevronRightIcon
              className={twMerge(
                'ease-in-out duration-300',
                collapsed ? 'rotate-0' : 'rotate-90',
              )}
            />
          </button>
        )}
        <Input
          variant="plain"
          defaultValue={value}
          placeholder={type === 'array' ? 'Array key' : objectPlaceholder}
          onBlur={onFieldUpdate(field.id, path)}
          icon={<XIcon className="text-muted-foreground" />}
          onIconClick={onRemoveField(field.id, path)}
          disabled={arrayChild && type === 'object'}
        />
      </HCol>
      <VCol
        variant="md"
        className={twMerge(
          'w-full ease-in-out duration-300',
          collapsed ? 'max-h-0 opacity-0' : 'max-h-screen opacity-100',
        )}
      >
        {child.length > 0 && (
          <VCol variant="md" className="w-full border-l border-dashed">
            {child.map((field) => (
              <FormRenderer
                key={field.id}
                field={field}
                path={childPath}
                arrayChild={type === 'array'}
                onAddField={onAddField}
                onFieldUpdate={onFieldUpdate}
                onRemoveField={onRemoveField}
              />
            ))}
          </VCol>
        )}
        <AddButtons onAddField={onAddField} path={childPath} nested />
      </VCol>
    </VCol>
  );
};
