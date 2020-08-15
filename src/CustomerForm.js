import React,{Component,Fragment} from 'react';
import "./form.css"
import {RiParentLine} from 'react-icons/ri'
import {FaChild} from 'react-icons/fa'
import {FaBirthdayCake} from 'react-icons/fa'
import {MdSchool} from 'react-icons/md'
import {MdEmail} from 'react-icons/md'
import {TiContacts} from 'react-icons/ti'
import {FaLandmark} from 'react-icons/fa'
import {RiLockPasswordLine} from 'react-icons/ri'

const postUrl="http://localhost:2000/add"

class Form extends Component {
  state={
      form:{
        ParentName:"",
        ChildName:"",
        Grade:null,
        Country:"",
        Phone:null,
        Email:"",
        Code:null
      },
      formErrorMessage: {
        ParentNameError: "",
        ChildNameError: "",
        ageError: ""
      },
      formValid: {
        ParentName: false,
        ChildName: false,
        age: false,
        buttonActive: false
      },
      errorMessage: "",
      successMessage: "",
  }

  handleChange = event => {
    const value = event.target.value
    const name = event.target.name
    const { form } = this.state
    this.setState({
      form: { ...form, [name]: value }
    })
    this.validateField(name, value)
    };

  validateField = (fieldName, value) => {
    const { formValid, formErrorMessage } = this.state
    switch (fieldName) {
        case "ParentName":
            if (value.length == 0) {
                formValid.ParentName = false
                formErrorMessage.ParentNameError = "field required"
            }
            else if (!value.match(/^[A-Za-z]{1,15}$/)) {
                formValid.ParentName = false
                formErrorMessage.ParentNameError = "Please enter a valid firstName"
            }
            else {
                formValid.ParentName = true
                formErrorMessage.ParentNameError = ""
            }
            break;
        case "ChildName":
            if (value.length == 0) {
                formValid.ChildName = false
                formErrorMessage.ChildNameError = "field required"
            }
            else if (!value.match(/^[A-Za-z]{1,15}$/)) {
                formValid.ChildName = false
                formErrorMessage.ChildNameError = "Please enter a valid lastName"
            }
            else {
                formValid.ChildName = true
                formErrorMessage.ChildNameError = ""
            }
            break;
            case "age":
              if (value.length == 0) {
                  formValid.lastName = false
                  formErrorMessage.lastNameError = "field required"
              }
              else if (Number(value)>=1 && Number(value)<70) {
                  formValid.age = false
                  formErrorMessage.ageError = "Please enter a valid age"
              }
              else {
                  formValid.age = true
                  formErrorMessage.ageError = ""
              }
              break;

    }
    if(formValid.age && formValid.firstName && formValid.lastName){
      formValid.buttonActive=true
    }
    else{
      formValid.buttonActive=false
    }
 
  };
  
  onSubmit=(e)=>{
    e.preventDefault();
    console.log("1")
    this.addData();
  }

//   addData=()=>{
//     console.log("2")
//     Axios.post(postUrl,this.state)
//     .then((response)=>{
//       console.log("at then")
//       console.log(response)
//     this.setState({err:false,success:true,successmsg:"Successfully Submitted"})})
//     .catch((err)=>{
//       console.log("asasasa")
//       console.log(err)
//       console.log(err.response.data.message)
      
//       this.setState({err:true,success:false,errmsg:err.response.data.message})
//     })
//   }

  render(){
  var {ParentName,ChildName,Grade,Country,Phone,Email,Code}=this.state.form;
  return (
   /* <Model isOpen={this.props.isOpen} onRequestClose={()=>this.props.changeState()}  > */
   <div className="container-fluid">
   <div className="row">
   <div className="col-lg-6 col-md-6 d-none d-md-block image-container">
    
   </div>
   <div className="col-lg-6 col-md-6 form-container">
       <div className="col-lg-8 col-md-12 col-sm-9 col-12 form-box text-center">
            <div className="logo md-3">
                <img src="./smaowla.png" width="150px"/>
            </div>
            <div className="heading mb-4">
                <h4>Welcome to Smaowl</h4>
            </div>
            <form>
                <div className="form-input">
                <span><RiParentLine/></span>
                <input type="text" name="ParentName" value={ParentName} placeholder="Parent Name"/>
                {/* <p className="text-danger text-left font-weight-bold ">This field is required</p> */}
                </div>
                
                <div className="form-input">
                <span><FaChild/></span>
                <input type="text" name="ChildName" value={ChildName} placeholder="Child Name"/>
                </div>
                <div className="form-input">
                <span><FaBirthdayCake/></span>
                <input type="text" name="ChildName" value={ChildName} placeholder="DOB"/>
                </div>
                <div className="form-input">
                <span><MdSchool/></span>
                <input type="text" name="Grade" value={Grade} placeholder="Grade"/>
                </div>
                <div className="form-input">
                <span><TiContacts/></span>
                <input type="number" name="Phone" value={Phone} placeholder="Contact"/>
                </div>
                <div className="form-input">
                <span><MdEmail/></span>
                <input type="text" name="Email" value={Email} placeholder="Email"/>
                </div>
                <div className="form-input">
                <span><FaLandmark/></span>
                <input type="text" name="Country" value={Country} placeholder="Country"/>
                </div>
                <div className="form-input">
                <span><RiLockPasswordLine/></span>
                <input type="text" name="Code" value={Code} placeholder="Code"/>
                </div>
                <div className="text-center mb-3">
                    <button type="submit" className="btn">Submit</button>

                </div>
            </form>
       </div>

   </div>
   

   </div>
 </div>
    
  );
  }
}

export default Form;


