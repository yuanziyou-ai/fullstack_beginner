import React, { useState, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
  //定义和操作2个内容的状态
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);
  const [purpose, setPurpose] = useState('');
  //调用add方法添加交易记录
  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = e => {
    e.preventDefault();

    const newTransaction = {
      text,
      amount: +amount,
      purpose
    }

    addTransaction(newTransaction);
  }

  return (
    <>
      <h3>添加交易记录</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">备注</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="请输入内容......" />
        </div>
        <div className="form-control">
          <label htmlFor="amount"
          >金额 <br />
            (负数是费用成本，正数是收入)</label
          >
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="请输入金额......" />
        </div>
        <div className="form-control">
          <label htmlFor="purpose">用途</label>
          <input type="text" value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="请输入用途......" />
        </div>
        <button className="btn">点击添加</button>
      </form>
    </>
  )
}
