import React from 'react';

import {
  Chip,
  ChipWrapper,
  DraggableWrapper,
  Input,
  Label,
  VCol,
} from '@/aero';
import type { ComplexPathsCustomizationKeys } from '@/editor/domain/trigger';
import { useAdvancedInput } from '@/editor/hooks';
import { useWorkflowTriggersStore } from '@/editor/stores';

type Props = {
  trigger: ComplexPathsCustomizationKeys;
};

export const Paths: React.FC<Props> = ({ trigger }) => {
  const { toggleComplexTriggerPath, getComplexTriggerPaths } =
    useWorkflowTriggersStore();

  const paths = getComplexTriggerPaths(trigger);

  const methods = useAdvancedInput('', {
    tabCount: [0, paths.size],
    onEnterPress: (value, { onResetInput }) => {
      toggleComplexTriggerPath(trigger, value);
      onResetInput();
    },
  });

  const handleOnRemovePath = (path: string) => () => {
    toggleComplexTriggerPath(trigger, path);
  };

  return (
    <VCol variant="md">
      <DraggableWrapper>
        <Label className="w-[280px]">Paths</Label>
        {paths.size > 0 ? (
          <ChipWrapper variant="left">
            {[...paths].map((path) => (
              <Chip
                key={path}
                text={path}
                onClick={handleOnRemovePath(path)}
                active
              />
            ))}
          </ChipWrapper>
        ) : null}
        <Input placeholder="Type path name" {...methods} />
      </DraggableWrapper>
    </VCol>
  );
};
