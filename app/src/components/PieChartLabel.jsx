import React from 'react'
import currencyFormatter from '../utils/CurrencyFormatter';

const PieChartLabel = ({data, dataIndex}) => {


    return(
        <label className="PieChartLabel">
            <h3 className="PieChartLabel-category">{data[dataIndex].title.toUpperCase()}</h3>
            <p className="PieChartLabel-amount">{currencyFormatter.format(data[dataIndex].value)}</p>
        </label>
    )
}

export default PieChartLabel