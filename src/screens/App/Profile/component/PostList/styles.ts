import { Theme } from '@/context/themeContext';
import { horizontalScale, moderateScale } from '@/utils/metrics';
import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window')
const tile = width / 4

export const styles = ({ colors }: Theme) => StyleSheet.create({
    boxContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    boxImage: {
        width: tile,
        height: tile,
        justifyContent:'center',
        alignItems: 'center',
        margin: horizontalScale(10),
        borderRadius: horizontalScale(10)
    },
    plusIcon: {
        height: moderateScale(48),
        tintColor: colors.black
    },
});

export default { styles };
