import { View, Text, TouchableOpacity } from 'react-native'
import React, { isValidElement, useMemo } from 'react'
import { styles } from './styles'
import { HeaderProps } from '@/constants/types'
import Icon from '../Icon'
import { ICONS } from '@/constants'
import { useTheme } from '@/hooks/useTheme'

const Header: React.FC<HeaderProps> = ({ leftView, rightView, rightIcon, leftIcon, centerText, viewstyle, lefttext, leftsidetext, leftstyle, rightviewstyle }) => {
	const { theme } = useTheme()
	const style = useMemo(() => styles(theme), [theme]);

	return (
		<View style={[style.headerView, viewstyle]}>
			<View style={[style.leftView, leftstyle]}>
				{
					isValidElement(leftView) ?
						<>
							{leftView}
						</> :
						<>
							{leftIcon && leftView && 'icon' in leftView && <Icon icon={ICONS.left_arrow} onPress={leftView?.onPress} iconStyle={style.leftArrow} />}
							{lefttext && <Text style={[style.txt, style.centerText]}>{leftsidetext}</Text>}
						</>
				}
			</View>
			<View style={style.centerView}>
				<Text style={style.centerText}>{centerText}</Text>
			</View>
			<View style={[style.rightView, rightviewstyle]}>
				{
					rightView && 'icon' in rightView ?
						rightIcon ?
							<Icon icon={rightView.icon} iconStyle={rightView.iconStyle} onPress={rightView?.onPress} /> :
							<TouchableOpacity
								style={style.rightView}
								onPress={rightView?.onPress}>
								<Text style={[style.rightText]}>{rightView?.icon}</Text>
							</TouchableOpacity> :
						<>
							{rightView}
						</>
				}
			</View>
		</View>
	);
};

export default Header
