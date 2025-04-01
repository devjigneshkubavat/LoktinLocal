import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, ViewStyle } from "react-native"
import {styles} from "./styles"
import { useMemo } from "react";
import { useTheme } from "@/hooks/useTheme";

const KeyBoardAvoid = (props: any,) => {
    const { theme, handleTheme } = useTheme()
  const style = useMemo(() => styles(theme), [theme]);
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={style.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined} // Adjust for iOS
                keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} // Offset for header
            >
                <ScrollView
                    contentContainerStyle={[style.scrollContent,props.scrollstyle]}
                    keyboardShouldPersistTaps="handled" // Ensures taps on inputs work after dismiss
                >
                    {props.children}
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )

}
export default KeyBoardAvoid