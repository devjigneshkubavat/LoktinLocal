import BoxComponent from '@/hoc/OuterView'
import { useTheme } from '@/hooks/useTheme'
import React, { useMemo, useState } from 'react'
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
import { ICONS } from '@/constants'
import Imagemodal from './component/Uploadimagemodal/imahemodal'
import ImagePicker from 'react-native-image-crop-picker'
import { goBack, navigation } from '@/navigation/rootNavigation'
import { NAMES } from '@/navigation/name'


const Editprofile = () => {
    const { theme } = useTheme()
    const styless = useMemo(() => style(theme), [theme])
    const [Selecteditem, Setselecteditem] = useState('Edit')

    const field = [
        {
            key: 'username',
            label: 'Username',
            type: 'textinput'
        },
        {
            key: 'name',
            label: 'Name',
            type: 'textinput'
        },
        {
            key: 'bio',
            label: 'Bio',
            type: 'textinput'
        },
        {
            key: 'gender',
            label: 'Gender',
            type: 'navigation',
            onPress: () => navigation.navigate(NAMES.editDetails, { title: 'Gender' }),
        },
        // {
        //     key: 'eduction',
        //     label: 'Eduction',
        //     type: 'navigation',
        //     onPress: () => console.log('')
        // },
        {
            key: 'intrest',
            label: 'Intrest',
            type: 'navigation',
            onPress: () => console.log('')
        },
        {
            key: 'causes',
            label: 'Causes',
            type: 'navigation',
            onPress: () => console.log('')
        }
    ]

    const [Input, SetInput] = useState({
        Username: '',
        Name: '',
        Bio: '',
        SelectedImage: {
            base64: '',
            uri: '',
            filename: ''
        },
        Imagemodal: false
    })
    const opencamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true
        }).then(response => {
            SetInput(pre => ({ ...pre, Imagemodal: false }))
            SetInput(pre => ({
                ...pre,
                SelectedImage: {
                    base64: '',
                    uri: response.path,
                    filename: response.filename || ''
                }
            }))
        })
    }

    const opengallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(response => {
            console.log(response.filename);

            SetInput(pre => ({ ...pre, Imagemodal: false }))
            SetInput(pre => ({
                ...pre,
                SelectedImage: {
                    base64: '',
                    uri: response.path,
                    filename: response.filename || ''
                }
            }))
        })
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
                    icon: 'Save'
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
                            <Image source={Input.SelectedImage?.uri ? { uri: Input.SelectedImage.uri } : ICONS.dummy} style={styless.image} />
                            <TouchableOpacity style={styless.addimageview} onPress={() => SetInput(pre => ({ ...pre, Imagemodal: true }))}>
                                <Image
                                    style={styless.addimage}
                                    source={ICONS.plus}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styless.aboutme}>About Me</Text>
                    <ScrollView style={styless.scrool}>
                        {field.map((item, index) => (
                            <TouchableOpacity
                                key={item.key}
                                style={styless.viewcontainer}
                                disabled={item.type != 'navigation'}
                                onPress={() => item.onPress && item.onPress()}
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
                                        placeholder={item.key === 'username' ? 'Frost123' : item.key === 'name' ? 'Alex' : 'Lorem Ipsum is simply dummy text of the printing. '}
                                        placeholderTextColor={'grey'}
                                        value={
                                            item.key === 'username'
                                                ? Input.Username
                                                : item.key === 'name'
                                                    ? Input.Name
                                                    : Input.Bio
                                        }
                                        onChangeText={v =>
                                            SetInput(pre =>
                                                item.key === 'username'
                                                    ?
                                                    { ...pre, Username: v }
                                                    : item.key === 'name'
                                                        ? { ...pre, Name: v }
                                                        : { ...pre, Bio: v }
                                            )
                                        }
                                    />
                                ) : (
                                    <View style={styless.selectview}>
                                        <Text style={styless.labeltxt}>
                                            Select
                                        </Text>
                                        <Image
                                            source={ICONS.rightArrow}
                                            style={styless.rightimage}
                                        />
                                    </View>
                                )}
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}
            <Imagemodal
                visible={Input.Imagemodal}
                onrequestClose={() =>
                    SetInput(pre => ({ ...pre, Imagemodal: false }))
                }
                opencamera={opencamera}
                opengallery={opengallery}
                onclose={() => SetInput(pre => ({ ...pre, Imagemodal: false }))}
                ontouchable={() => SetInput(pre => ({ ...pre, Imagemodal: false }))}
            />
        </View>
    )
}

export default BoxComponent(Editprofile)
