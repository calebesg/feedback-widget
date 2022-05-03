import { Popover } from '@headlessui/react';
import { X } from 'phosphor-react';

export function CloseButton() {
  return (
    <Popover.Button
      title="Fechar formulário de feedback"
      className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-100"
    >
      <X weight="bold" className="w-4 h-4" />
    </Popover.Button>
  );
}
