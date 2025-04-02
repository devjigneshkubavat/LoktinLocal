import { useTheme } from '@/hooks/useTheme'
import React, { useMemo, useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import style from './style'
import BoxComponent from '@/hoc/OuterView'
import { useRoute } from '@react-navigation/native'
import Header from '@/components/Header'
import { goBack } from '@/navigation/rootNavigation'
import { ICONS } from '@/constants'
import Button from '@/components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { updateSecuritySettings, updateSecuritySettingsRequest } from '@/redux/slices/updateSecuritiesSlice'

const SetSafeword = () => {
    const route = useRoute();

    const [safeWordAnswer, setSafeWordAnswer] = useState("");
    const { userToken } = useSelector((state: RootState) => state.auth);
    const { securitySettings } = useSelector(
       (state: RootState) => state.updateSecuritiesSaga
     );


    const { theme } = useTheme()
    const styless = useMemo(() => style(theme), [theme])

    const dispatch = useDispatch<AppDispatch>();


    const onPressSetSafeWord = () => {

      const updateSettingConfig = {
        ...securitySettings,
        safeWord: [
          {
            qus: route?.params?.item,
            aus: safeWordAnswer,
          },
        ],
      };

      dispatch(updateSecuritySettings(updateSettingConfig));
      dispatch(
        updateSecuritySettingsRequest({
          url: "update-securities/update-securities-setting",
          userToken,

          data: updateSettingConfig,
        })
      );
      goBack()
    };

    return (
        <View style={styless.container}>
            <Header
                leftIcon={true}
                viewstyle={styless.header}
                leftView={{
                    onPress: () => goBack(),
                    icon: ICONS.left_arrow
                }}
                centerText='Change Safe Word'
            />
            <View style={styless.form}>
                <Text style={styless.txt}>{route.params.item}</Text>
                <TextInput
                    placeholder={'Enter your new safe word.'}
                    multiline={true}
                    style={styless.textinput}
                    value={safeWordAnswer}
                    onChangeText={setSafeWordAnswer}
                />
            </View>

            <Button
                title='Set Safe Word'
                viewstyle={styless.bottomView}
                textStyle={styless.btnText}
                onPress={onPressSetSafeWord}
            />
            <Button
                title='Edit Prompt'
                onPress={goBack}
            />
        </View>
    )
}

export default BoxComponent(SetSafeword)
