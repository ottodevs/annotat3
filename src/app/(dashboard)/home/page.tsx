import dynamic from 'next/dynamic';
import { FC } from 'react';
import DataSetCard from './components/datasetCard';
import SearchInput from './components/searchInput';
import SortSelect from './components/sortSelect';
import { Button }  from '@/components/ui/button';


type Props = {};

const HomePage: FC<Props> = () => {
    return (
        <>
<h1 className="mt-14 text-2xl">Start Exploring</h1>


            {/* 1. Button at the top of the page full width. */}
            {/* <button className="w-full p-4 bg-blue-500 text-white rounded">Click Me</button> */}

            <Button variant="default" size="default" >Start Annotating Now</Button>


            {/* 2. Row under this with a div container. */}

            {/* 3. Row under this with 4 columns */}
            <div className="grid grid-cols-5 gap-4 w-full">
                

                
                <div className='col-span-4'><SearchInput/></div>
    <div className="col-span-1"><SortSelect/></div>
            </div>

            {/* 4. Grid with 3 columns and 2 rows with DataSet Cards under number 3. */}
            <div className="grid grid-cols-3 gap-4 w-full pt-4 pb-4">
                <DataSetCard/>
                <DataSetCard/>
                <DataSetCard/>
                <DataSetCard/>
                <DataSetCard/>
                <DataSetCard/>
            </div>

            {/* 5. Row with 2 columns under 4. */}
            <div className="flex w-full space-x-4">
                <div className="flex-1 p-4 bg-green-200">Column 1</div>
                <div className="flex-1 p-4 bg-green-200">Column 2</div>
            </div>

        </>
    );
}

export default HomePage;
