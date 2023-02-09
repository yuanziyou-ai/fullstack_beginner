import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);

  //获取交易记录
  const amounts = transactions.map(transaction => transaction.amount);

  const income = amounts
    .filter(item => item > 0)//react 数组条件过滤
    .reduce((acc, item) => (acc += item), 0)//reduce是一种数组运算，通常用于将数组的所有成员"累积"为一个值。
    .toFixed(2);//保留两位小数

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  return (
    <div className="inc-exp-container">
      <div>
        <h4>收入</h4>
        <p className="money plus">{numberWithCommas(income)}</p>
      </div>
      <div>
        <h4>费用</h4>
        <p className="money minus">{numberWithCommas(expense)}</p>
      </div>
    </div>
  )
}
