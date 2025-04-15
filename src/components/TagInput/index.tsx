import { Theme } from '@/context/themeContext';
import { useTheme } from '@/hooks/useTheme';
import { horizontalScale, moderateScale, verticalScale } from '@/utils/metrics';
import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TextStyle,
  ViewStyle,
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
} from 'react-native';

interface TagInputProps {
  initialTags?: string[];
  onChangeTags?: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  tagStyle?: ViewStyle;
  tagTextStyle?: TextStyle;
  tagRemoveStyle?: TextStyle;
  inputStyle?: TextStyle;
  containerStyle?: ViewStyle;
  tagsContainerStyle?: ViewStyle;
  keyboardType?: KeyboardTypeOptions;
  returnKeyType?: ReturnKeyTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  tagColor?: string;
  textColor?: string;
  validationRegex?: RegExp;
  readonly?: boolean;
  delimiters?: string[];
}

const 
TagInput: React.FC<TagInputProps> = ({
  initialTags = [],
  onChangeTags,
  placeholder = 'Add a tag...',
  maxTags = 10,
  tagStyle,
  tagTextStyle,
  tagRemoveStyle,
  inputStyle,
  containerStyle,
  tagsContainerStyle,
  keyboardType = 'default',
  returnKeyType = 'done',
  autoCapitalize = 'none',
  tagColor = '#e0e0e0',
  textColor = '#000',
  validationRegex = /^[a-zA-Z0-9- ]+$/,
  readonly = false,
  delimiters = [',', ' '],
}) => {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [inputValue, setInputValue] = useState('');
  const { theme } = useTheme();
  const styles = useMemo(() => stylesFun(theme), [theme]);

  useEffect(() => {
    onChangeTags?.(tags);
  }, [tags, onChangeTags]);

  const handleAddTag = () => {
    const trimmedValue = inputValue.trim();
    
    if (
      !trimmedValue ||
      tags.length >= maxTags ||
      tags.includes(trimmedValue) ||
      !validationRegex.test(trimmedValue)
    ) {
      return;
    }

    setTags([...tags, trimmedValue]);
    setInputValue('');
    Keyboard.dismiss();
  };

  const handleRemoveTag = (index: number) => {
    if (!readonly) {
      setTags(tags.filter((_, i) => i !== index));
    }
  };

  const handleKeyPress = ({ nativeEvent: { key } }: { nativeEvent: { key: string } }) => {
    if (delimiters.includes(key)) {
      handleAddTag();
    }
  };

  const handleInputChange = (text: string) => {
    const delimiterFound = delimiters.some(delimiter => text.includes(delimiter));
    
    if (delimiterFound) {
      const parts = text.split(new RegExp(`[${delimiters.join('')}]`));
      const newTags = parts
        .map(part => part.trim())
        .filter(part => part && !tags.includes(part) && validationRegex.test(part));
      
      if (newTags.length > 0 && tags.length + newTags.length <= maxTags) {
        setTags([...tags, ...newTags]);
        setInputValue('');
      }
    } else {
      setInputValue(text);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.tagsContainer, tagsContainerStyle]}>
        {tags.map((tag, index) => (
          <View
            key={`${tag}-${index}`}
            style={[
              styles.tag,
              { backgroundColor: tagColor },
              tagStyle,
            ]}
          >
            <Text style={[styles.tagText, { color: textColor }, tagTextStyle]}>
              {tag}
            </Text>
            {!readonly && (
              <TouchableOpacity onPress={() => handleRemoveTag(index)}>
                <Text style={[styles.tagRemove, { color: textColor }, tagRemoveStyle]}>
                  ×
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>

      {!readonly && tags.length < maxTags && (
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, inputStyle]}
            value={inputValue}
            onChangeText={handleInputChange}
            onSubmitEditing={handleAddTag}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            autoCapitalize={autoCapitalize}
            editable={tags.length < maxTags}
            underlineColorAndroid="transparent"
          />
        </View>
      )}
    </View>
  );
};

const stylesFun = ({ colors }: Theme) => StyleSheet.create({
  container: {
    padding: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  tag: {
    flexDirection: 'row',
    borderRadius: moderateScale(15),
    paddingVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(10),
    marginRight: horizontalScale(5),
    marginBottom: verticalScale(5),
    alignItems: 'center',
  },
  tagText: {
    marginRight: horizontalScale(5),
  },
  tagRemove: {
    fontSize: moderateScale(16),
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  input: {
    height: moderateScale(40),
    paddingHorizontal: horizontalScale(0),
    paddingVertical: verticalScale(8),
    fontSize: moderateScale(14),
    color: colors.black,
  },
});

export default TagInput;