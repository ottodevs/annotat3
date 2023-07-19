import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const DataSetCard = () => {

    return (
        <Card className="w-[335px] h-[154px] p-8 bg-white rounded-md justify-start items-start gap-4 inline-flex">
            <CardContent className="flex">
                <div className="Image p-2.5 bg-stone-300 rounded-[7px]"></div>
                <div className="Content flex-col justify-start items-start gap-2 inline-flex">
                    <CardTitle className="w-[75px] h-7 text-gray-900 text-xl font-semibold">Houses</CardTitle>
                    <CardDescription className="flex-col justify-start items-start gap-2 flex">
                        <div className="HitsCount h-[23px] relative">
                            <div className="Hits w-[31px] h-[23px] left-0 top-0 absolute text-gray-900 text-base font-semibold">Hits</div>
                            <div className=" w-[58px] h-[23px] left-[108px] top-0 absolute text-gray-900 text-base font-normal">923745</div>
                        </div>
                        <div className="SetsCount h-[23px] relative">
                            <div className="Sets w-[35px] h-[23px] left-0 top-0 absolute text-gray-900 text-base font-semibold">Sets</div>
                            <div className=" w-[34px] h-[23px] left-[130px] top-0 absolute text-gray-900 text-base font-normal">3179</div>
                        </div>
                    </CardDescription>
                </div>
            </CardContent>
        </Card>
    );
};

export default DataSetCard;
