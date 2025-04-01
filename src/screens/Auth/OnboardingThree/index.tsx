import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import BoxComponent from '@/hoc/OuterView';
import Header from '@/components/Header';
import { ICONS } from '@/constants';
import { STRINGS } from '@/constants/strings';
import {styles} from './styles';
import ProgressBar from '@/components/ProgressBar';
import { goBack, navigate } from '@/navigation/rootNavigation';
import Button from '@/components/Button';
import { useRoute } from '@react-navigation/native';
import { UserData } from '@/constants/types';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateBirthdaterequest } from '@/redux/slices/userSlice';
import { AppDispatch } from '@/store/store';
import Loader from '@/components/Loader';
import { formatPhonenumber, hasValue } from '@/utils/helper';
import DatePicker from 'react-native-date-picker';
import { COLORS } from '@/constants/colors';
import { useTheme } from '@/hooks/useTheme';
export const OnboardingThree = () => {
    const route = useRoute();
    const userDetails = useSelector(selectUser);
    const [date, setDate] = useState(new Date());
    const { theme, handleTheme,themeType } = useTheme()
    const styless = useMemo(() => styles(theme), [theme]);
    const [userData, setUserData] = useState<UserData>(
        userDetails.userInfo ?? {},
    );

    const dispatch = useDispatch<AppDispatch>();
    const onDateSave = useCallback(async () => {
        let birthDate;
        if(!hasValue(userData?.dateOfBirth)){
            birthDate = moment(date, "YYYY-MM-DD");
        }else{
            birthDate = moment(userData.dateOfBirth, "YYYY-MM-DD");
        }
        const today = moment();
        const age = today.diff(birthDate, "years");  
        if (age < 18) {
          Alert.alert("Access Denied", "You must be at least 18 years old to use Loktin");
          return
        }
        dispatch(
            updateBirthdaterequest({
                url: 'auth/save-dob',
                data: {
                    userId: userDetails.userInfo?.userId,
                    dateOfBirth: moment(userData.dateOfBirth).format('YYYY-MM-DD'),
                },
            }),
        );
    }, [userData]);

    return (
        <View style={styless.container}>
            <Header
                leftIcon={true}
                leftView={{
                    onPress: () => {
                        goBack();
                    },
                    icon: ICONS.left_arrow,
                }}
                centerText="3/3"
            // rightView={{onPress: () => {}, icon: STRINGS.skip}}
            // rightIcon={false}
            />
            <View style={styless.progressView}>
                <ProgressBar progress={1} startValue={0.67} animated/>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styless.introText}>{STRINGS.birthday}</Text>
                <Text style={styless.birthInfoText}>{STRINGS.birthInfo}</Text>
                <View style={styless.dateView}>
                    {/* <DatePicker
                        onDateChange={(date: Date) => {
                            setUserData((prevState) => ({
                                ...prevState,
                                dateOfBirth: date,
                            }));
                        }}
                        date={hasValue(userData.dateOfBirth) ? userData.dateOfBirth : new Date()}
                        maximumDate={new Date()}
                    /> */}
                    <DatePicker
                        dividerColor={COLORS.primaryColor}
                        theme={themeType}
                        maximumDate={new Date()}
                        mode="date"
                        date={
                            hasValue(userData?.dateOfBirth) ? userData?.dateOfBirth : date
                        }
                        onDateChange={(date: Date) => {
                            setUserData(prevState => ({
                                ...prevState,
                                dateOfBirth: date,
                            }));
                        }}
                    />
                </View>
            </View>
            <Button
                title={STRINGS.continue}
                viewstyle={styless.bottomView}
                textStyle={styless.btnText}
                onPress={() => {
                    onDateSave();
                }}
                disabled={false}
            />
            <Loader loading={userDetails?.birthdateLoader} />
        </View>
    );
};

export default BoxComponent(OnboardingThree);