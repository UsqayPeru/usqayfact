import { Loading } from "@/components/loading/Loading";
import clsx from "clsx";

export default function SignButton ({ pending, initialIsDisable }: any) {
    return ( 
        <button
            type="submit"
            disabled={initialIsDisable}
            className={clsx({
                "text-md text-white  p-2 border-s-2 border-y-2 border-l-2 border-x-2 bg-[#4589FF] border-[#4589FF] rounded w-full": !pending && !initialIsDisable,
                "bg-gray-200 text-white border-gray-200 p-2 rounded transition-all w-full": pending || initialIsDisable,
            })}
        >
            { pending ? (
                <Loading
                    description="Ingresando"
                />
            ) : (
                "Ingresar"
            )}
        </button>
    )
}