import React from 'react';

import { Dot, DotPosition, Draggable, DraggableWrapper } from '@/components';

import { InvisibleGroup } from './invisible-group';
import { Trigger } from './types';
import { VisibleGroup } from './visible-group';

type Props = {
  innerRef?: React.RefObject<HTMLDivElement>;
  selected: Trigger | null;
  dotPosition?: DotPosition;
  onExpand: (onDraggableExpand: () => void) => void;
  onPositionChange: () => void;
  onTriggerChange: (trigger: Trigger) => void;
};

export const BoxTriggerSelector: React.FC<Props> = ({
  innerRef,
  selected,
  dotPosition,
  onExpand,
  onPositionChange,
  onTriggerChange,
}) => (
  <DraggableWrapper>
    <Draggable
      innerRef={innerRef}
      onPositionChange={onPositionChange}
      visible={({ ref, onExpand: onDraggableExpand }) => (
        <VisibleGroup
          expandableRef={ref}
          selected={selected}
          onExpand={onExpand(onDraggableExpand)}
          onTriggerChange={onTriggerChange}
        />
      )}
      invisible={({ ref }) => (
        <InvisibleGroup
          expandableRef={ref}
          selected={selected}
          onTriggerChange={onTriggerChange}
        />
      )}
    >
      <Dot active={!!selected} position={dotPosition} />
    </Draggable>
  </DraggableWrapper>
);
