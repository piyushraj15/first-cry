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
import {AiFillWarning} from 'react-icons/ai'
import countryList from 'react-select-country-list'
const country= countryList().data
console.log(country)
const postUrl="http://localhost:2000/add";
const classes=[1,2,3,4,5,6,7,8,9,10,11,12];
console.log(classes)
class Form extends Component {
  state={
      form:{
        ParentName:"",
        ChildName:"",
        Grade:null,
        Country:"",
        Phone:null,
        Email:"",
        Code:null,
        DOB:""
      },
      formErrorMessage: {
        ParentNameError: "",
        ChildNameError: "",
        EmailError:"",
        ageError: "",
        dobError:""
      },
      formValid: {
        ParentNameValid: false,
        ChildNameValid: false,
        Email:false,
        age: false,
        DOB:false,
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
                formValid.ParentNameValid = false
                formErrorMessage.ParentNameError = "Field Required"
            }
            else if (!value.match(/^[A-Za-z]{1,15}$/)) {
                formValid.ParentNameValid = false
                formErrorMessage.ParentNameError = "Please enter a valid ParentName"
            }
            else {
                formValid.ParentNameValid = true
                formErrorMessage.ParentNameError = ""
            }
            break;
        case "ChildName":
            if (value.length == 0) {
                formValid.ChildNameValid = false
                formErrorMessage.ChildNameError = "Field Required"
            }
            else if (!value.match(/^[A-Za-z]{1,15}$/)) {
                formValid.ChildNameValid = false
                formErrorMessage.ChildNameError = "Please enter a valid StudentName"
            }
            else {
                formValid.ChildNameValid = true
                formErrorMessage.ChildNameError = ""
            }
            break;
            case "Email":
            if (value.length == 0) {
                formValid.Email = false
                formErrorMessage.EmailError = "Field Required"
            }
            else if (!value.match(/^[a-zA-Z0-9 . _]+@[a-zA-Z0-9]+\.[a-zA-Z]{3,}$/)) {
                formValid.Email = false
                formErrorMessage.EmailError = "Please enter a valid Email"
            }
            else {
                formValid.Email = true
                formErrorMessage.EmailError = ""
            }
            break;
            case "DOB":
              if (value.length == 0) {
                  formValid.DOB = false
                  formErrorMessage.dobError = "field required"
              }
              else if (new Date(value)>=new Date()) {
                  formValid.DOB = false
                  formErrorMessage.dobError = "Please Check"
              }
              else {
                  formValid.DOB = true
                  formErrorMessage.dobError = ""
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
  var {ParentName,ChildName,Grade,Country,Phone,Email,Code,DOB}=this.state.form;
  var {ParentNameError,ChildNameError,EmailError,dobError}=this.state.formErrorMessage;
  
  return (
   /* <Model isOpen={this.props.isOpen} onRequestClose={()=>this.props.changeState()}  > */
   <div className="container-fluid">
       {JSON.stringify(this.state)}
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
                <input type="text" name="ParentName" value={ParentName} placeholder="Parent Name" onChange={(e)=>this.handleChange(e)}/>
                {ParentNameError && <p className="text-left text-danger font-weight-bold"><AiFillWarning size="1.5em"/>{ParentNameError}</p>}
                </div>
                <div className="form-input">
                <span><FaChild/></span>
                <input type="text" name="ChildName" value={ChildName} placeholder="Child Name" onChange={(e)=>this.handleChange(e)}/>
                {ChildNameError && <p className="text-left text-danger font-weight-bold"><AiFillWarning size="1.5em"/>{ChildNameError}</p>}
                </div>
                <div className="form-input">
                <span><FaBirthdayCake/></span>
                <input type="text" name="DOB" value={DOB} placeholder="DOB"  onFocus={(e)=>e.target.type="date"} onChange={(e)=>this.handleChange(e)}/>
                {dobError && <p className="text-left text-danger font-weight-bold"><AiFillWarning size="1.5em"/>{dobError}</p>}
                </div>
                <div className="form-input">
                <span><MdSchool/></span>
                <select type="text" name="Grade" value={Grade} placeholder="Grade" onChange={(e)=>this.handleChange(e)}>
                    <option value="">Select Grade</option>
                    {classes.map((data)=>{
                        return <option value={data}>{data}</option>
                    })

                    }
                </select>
                </div>
                <div className="form-input">
                <span><TiContacts/></span>
                <input type="number" name="Phone" value={Phone} min="0" placeholder="Contact" onChange={(e)=>this.handleChange(e)}/>
                </div>
                <div className="form-input">
                <span><MdEmail/></span>
                <input type="text" name="Email" value={Email} placeholder="Email" onChange={(e)=>this.handleChange(e)}/>
                {EmailError && <p className="text-left text-danger font-weight-bold"><AiFillWarning size="1.5em"/>{EmailError}</p>}
                </div>
                <div className="form-input">
                <span><FaLandmark/></span>
                <select type="text" name="Country" value={Country} onChange={(e)=>this.handleChange(e)}>
                    <option value="">Select Country</option>
                    {country.map((data)=>{
                        return <option value={data.label}>{data.label}</option>
                    })

                    }
                </select>
                </div>
                <div className="form-input">
                <span><RiLockPasswordLine/></span>
                <input type="text" name="Code" value={Code} placeholder="Code" onChange={(e)=>this.handleChange(e)}/>
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


