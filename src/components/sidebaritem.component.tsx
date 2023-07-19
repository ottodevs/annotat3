import { FC } from 'react'
import { IconType } from 'react-icons';
import { Button } from '@/components/ui/button'

type SidebarItemProps = {
  name: string;
  href: string;
  Icon: IconType;
}

const SidebarItem: FC<SidebarItemProps> = ({ name, href, Icon }) => {
  return (
    <a href={href} className="MenuItem w-[290px] h-9 px-8 py-1.5 bg-white justify-start items-center gap-3 inline-flex">
      <Icon className="w-6 h-6 relative" />
      <div className="MenuItem grow shrink basis-0 text-slate-700 text-lg font-medium leading-tight">{name}</div>
    </a>

  );
};

export default SidebarItem

