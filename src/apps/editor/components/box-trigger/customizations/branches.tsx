import React from 'react';

import {
  Chip,
  ChipWrapper,
  DraggableWrapper,
  Input,
  Label,
  VCol,
} from '@/aero';
import type { ComplexBranchesCustomizationKeys } from '@/editor/domain/trigger';
import { useAdvancedInput } from '@/editor/hooks';
import { useWorkflowTriggersStore } from '@/editor/stores';

type Props = {
  trigger: ComplexBranchesCustomizationKeys;
};

export const Branches: React.FC<Props> = ({ trigger }) => {
  const { toggleComplexTriggerBranch, getComplexTriggerBranches } =
    useWorkflowTriggersStore();

  const branches = getComplexTriggerBranches(trigger);

  const methods = useAdvancedInput('', {
    tabCount: [0, branches.size],
    onEnterPress: (value, { onResetInput }) => {
      toggleComplexTriggerBranch(trigger, value);
      onResetInput();
    },
  });

  const handleOnRemoveBranch = (branch: string) => () => {
    toggleComplexTriggerBranch(trigger, branch);
  };

  return (
    <VCol variant="md">
      <DraggableWrapper>
        <Label className="w-[280px]">Branches</Label>
        {branches.size > 0 ? (
          <ChipWrapper variant="left">
            {[...branches].map((branch) => (
              <Chip
                key={branch}
                text={branch}
                onClick={handleOnRemoveBranch(branch)}
                active
              />
            ))}
          </ChipWrapper>
        ) : null}
        <Input placeholder="Type branch name" {...methods} />
      </DraggableWrapper>
    </VCol>
  );
};
