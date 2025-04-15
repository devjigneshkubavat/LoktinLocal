import BoxComponent from '@/hoc/OuterView'
import { useTheme } from '@/hooks/useTheme'
import React, { useEffect, useMemo, useState } from 'react'
import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import style from './style'
import Header from '@/components/Header'
import { COLORS } from '@/constants/colors'
import { horizontalScale } from '@/utils/metrics'
import { GENDER, genderOptions, ICONS } from '@/constants'
import Imagemodal from './component/Uploadimagemodal/imahemodal'
import ImagePicker from 'react-native-image-crop-picker'
import { goBack, navigation } from '@/navigation/rootNavigation'
import { NAMES } from '@/navigation/name'
import { STRINGS } from '@/constants/strings'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import CustumModal from '@/components/CustumModal'
import { useRoute } from '@react-navigation/native'
import { onUpdateprofile, selectUser } from '@/redux/slices/userSlice'
import Loader from '@/components/Loader'
import { generateLabelArray, generateLabelString } from '@/utils/helper'
import ImagePickerModal from 'react-native-image-picker-modal'
import FastImage from 'react-native-fast-image'

type UserData = {
    [key: string]: any; // Allows dynamic access, but removes type safety
};
const Editprofile = () => {
    const { theme } = useTheme()
    const { params } = useRoute<any>()
    const styless = useMemo(() => style(theme), [theme])
    const [Selecteditem, Setselecteditem] = useState('Edit')
    const { userInfo, updateProfileLoader,updateImageLoader } = useSelector(selectUser);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isimageModalVisible, setImageModalVisible] = useState(false);
    let ProfileImage = userInfo?.ProfilePhoto ? userInfo?.ProfilePhoto : userInfo?.profilePhotoUrls ? userInfo?.profilePhotoUrls[0] : ''

    const dispatch = useDispatch<AppDispatch>()

    const field = [
        // {
        //     key: 'username',
        //     label: 'Username',
        //     type: 'textinput',
        //     editable: false
        // },
        // {
        //     key: 'firstName',
        //     label: 'Name',
        //     type: 'textinput',
        //     editable: false
        // },
        {
            key: 'userBio',
            label: 'Bio',
            type: 'textinput',
            editable: true
        },
        {
            key: 'gender',
            label: 'Gender',
            type: 'navigation',
            onPress: () => setModalVisible(true),
        },
        // {
        //     key: 'eduction',
        //     label: 'Eduction',
        //     type: 'navigation',
        //     onPress: () => console.log('')
        // },
        {
            key: 'interests',
            label: 'Interest',
            type: 'navigation',
            onPress: (value: any) => { navigation.navigate(NAMES.onboardingFive1, { isEdit: true, selectedData: value, onSave: (newdata: any) => { SetInput({ ...Input, 'interests': newdata }) } }) }
        },
        {
            key: 'communities',
            label: 'Causes',
            type: 'navigation',
            onPress: (value: any) => navigation.navigate(NAMES.onboardingFour1, { isEdit: true, selectedData: value, onSave: (newdata: any) => { SetInput({ ...Input, 'communities': newdata }) } })
        }
    ]

    const [Input, SetInput] = useState<any>({
        userBio: userInfo.userBio,
        interests: generateLabelArray(userInfo.interests as any, 'interest_name'),
        communities: generateLabelArray(userInfo.communities as any, 'community_name'),
        gender: userInfo.gender,
        // SelectedImage: {
        //     base64: '',
        //     uri: '',
        //     filename: ''
        // },
        // Imagemodal: false
    })
    const opencamera = () => {
        console.log('here');

        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true
        }).then(response => {
            setImageModalVisible(false)
            console.log(response);

            // SetInput((pre: any) => ({
            //     ...pre,
            //     SelectedImage: {
            //         base64: '',
            //         uri: response.path,
            //         filename: response.filename || ''
            //     }
            // }))
        })
    }

    const opengallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(response => {
            console.log(response);
            setImageModalVisible(false)
            // SetInput((pre: any) => ({ ...pre, Imagemodal: false }))
            // SetInput((pre: any) => ({
            //     ...pre,
            //     SelectedImage: {
            //         base64: '',
            //         uri: response.path,
            //         filename: response.filename || ''
            //     }
            // }))
        })
    }



    const handleSelect = (value: string) => {
        SetInput({ ...Input, gender: value })
    };
    const selectImage = (item: any) => {
        console.log(item.assets[0]);
        ProfileImage = item.assets[0].uri;
        dispatch(onUpdateprofile({
            url: 'auth/update-user',
            data: item,
        }))
        setImageModalVisible(false)
    }
    const onSavePress = () => {
        dispatch(onUpdateprofile({
            url: 'auth/update-user',
            data: Input,
            isFrom: 'editProfile'
        }))
    }

    return (
        <View style={styless.container}>
            <Header
                leftView={{
                    onPress: goBack,
                    icon: ICONS.left_arrow
                }}
                leftIcon={true}
                centerText='Edit Info'
                rightView={{
                    icon: 'Save',
                    onPress: () => { onSavePress() }
                }}
                rightviewstyle={{ marginHorizontal: horizontalScale(4) }}
                viewstyle={styless.header}
            />
            {/* temp comment need to uncomment after conformation */}
            {/* <View style={styless.touchview}>
                {['Edit', 'Preview'].map((item, index) => (
                    <TouchableOpacity
                        style={[
                            styless.touch,
                            Selecteditem === item && styless.touchon
                        ]}
                        onPress={() => Setselecteditem(item)}
                        key={index}
                    >
                        <Text
                            style={[
                                styless.touchtext,
                                Selecteditem === item && styless.texton
                            ]}
                        >
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View> */}
            {Selecteditem === 'Edit' && (
                <View>
                    <View style={styless.imageContainer}>
                        <View style={styless.imageview}>
                            <FastImage source={ProfileImage ? { uri: ProfileImage } : ICONS.dummy} style={styless.image} />
                            <TouchableOpacity style={styless.addimageview} onPress={() => { setImageModalVisible(true) }}>
                                <Image
                                    style={styless.addimage}
                                    source={ICONS.plus}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styless.aboutme}>About Me</Text>
                    <ScrollView style={styless.scrool}>
                        {field.map((item, index) => {
                            const fieldKey = item.key;
                            return (
                                <View
                                    key={fieldKey}
                                    style={styless.viewcontainer}
                                >
                                    <View style={styless.labelstyle}>
                                        <Text style={styless.labeltxt}>
                                            {item.label}
                                        </Text>
                                    </View>
                                    {item.type === 'textinput' ? (
                                        <TextInput
                                            style={styless.textinput}
                                            // numberOfLines={3}
                                            multiline={true}
                                            placeholder={STRINGS.bio}
                                            placeholderTextColor={'grey'}
                                            editable={item?.editable}
                                            value={Input[fieldKey]}
                                            onChangeText={v =>
                                                SetInput({ ...Input, [fieldKey]: v })
                                            }
                                        />
                                    ) : (
                                        <TouchableOpacity disabled={item.type != 'navigation'}
                                            onPress={() => item.onPress && item.onPress(fieldKey !== 'gender' && generateLabelArray(Input[fieldKey], fieldKey == 'interests' ? 'interest_name' : 'community_name'))} style={styless.selectview}>
                                            {fieldKey === 'gender' ? <Text numberOfLines={1} style={[styless.labeltxt, { flex: 1, textAlign: 'right', textTransform: 'capitalize' }]}>
                                                {Input[fieldKey] ?? 'Select'}
                                            </Text> :
                                                <Text numberOfLines={1} style={[styless.labeltxt, { flex: 1, textAlign: 'right' }]}>
                                                    {Input[fieldKey]?.length > 0 ? generateLabelString(Input[fieldKey], fieldKey == 'interests' ? 'interest_name' : 'community_name') : 'Select'}
                                                </Text>}
                                            <Image
                                                source={ICONS.rightArrow}
                                                style={styless.rightimage}
                                            />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>
            )}
            {/* <Imagemodal
                visible={isimageModalVisible}
                onrequestClose={() =>
                    setImageModalVisible(false)
                }
                opencamera={opencamera}
                opengallery={opengallery}
                onclose={() => {setImageModalVisible(false)}}
                ontouchable={() => {setImageModalVisible(false)}}
            /> */}
            <ImagePickerModal
                libraryPhotoOptions={{ selectionLimit: 1, mediaType: 'photo' }}
                onBackdropPress={() => {
                    setImageModalVisible(false);
                }}
                onCancelPress={() => {
                    setImageModalVisible(false);
                }}
                title="You can either take a picture or select one from your album."
                data={['Take a photo', 'Select from the library']}
                isVisible={isimageModalVisible}
                onPress={selectImage}
            />
            <CustumModal headerName={STRINGS.gender} selectedValue={Input.gender} isVisible={isModalVisible} options={genderOptions} onClose={() => setModalVisible(false)} onSelect={(item) => handleSelect(item)} />
            <Loader loading={updateImageLoader} />
        </View>
    )
}

export default BoxComponent(Editprofile)
