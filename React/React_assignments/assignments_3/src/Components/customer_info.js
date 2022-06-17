import './customer_info.css';


const CustomerInfo=({appointment,email,phone})=>{
    return(
        <>
            <div className="container">
                <div className="customer-info">
                    <div className="customer-info__apointment">
                        <span className="customer-info__lebel">Appointment:</span>
                        <span>{appointment}</span>
                    </div>
                    <div className="customer-info__email">
                        <span className="customer-info__lebel">Email:</span>
                        <span>{email}</span>
                    </div>
                    <div className="customer-info__phone">
                        <span className="customer-info__lebel">Phone:</span>
                        <span>{phone}</span>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CustomerInfo;