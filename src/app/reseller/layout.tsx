import { TopMenu } from "@/components/topmenu/TopMenu";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NavMenu } from "./_components/NavMenu";
import BannerFeedback from "./_components/BannerFeedback";

export default async function ResellerLayout({ children }: { children: React.ReactNode }) {
    const cookiesStore = await cookies();

    const user = cookiesStore.get('uuidfact');

    if ( !user ) {
        redirect('/auth/login');
    }


    return ( 
        <>
            <TopMenu />
            <NavMenu />
            <BannerFeedback />
            <div className='px-4 sm:px-10 mt-4'>
                {children}
            </div>
        </>
    )
}