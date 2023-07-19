import { FC } from 'react';

type Props = {};

const StatisticsPage: FC<Props> = () => {
    return (
        <>
           <h1>Stats</h1>
           <div className="PageContent w-[1053px] h-[699px] justify-center items-start gap-6 inline-flex">
               {/* Code for the First Column */}
               <div className="Column self-stretch flex-col justify-start items-start gap-6 inline-flex">
                   {/* Code for the rows of the first column */}
                   {/* First Row */}
                   <div className="Grid w-[514px] justify-start items-start gap-6 inline-flex">
                       {/* Code for the columns of the first row */}
                       {/* ... */}
                   </div>
                   {/* Second Row */}
                   <div className="Frame70 w-[514px] h-[217px] p-8 bg-white rounded-md shadow justify-start items-start gap-3.5 inline-flex">
                       {/* Code for the columns of the second row */}
                       {/* ... */}
                   </div>
                   {/* ... Other rows if any */}
               </div>

               {/* Code for the Second Column */}
               <div className="Column self-stretch flex-col justify-start items-start gap-6 inline-flex">
                   {/* Code for the rows of the second column */}
                   {/* ... */}
               </div>
           </div>
        </>
    );
}

export default StatisticsPage;
