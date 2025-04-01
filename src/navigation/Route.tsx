import { WRootToastApp } from '@flyskywhy/react-native-smart-tip';
import AuthStack from './Stack/AuthStack';
import { useSelector } from 'react-redux';
import { selectToken } from '@/redux/slices/authSlice';
import { selectUserData } from '@/redux/slices/userSlice';
import { useEffect, useState } from 'react';
import reduxStorage from '@/store/reduxStorage';
import { getLocally } from '@/utils/helper';
import Loader from '@/components/Loader';
import AppStack from './Stack/AppStack';
import UseSessionExpiry from '@/hooks/UseSessionExpiry';

const Root = () => {
    const userData = useSelector(selectUserData)

    return (
        <>
            <UseSessionExpiry />
            <WRootToastApp>
                {(userData?.profilePhotoUrls && userData.profilePhotoUrls?.length > 0) || false ? <AppStack /> : <AuthStack />}
            </WRootToastApp>
        </>
    );
};
export default Root;
