import React from 'react';

type Props = {
  title: string;
  onExpand?: React.MouseEventHandler<SVGSVGElement>;
};
import { DraggableWrapper } from '@/components/dd';

export const Title: React.FC<Props> = ({ title, onExpand }) => (
  <DraggableWrapper>
    <div className="flex justify-between w-100 px-3 py-1.5">
      <p className="text-[#333] font-semibold">{title}</p>
      {onExpand ? (
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="rounded-full hover:bg-gray-100 stroke-slate-600 hover:cursor-pointer h-6"
          onClickCapture={onExpand}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
      ) : null}
    </div>
  </DraggableWrapper>
);
