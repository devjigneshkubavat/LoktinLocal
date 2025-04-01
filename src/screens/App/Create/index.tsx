import BoxComponent from '@/hoc/OuterView'
import React, { useMemo, useState } from 'react'
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import styles from './styles'
import { useTheme } from '@/hooks/useTheme'
import Header from '@/components/Header'
import { horizontalScale, verticalScale } from '@/utils/metrics'
import Icon from '@/components/Icon'
import { ICONS } from '@/constants'
import KeyBoardAvoid from '@/components/KeyBoardAvoid'
import CustomTextInput from '@/components/TextInput'
import Imagemodal from './component/Uploadimagemodal/imahemodal'
import ImagePicker from 'react-native-image-crop-picker'
import { navigation } from '@/navigation/rootNavigation'
import { NAMES } from '@/navigation/name'


const Create = () => {
    const { theme } = useTheme()
    const styless = useMemo(() => styles(theme), [theme])
    const [Input, SetInput] = useState({
        Name: '',
        Tag: '',
        Date: '',
        Time: '',
        Addredds: '',
        SelectedImage: {
            base64: '',
            uri: '',
            filename: ''
        },
        Group: '',
        GorupPrompt: '',
        Imagemodal: false
    })

    const tags: string[] = ['movie', 'joker', 'plan']

    const RightView = () => {
        return (
            <View style={styless.iconStyle}>
                <Icon icon={ICONS.send} iconStyle={styless.iconSize} />
                <Icon icon={ICONS.notification} iconStyle={styless.iconSize} onPress={() => navigation.navigate(NAMES.notification)}/>
            </View>
        )
    }

    const Tagviews = ({ item }: { item: string }) => (
        <TouchableOpacity style={styless.listtag}>
            <Text style={styless.listtagtext}>{item}</Text>
        </TouchableOpacity>
    )

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

    const create = async () => {
        SetInput({
            Name: '',
            Tag: '',
            Date: '',
            Time: '',
            Addredds: '',
            SelectedImage: {
                base64: '',
                uri: '',
                filename: ''
            },
            Group: '',
            GorupPrompt: '',
            Imagemodal: false
        })
         navigation.navigate(NAMES.createPlan);
    }

    return (

        <View style={styless.container}>
            <Header
                viewstyle={styless.headerstyle}
                lefttext={true}
                leftsidetext={'Create'}
                leftstyle={styless.leftsidestyle}
                rightView={RightView()}
            />
            <ScrollView>
                <KeyBoardAvoid scrollstyle={styless.subcontainer}>
                    <Text style={styless.plantext}>Plan Details</Text>
                    <View
                        style={{
                            marginVertical: verticalScale(15)
                        }}
                    >
                        <CustomTextInput
                            label={'Plan Name'}
                            placeholder={'e.g., "JOKER 2" movie'}
                            value={Input.Name}
                            onChangeText={v =>
                                SetInput(pre => ({ ...pre, Name: v }))
                            }
                            style={styless.Txtinput}
                        />
                        <View style={styless.Tagview}>
                            <Text style={styless.Tagtext}>{'Tags'}</Text>
                            <View style={styless.Tags}>
                                {tags.map((item, index) => (
                                    <Tagviews key={'tag_' + index} item={item} />
                                ))}
                            </View>
                        </View>
                        <View style={styless.Rowview}>
                            <CustomTextInput
                                label={'Date'}
                                placeholder={'DD/MM/YYYY'}
                                value={Input.Date}
                                onChangeText={v =>
                                    SetInput(pre => ({ ...pre, Date: v }))
                                }
                                style={styless.Rowtxxtinput}
                            />
                            <CustomTextInput
                                label={'Time'}
                                placeholder={'HH:MM'}
                                value={Input.Time}
                                onChangeText={v =>
                                    SetInput(pre => ({ ...pre, Time: v }))
                                }
                                style={styless.Rowtxxtinput}
                            />
                        </View>
                        <CustomTextInput
                            label={'Address'}
                            placeholder={'e.g., "123, Main St New York, NY"'}
                            value={Input.Addredds}
                            onChangeText={v =>
                                SetInput(pre => ({ ...pre, Addredds: v }))
                            }
                            style={styless.Txtinput}
                            multiline={true}
                        />
                        <View
                            style={[
                                styless.Tagview,
                                {
                                    paddingVertical: verticalScale(7),
                                    paddingHorizontal: horizontalScale(7),
                                }
                            ]}
                        >
                            <View style={styless.Photoview}>
                                <TouchableOpacity
                                    style={Input.SelectedImage.uri ? '' : styless.Touchstyle}
                                    onPress={() =>
                                        SetInput(pre => ({
                                            ...pre,
                                            Imagemodal: true
                                        }))
                                    }
                                >
                                    <Image
                                        source={
                                            Input.SelectedImage?.uri
                                                ? { uri: Input.SelectedImage.uri }
                                                : ICONS.uploadimg
                                        }
                                        style={Input.SelectedImage.uri ? styless.Image : styless.icons}
                                    />
                                </TouchableOpacity>
                                <View style={styless.txtview}>
                                    {Input.SelectedImage?.filename ? (
                                        <View style={{ width: '80%' }}>
                                            <Text style={styless.Filenametxt}>
                                                {Input.SelectedImage.filename}
                                            </Text>
                                        </View>
                                    ) : (
                                        <View style={{ width: '80%' }}>
                                            <Text style={styless.uploadtext}>
                                                {'Upload Image or Video '}
                                            </Text>
                                            <Text style={styless.selecttext}>
                                                Drag and drop or{' '}
                                                <Text style={styless.Filetext}>
                                                    Select File
                                                </Text>{' '}
                                                To Upload.
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </View>
                        <View style={styless.Tagview}>
                            <Text style={styless.Tagtext}>{'Group Size'}</Text>
                        </View>
                        <CustomTextInput
                            label={'Group Prompt'}
                            placeholder={
                                'e.g., "Add a fun question or prompt for your plan'
                            }
                            value={Input.GorupPrompt}
                            onChangeText={v =>
                                SetInput(pre => ({ ...pre, GorupPrompt: v }))
                            }
                            style={styless.Txtinput}
                            multiline={true}
                        />
                    </View>
                    <TouchableOpacity style={styless.button} onPress={() => create()}>
                        <Text style={styless.Createtxt}>{'Create Square'}</Text>
                    </TouchableOpacity>
                </KeyBoardAvoid>
            </ScrollView>
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

export default BoxComponent(Create)
