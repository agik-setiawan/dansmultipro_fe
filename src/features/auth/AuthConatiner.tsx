import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router';

export default function AuthContainer({ children }: any) {
    const { data: session, status } = useSession()
    const router = useRouter();
    if (status == 'unauthenticated') {
        router.push('/login');
    }
    
    return (
        <>
            {children}
        </>
    )
}