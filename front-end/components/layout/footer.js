import { MAIN_BLACK } from '@/assets/color-code';

export default function Footer() {
  return (
    <div
      style={{
        height: 'var(--footer-height)',
        overflow: 'hidden',
        lineHeight: 'var(--footer-height)',
        width: '100%',
        position: 'absolute',
        top: '100%',
        letterSpacing: '3px',
        backgroundColor: MAIN_BLACK,
        color: '#ddd',
        textAlign: 'center',
      }}
    >
      Copyright © 2023 健身堡壘. All rights reserved.
    </div>
  );
}
