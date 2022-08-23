import { useMemo } from 'react'
import { Text } from 'react-native'
import theme from '../../theme'

const TextComp = ({ style, children, variant, marginBottom, weight }) => {
    const size = useMemo(() => {
        switch (variant) {
            case 'h1': return 28
            case 'h2': return 24
            case 'h3': return 20
            case 'h4': return 24
            case 'h5': return 24
            case 'body1': return 14
            case 'body2': return 12
            default: return 12
        }
    })
    const mBottom = marginBottom ? (size / 1.5) : 0
    return (
        <Text style={[{ color: theme.text, textAlign: 'center', fontSize: size, marginBottom: mBottom, fontWeight: weight }, style]}>{children}</Text>
    )
}

export default TextComp