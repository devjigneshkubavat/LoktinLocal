import { WModal, WToast } from "@flyskywhy/react-native-smart-tip"
import { useEffect } from "react"
import { ActivityIndicator } from "react-native"

const Loader = ({loading}:any) => {
    const toast5 = {
        data: 'Loading',
        textColor: '#fff',
        backgroundColor: '#444444',
        position: WToast.position.CENTER,
        icon: <ActivityIndicator color='#fff' size={'large'} />
    }
    
    useEffect(()=>{        
        if(loading){
            WModal.show(toast5)
        }else{
            WModal.hide()
        }
    },[loading])
    return (
        <>
        </>
    )
}
export default Loader