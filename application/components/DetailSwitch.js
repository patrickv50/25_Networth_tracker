import React from 'react'
import BaseDetail from './detail-screens/BaseDetail'
import StockDetail from './detail-screens/StockDetail'
 
const DetailSwitch = ({ category, item, goBack }) => {
  
    
    if (category.categoryName === 'Stocks') return <StockDetail item={item} goBack={goBack}/>
    else return <BaseDetail />
}

export default DetailSwitch