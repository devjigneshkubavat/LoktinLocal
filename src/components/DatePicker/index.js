import { moderateScale, verticalScale } from '@/utils/metrics'
import React, { useState } from 'react'
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

const CustumDatePicker = () => {
    const [selectedDate, setSelectedDate] = useState(31)
    const [selectedMonth, setSelectedMonth] = useState('January')
    const [selectedYear, setSelectedYear] = useState(2012)

    const dates = Array.from({ length: 31 }, (_, i) => i + 1) // 1 to 31
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]
    const years = Array.from({ length: 30 }, (_, i) => 2000 + i) // 2000 to 2029

    const ITEM_HEIGHT = 50

    const renderItem = (item, selectedValue, onSelect) => {
        return ({ item: value, index }) => (
            <View style={styles.item}>
                <Text
                    style={[
                        styles.text,
                        value === selectedValue && styles.selectedText
                    ]}
                    onPress={() => onSelect(value)}
                >
                    {value}
                </Text>
            </View>
        )
    }

    const scrollToIndex = (flatListRef, index) => {
        flatListRef?.current?.scrollToIndex({ animated: true, index })
    }

    const getInitialIndex = (data, value) => data.indexOf(value)

    const renderPicker = (data, selectedValue, setSelectedValue) => {
        const flatListRef = React.useRef(null)

        return (
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                ref={flatListRef}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate='fast'
                getItemLayout={(_, index) => ({
                    length: ITEM_HEIGHT,
                    offset: ITEM_HEIGHT * index,
                    index
                })}
                initialScrollIndex={getInitialIndex(data, selectedValue)}
                onScrollEndDrag={e => {
                    const offsetY = e.nativeEvent.contentOffset.y
                    const index = Math.round(offsetY / ITEM_HEIGHT)
                    setSelectedValue(data[index])
                }}
                renderItem={renderItem(data, selectedValue, setSelectedValue)}
                style={{ width: width / 3 }}
                contentContainerStyle={{
                    paddingVertical: (ITEM_HEIGHT * 2) / 3 // Center padding for snapping
                }}
            />
        )
    }

    return (
        <View style={styles.container}>
            {renderPicker(dates, selectedDate, setSelectedDate)}
            {renderPicker(months, selectedMonth, setSelectedMonth)}
            {renderPicker(years, selectedYear, setSelectedYear)}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: verticalScale(20)
    },
    item: {
        height: verticalScale(50),
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: moderateScale(18),
        color: '#555'
    },
    selectedText: {
        fontSize: moderateScale(20),
        fontWeight: 'bold',
        color: '#8B5E3C' // Highlighted color
    }
})

export default CustumDatePicker
