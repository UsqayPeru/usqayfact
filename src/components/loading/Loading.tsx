import { FaSpinner } from "react-icons/fa";

interface Props {
    description: string;
}


export const Loading = ({ description }: Props ) => {
    return( 
        <div className="flex justify-center items-center">
            <FaSpinner className="animate-spin text-md" /> 
            <p className="mx-2">{ description }</p>
        </div>
    );
}