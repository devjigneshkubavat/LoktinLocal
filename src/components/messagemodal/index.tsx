import { Messagemodal } from '@/constants/types'
import { useTheme } from '@/hooks/useTheme'
import React, { useMemo } from 'react'
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { BlurView } from '@react-native-community/blur'
import { ICONS } from '@/constants'

const Messagemodals: React.FC<Messagemodal> = ({ visible,image,title,text,textstyle,firstbuttonpress,firstbuttontext,secondbuttonpress,secondbuttontext, Secondbutton }) => {
    const { theme } = useTheme()
    const styless = useMemo(() => styles(theme), [theme])

    return (
        <Modal visible={visible} transparent={false} animationType='slide'>
            <View style={styless.container}>
                <BlurView
                    blurType='light'
                    style={styless.absoulte}
                    blurAmount={5}
                />

                <View style={styless.message}>
                    <Image source={image} style={styless.image} />
                    <Text style={styless.titletext}>{title}</Text>
                    <Text style={[styless.text,textstyle]}>
                        {text}
                    </Text>
                <View style={styless.butttonview}>
                    <TouchableOpacity style={styless.button} onPress={firstbuttonpress}>
                        <Text style={styless.buttontext}> 
                                {firstbuttontext}
                        </Text>
                    </TouchableOpacity>
                    { Secondbutton ?
                        <TouchableOpacity style={styless.secondbtn} onPress={secondbuttonpress}>
                            <Text style={styless.secondtxt}>
                                {secondbuttontext}
                            </Text>
                        </TouchableOpacity> : null
                    }
                </View>
                    </View>
            </View>
        </Modal>
    )
}

export default Messagemodals
