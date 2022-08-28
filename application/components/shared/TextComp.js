import { useContext } from 'react'
import { useMemo } from 'react'
import { Text } from 'react-native'
import { ThemeContext } from '../../ThemeContext'

const TextComp = ({numLines, style, children, variant, marginBottom, weight,textAlign }) => {
    const curTheme = useContext(ThemeContext)
    // const styles = useMemo(() => {
    //   return getTheme(curTheme)
    // }, [curTheme])
    const size = useMemo(() => {
        switch (variant) {
            case 'h1': return 28
            case 'h2': return 24
            case 'h3': return 20
            case 'h4': return 18
            case 'h5': return 16
            case 'body1': return 14
            case 'body2': return 12
            default: return 12
        }
    })
    const mBottom = marginBottom ? (size / 1.5) : 0
    return (
        <Text numberOfLines={numLines?numLines:0} style={[{ color: curTheme.text, textAlign: textAlign?textAlign:'center', fontSize: size, marginBottom: mBottom, fontWeight: weight }, style]}>{children}</Text>
    )
}

export default TextComp