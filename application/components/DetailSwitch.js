import React from 'react'
import BaseDetail from './detail-screens/BaseDetail'
import StockDetail from './detail-screens/StockDetail'
 
const DetailSwitch = ({ category, item }) => {
  
    
    if (category.categoryName === 'Stocks') return <StockDetail item={item} />
    else return <BaseDetail />
}

export default DetailSwitch