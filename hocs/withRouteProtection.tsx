import { useRouter } from 'next/router'
import * as R from 'rambda'
import { useAuthState } from '../context/AuthContext/hooks/useAuthState'

export const withRouteProtection = R.curry((WrappedRoute, props) => {
    const { signedIn } = useAuthState()

    const router = useRouter()
    
    if(!signedIn) {
        router.push('/hello')
    }

    return <WrappedRoute {...props}/>
})