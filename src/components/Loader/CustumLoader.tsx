import { COLORS } from "@/constants/colors"
import { horizontalScale, verticalScale } from "@/utils/metrics"
import { WModal, WToast } from "@flyskywhy/react-native-smart-tip"
import { useEffect } from "react"
import { ActivityIndicator, Modal, View } from "react-native"

const CustumLoader = ({ loading }: any) => {

    return (
        <Modal visible={loading} transparent={true}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator animating={loading} size={'large'} color={COLORS.white} style={{height:verticalScale(80),width:horizontalScale(160),borderRadius:10,backgroundColor:'rgba(0,0,0,0.8)'}}/>
            </View>
        </Modal>
    )
}
export default CustumLoader