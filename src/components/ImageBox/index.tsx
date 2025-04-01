import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { IconProps } from '@/constants/types';
import { styles } from './styles';
import { ICONS } from '@/constants';

const ImageBox: React.FC<IconProps> = props => {
    const [image,setImage] = useState({})
    const [showPicker,setShowpIcker] = useState(false)
    return (
        <TouchableOpacity onPress={()=>{setShowpIcker(true)}} style={styles.imageOuterView}>
            <Image
                source={ICONS.imageplaceholder}
                style={styles.imageView}
            />
        </TouchableOpacity>
    );
};
export default ImageBox;
