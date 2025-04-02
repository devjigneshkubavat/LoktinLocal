import BoxComponent from '@/hoc/OuterView'
import { useTheme } from '@/hooks/useTheme'
import React, { useEffect, useMemo, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import style from './style'
import Header from '@/components/Header'
import { ICONS } from '@/constants'
import { goBack } from '@/navigation/rootNavigation'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { updateSecuritySettings, updateSecuritySettingsRequest } from '@/redux/slices/updateSecuritiesSlice'

const Checkins = () => {
    const { theme } = useTheme()
    const styless = useMemo(() => style(theme), [theme])
    const [Minute, Setminute] = useState('Every 15 Minutes')
    const { userToken } = useSelector((state: RootState) => state.auth);
    const { securitySettings } = useSelector((state: RootState) => state.updateSecuritiesSaga);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const tmpMinutes = 
        securitySettings.receiveCheckInReminders === "Every15Minutes"
        ? "Every 15 Minutes"
        :  securitySettings.receiveCheckInReminders === "Every20Minutes"
        ? "Every 20 Minutes"
        : securitySettings.receiveCheckInReminders === "Every45Minutes"
        ? "Every 45 Minutes"
        : "Every Hour";
        Setminute(tmpMinutes);
    }, [])


      const onSwitchValueChange = (val) => {
        Setminute(val);
        const value = val.replace(/\s+/g, "");

        const updateSettingConfig = {
          ...securitySettings,
          receiveCheckInReminders: value,
        };

        dispatch(updateSecuritySettings(updateSettingConfig));
        dispatch(
          updateSecuritySettingsRequest({
            url: "update-securities/update-securities-setting",
            userToken,

            data: updateSettingConfig,
          })
        );
      };

    return (
        <View style={styless.container}>
            <Header
                leftIcon={true}
                centerText='Check ins'
                viewstyle={styless.header}
                leftView={{
                    onPress: () => {
                        goBack()
                    },
                    icon: ICONS.left_arrow
                }}
            />
            {[
                'Every 15 Minutes',
                'Every 20 Minutes',
                'Every 45 Minutes',
                'Every Hour'
            ].map((item, index) => (
                <TouchableOpacity
                    style={styless.list}
                    key={index}
                    onPress={() => onSwitchValueChange(item)}
                >
                    <Text style={styless.text}>{item}</Text>
                    {Minute === item && (
                        <Image
                            source={ICONS.checksIcon}
                            style={styless.image}
                        />
                    )}
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default BoxComponent(Checkins)
