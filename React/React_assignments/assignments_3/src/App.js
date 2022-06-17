import React from 'react'
import CustomerInfo from './Components/customer_info'
import Header from './Components/header'
import OrderInfo from './Components/order_info'
import ProductInfo from './Components/product_info'

function App() {

  const User = {
    name: 'Alan Ford',
    userId: '00512163',
    appointment: '(:00 (23-06-2021)',
    email: 'alan.ford@gmail.com',
    phoneNumber:'+91-9876543210',
    profileImg:'',
    productName:'Boltart Bosbesson',
    productDescription:'This is some random description about Product',
  }
  return (
    <>
      <Header name={User.name} employeeId={User.userId}/>
      <CustomerInfo appointment={User.appointment} email={User.email} phone={User.phoneNumber}/>
      <OrderInfo/>
      <ProductInfo/>
    </>
  )
}

export default App
