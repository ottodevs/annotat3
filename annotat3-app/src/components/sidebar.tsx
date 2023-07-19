import { FC } from 'react'
import { HiX, HiHome } from "react-icons/hi";
import { FaChartLine } from 'react-icons/fa';
import { useSidebarContext } from '@/providers/SidebarProvider';
import useMobileView from '@/hooks/useMobileView';
import SidebarItem from './sidebarItem';
import { MdStackedLineChart } from 'react-icons/md';
import { MdLayers } from 'react-icons/md';
import { MdPerson } from 'react-icons/md';

type Props = {}

const Sidebar: FC<Props> = () => {
  const { isMobile } = useMobileView()
  const { openSidebar, setOpenSidebar } = useSidebarContext()

  const navItems = [
    {
      name: 'Home',
      href: '/home',
      Icon: HiHome,
    },
    {
      name: 'Statistics',
      href: '/statistics',
      Icon: MdStackedLineChart,
    },

  {
    name: 'Library',
    href: '/library',
    Icon: MdLayers,
  },

  {
    name: 'My Profile',
    href: '/profile',
    Icon: MdPerson,
  }
    // add more items here
  ];

  return (
    <>
      <div className={`bg-[#000] bg-opacity-70 absolute inset-0 z-50 ${openSidebar && isMobile ? 'block w-screen h-full' : 'hidden'}`} onClick={() => setOpenSidebar(false)} />
      <div
        className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 
        ${openSidebar ? "translate-x-0" : "-translate-x-96"}`}
      >
        <span className="absolute top-4 right-4 block cursor-pointer xl:hidden" onClick={() => setOpenSidebar(false)} >
          <HiX />
        </span>

        <div className={`mx-[56px] mt-[50px] flex items-center`}>
          <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
            Annotat3
          </div>
        </div>

        <div className="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />

        <div className="PagesGroup w-[290px] h-[216px] flex-col justify-start items-start gap-6 inline-flex">
        {navItems.map((item, index) => (
          <SidebarItem key={index} name={item.name} href={item.href} Icon={item.Icon} />
        ))}
        </div>

      </div>
    </>
  );
};

export default Sidebar;
