import "./App.css"
const app=(props)=>{
  return (
    <>
    <div className="container">
      <p className="image__wrap">
        <img src={props.employeeData.profileImg} className="user-image" alt="User__img"></img>
      </p>
      <p className="name__wrap"> 
        {props.employeeData.name}
      </p>
      <p className="user__label">
        Location
      </p>
      <p className="user__item">
        {props.employeeData.location}
      </p>
      <p className="user__label">
        BloodGroup
      </p>
      <p className="user__item">
        {props.employeeData.bloodGroup}
      </p>
      <p className="user__label">
        Age
      </p>
      <p className="user__item">
        {props.employeeData.age}
      </p>

    </div>
    </>
  )
}
export default app;