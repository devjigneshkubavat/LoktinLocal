import { Theme } from '@/context/themeContext';
import { moderateScale } from '@/utils/metrics';
import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window')
const tile = width / 3

export const styles = ({ colors }: Theme) => StyleSheet.create({
    boxContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    boxImage: {
        width: tile,
        height: tile,
        justifyContent:'center',
        alignItems: 'center'
    },
    plusIcon: {
        height: moderateScale(48),
        tintColor: colors.black
    },
});

export default { styles };
