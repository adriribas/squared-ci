'use client';

import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';

import {
  BoxName,
  BoxPermissions,
  BoxTrigger,
  Features,
  GlobalDrag,
  Menu,
  News,
  Visualiser,
} from '@/components';
import { useThemeModeLoader } from '@/stores';

function Root() {
  return (
    <main
      className="overflow-hidden bg-[linear-gradient(#e8e8e8_1px,transparent_0),linear-gradient(90deg,#e8e8e8_1px,#f8f8f8_0)] dark:bg-[linear-gradient(#475569_1px,transparent_0),linear-gradient(90deg,#475569_1px,#111827_0)] bg-[length:50px_50px]"
      id="main"
    >
      <News />
      <GlobalDrag>
        <BoxName />
        <BoxTrigger />
        <BoxPermissions />
      </GlobalDrag>
      <Menu />
      <Features />
      <Visualiser />
    </main>
  );
}

// eslint-disable-next-line
const Editor: React.FC = () => {
  const { onLoadMode } = useThemeModeLoader();

  useEffect(() => {
    onLoadMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Root />;
};

// Force it to be CSR
export default dynamic(() => Promise.resolve(Editor), { ssr: false });
